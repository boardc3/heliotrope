export type GalleryCategory = "Exterior" | "Unit A" | "Kitchen" | "Dining" | "Unit B" | "Aerial" | "Lifestyle";

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

export const filters = ["All", "Exterior", "Unit A", "Kitchen", "Dining", "Unit B", "Aerial", "Lifestyle"] as const;

export const galleryItems: GalleryItem[] = [
  { id: "ext-existing", category: "Exterior", title: "Village Elevation", meta: "Existing street presence", bucket: "exterior", slug: "ext-01", alt: "Existing exterior at 437 Heliotrope Avenue", aspect: "wide" },
  { id: "ext-after", category: "Exterior", title: "Reimagined Facade", meta: "Clean coastal duplex concept", bucket: "exterior", slug: "ext-02", alt: "Reimagined exterior concept at 437 Heliotrope Avenue", aspect: "wide" },
  { id: "gr-01", category: "Unit A", title: "Great Room Study", meta: "White oak · plaster · soft daylight", bucket: "great-room", slug: "gr-01", alt: "Unit A open great room render", aspect: "wide" },
  { id: "gr-02", category: "Unit A", title: "Dining Axis", meta: "Connected living, dining, and kitchen", bucket: "great-room", slug: "gr-02", alt: "Open dining and living room render", aspect: "wide" },
  { id: "kt-03", category: "Kitchen", title: "Chef's Kitchen", meta: "Stone counters · warm millwork", bucket: "kitchen", slug: "kt-03", alt: "Unit A kitchen render with stone island", aspect: "wide" },
  { id: "kt-04", category: "Kitchen", title: "Island Detail", meta: "Layered neutrals and integrated lighting", bucket: "kitchen", slug: "kt-04", alt: "Kitchen island and living space render", aspect: "wide" },
  { id: "dn-05", category: "Dining", title: "Gathering Room", meta: "Village-scale entertaining", bucket: "dining", slug: "dn-05", alt: "Dining and great room render", aspect: "wide" },
  { id: "dn-06", category: "Dining", title: "Evening Plan", meta: "Open plan with warm material palette", bucket: "dining", slug: "dn-06", alt: "Warm open living and dining concept render", aspect: "wide" },
  { id: "unitb", category: "Unit B", title: "Second Residence", meta: "Independent living with refined finishes", bucket: "adu", slug: "adu-01", alt: "Unit B interior render", aspect: "wide" },
  { id: "still-hero-01", category: "Lifestyle", title: "Arrival Sequence", meta: "Cinematic hero still", bucket: "stills", slug: "hero-01", alt: "Cinematic still from the 437 Heliotrope hero film", aspect: "wide" },
  { id: "still-hero-02", category: "Lifestyle", title: "Material Mood", meta: "Soft movement and coastal light", bucket: "stills", slug: "hero-02", alt: "Second cinematic still from the hero film", aspect: "wide" },
  { id: "still-hero-03", category: "Lifestyle", title: "Village Light", meta: "Editorial still", bucket: "stills", slug: "hero-03", alt: "Third cinematic still from the hero film", aspect: "wide" },
  { id: "still-aerial-01", category: "Aerial", title: "Above CdM", meta: "Village, harbor, coast", bucket: "stills", slug: "aerial-01", alt: "Aerial still over Corona del Mar", aspect: "wide" },
  { id: "still-aerial-02", category: "Aerial", title: "Harbor Context", meta: "Newport Harbor proximity", bucket: "stills", slug: "aerial-02", alt: "Drone still showing harbor context", aspect: "wide" },
  { id: "still-village-01", category: "Aerial", title: "Village Grid", meta: "Heliotrope near the coast", bucket: "stills", slug: "village-01", alt: "Aerial still of Corona del Mar village", aspect: "wide" },
  { id: "clip-01", category: "Lifestyle", title: "Light Study I", meta: "Interior motion still", bucket: "stills", slug: "clip-01-01", alt: "Interior lifestyle clip still", aspect: "portrait" },
  { id: "clip-02", category: "Lifestyle", title: "Threshold", meta: "Interior motion still", bucket: "stills", slug: "clip-02-01", alt: "Second interior lifestyle clip still", aspect: "portrait" },
  { id: "clip-05", category: "Lifestyle", title: "Quiet Object", meta: "Unit B motion still", bucket: "stills", slug: "clip-05-01", alt: "Unit B lifestyle clip still", aspect: "portrait" },
];
