/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '80mb', // Debe ser >= MAX_TOTAL_SIZE del backend
    },
    serverExternalPackages: ["sharp", "jszip"], // CORRECTO
  },
};

export default nextConfig;
