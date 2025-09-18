"use client";
import { useRef, useState, useEffect } from "react";
import { FORMATS, LIMITS } from "@/lib/constants";
import { formatBytes } from "@/lib/format";
import { convertFromBlobUrls } from "@/services/conversion";
import {
  UploadIcon,
  Spinner,
  CloseIcon,
  FolderIcon,
  ZipIcon,
  TrashIcon,
  ImageStackIcon,
} from "@/components/icons/Icons";
import { upload } from "@vercel/blob/client";

export default function UploadForm() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]); // [{id, file, url}]
  const [format, setFormat] = useState("pdf"); // PDF por defecto
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Progreso
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100
  const [stage, setStage] = useState(null); // 'upload' | 'convert' | null

  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.url));
  }, [files]);

  const addFiles = (fileList) => {
    const arr = Array.from(fileList || []);
    const images = arr.filter((f) => f.type?.startsWith("image/"));
    if (!images.length) {
      setStatus("Solo se admiten imágenes.");
      return;
    }

    const currentCount = files.length;
    const spaceLeft = Math.max(0, LIMITS.MAX_FILES - currentCount);
    const accepted = images.slice(0, spaceLeft);

    const tooLarge = accepted.filter((f) => f.size > LIMITS.MAX_FILE_SIZE);
    const ok = accepted.filter((f) => f.size <= LIMITS.MAX_FILE_SIZE);

    const newTotal =
      files.reduce((acc, it) => acc + (it.file?.size || 0), 0) +
      ok.reduce((acc, f) => acc + f.size, 0);

    if (newTotal > LIMITS.MAX_TOTAL_SIZE) {
      setStatus(`El lote superaría ${formatBytes(LIMITS.MAX_TOTAL_SIZE)}. Reduce la selección o el tamaño.`);
      return;
    }

    const mapped = ok.map((f, i) => ({
      id: `${Date.now()}_${i}_${f.name}`,
      file: f,
      url: URL.createObjectURL(f),
    }));

    setFiles((prev) => [...prev, ...mapped]);

    if (images.length > spaceLeft) {
      setStatus(`Se agregaron ${mapped.length} archivo(s). Límite: ${LIMITS.MAX_FILES}.`);
    } else if (tooLarge.length > 0) {
      setStatus(`Algunos archivos exceden ${formatBytes(LIMITS.MAX_FILE_SIZE)} y fueron omitidos (${tooLarge.length}).`);
    } else {
      setStatus("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeOne = (id) => {
    setFiles((prev) => {
      const t = prev.find((p) => p.id === id);
      if (t) URL.revokeObjectURL(t.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearAll = () => {
    setFiles((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
    setStatus("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!files.length) {
      setStatus("Selecciona al menos una imagen.");
      return;
    }

    setLoading(true);
    setShowProgress(true);
    setStage("upload");
    setProgress(0);

    const isPdf = format === "pdf";

    try {
      // 1) Subida a Vercel Blob con progreso agregado
      setStatus(`Subiendo ${files.length} archivo(s) a almacenamiento seguro…`);

      const totalBytes = files.reduce((acc, { file }) => acc + (file?.size || 0), 0) || 1;
      const uploadedByIndex = new Array(files.length).fill(0);

      const uploadedResults = [];
      // Subimos secuencialmente para tener progreso estable y simple
      for (let i = 0; i < files.length; i++) {
        const f = files[i].file;

        let usedPerFileFallback = true;
        const result = await upload(f.name, f, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
          // onUploadProgress es soportado por @vercel/blob/client.
          // Si no dispara, usamos fallback por archivo.
          onUploadProgress: (ev) => {
            const loaded = Number(ev?.loaded ?? ev?.bytesUploaded ?? 0);
            if (loaded > 0) usedPerFileFallback = false;
            uploadedByIndex[i] = Math.min(loaded, f.size || 0);
            const sum = uploadedByIndex.reduce((a, b) => a + b, 0);
            const pct = Math.max(0, Math.min(100, Math.round((sum / totalBytes) * 90))); // 0–90% durante subida
            setProgress(pct);
          },
        });

        // Fallback si no hubo eventos de progreso: avanza por archivo
        if (usedPerFileFallback) {
          uploadedByIndex[i] = f.size || 0;
          const sum = uploadedByIndex.reduce((a, b) => a + b, 0);
          const pct = Math.max(0, Math.min(100, Math.round((sum / totalBytes) * 90)));
          setProgress(pct);
        }

        uploadedResults.push(result);
      }

      const urls = uploadedResults.map((u) => u.url);

      // 2) Conversión
      setStage("convert");
      // Avanzamos visualmente al 95% mientras convierte
      setProgress((p) => (p < 95 ? 95 : p));
      setStatus(
        isPdf
          ? `Generando PDF con ${files.length} página(s)…`
          : files.length > 1
          ? `Convirtiendo ${files.length} imagen(es) y preparando ZIP…`
          : `Convirtiendo imagen…`
      );

      const { blob, filename } = await convertFromBlobUrls(urls, format);

      // 3) Descargar resultado
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setProgress(100);
      setStatus("Descarga lista.");
    } catch (err) {
      console.error(err);
      const msg = err?.message || "Error en la conversión.";
      setStatus(msg);
      alert(msg);
    } finally {
      setStage(null);
      // Espera breve para que el 100% sea visible
      setTimeout(() => setShowProgress(false), 400);
      setLoading(false);
    }
  };

  const totalSize = files.reduce((acc, f) => acc + (f.file?.size || 0), 0);
  const activeFormat = FORMATS.find((f) => f.id === format)?.label || format.toUpperCase();

  const isPdf = format === "pdf";
  const submitLabel = loading
    ? "Procesando…"
    : isPdf
      ? `Convertir ${files.length || ""} a PDF`.trim()
      : files.length > 1
        ? `Convertir ${files.length} a ${activeFormat} (ZIP)`
        : `Convertir a ${activeFormat}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[720px] rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur p-6 sm:p-7 flex flex-col gap-6"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      {/* 1) Formatos */}
      <fieldset className="w-full">
        <legend className="sr-only">Formato de salida</legend>
        <div className="w-full rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 p-1.5">
          {/* 5 opciones → 5 columnas en sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {FORMATS.map((opt) => {
              const active = format === opt.id;
              return (
                <label
                  key={opt.id}
                  className={[
                    "w-full relative cursor-pointer select-none rounded-lg",
                    "px-4 py-2.5 sm:py-3 text-center text-[15px] font-semibold transition",
                    "flex flex-col items-center justify-center gap-0.5",
                    "min-h-[52px] sm:min-h-[58px]",
                    active
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-blue-500"
                      : "text-gray-700 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-900/60",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="format"
                    value={opt.id}
                    className="sr-only"
                    checked={active}
                    onChange={() => setFormat(opt.id)}
                  />
                  {opt.label}
                  <span className="text-[11px] leading-3 font-normal text-gray-500 dark:text-gray-400">
                    {active ? opt.hint : " "}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </fieldset>

      {/* 2) Dropzone / Previews */}
      <div
        className={[
          "relative w-full rounded-xl border-2 border-dashed transition bg-white/40 dark:bg-gray-800/30",
          dragActive
            ? "border-blue-500 bg-blue-50/60 dark:bg-blue-950/20"
            : "border-gray-300 dark:border-gray-700 hover:border-blue-400",
        ].join(" ")}
      >
        {files.length === 0 ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full h-52 sm:h-60 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-600 dark:text-gray-300"
          >
            <UploadIcon className="h-7 w-7 opacity-80" />
            <span className="text-center text-sm">
              Arrastra tus imágenes aquí o haz clic para seleccionarlas
            </span>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              Hasta {LIMITS.MAX_FILES} imágenes • Máx {formatBytes(LIMITS.MAX_FILE_SIZE)} c/u • Máx {formatBytes(LIMITS.MAX_TOTAL_SIZE)} por lote
            </span>
          </button>
        ) : (
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {files.map((item) => (
                <figure
                  key={item.id}
                  className="group relative rounded-md overflow-hidden border border-gray-200/70 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  title={item.file.name}
                >
                  <img src={item.url} alt={item.file.name} className="h-24 w-full object-cover" />
                  <figcaption className="px-2 py-1 text-[11px] text-gray-600 dark:text-gray-300 truncate">
                    {item.file.name}
                  </figcaption>
                  <button
                    type="button"
                    onClick={() => removeOne(item.id)}
                    className="absolute top-1 right-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-black/60 text-white hover:bg-black/75"
                    aria-label="Quitar imagen"
                    title="Quitar"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                </figure>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-2">
                <ImageStackIcon className="h-4 w-4" />
                {files.length}/{LIMITS.MAX_FILES} seleccionadas
              </span>
              <span>{formatBytes(totalSize)} / {formatBytes(LIMITS.MAX_TOTAL_SIZE)}</span>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* 3) Acciones */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 px-3 sm:px-4">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={[
              "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white",
              "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:from-cyan-700 active:to-blue-700",
              "shadow-md shadow-cyan-600/25 dark:shadow-cyan-900/30",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900",
              "min-h-[46px] min-w-[200px]",
            ].join(" ")}
            title="Agregar imágenes"
          >
            <FolderIcon className="h-4 w-4" />
            Agregar imágenes
          </button>

          {files.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className={[
                "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold",
                "text-rose-700 dark:text-rose-300 border border-rose-300/70 dark:border-rose-700",
                "hover:bg-rose-50 active:bg-rose-100 dark:hover:bg-rose-900/30 dark:active:bg-rose-900/40",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-400 dark:focus-visible:ring-offset-gray-900",
                "min-h-[46px] min-w-[140px]",
              ].join(" ")}
              title="Limpiar selección"
            >
              <TrashIcon className="h-4 w-4" />
              Limpiar
            </button>
          )}

          <button
            type="submit"
            disabled={loading || files.length === 0}
            className={[
              "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white",
              "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 active:from-blue-700 active:via-indigo-700 active:to-violet-700",
              "disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed",
              "shadow-md shadow-blue-600/25 dark:shadow-indigo-900/30",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-900",
              "min-h-[46px] min-w-[220px]",
            ].join(" ")}
            title={submitLabel}
          >
            {loading ? (
              <>
                <Spinner className="h-4 w-4" />
                Procesando…
              </>
            ) : (
              <>
                {format !== "pdf" && files.length > 1 ? <ZipIcon className="h-4 w-4" /> : null}
                {submitLabel}
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3.1) Barra de progreso / Estado visual */}
      {showProgress && (
        <div className="flex flex-col gap-2 px-2 sm:px-4">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
            <span>
              {stage === "upload" ? "Subiendo archivos…" : stage === "convert" ? "Convirtiendo…" : "Procesando…"}
            </span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div
              className={[
                "h-full transition-all duration-200",
                stage === "convert" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 animate-pulse"
                                    : "bg-gradient-to-r from-cyan-500 to-blue-600",
              ].join(" ")}
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            />
          </div>
        </div>
      )}

      {/* 4) Estado/ayuda */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 min-h-[1rem]" aria-live="polite">
        {status}
      </p>
    </form>
  );
}