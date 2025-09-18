"use client";
import { ENV } from "@/lib/env";
import { useAdsense } from "@/hooks/useAdsense";

export default function AdBanner() {
  const { failed } = useAdsense();

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[320px] max-w-full h-[100px] rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 overflow-hidden flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={ENV.ADSENSE_CLIENT}
          data-ad-slot={ENV.ADSENSE_SLOT}
          data-adtest={ENV.ADSENSE_TEST ? "on" : undefined}
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