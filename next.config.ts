import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Amazon
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "**.media-amazon.com" },
      { protocol: "https", hostname: "**.ssl-images-amazon.com" },
      // Mercado Livre
      { protocol: "https", hostname: "mlstatic.com" },
      { protocol: "https", hostname: "**.mlstatic.com" },
      // Shopee
      { protocol: "https", hostname: "**.susercontent.com" },
      { protocol: "https", hostname: "**.shopee.com.br" },
      // Magalu
      { protocol: "https", hostname: "**.mlcdn.com.br" },
      { protocol: "https", hostname: "**.magazineluiza.com.br" },
      // AliExpress
      { protocol: "https", hostname: "**.alicdn.com" },
      { protocol: "https", hostname: "**.aliexpress-media.com" },
    ],
  },
};

export default nextConfig;
