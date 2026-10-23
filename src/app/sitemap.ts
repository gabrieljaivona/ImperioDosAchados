import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = ["", "/produtos", "/cupons", "/sobre", "/privacidade", "/termos"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" || path === "/produtos" || path === "/cupons" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
