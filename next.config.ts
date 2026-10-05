import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true // Depende do babel-plugin-react-compiler
};

export default nextConfig;
