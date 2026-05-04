export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://437heliotrope.com").replace(/\/$/, "");
export const SITE_NAME = "437 Heliotrope — Corona del Mar Duplex";
export const ADDRESS = "437 Heliotrope Avenue, Corona del Mar, CA 92625";
export const SHORT_ADDRESS = "437 Heliotrope";

export const PROPERTY = {
  name: SHORT_ADDRESS,
  address: ADDRESS,
  street: "437 Heliotrope Avenue",
  city: "Corona del Mar",
  region: "CA",
  postalCode: "92625",
  coords: [-117.87372, 33.59908] as [number, number],
  bedrooms: 4,
  bathrooms: 3,
  livingArea: 2499,
  totalArea: 3485,
  lotAcres: 0.08,
  propertyType: "Duplex",
  mls: "LG25048387",
  salePrice: "$3,300,000",
};

export const snapshotStats = [
  { label: "Living area", value: "2,499 SF", sub: "two-residence coastal compound", numeric: 2499, format: "int" },
  { label: "Total area", value: "3,485 SF", sub: "including enclosed and support spaces", numeric: 3485, format: "int" },
  { label: "Residences", value: "2", sub: "Unit A + Unit B flexibility", numeric: 2, format: "int" },
  { label: "Bedrooms", value: "4", sub: "across the duplex program", numeric: 4, format: "int" },
  { label: "Baths", value: "3", sub: "updated layout potential", numeric: 3, format: "int" },
  { label: "Village blocks", value: "1", sub: "to PCH dining and daily rituals", numeric: 1, format: "int" },
] as const;
