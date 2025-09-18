"use client";
import { useEffect, useState } from "react";

export default function AdBanner() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      setFailed(true);
      console.warn("No se pudo cargar AdSense:", e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[320px] max-w-full h-[100px] rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 overflow-hidden flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-0000000000000000"
          data-ad-slot="1234567890"
          data-adtest="on"
          data-full-width-responsive="true"
        />
        {failed && (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            Espacio para anuncio
          </span>
        )}
      </div>
    </div>
  );
}