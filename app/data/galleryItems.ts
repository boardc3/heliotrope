export type GalleryCategory =
  | "Exterior"
  | "Interiors"
  | "Bedroom"
  | "Kitchen"
  | "Dining"
  | "Unit B";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  title: string;
  meta: string;
  bucket: string;
  slug: string;
  alt: string;
  aspect?: "portrait" | "wide" | "square";
};

export const galleryItems: GalleryItem[] = [
  { id: "gr-01", category: "Interiors", title: "Great Room Hearth", meta: "White oak · plaster · soft daylight", bucket: "great-room", slug: "gr-01", alt: "Unit A open great room render at 437 Heliotrope", aspect: "wide" },
  { id: "gr-02", category: "Interiors", title: "Dining Axis", meta: "Connected living, dining, and kitchen", bucket: "great-room", slug: "gr-02", alt: "Open dining and living room render at 437 Heliotrope", aspect: "wide" },
  { id: "kt-03", category: "Kitchen", title: "Chef's Kitchen", meta: "Stone counters · warm millwork", bucket: "kitchen", slug: "kt-03", alt: "Unit A kitchen render with stone island", aspect: "wide" },
  { id: "kt-04", category: "Kitchen", title: "Island Detail", meta: "Layered neutrals and integrated lighting", bucket: "kitchen", slug: "kt-04", alt: "Kitchen island and living space render", aspect: "wide" },
  { id: "bed-01", category: "Bedroom", title: "Primary Suite", meta: "Warm millwork · terrace light", bucket: "bedrooms", slug: "bed-01", alt: "Primary bedroom concept with warm millwork and terrace access", aspect: "wide" },
  { id: "unitb", category: "Unit B", title: "Second Residence", meta: "Independent living with refined finishes", bucket: "adu", slug: "adu-01", alt: "Unit B interior render", aspect: "wide" },
];
