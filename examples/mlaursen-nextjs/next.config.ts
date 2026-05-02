import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],

  sassOptions: {
    implementation: "sass-embedded",
  },
};

export default nextConfig;
