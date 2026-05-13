import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "437 Heliotrope",
    short_name: "437 Heliotrope",
    description: "A refreshed cinematic Corona del Mar property buyer package.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6EC",
    theme_color: "#0E1A24",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
