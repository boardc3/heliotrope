import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/property";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "#vision", "#interiors", "#gallery", "#map", "#inquiry"].map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path ? 0.7 : 1,
  }));
}
