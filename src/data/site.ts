/* ------------------------------------------------------------------ */
/*  Saifi Interior & Furniture — central content                      */
/*  All business details preserved from the genuine existing website. */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://saifiinteriorfurniturepremium.vercel.app/";

export const BUSINESS = {
  name: "Saifi Interior & Furniture",
  founder: "Javed Saifi",
  city: "Muzaffarnagar",
  state: "Uttar Pradesh",
  whatsappDisplay: "+91 92866 82287",
  whatsappNumber: "919286682287",
  callDisplay: "+91 91490 14275",
  callNumber: "+919149014275",
  shortIntro:
    "Custom kitchens, bedrooms, wardrobes, TV panels, wooden furniture, wall paneling and ceiling work — made to fit the space and the customer's vision.",
};

export const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const WA_DEFAULT = waLink(
  "Hello Saifi Interior & Furniture, I would like to discuss an interior / furniture requirement."
);

export const TEL_LINK = `tel:${BUSINESS.callNumber}`;

/* Pexels helper — request compressed, correctly-sized crops from the CDN */
export const px = (
  id: number,
  w: number,
  h: number,
  ext: "jpeg" | "png" = "jpeg"
) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export interface ServiceDetail {
  id: string;
  index: string;
  title: string;
  short: string;
  imgId: number;
  alt: string;
  description: string;
  materials: string[];
  finishes: string[];
  customOptions: string[];
  useCases: string[];
  styles: string[];
  dimensions: string;
  maintenance: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    id: "kitchen",
    index: "01",
    title: "Kitchen",
    short: "Wooden & modular-style kitchen solutions.",
    imgId: 3847520,
    alt: "Modern kitchen with sleek wooden cabinets and built-in appliances — reference photograph",
    description:
      "A kitchen planned around how you actually cook — correct counter height, logical work triangle, storage for every vessel and appliance, and shutters that survive daily Indian cooking. Built at your site or workshop-finished, as the project demands.",
    materials: [
      "BWP / BWR grade plywood carcass (boiling-water resistant)",
      "HDHMR or MDF shutters for painted & membrane finishes",
      "Branded soft-close hinges, tandem channels & basket hardware",
      "Granite / quartz countertop coordination as per selection",
    ],
    finishes: [
      "Premium 1mm decorative laminates",
      "Acrylic high-gloss & super-matt shutters",
      "PU / Duco spray finish",
      "Membrane (foil-pressed) shutters",
    ],
    customOptions: [
      "Tall units, pantry & appliance garages",
      "Cutlery / thali / spice organizers",
      "Corner solutions — carousel, S-corner, magic corner",
      "Chimney ducting & hob-sink positioning on site",
    ],
    useCases: [
      "New home kitchens",
      "Old kitchen renovation & remodelling",
      "Compact kitchens for flats & rentals",
    ],
    styles: ["L-shape", "Parallel", "Straight", "U-shape", "Island (space permitting)"],
    dimensions:
      "Typical counter height 860–910 mm, worktop depth ~600 mm, wall-unit depth 300–350 mm — finalised to the cook's height and site measurements.",
    maintenance:
      "Wipe laminate/acrylic with a soft damp cloth; avoid standing water at sink joints; clean hardware channels yearly for smooth movement.",
  },
  {
    id: "bedroom",
    index: "02",
    title: "Bedroom",
    short: "Complete bedroom furniture & wall design.",
    imgId: 7587809,
    alt: "Bedroom with warm wooden cabinetry and soft natural light — reference photograph",
    description:
      "A complete bedroom scheme — bed with storage, headboard wall, side tables, dressing and study corners — designed as one composition instead of mismatched pieces, and made to the room's exact dimensions.",
    materials: [
      "BWR plywood & hardwood frames for beds",
      "Heavy-duty hydraulic storage mechanisms",
      "Branded hinges, channels and fittings",
      "PU foam & fabric/leatherette headboard cushioning on request",
    ],
    finishes: [
      "Laminate & textured woodgrain shutters",
      "Veneer with melamine / PU polish",
      "Duco & PU painted panels",
      "Fabric / leatherette upholstered panels",
    ],
    customOptions: [
      "Hydraulic bed storage & box storage",
      "Headboard paneling with cove lighting",
      "Dressing unit with mirror & task lighting",
      "Study table + bookshelf combinations",
    ],
    useCases: [
      "Master bedrooms",
      "Children's rooms with study corners",
      "Guest rooms with compact storage beds",
    ],
    styles: ["Platform bed", "Box bed", "Upholstered headboard", "Panelled feature wall"],
    dimensions:
      "Beds made for standard mattress sizes — 60×78, 72×78, 72×75 in. — or fully custom sizes for non-standard rooms.",
    maintenance:
      "Vacuum upholstered panels; wipe wooden surfaces dry; service hydraulic lifts once a year.",
  },
  {
    id: "wardrobe",
    index: "03",
    title: "Almirah & Wardrobe",
    short: "Custom storage made for your room.",
    imgId: 6489100,
    alt: "Spacious bedroom with large built-in wardrobe — reference photograph",
    description:
      "Wardrobes engineered around your clothes, not catalogue sizes — hanging zones, drawer stacks, saree shelves, lockable lockers and lofts that use the full wall height, floor to ceiling.",
    materials: [
      "BWR plywood carcass with edge-banded shutters",
      "Smooth sliding systems with soft-stop",
      "Branded drawer channels & hanger rails",
      "5mm mirrors, tinted & fluted glass options",
    ],
    finishes: [
      "Laminate — solid, woodgrain & fabric textures",
      "Acrylic & high-gloss fronts",
      "Mirror & glass shutter combinations",
      "PU / Duco painted shutters",
    ],
    customOptions: [
      "Sliding or hinged door systems",
      "Loft storage up to the ceiling",
      "Internal drawers, lockers & jewellery trays",
      "Dresser & study integration",
    ],
    useCases: [
      "Bedroom wardrobes",
      "Hall & passage storage",
      "Under-stair and niche storage",
    ],
    styles: ["Sliding", "Swing-door", "Walk-in layout", "Lofted full-height"],
    dimensions:
      "Standard depth 550–600 mm for hangers; 400–450 mm for shelf-only units. Height & width built to site measurement.",
    maintenance:
      "Keep sliding tracks dust-free; don't overload drawers beyond rated capacity; wipe mirrors with glass cleaner only.",
  },
  {
    id: "tv-panel",
    index: "04",
    title: "LCD / TV Panel",
    short: "Modern media walls & TV units.",
    imgId: 6585766,
    alt: "Television mounted on wooden panelled wall in modern living room — reference photograph",
    description:
      "A media wall that frames your TV like architecture — panelled backdrops, floating consoles, concealed wiring and balanced lighting, proportioned to your wall and screen size.",
    materials: [
      "Plywood & HDHMR substrate on treated battens",
      "Fluted / louvre panel sections",
      "Floating consoles on concealed metal brackets",
      "Cable-management raceways & ventilation gaps",
    ],
    finishes: [
      "Woodgrain laminates & real veneer polish",
      "Fluted panels in PU / Duco paint",
      "Stone & marble-look surfaces",
      "Backlit fabric & tinted-glass inserts",
    ],
    customOptions: [
      "Concealed wiring for TV, soundbar & set-top box",
      "LED strip backlighting with warm/neutral tones",
      "Display niches & artefact shelves",
      "Floating drawer or open-shelf consoles",
    ],
    useCases: [
      "Living room media walls",
      "Bedroom TV walls",
      "Lounge & lobby feature walls",
    ],
    styles: ["Panelled + console", "Stone + louvre mix", "Minimal floating", "Full-wall composition"],
    dimensions:
      "Composed for 43\"–75\" screens; console depth typically 300–380 mm. Viewing height set so the screen centre sits near seated eye level.",
    maintenance:
      "Dust louvres with a soft brush; keep LED drivers accessible; wipe high-gloss panels with microfibre only.",
  },
  {
    id: "paneling",
    index: "05",
    title: "Wooden Paneling",
    short: "Feature walls and decorative woodwork.",
    imgId: 6908567,
    alt: "Dining room with wood accent wall and contemporary lighting — reference photograph",
    description:
      "Decorative woodwork that gives a plain wall depth and warmth — fluted panels, louvres, veneer compositions, dado and headboard walls, entrance features and ceiling-to-floor compositions.",
    materials: [
      "Treated wooden batten framework",
      "Plywood / HDHMR base panels",
      "Natural & reconstituted veneers",
      "MDF fluted & louvre sections",
    ],
    finishes: [
      "Veneer with melamine / PU polish",
      "Duco & PU paint in any shade",
      "Laminate woodgrains",
      "Combination with stone, fabric & metal trims",
    ],
    customOptions: [
      "Concealed LED cove lighting",
      "Profile-groove patterns",
      "Brass / SS inlay trims",
      "Acoustic fabric panels for media rooms",
    ],
    useCases: [
      "Living room feature walls",
      "Bed-back & headboard paneling",
      "Entrance & foyer walls",
      "Mandir / pooja wall backdrops",
    ],
    styles: ["Vertical louvres", "Fluted panels", "Veneer grids", "Mixed-material compositions"],
    dimensions:
      "Fully site-measured; typical panel modules 150–600 mm wide, composed to the wall's width and ceiling height.",
    maintenance:
      "Dry-dust regularly; polish veneer once in 1–2 years; keep away from direct water seepage.",
  },
  {
    id: "ceiling",
    index: "06",
    title: "PVC / False Ceiling",
    short: "Clean ceiling concepts and finishing.",
    imgId: 31735047,
    alt: "Modern ceiling with recessed lighting and clean lines — reference photograph",
    description:
      "Ceilings that finish a room — PVC panels for quick, clean coverage, and gypsum / grid false ceilings with cove lighting planned around your fan, AC and light points.",
    materials: [
      "PVC ceiling & wall panels (termite-proof, moisture-safe)",
      "GI framework with gypsum boards",
      "Aluminium T-grid systems for shops & offices",
      "COB / strip lighting & profile channels",
    ],
    finishes: [
      "PVC — wood, marble & plain prints",
      "Gypsum with paint in any shade",
      "Cove, recessed & profile lighting",
      "Peripheral & floating raft designs",
    ],
    customOptions: [
      "Cove lighting in warm / neutral / RGB",
      "Fan, chandelier & AC cut-out planning",
      "Layered / stepped ceiling designs",
      "2×2 grid ceilings for commercial spaces",
    ],
    useCases: [
      "Bedroom & living room ceilings",
      "Kitchens & bathrooms (PVC — moisture safe)",
      "Shops, clinics & office halls",
    ],
    styles: ["Single-layer peripheral", "Floating raft with cove", "Coffered look", "Commercial grid"],
    dimensions:
      "Typical drop 100–200 mm depending on wiring, AC ducting and beam depth — surveyed on site before design.",
    maintenance:
      "PVC panels wipe clean with a damp cloth; gypsum ceilings need only occasional dusting & repainting along with walls.",
  },
  {
    id: "furniture",
    index: "07",
    title: "Custom Furniture",
    short: "Beds, tables, cabinets, counters & more.",
    imgId: 5711885,
    alt: "Craftsman hand-polishing a wooden furniture piece in a workshop — reference photograph",
    description:
      "One-off furniture made to measure — dining tables, beds, study tables, shoe racks, temple units, counters and more. You bring the idea or a reference photo; it gets built to your size, material and finish.",
    materials: [
      "Seasoned hardwood & plywood construction",
      "Branded hardware & smooth channels",
      "High-density foam & quality upholstery fabric",
      "Toughened glass & stone tops on request",
    ],
    finishes: [
      "Natural polish & wood stains",
      "PU / Duco painted surfaces",
      "Laminate-clad utility pieces",
      "Upholstered seats & headboards",
    ],
    customOptions: [
      "Fully made-to-measure sizing",
      "Built from your reference photo or sketch",
      "Repair & modification of existing furniture",
      "Matching sets — bed, tables & storage",
    ],
    useCases: [
      "Dining & center tables",
      "Study & office tables",
      "Shoe racks, crockery & temple units",
      "Shop & reception counters",
    ],
    styles: ["Modern minimal", "Classic carved", "Mixed-material", "Utility-built"],
    dimensions:
      "Every piece is dimensioned from your site measurement or room plan — no fixed catalogue sizes.",
    maintenance:
      "Coasters under hot/wet items; tighten hardware yearly; re-polish high-use surfaces as needed.",
  },
  {
    id: "commercial",
    index: "08",
    title: "Office / Commercial",
    short: "Furniture and interior furnishing work.",
    imgId: 7511748,
    alt: "Modern office conference room with wooden table and shelving — reference photograph",
    description:
      "Interior and furniture work for shops, offices, clinics and showrooms — reception counters, workstations, cabins, storage and display units that represent your business properly and survive daily commercial use.",
    materials: [
      "Heavy-duty plywood & laminate construction",
      "Commercial-grade hardware & locks",
      "Toughened glass & aluminium profiles",
      "Grid ceilings & commercial lighting",
    ],
    finishes: [
      "Durable laminates & edge banding",
      "Duco / PU painted elements",
      "Glass-partition combinations",
      "Brand-colour accent panels",
    ],
    customOptions: [
      "Workstation & cabin layouts",
      "Reception & billing counters",
      "Display & product shelving",
      "Storage & filing systems",
    ],
    useCases: [
      "Offices & clinics",
      "Retail shops & showrooms",
      "Salons, studios & institutes",
    ],
    styles: ["Corporate", "Retail display", "Clinic clean-line", "Studio creative"],
    dimensions:
      "Layouts planned from your floor plan or site survey; counter heights & workstation clearances per standard ergonomics.",
    maintenance:
      "Commercial laminates are wipe-clean; schedule yearly hardware servicing for high-traffic shutters & drawers.",
  },
];

