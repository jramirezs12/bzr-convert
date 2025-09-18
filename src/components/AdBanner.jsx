"use client";
import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("No se pudo cargar AdSense:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        width: "320px",
        height: "100px",
        background: "#f0f0f0",
      }}
      data-ad-client="ca-pub-0000000000000000"
      data-ad-slot="1234567890"
      data-adtest="on"
    ></ins>
  );
}
