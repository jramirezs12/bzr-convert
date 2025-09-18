/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Aumenta el límite del cuerpo para formularios de Server Actions/Route Handlers
    serverActions: {
      bodySizeLimit: '80mb', // Debe ser >= MAX_TOTAL_SIZE del backend
    },
  },
};


export default nextConfig;
