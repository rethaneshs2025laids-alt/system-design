export const DEMO_HOTELS = [
  {
    id: 1, name: "The Grand Palace", city: "Chennai", location: "12 Marina Beach Road, Chennai",
    description: "An iconic beachfront palace offering unparalleled luxury with sweeping ocean views, world-class dining, and a legendary spa. Every detail is crafted for the discerning traveller.",
    rating: 4.8, reviewCount: 1240, stars: 5, pricePerNight: 12500, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Breakfast", "Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85",
    ],
    rooms: [
      { id: 101, type: "Deluxe Ocean Room", capacity: 2, bed: "King Bed", price: 12500, amenities: ["Sea View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 102, type: "Premier Suite", capacity: 3, bed: "King + Sofa", price: 22000, amenities: ["Sea View", "Jacuzzi", "Living Room", "Butler"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
      { id: 103, type: "Royal Penthouse", capacity: 4, bed: "2 King Beds", price: 45000, amenities: ["Panoramic View", "Private Pool", "Terrace", "Butler"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    ]
  },
  {
    id: 2, name: "Sunset Cove Resort", city: "Goa", location: "Calangute Beach, North Goa",
    description: "A tropical paradise nestled along Goa's most pristine coastline. Lush gardens, infinity pools and authentic Goan cuisine make this an unforgettable escape.",
    rating: 4.6, reviewCount: 892, stars: 5, pricePerNight: 9800, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Beach Access", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85",
    ],
    rooms: [
      { id: 201, type: "Garden Villa", capacity: 2, bed: "King Bed", price: 9800, amenities: ["Garden View", "Private Patio", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 202, type: "Beach Pool Villa", capacity: 2, bed: "King Bed", price: 18500, amenities: ["Beach View", "Private Pool", "Butler", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 3, name: "Royal Orchid Bengaluru", city: "Bengaluru", location: "56 Brigade Road, Bengaluru",
    description: "Bengaluru's most prestigious address. A sophisticated urban retreat with rooftop dining, a world-class business centre and seamless connectivity to the city's tech corridor.",
    rating: 4.5, reviewCount: 674, stars: 5, pricePerNight: 8200, type: "Hotel",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
    ],
    rooms: [
      { id: 301, type: "Superior Room", capacity: 2, bed: "King Bed", price: 8200, amenities: ["City View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 24h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 302, type: "Executive Suite", capacity: 3, bed: "King + Sofa", price: 15000, amenities: ["City View", "Lounge", "Work Desk", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 4, name: "Nilgiri Mountain Retreat", city: "Ooty", location: "Fern Hill Road, Ooty",
    description: "Perched at 7,000 feet in the Nilgiri hills, this heritage retreat offers misty mornings, colonial architecture, roaring fireplaces and breathtaking valley views.",
    rating: 4.7, reviewCount: 445, stars: 4, pricePerNight: 6500, type: "Resort",
    amenities: ["WiFi", "Spa", "Restaurant", "Breakfast", "Parking", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85",
    ],
    rooms: [
      { id: 401, type: "Heritage Room", capacity: 2, bed: "Queen Bed", price: 6500, amenities: ["Valley View", "Fireplace", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 402, type: "Cottage Suite", capacity: 4, bed: "2 Queen Beds", price: 12000, amenities: ["Garden View", "Fireplace", "Kitchenette", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 5, name: "The Coimbatore Grand", city: "Coimbatore", location: "Race Course Road, Coimbatore",
    description: "A contemporary luxury hotel in the heart of Coimbatore's business district. Elegant rooms, a rooftop pool and exceptional South Indian cuisine await.",
    rating: 4.3, reviewCount: 328, stars: 4, pricePerNight: 5500, type: "Hotel",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Bar", "Parking", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85",
    ],
    rooms: [
      { id: 501, type: "Deluxe Room", capacity: 2, bed: "King Bed", price: 5500, amenities: ["City View", "AC", "WiFi", "Mini Bar"], cancellation: "Free cancellation before 24h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 502, type: "Junior Suite", capacity: 3, bed: "King + Sofa", price: 9500, amenities: ["City View", "Lounge", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 6, name: "Sea Pearl Mumbai", city: "Mumbai", location: "Marine Drive, Mumbai",
    description: "An iconic heritage hotel overlooking the Queen's Necklace. Art deco grandeur meets modern luxury with unobstructed Arabian Sea views from every room.",
    rating: 4.9, reviewCount: 2100, stars: 5, pricePerNight: 18000, type: "Hotel",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85",
    ],
    rooms: [
      { id: 601, type: "Classic Sea View", capacity: 2, bed: "King Bed", price: 18000, amenities: ["Sea View", "Heritage Decor", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 602, type: "Presidential Suite", capacity: 4, bed: "2 King Beds", price: 55000, amenities: ["Panoramic Sea View", "Private Pool", "Butler", "Dining Room"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },

  // ── VILLA properties ──────────────────────────────────────────────────────
  {
    id: 7, name: "Aravali Wilderness Villa", city: "Jaipur", location: "Nahargarh Hills, Jaipur",
    description: "A secluded private villa carved into the Aravali hillside. Infinity plunge pool, open-air dining under the stars and panoramic views of the Pink City below.",
    rating: 4.9, reviewCount: 312, stars: 5, pricePerNight: 28000, type: "Villa",
    amenities: ["WiFi", "Pool", "Spa", "Breakfast", "Parking", "Gym", "Bar"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=85",
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
    ],
    rooms: [
      { id: 701, type: "Hillside Villa Suite", capacity: 2, bed: "King Bed", price: 28000, amenities: ["Plunge Pool", "City View", "Private Terrace", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80" },
      { id: 702, type: "Grand Villa Residence", capacity: 6, bed: "3 King Beds", price: 65000, amenities: ["Private Pool", "Full Kitchen", "Butler", "Home Theatre"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80" },
    ]
  },
  {
    id: 8, name: "Backwater Breeze Villa", city: "Kerala", location: "Alleppey Backwaters, Kerala",
    description: "Float away on Kerala's legendary backwaters. This private villa sits on its own island, accessible only by boat, with a personal chef and traditional Ayurvedic treatments.",
    rating: 4.8, reviewCount: 198, stars: 5, pricePerNight: 22000, type: "Villa",
    amenities: ["WiFi", "Pool", "Spa", "Breakfast", "Restaurant", "Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=85",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=85",
    ],
    rooms: [
      { id: 801, type: "Lagoon Villa", capacity: 2, bed: "King Bed", price: 22000, amenities: ["Backwater View", "Private Deck", "Kayak", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 802, type: "Island Villa Estate", capacity: 8, bed: "4 King Beds", price: 80000, amenities: ["Private Island", "Infinity Pool", "Chef", "Boat Transfer"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 9, name: "Udaipur Lake Villa", city: "Udaipur", location: "Lake Pichola Shore, Udaipur",
    description: "A romantic lakeside villa with direct access to Lake Pichola. Watch the City Palace shimmer at sunset from your private terrace while sipping on handcrafted cocktails.",
    rating: 4.7, reviewCount: 267, stars: 5, pricePerNight: 19500, type: "Villa",
    amenities: ["WiFi", "Pool", "Spa", "Breakfast", "Restaurant", "Bar", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=85",
    ],
    rooms: [
      { id: 901, type: "Lake View Villa Room", capacity: 2, bed: "King Bed", price: 19500, amenities: ["Lake View", "Private Terrace", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 902, type: "Royal Villa Suite", capacity: 4, bed: "2 King Beds", price: 38000, amenities: ["Panoramic Lake View", "Private Pool", "Butler", "Dining Pavilion"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    ]
  },

  // ── BOUTIQUE properties ───────────────────────────────────────────────────
  {
    id: 10, name: "The Shimla Ink House", city: "Shimla", location: "The Mall Road, Shimla",
    description: "A lovingly restored colonial-era bungalow turned boutique retreat. Each of the eight rooms is individually designed with local art, handwoven textiles and vintage Himalayan maps.",
    rating: 4.6, reviewCount: 183, stars: 4, pricePerNight: 7800, type: "Boutique",
    amenities: ["WiFi", "Breakfast", "Restaurant", "Bar", "Parking", "Spa"],
    images: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200&q=85",
    ],
    rooms: [
      { id: 1001, type: "Colonial Heritage Room", capacity: 2, bed: "Queen Bed", price: 7800, amenities: ["Mountain View", "Fireplace", "Vintage Decor", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1002, type: "Attic Loft Suite", capacity: 3, bed: "King + Bunk", price: 13500, amenities: ["Panoramic View", "Skylight", "Reading Nook", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 11, name: "Pondicherry Maison", city: "Chennai", location: "White Town, Pondicherry",
    description: "A 200-year-old French Creole mansion in Pondicherry's heritage quarter. Cobblestone courtyards, bougainvillea-draped walls and a rooftop plunge pool define this intimate escape.",
    rating: 4.8, reviewCount: 241, stars: 4, pricePerNight: 9200, type: "Boutique",
    amenities: ["WiFi", "Pool", "Breakfast", "Restaurant", "Bar", "Spa"],
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=85",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85",
    ],
    rooms: [
      { id: 1101, type: "Courtyard Room", capacity: 2, bed: "Queen Bed", price: 9200, amenities: ["Courtyard View", "Four-poster Bed", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1102, type: "Rooftop Terrace Suite", capacity: 2, bed: "King Bed", price: 16500, amenities: ["Rooftop Pool", "Sea Breeze", "Private Terrace", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 12, name: "Spice Garden Boutique", city: "Coimbatore", location: "Valparai Hills, Coimbatore",
    description: "Tucked inside a working spice and tea plantation, this six-room boutique stay offers guided plantation walks, farm-to-table meals and absolute silence broken only by birdsong.",
    rating: 4.5, reviewCount: 156, stars: 4, pricePerNight: 6200, type: "Boutique",
    amenities: ["WiFi", "Breakfast", "Restaurant", "Spa", "Parking", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200&q=85",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85",
    ],
    rooms: [
      { id: 1201, type: "Plantation Cottage", capacity: 2, bed: "Queen Bed", price: 6200, amenities: ["Garden View", "Outdoor Shower", "Hammock", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1202, type: "Treehouse Loft", capacity: 2, bed: "King Bed", price: 11000, amenities: ["Canopy View", "Private Deck", "Telescope", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },


  // 10 NEW Hotel and Resort properties
  {
    id: 13, name: "The Leela Palace Chennai", city: "Chennai", location: "Adyar Seaface, Chennai",
    description: "A palatial seafront hotel blending Dravidian architecture with contemporary luxury. Gold-leaf ceilings, a lagoon pool and a Michelin-inspired restaurant make every moment extraordinary.",
    rating: 4.9, reviewCount: 1876, stars: 5, pricePerNight: 16500, type: "Hotel",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Breakfast", "Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85",
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=85",
    ],
    rooms: [
      { id: 1301, type: "Grand Deluxe Room", capacity: 2, bed: "King Bed", price: 16500, amenities: ["Sea View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1302, type: "Royal Suite", capacity: 3, bed: "King + Sofa", price: 32000, amenities: ["Panoramic Sea View", "Jacuzzi", "Butler", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 14, name: "Taj Fisherman's Cove", city: "Chennai", location: "Covelong Beach, Chennai",
    description: "A legendary resort perched on a rocky promontory above the Bay of Bengal. Colonial-era cottages, a private beach and the finest seafood on the Coromandel Coast.",
    rating: 4.7, reviewCount: 1423, stars: 5, pricePerNight: 14200, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Beach Access", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=1200&q=85",
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=1200&q=85",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=85",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85",
    ],
    rooms: [
      { id: 1401, type: "Sea View Cottage", capacity: 2, bed: "King Bed", price: 14200, amenities: ["Sea View", "Private Patio", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1402, type: "Luxury Bay Suite", capacity: 4, bed: "2 Queen Beds", price: 26000, amenities: ["Bay View", "Private Pool", "Butler", "WiFi"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    ]
  },
  {
    id: 15, name: "ITC Grand Chola", city: "Chennai", location: "Mount Road, Chennai",
    description: "India's largest luxury hotel, inspired by the grandeur of the Chola dynasty. Six restaurants, a 9,000 sq ft spa and a stunning rooftop pool define this iconic address.",
    rating: 4.8, reviewCount: 2340, stars: 5, pricePerNight: 13800, type: "Hotel",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85",
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85",
    ],
    rooms: [
      { id: 1501, type: "Executive Room", capacity: 2, bed: "King Bed", price: 13800, amenities: ["City View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 24h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1502, type: "Chola Suite", capacity: 3, bed: "King + Sofa", price: 28000, amenities: ["Panoramic View", "Jacuzzi", "Living Room", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 16, name: "Radisson Blu Goa Resort", city: "Goa", location: "Cavelossim Beach, South Goa",
    description: "A serene South Goa retreat far from the crowds. A 200-metre private beach, three pools and a world-class dive centre make this the ultimate Goan escape.",
    rating: 4.5, reviewCount: 987, stars: 5, pricePerNight: 11000, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Beach Access", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=1200&q=85",
      "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=85",
    ],
    rooms: [
      { id: 1601, type: "Superior Beach Room", capacity: 2, bed: "King Bed", price: 11000, amenities: ["Beach View", "AC", "WiFi", "Balcony"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1602, type: "Ocean Suite", capacity: 3, bed: "King + Sofa", price: 21000, amenities: ["Ocean View", "Private Pool", "Butler", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 17, name: "W Goa", city: "Goa", location: "Vagator Beach, North Goa",
    description: "Where bold design meets Goa's legendary party spirit. Clifftop infinity pools, a world-famous DJ deck, and rooms that blur the line between inside and outside.",
    rating: 4.6, reviewCount: 1102, stars: 5, pricePerNight: 15500, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Beach Access", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=85",
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=1200&q=85",
      "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
    ],
    rooms: [
      { id: 1701, type: "Wonderful Room", capacity: 2, bed: "King Bed", price: 15500, amenities: ["Pool View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1702, type: "Extreme WOW Suite", capacity: 4, bed: "2 King Beds", price: 48000, amenities: ["Clifftop View", "Private Pool", "DJ Deck Access", "Butler"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    ]
  },
  {
    id: 18, name: "JW Marriott Bengaluru", city: "Bengaluru", location: "Vittal Mallya Road, Bengaluru",
    description: "Bengaluru's most celebrated luxury address. A soaring glass tower with an infinity pool on the 20th floor, a rooftop bar with city panoramas and impeccable JW service.",
    rating: 4.7, reviewCount: 1654, stars: 5, pricePerNight: 12000, type: "Hotel",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85",
    ],
    rooms: [
      { id: 1801, type: "Deluxe City View", capacity: 2, bed: "King Bed", price: 12000, amenities: ["City View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 24h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1802, type: "Executive Suite", capacity: 3, bed: "King + Sofa", price: 22000, amenities: ["Panoramic View", "Lounge Access", "Jacuzzi", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 19, name: "Evolve Back Coorg", city: "Bengaluru", location: "Madikeri, Coorg",
    description: "A breathtaking resort set within a 300-acre coffee and spice plantation in the misty hills of Coorg. Private plunge pools, plantation safaris and Coorgi cuisine await.",
    rating: 4.9, reviewCount: 743, stars: 5, pricePerNight: 24000, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Breakfast", "Gym", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85",
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=85",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
    ],
    rooms: [
      { id: 1901, type: "Plantation Cottage", capacity: 2, bed: "King Bed", price: 24000, amenities: ["Plunge Pool", "Plantation View", "Outdoor Shower", "WiFi"], cancellation: "Free cancellation before 72h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 1902, type: "Estate Bungalow", capacity: 6, bed: "3 King Beds", price: 58000, amenities: ["Private Pool", "Full Kitchen", "Fireplace", "Butler"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 20, name: "Hyatt Regency Mumbai", city: "Mumbai", location: "Sahar Airport Road, Mumbai",
    description: "Mumbai's premier business and leisure hotel. A stunning atrium lobby, rooftop infinity pool and the city's most celebrated Sunday brunch draw guests from around the world.",
    rating: 4.6, reviewCount: 1987, stars: 5, pricePerNight: 14500, type: "Hotel",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85",
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=85",
    ],
    rooms: [
      { id: 2001, type: "King Room", capacity: 2, bed: "King Bed", price: 14500, amenities: ["City View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 24h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 2002, type: "Regency Suite", capacity: 3, bed: "King + Sofa", price: 28000, amenities: ["Panoramic View", "Jacuzzi", "Lounge Access", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
  {
    id: 21, name: "Anantara Jaipur Resort", city: "Jaipur", location: "Amber Fort Road, Jaipur",
    description: "A regal resort built around a 16th-century stepwell. Elephant encounters at dawn, hot-air balloon rides over the Pink City and a rooftop restaurant with fort views.",
    rating: 4.8, reviewCount: 892, stars: 5, pricePerNight: 17500, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=1200&q=85",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=85",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85",
      "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=1200&q=85",
    ],
    rooms: [
      { id: 2101, type: "Haveli Room", capacity: 2, bed: "King Bed", price: 17500, amenities: ["Fort View", "AC", "Mini Bar", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 2102, type: "Maharaja Suite", capacity: 4, bed: "2 King Beds", price: 42000, amenities: ["Panoramic Fort View", "Private Pool", "Butler", "Elephant Access"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    ]
  },
  {
    id: 22, name: "Kumarakom Lake Resort", city: "Kerala", location: "Kumarakom, Kerala",
    description: "A heritage resort spread across 25 acres on the banks of Vembanad Lake. Traditional Kerala architecture, a private houseboat fleet and the most authentic Ayurvedic spa in India.",
    rating: 4.9, reviewCount: 1134, stars: 5, pricePerNight: 20000, type: "Resort",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar", "Beach Access", "Breakfast", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=1200&q=85",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=85",
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85",
    ],
    rooms: [
      { id: 2201, type: "Lake View Villa", capacity: 2, bed: "King Bed", price: 20000, amenities: ["Lake View", "Private Deck", "AC", "WiFi"], cancellation: "Free cancellation before 48h", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { id: 2202, type: "Heritage Bungalow", capacity: 4, bed: "2 King Beds", price: 38000, amenities: ["Private Pool", "Houseboat Access", "Butler", "Ayurvedic Spa"], cancellation: "Non-refundable", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80" },
    ]
  },
];

export const DESTINATIONS = ["Chennai", "Goa", "Bengaluru", "Ooty", "Coimbatore", "Mumbai", "Jaipur", "Udaipur", "Kerala", "Shimla"];
