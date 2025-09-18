export default function LabelsBar({ size = "lg" }) {
  const chips = [
    { text: "Gratis", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" },
    { text: "Sin registro", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
    { text: "Rápido", color: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300" },
    { text: "Seguro", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  ];

  const sizeMap = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
    xl: "px-6 py-2.5 text-lg",
  };
  const chipSize = sizeMap[size] ?? sizeMap.lg;

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {chips.map(({ text, color }) => (
        <span
          key={text}
          className={[
            "inline-flex items-center rounded-full font-semibold leading-none",
            chipSize,
            color,
            "border border-black/0 dark:border-white/10 shadow-sm",
          ].join(" ")}
        >
          {text}
        </span>
      ))}
    </div>
  );
}