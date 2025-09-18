// Servicio para inicializar AdSense de forma segura
export function pushAd() {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    return true;
  } catch (e) {
    console.warn("No se pudo cargar AdSense:", e);
    return false;
  }
}