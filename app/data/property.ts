export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://437heliotrope.com").replace(/\/$/, "");
export const SITE_NAME = "437 Heliotrope — Corona del Mar Connected Condos";
export const ADDRESS = "437 Heliotrope Avenue, Corona del Mar, CA 92625";
export const SHORT_ADDRESS = "437 Heliotrope";

export const UNITS = [
  {
    id: "a",
    label: "Unit A",
    position: "Front Unit",
    bedrooms: 3,
    fullBaths: 2,
    powderRooms: 1,
    habitableSqFt: 1913,
    layout: "The master suite and two additional bedrooms are located on the Second Floor.",
    description: "The larger primary residence at the front of the lot.",
  },
  {
    id: "b",
    label: "Unit B",
    position: "Rear Unit",
    bedrooms: 2,
    fullBaths: 2,
    powderRooms: 1,
    habitableSqFt: 1206,
    layout: "Both bedrooms are located on the Second Floor.",
    description: "A substantial carriage-style condo in the rear.",
  },
] as const;

export const PROPERTY = {
  name: SHORT_ADDRESS,
  address: ADDRESS,
  street: "437 Heliotrope Avenue",
  city: "Corona del Mar",
  region: "CA",
  postalCode: "92625",
  coords: [-117.87372, 33.59908] as [number, number],
  bedrooms: 5,
  bathrooms: 6,
  fullBathrooms: 4,
  powderRooms: 2,
  bathroomSummary: "4 full + 2 powder",
  habitableArea: 3119,
  lotSqFt: 3540,
  lotAcres: 3540 / 43560,
  propertyType: "Two Connected Condos",
  propertyTypeShort: "Connected Condos",
  mls: "LG25048387",
  salePrice: "$3,300,000",
  completion: "Buyer package ready",
};

export const snapshotStats = [
  {
    label: "Habitable area",
    value: "3,119 SF",
    sub: "Unit A 1,913 · Unit B 1,206",
    numeric: 3119,
    format: "int",
  },
  {
    label: "Unit A",
    value: "1,913 SF",
    sub: "Front condo · 3 bed · 2 full + powder",
    numeric: 1913,
    format: "int",
  },
  {
    label: "Unit B",
    value: "1,206 SF",
    sub: "Rear condo · 2 bed · 2 full + powder",
    numeric: 1206,
    format: "int",
  },
  {
    label: "Condos",
    value: "2",
    sub: "connected, sold separately",
    numeric: 2,
    format: "int",
  },
  {
    label: "Bedrooms",
    value: "5",
    sub: "3 in Unit A · 2 in Unit B",
    numeric: 5,
    format: "int",
  },
  {
    label: "Baths",
    value: "6",
    sub: "4 full bathrooms · 2 powder rooms",
    numeric: 6,
    format: "int",
  },
  {
    label: "Lot",
    value: "3,540 SF",
    sub: "Corona del Mar village grid",
    numeric: 3540,
    format: "int",
  },
  {
    label: "List price",
    value: "3.3",
    sub: "$3,300,000 asking price",
    numeric: 3.3,
    format: "decimal",
  },
] as const;

export function formatUnitBaths(fullBaths: number, powderRooms: number) {
  const powder = powderRooms === 1 ? "1 powder room" : `${powderRooms} powder rooms`;
  return `${fullBaths} full bath${fullBaths === 1 ? "" : "s"}, ${powder}`;
}
