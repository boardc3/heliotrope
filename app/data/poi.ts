import { PROPERTY } from "./property";

export type PoiCategory = "beaches" | "resorts" | "dining" | "outdoors" | "culture";

export type Poi = {
  id: string;
  name: string;
  category: PoiCategory;
  blurb: string;
  coords: [number, number];
  address: string;
};

export const categoryLabels: Record<PoiCategory, string> = {
  beaches: "Beaches",
  resorts: "Resorts",
  dining: "Dining",
  outdoors: "Trails",
  culture: "Culture",
};

export const categoryColors: Record<PoiCategory, string> = {
  beaches: "#2D5566",
  resorts: "#9B6B43",
  dining: "#B8693C",
  outdoors: "#6B7F66",
  culture: "#7E5D8B",
};

export const propertyMarker = PROPERTY;

export const pois: Poi[] = [
  { id: "little-corona", name: "Little Corona Beach", category: "beaches", blurb: "A cove for tidepools, snorkeling, and glassy early mornings.", coords: [-117.8669, 33.5935], address: "Ocean Blvd & Poppy Ave" },
  { id: "big-corona", name: "Corona del Mar State Beach", category: "beaches", blurb: "Wide sand, volleyball, jetty views, and bonfire evenings.", coords: [-117.8813, 33.5939], address: "3001 Ocean Blvd" },
  { id: "pirates-cove", name: "Pirates Cove", category: "beaches", blurb: "Sheltered harbor-side sand below Lookout Point.", coords: [-117.8839, 33.5959], address: "Ocean Blvd" },
  { id: "china-cove", name: "China Cove", category: "beaches", blurb: "Quiet pocket beach wrapped by harbor-front homes.", coords: [-117.8848, 33.5984], address: "Cove St" },
  { id: "inspiration-point", name: "Inspiration Point", category: "beaches", blurb: "The village overlook for sunsets and whitewater coastline.", coords: [-117.8726, 33.5945], address: "Ocean Blvd" },
  { id: "lookout-point", name: "Lookout Point", category: "beaches", blurb: "A dramatic bluff pause above the harbor mouth.", coords: [-117.8834, 33.5966], address: "Ocean Blvd" },
  { id: "crystal-cove", name: "Crystal Cove State Beach", category: "beaches", blurb: "Historic cottages, long sand, and protected tidepools up the coast.", coords: [-117.8431, 33.5737], address: "8471 N Coast Hwy" },
  { id: "balboa-pier", name: "Balboa Pier", category: "beaches", blurb: "Classic Newport beach day with the Fun Zone nearby.", coords: [-117.9009, 33.6007], address: "1 Balboa Pier" },
  { id: "newport-pier", name: "Newport Pier", category: "beaches", blurb: "Surf, boardwalk energy, and fish-market mornings.", coords: [-117.9287, 33.6074], address: "70 Newport Pier" },
  { id: "wedge", name: "The Wedge", category: "beaches", blurb: "Newport's iconic body-surfing break at the jetty.", coords: [-117.8834, 33.5925], address: "E Ocean Front" },
  { id: "pelican-hill", name: "Resort at Pelican Hill", category: "resorts", blurb: "Terraced Pacific views, golf, spa, and destination dining.", coords: [-117.8467, 33.5871], address: "22701 Pelican Hill Rd S" },
  { id: "balboa-bay", name: "Balboa Bay Resort", category: "resorts", blurb: "Harborfront resort life with boats moving past breakfast.", coords: [-117.9093, 33.6157], address: "1221 W Coast Hwy" },
  { id: "vea", name: "VEA Newport Beach", category: "resorts", blurb: "Modern resort base beside Fashion Island and the coast.", coords: [-117.8758, 33.6173], address: "900 Newport Center Dr" },
  { id: "lido-house", name: "Lido House", category: "resorts", blurb: "Boutique hotel energy near Lido Marina Village.", coords: [-117.9295, 33.6176], address: "3300 Newport Blvd" },
  { id: "port", name: "Port Restaurant & Bar", category: "dining", blurb: "Mediterranean plates and live music directly across Heliotrope.", coords: [-117.8738, 33.5993], address: "440 Heliotrope Ave" },
  { id: "quiet-woman", name: "The Quiet Woman", category: "dining", blurb: "A CdM institution for polished dinners and late evenings.", coords: [-117.8736, 33.5998], address: "3224 Pacific Coast Hwy" },
  { id: "bandera", name: "Bandera", category: "dining", blurb: "Wood-fired American cooking and a neighborhood bar feel.", coords: [-117.8724, 33.6004], address: "3201 Pacific Coast Hwy" },
  { id: "zinc", name: "Zinc Cafe & Market", category: "dining", blurb: "Coffee, market lunches, and a courtyard rhythm.", coords: [-117.8727, 33.6000], address: "3222 East Coast Hwy" },
  { id: "cdm-restaurant", name: "CdM Restaurant", category: "dining", blurb: "Refined local dining with a lively village room.", coords: [-117.8722, 33.6007], address: "2325 East Coast Hwy" },
  { id: "a-restaurant", name: "A Crystal Cove", category: "dining", blurb: "Steaks, cocktails, and coastal room energy north of the village.", coords: [-117.8502, 33.5809], address: "7864 East Coast Hwy" },
  { id: "farmhouse", name: "Farmhouse at Roger's Gardens", category: "dining", blurb: "Garden dining with produce-forward California cooking.", coords: [-117.8664, 33.6138], address: "2301 San Joaquin Hills Rd" },
  { id: "bear-flag", name: "Bear Flag Fish Co.", category: "dining", blurb: "Fresh fish tacos, poke, and casual Newport energy.", coords: [-117.9027, 33.6156], address: "3421 Via Lido" },
  { id: "sherman", name: "Sherman Library & Gardens", category: "outdoors", blurb: "Botanical gardens and quiet courtyards in the village.", coords: [-117.8732, 33.5991], address: "2647 East Coast Hwy" },
  { id: "buck-gully", name: "Buck Gully Reserve", category: "outdoors", blurb: "A native canyon trail tucked behind Corona del Mar.", coords: [-117.8589, 33.6056], address: "5th Ave & Poppy Ave" },
  { id: "crystal-cove-trails", name: "Crystal Cove Trails", category: "outdoors", blurb: "Backcountry ridgelines rising above the Pacific.", coords: [-117.8174, 33.5864], address: "8471 N Coast Hwy" },
  { id: "upper-bay", name: "Upper Newport Bay", category: "outdoors", blurb: "Birding, paddling, and long estuary loops.", coords: [-117.8861, 33.6475], address: "2301 University Dr" },
  { id: "fashion-island", name: "Fashion Island", category: "outdoors", blurb: "Open-air shopping, restaurants, and daily conveniences.", coords: [-117.8734, 33.6164], address: "401 Newport Center Dr" },
  { id: "ocma", name: "Orange County Museum of Art", category: "culture", blurb: "Contemporary art in a striking new Segerstrom campus.", coords: [-117.8827, 33.6913], address: "3333 Avenue of the Arts" },
  { id: "balboa-fun-zone", name: "Balboa Fun Zone", category: "culture", blurb: "Ferry, harbor cruises, arcade nostalgia, and waterfront walks.", coords: [-117.8998, 33.6022], address: "600 E Bay Ave" },
  { id: "newport-harbor", name: "Newport Harbor", category: "culture", blurb: "Duffy boats, yacht clubs, holiday lights, and harbor culture.", coords: [-117.9007, 33.6086], address: "Newport Harbor" },
];