/* ------------------------------------------------------------------ */
/*  Gallery — clearly labelled reference / inspiration imagery         */
/* ------------------------------------------------------------------ */

export type GalleryCategory =
  | "Kitchen"
  | "Bedroom"
  | "Wardrobe"
  | "TV Panel"
  | "Furniture"
  | "Ceiling"
  | "Commercial";

export interface GalleryItem {
  id: number;
  category: GalleryCategory;
  alt: string;
  credit: string;
}

export const GALLERY: GalleryItem[] = [
  { id: 7018836, category: "Kitchen", alt: "Contemporary kitchen with marble island counter and pendant lamps", credit: "Max Vakhtbovych" },
  { id: 6589100, category: "Wardrobe", alt: "Bedroom with large built-in wardrobe and soft daylight", credit: "Max Vakhtbovych" },
  { id: 8142459, category: "Kitchen", alt: "Modern kitchen with black marble island and warm wooden cabinets", credit: "Max Vakhtbovych" },
  { id: 7018385, category: "Bedroom", alt: "Light bedroom with bedside lamps, mirrors and armchair", credit: "Max Vakhtbovych" },
  { id: 6585764, category: "TV Panel", alt: "TV mounted on wooden panelled wall opposite sofa", credit: "Max Vakhtbovych" },
  { id: 13427392, category: "Ceiling", alt: "Sleek curved ceiling architecture with elongated lighting", credit: "Adrien Olichon" },
  { id: 6903254, category: "Wardrobe", alt: "Wooden cupboard with mirror beside wardrobe in bright bedroom", credit: "Max Vakhtbovych" },
  { id: 8134760, category: "Furniture", alt: "Brown leather sofas on wooden floor in minimal living room", credit: "Max Vakhtbovych" },
  { id: 6436792, category: "Kitchen", alt: "Light kitchen with wooden cupboards and marble counter", credit: "Max Vakhtbovych" },
  { id: 7031721, category: "Bedroom", alt: "Bed with upholstered headboard and warm backlight beside closet", credit: "Max Vakhtbovych" },
  { id: 8089161, category: "TV Panel", alt: "Luxury living room with modern media unit and elegant decor", credit: "Max Vakhtbovych" },
  { id: 7046161, category: "Commercial", alt: "Creative wooden desk with wavy lines in contemporary workspace", credit: "Max Vakhtbovych" },
  { id: 7746472, category: "Furniture", alt: "Warm modern living room with wooden accents and natural light", credit: "Max Vakhtbovych" },
  { id: 15867754, category: "Bedroom", alt: "Cozy bedroom with wooden furniture and warm lighting", credit: "Thới Nam Cao" },
  { id: 7587804, category: "Kitchen", alt: "Kitchen with brick wall, wooden cabinets and natural light", credit: "Max Vakhtbovych" },
  { id: 7166945, category: "Ceiling", alt: "Elegant apartment interior with minimalist ceiling detail", credit: "Max Vakhtbovych" },
  { id: 7214461, category: "TV Panel", alt: "TV with black screen hanging on wood-toned wall in daylight", credit: "Max Vakhtbovych" },
  { id: 7534216, category: "Commercial", alt: "Boardroom with long wooden table and office chairs", credit: "Max Vakhtbovych" },
];

