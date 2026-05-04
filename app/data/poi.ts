import { PROPERTY } from "./property";

export type PoiCategory =
  | "beaches"
  | "dining"
  | "shopping"
  | "outdoors"
  | "schools"
  | "transport"
  | "resorts"
  | "culture";

export type Poi = {
  id: string;
  name: string;
  category: PoiCategory;
  blurb: string;
  coords: [number, number];
  address: string;
  url?: string;
};

export const categoryLabels: Record<PoiCategory, string> = {
  beaches: "Beaches",
  dining: "Dining",
  shopping: "Shopping",
  outdoors: "Outdoors",
  schools: "Schools",
  transport: "Transport",
  resorts: "Resorts",
  culture: "Culture",
};

export const categoryColors: Record<PoiCategory, string> = {
  beaches: "#2C4A55",
  dining: "#A85A2F",
  shopping: "#7E5D8B",
  outdoors: "#6B7F66",
  schools: "#5A6F8C",
  transport: "#8C6F4C",
  resorts: "#9B6B43",
  culture: "#5C4F6B",
};

export const propertyMarker = PROPERTY;

export const pois: Poi[] = [
  // Beaches & coastline
  { id: "little-corona", name: "Little Corona Beach", category: "beaches", blurb: "Cove for tidepools, snorkeling, and glassy mornings.", coords: [-117.8669, 33.5935], address: "Ocean Blvd & Poppy Ave, Corona del Mar" },
  { id: "big-corona", name: "Corona del Mar State Beach", category: "beaches", blurb: "Wide sand, volleyball, jetty views, and bonfire evenings.", coords: [-117.8813, 33.5939], address: "3001 Ocean Blvd, Corona del Mar" },
  { id: "pirates-cove", name: "Pirates Cove", category: "beaches", blurb: "Sheltered harbor-side sand below Lookout Point.", coords: [-117.8839, 33.5959], address: "Ocean Blvd, Corona del Mar" },
  { id: "china-cove", name: "China Cove", category: "beaches", blurb: "Quiet pocket beach wrapped by harbor-front homes.", coords: [-117.8848, 33.5984], address: "Cove St, Corona del Mar" },
  { id: "inspiration-point", name: "Inspiration Point", category: "beaches", blurb: "Village overlook for sunsets and whitewater coastline.", coords: [-117.8726, 33.5945], address: "Ocean Blvd & Orchid Ave, Corona del Mar" },
  { id: "lookout-point", name: "Lookout Point", category: "beaches", blurb: "Dramatic bluff pause above the harbor mouth.", coords: [-117.8834, 33.5966], address: "Ocean Blvd, Corona del Mar" },
  { id: "crystal-cove-beach", name: "Crystal Cove State Beach", category: "beaches", blurb: "Historic cottages, long sand, and protected tidepools.", coords: [-117.8431, 33.5737], address: "8471 N Coast Hwy, Newport Coast" },
  { id: "wedge", name: "The Wedge", category: "beaches", blurb: "Newport's iconic body-surfing break at the jetty.", coords: [-117.8834, 33.5925], address: "E Ocean Front, Newport Beach" },

  // Dining
  { id: "port", name: "Port Restaurant & Bar", category: "dining", blurb: "Mediterranean plates and live music directly across Heliotrope.", coords: [-117.8738, 33.5993], address: "440 Heliotrope Ave, Corona del Mar" },
  { id: "quiet-woman", name: "The Quiet Woman", category: "dining", blurb: "A CdM institution for polished dinners and late evenings.", coords: [-117.8736, 33.5998], address: "3224 E Pacific Coast Hwy, Corona del Mar" },
  { id: "bandera", name: "Bandera", category: "dining", blurb: "Wood-fired American cooking and a neighborhood bar feel.", coords: [-117.8724, 33.6004], address: "3201 E Pacific Coast Hwy, Corona del Mar" },
  { id: "zinc", name: "Zinc Cafe & Market", category: "dining", blurb: "Coffee, market lunches, and a courtyard rhythm.", coords: [-117.8727, 33.6000], address: "3222 E Coast Hwy, Corona del Mar" },
  { id: "cdm-restaurant", name: "CdM Restaurant", category: "dining", blurb: "Refined local dining with a lively village room.", coords: [-117.8722, 33.6007], address: "2325 E Coast Hwy, Corona del Mar" },
  { id: "a-restaurant", name: "A Restaurant Crystal Cove", category: "dining", blurb: "Steaks, cocktails, and coastal room energy north of the village.", coords: [-117.8502, 33.5809], address: "7864 E Coast Hwy, Newport Coast" },
  { id: "farmhouse", name: "Farmhouse at Roger's Gardens", category: "dining", blurb: "Garden dining with produce-forward California cooking.", coords: [-117.8664, 33.6138], address: "2301 San Joaquin Hills Rd, Corona del Mar" },

  // Shopping & daily
  { id: "fashion-island", name: "Fashion Island", category: "shopping", blurb: "Open-air shopping, restaurants, and daily conveniences.", coords: [-117.8734, 33.6164], address: "401 Newport Center Dr, Newport Beach" },
  { id: "village-shops", name: "Corona del Mar Village", category: "shopping", blurb: "Boutique retail and walkable village storefronts.", coords: [-117.8723, 33.6000], address: "E Coast Hwy, Corona del Mar" },
  { id: "rogers-gardens", name: "Roger's Gardens", category: "shopping", blurb: "Beloved garden, home, and lifestyle destination.", coords: [-117.8664, 33.6138], address: "2301 San Joaquin Hills Rd, Corona del Mar" },
  { id: "pavilions", name: "Pavilions Market", category: "shopping", blurb: "Full-service grocery a few blocks from Heliotrope.", coords: [-117.8773, 33.5995], address: "3825 E Coast Hwy, Corona del Mar" },
  { id: "trader-joes", name: "Trader Joe's Newport Beach", category: "shopping", blurb: "Daily groceries and pantry staples nearby.", coords: [-117.8748, 33.6147], address: "1101 Newport Center Dr, Newport Beach" },

  // Outdoors & trails
  { id: "buck-gully", name: "Buck Gully Reserve", category: "outdoors", blurb: "Native canyon trail tucked behind Corona del Mar.", coords: [-117.8589, 33.6056], address: "5th Ave & Poppy Ave, Corona del Mar" },
  { id: "crystal-cove-trails", name: "Crystal Cove Trails", category: "outdoors", blurb: "Backcountry ridgelines rising above the Pacific.", coords: [-117.8174, 33.5864], address: "Crystal Cove State Park, Newport Coast" },
  { id: "upper-bay", name: "Upper Newport Bay", category: "outdoors", blurb: "Birding, paddling, and long estuary loops.", coords: [-117.8861, 33.6475], address: "2301 University Dr, Newport Beach" },
  { id: "sherman", name: "Sherman Library & Gardens", category: "outdoors", blurb: "Botanical gardens and quiet courtyards in the village.", coords: [-117.8732, 33.5991], address: "2647 E Coast Hwy, Corona del Mar" },

  // Schools
  { id: "harbor-view-elem", name: "Harbor View Elementary", category: "schools", blurb: "Walkable Newport-Mesa USD elementary serving CdM.", coords: [-117.8635, 33.6065], address: "900 Goldenrod Ave, Corona del Mar" },
  { id: "cdm-middle-high", name: "Corona del Mar Middle / High", category: "schools", blurb: "Top-ranked Newport-Mesa middle and high school campus.", coords: [-117.8568, 33.6082], address: "2101 Eastbluff Dr, Newport Beach" },
  { id: "sage-hill", name: "Sage Hill School", category: "schools", blurb: "Independent college-prep on the Newport Coast hills.", coords: [-117.8275, 33.6013], address: "20402 Newport Coast Dr, Newport Coast" },
  { id: "ocean-view", name: "Our Lady Queen of Angels", category: "schools", blurb: "Established K-8 Catholic school in the village.", coords: [-117.8761, 33.6028], address: "2046 Mar Vista Dr, Newport Beach" },

  // Transport & access
  { id: "john-wayne", name: "John Wayne Airport (SNA)", category: "transport", blurb: "Orange County's primary airport, a short drive inland.", coords: [-117.8682, 33.6757], address: "18601 Airport Way, Santa Ana" },
  { id: "pch-village", name: "Pacific Coast Highway (Village)", category: "transport", blurb: "Coastal artery linking CdM to Laguna and Newport Beach.", coords: [-117.8728, 33.6002], address: "E Coast Hwy at Heliotrope, Corona del Mar" },
  { id: "i-405", name: "405 / 73 Toll Road Access", category: "transport", blurb: "Quick connection to the regional freeway grid via Jamboree.", coords: [-117.8581, 33.6420], address: "Jamboree Rd & Bison Ave, Newport Beach" },
  { id: "balboa-ferry", name: "Balboa Island Ferry", category: "transport", blurb: "Three-car ferry connecting the peninsula to Balboa Island.", coords: [-117.8975, 33.6029], address: "410 S Bay Front, Balboa Island" },

  // Resorts
  { id: "pelican-hill", name: "Resort at Pelican Hill", category: "resorts", blurb: "Terraced Pacific views, golf, spa, and destination dining.", coords: [-117.8467, 33.5871], address: "22701 Pelican Hill Rd S, Newport Coast" },
  { id: "balboa-bay", name: "Balboa Bay Resort", category: "resorts", blurb: "Harborfront resort life with boats moving past breakfast.", coords: [-117.9093, 33.6157], address: "1221 W Coast Hwy, Newport Beach" },
  { id: "vea", name: "VEA Newport Beach", category: "resorts", blurb: "Modern resort base beside Fashion Island and the coast.", coords: [-117.8758, 33.6173], address: "900 Newport Center Dr, Newport Beach" },
  { id: "lido-house", name: "Lido House", category: "resorts", blurb: "Boutique hotel energy near Lido Marina Village.", coords: [-117.9295, 33.6176], address: "3300 Newport Blvd, Newport Beach" },

  // Culture & community
  { id: "ocma", name: "Orange County Museum of Art", category: "culture", blurb: "Contemporary art in a striking new Segerstrom campus.", coords: [-117.8827, 33.6913], address: "3333 Avenue of the Arts, Costa Mesa" },
  { id: "balboa-fun-zone", name: "Balboa Fun Zone", category: "culture", blurb: "Ferry, harbor cruises, arcade nostalgia, and waterfront walks.", coords: [-117.8998, 33.6022], address: "600 E Bay Ave, Newport Beach" },
  { id: "newport-harbor", name: "Newport Harbor", category: "culture", blurb: "Duffy boats, yacht clubs, holiday lights, and harbor culture.", coords: [-117.9007, 33.6086], address: "Newport Harbor, Newport Beach" },
];

export function googleMapsUrl(poi: Poi) {
  if (poi.url) return poi.url;
  const query = encodeURIComponent(`${poi.name}, ${poi.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
