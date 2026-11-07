/** URL pública do site (usada em metadata, sitemap e robots). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const SHARE_IMAGE_ALT = "Império Dos Achados — as melhores ofertas da internet";

/** Imagem de compartilhamento (Open Graph) em public/assets. */
export const OG_IMAGE = {
  url: "/assets/opengraph-image.png",
  width: 1651,
  height: 922,
  alt: SHARE_IMAGE_ALT,
};

/** Imagem de compartilhamento do Twitter/X em public/assets. */
export const TWITTER_IMAGE = {
  url: "/assets/twitter-image.png",
  width: 1651,
  height: 922,
  alt: SHARE_IMAGE_ALT,
};