export const GALLERY_FILTERS: ("All" | GalleryCategory)[] = [
  "All",
  "Kitchen",
  "Bedroom",
  "Wardrobe",
  "TV Panel",
  "Furniture",
  "Ceiling",
  "Commercial",
];

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  {
    no: "01",
    title: "Consultation",
    text: "A conversation about your space, needs and budget — on call, WhatsApp or at your site. No obligation.",
  },
  {
    no: "02",
    title: "Site Measurement",
    text: "The team visits your location and records exact dimensions, wall conditions, electrical points and constraints.",
  },
  {
    no: "03",
    title: "Design & Planning",
    text: "Layout, storage planning and style direction — drawings and references you can actually visualise before work begins.",
  },
  {
    no: "04",
    title: "Material Selection",
    text: "Plywood grades, laminates, hardware, polish and lighting — chosen together with clear pricing at each option.",
  },
  {
    no: "05",
    title: "Manufacturing",
    text: "Precision cutting, edge-banding and finishing of components, either at the workshop or your site as the project demands.",
  },
  {
    no: "06",
    title: "Installation",
    text: "Careful on-site fitting — panel alignment, hardware tuning, lighting and clean cable management.",
  },
  {
    no: "07",
    title: "Final Handover",
    text: "A walkthrough of the finished work, finishing checks, care guidance and support for any adjustment.",
  },
];

