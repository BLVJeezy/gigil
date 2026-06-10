import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.gigilcoiffure.be";
  return ["fr", "nl", "en"].map((lang) => ({
    url: `${base}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "fr" ? 1 : 0.8,
  }));
}
