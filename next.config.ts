import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sri-krishna-eyunni.github.io",
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.0.19", "172.20.10.3"],
};

export default nextConfig;