/* ------------------------------------------------------------------ */
/*  Service areas                                                      */
/* ------------------------------------------------------------------ */

export const AREAS = [
  { name: "Muzaffarnagar", note: "Primary service city", primary: true },
  { name: "Shamli", note: "Regular service", primary: false },
  { name: "Meerut", note: "Regular service", primary: false },
  { name: "Saharanpur", note: "Regular service", primary: false },
  { name: "Bijnor", note: "Regular service", primary: false },
  { name: "Delhi / NCR", note: "On request", primary: false },
];

/* ------------------------------------------------------------------ */
/*  3D configurator options                                            */
/* ------------------------------------------------------------------ */

export interface Finish {
  id: string;
  label: string;
  hex: string;
  roughness: number;
  kind: "wood" | "laminate" | "paint";
  grain?: string;
}

export const WOOD_FINISHES: Finish[] = [
  { id: "oak", label: "Natural Oak", hex: "#c8a06a", grain: "#a87f4e", roughness: 0.62, kind: "wood" },
  { id: "teak", label: "Burma Teak", hex: "#9c683c", grain: "#7c4f2a", roughness: 0.58, kind: "wood" },
  { id: "walnut", label: "Dark Walnut", hex: "#5c3d26", grain: "#412a18", roughness: 0.55, kind: "wood" },
  { id: "wenge", label: "Wenge", hex: "#33241a", grain: "#241811", roughness: 0.52, kind: "wood" },
];

