"use client";
import { useEffect, useState } from "react";
import { pushAd } from "@/services/adsense";

/**
 * Inicializa un bloque de AdSense. Devuelve { failed } para fallback UI.
 */
export function useAdsense() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ok = pushAd();
    if (!ok) setFailed(true);
  }, []);

  return { failed };
}