export const LAMINATES: Finish[] = [
  { id: "alpine", label: "Alpine White", hex: "#efece6", roughness: 0.35, kind: "laminate" },
  { id: "sand-lam", label: "Desert Sand", hex: "#cdbba4", roughness: 0.4, kind: "laminate" },
  { id: "graphite", label: "Graphite", hex: "#3c3a38", roughness: 0.42, kind: "laminate" },
  { id: "sage", label: "Sage Green", hex: "#8b9484", roughness: 0.45, kind: "laminate" },
];

export const WALL_COLORS: Finish[] = [
  { id: "ivory-wall", label: "Ivory", hex: "#efe8dc", roughness: 0.9, kind: "paint" },
  { id: "clay", label: "Warm Clay", hex: "#b79878", roughness: 0.9, kind: "paint" },
  { id: "charcoal", label: "Charcoal", hex: "#2c2824", roughness: 0.9, kind: "paint" },
  { id: "olive", label: "Olive Ash", hex: "#6d6a58", roughness: 0.9, kind: "paint" },
];

export const HANDLE_STYLES = [
  { id: "brass", label: "Slim brass bar" },
  { id: "black", label: "Matte black edge" },
  { id: "none", label: "Handleless push-open" },
] as const;

/* Before / After (honest representative visual, same photo series) */
export const BEFORE_AFTER = {
  beforeId: 8146336,
  afterId: 8146204,
  credit: "Max Vakhtbovych",
  beforeAlt: "Unfurnished apartment room with plain walls and wooden flooring",
  afterAlt: "The same style of room finished with wooden cabinetry, sofa and decor",
};

/* Hero fallback / social image */
export const HERO_IMG = {
  id: 27604139,
  ext: "png" as const,
  alt: "Sophisticated living room with contemporary furniture, warm lighting and panelled walls",
  credit: "Ansar Muhammad",
};

export const ABOUT_IMG = {
  id: 5711775,
  alt: "Carpenter shaping a wooden detail at a workbench under warm workshop light",
  credit: "Anna Shvets",
};

export const CRAFT_IMG = {
  id: 32357250,
  alt: "Carpenter precisely cutting wood on an industrial saw in a dusty workshop",
  credit: "HONG SON",
};
