/**
 * RigHub app.js
 * ============
 * Controls interactive searching, dynamic category switching, price filtering,
 * store selection, alphabetical/price sorting, lazy rendering (pagination),
 * and dynamic real-time comparison matching.
 *
 * Designed with premium micro-interactions, whitespace-nowrap badges,
 * and high performance.
 */

// --- Constants & Global State ---
let cart = JSON.parse(localStorage.getItem('righub_cart')) || [];

// --- Unpack Compressed Products ---
if (Array.isArray(window.products) && window.products.length > 0 && Array.isArray(window.products[0])) {
  const SCHEMA_MAP = {
    // 1. Desktop Computers & Workstations
    "Gaming PCs": "Desktop Computers & Workstations",
    "Prebuilt Desktops": "Desktop Computers & Workstations",
    "Pre-Built Desktop PCs": "Desktop Computers & Workstations",
    "Pre-built PC": "Desktop Computers & Workstations",
    "Workstation PCs": "Desktop Computers & Workstations",
    "Workstations": "Desktop Computers & Workstations",
    "Mini PCs": "Desktop Computers & Workstations",
    "Mini PC": "Desktop Computers & Workstations",
    "Desktop PCs": "Desktop Computers & Workstations",
    "Desktop PCs & Workstations": "Desktop Computers & Workstations",
    "Gaming Desktop PCs": "Desktop Computers & Workstations",
    "Gaming Desktops": "Desktop Computers & Workstations",
    "Business Desktops & Workstations": "Desktop Computers & Workstations",
    "All-in-One": "Desktop Computers & Workstations",
    "All-in-One PCs": "Desktop Computers & Workstations",
    "Servers": "Desktop Computers & Workstations",
    "Thin Clients": "Desktop Computers & Workstations",

    // 2. Laptops & Portable Computers
    "Gaming Laptops": "Laptops & Portable Computers",
    "Business Laptops": "Laptops & Portable Computers",
    "Student/Home Laptops": "Laptops & Portable Computers",
    "Student & Home Laptops": "Laptops & Portable Computers",
    "Ultrabooks & Lightweight": "Laptops & Portable Computers",
    "Ultrabooks": "Laptops & Portable Computers",
    "2-in-1 Convertibles": "Laptops & Portable Computers",
    "2-in-1": "Laptops & Portable Computers",
    "2-in-1 Convertible Laptops": "Laptops & Portable Computers",
    "2-in-1 Laptops": "Laptops & Portable Computers",
    "Laptops": "Laptops & Portable Computers",
    "Laptops & Notebooks": "Laptops & Portable Computers",
    "Creator Laptops": "Laptops & Portable Computers",
    "Chromebooks": "Laptops & Portable Computers",

    // 3. Tablets & iPads
    "iPad Models": "Tablets & iPads",
    "Apple iPads": "Tablets & iPads",
    "Android Tablets": "Tablets & iPads",
    "Tablets": "Tablets & iPads",
    "Smartphones & Tablets": "Tablets & iPads",
    "E-Readers": "Tablets & iPads",
    "Stylus & Accessories": "Tablets & iPads",
    "Smart Pens": "Tablets & iPads",
    "Tablet Cases & Covers": "Tablets & iPads",
    "iPad & Tablet Cases": "Tablets & iPads",
    "Tablet Accessories": "Tablets & iPads",

    // 4. PC Components
    "Processors (CPUs)": "PC Components",
    "CPUs": "PC Components",
    "Processors": "PC Components",
    "CPU": "PC Components",
    "AMD CPUs": "PC Components",
    "Intel CPUs": "PC Components",
    "AMD": "PC Components",
    "Intel": "PC Components",

    "Graphics Cards (GPUs)": "PC Components",
    "Graphics Cards": "PC Components",
    "GPUs": "PC Components",
    "GPU Cards": "PC Components",
    "NVIDIA GPUs": "PC Components",
    "AMD GPUs": "PC Components",
    "Intel Arc GPUs": "PC Components",
    "NVIDIA": "PC Components",
    "Intel Arc": "PC Components",

    "Motherboards": "PC Components",

    "Memory (RAM)": "PC Components",
    "RAM": "PC Components",
    "RAM & Memory": "PC Components",
    "Desktop RAM": "PC Components",
    "Laptop RAM": "Laptops & Portable Computers",
    "Other Memory": "PC Components",

    "Storage Devices": "PC Components",
    "NVMe SSDs": "PC Components",
    "NVMe SSD": "PC Components",
    "SATA SSDs": "PC Components",
    "SATA SSD": "PC Components",
    "Internal SSDs": "PC Components",
    "SSDs": "PC Components",
    "HDDs": "PC Components",
    "HDD": "PC Components",

    "Power Supplies": "PC Components",
    "Power Supplies (PSU)": "PC Components",
    "PSU": "PC Components",

    "PC Cases": "PC Components",
    "Computer Cases": "PC Components",

    "Expansion Cards": "PC Components",
    "PC Accessories": "PC Components",
    "GPU Accessories": "PC Components",

    // 5. Peripherals & Input Devices
    "Keyboards": "Peripherals & Input Devices",
    "Keyboards & Mice": "Peripherals & Input Devices",
    "Wired Gaming Keyboards": "Peripherals & Input Devices",
    "Wireless Gaming Keyboards": "Peripherals & Input Devices",
    "Office Keyboards": "Peripherals & Input Devices",
    "Keyboard & Mouse Combos": "Peripherals & Input Devices",
    "Mechanical Keyboards": "Peripherals & Input Devices",
    "Membrane Keyboards": "Peripherals & Input Devices",
    "Ergonomic Keyboards": "Peripherals & Input Devices",
    "Mechanical": "Peripherals & Input Devices",
    "Membrane": "Peripherals & Input Devices",
    "Ergonomic": "Peripherals & Input Devices",

    "Mice": "Peripherals & Input Devices",
    "Wired Gaming Mice": "Peripherals & Input Devices",
    "Wireless Gaming Mice": "Peripherals & Input Devices",
    "Ergonomic & Office Mice": "Peripherals & Input Devices",
    "Office & Wireless Mice": "Peripherals & Input Devices",
    "Gaming Mice": "Peripherals & Input Devices",
    "Wireless Mice": "Peripherals & Input Devices",
    "Ergonomic Mice": "Peripherals & Input Devices",

    "Mousepads": "Peripherals & Input Devices",
    "Mouse Pads & Desk Mats": "Peripherals & Input Devices",

    "Gamepads & Controllers": "Peripherals & Input Devices",
    "Controllers": "Peripherals & Input Devices",
    "PS5 Controllers": "Peripherals & Input Devices",
    "PS4 Controllers": "Peripherals & Input Devices",
    "Xbox Controllers": "Peripherals & Input Devices",
    "Universal Game Controllers": "Peripherals & Input Devices",

    "Steering Wheels & Racing Equipment": "Peripherals & Input Devices",
    "Racing Wheels": "Peripherals & Input Devices",
    "Racing Wheels & Sim Accessories": "Peripherals & Input Devices",

    "Webcams": "Peripherals & Input Devices",

    "Scanner & Barcode Readers": "Peripherals & Input Devices",
    "Barcode Scanners": "Peripherals & Input Devices",
    "Barcode Scanners & Industrial Mobile": "Peripherals & Input Devices",
    "Drawing Tablets": "Peripherals & Input Devices",
    "Card Readers": "Peripherals & Input Devices",

    // 6. Displays & Monitors
    "Gaming Monitors": "Displays & Monitors",
    "Professional Monitors": "Displays & Monitors",
    "Business/Office Monitors": "Displays & Monitors",
    "Office Monitors": "Displays & Monitors",
    "Office & Home Monitors": "Displays & Monitors",
    "Curved Monitors": "Displays & Monitors",
    "Portable Monitors": "Displays & Monitors",
    "Monitors": "Displays & Monitors",
    "Monitors & Displays": "Displays & Monitors",
    "TV Screens & Large Displays": "Displays & Monitors",
    "TVs": "Displays & Monitors",
    "Smart TVs": "Displays & Monitors",
    "Projectors": "Displays & Monitors",
    "Led Projector": "Displays & Monitors",
    "Digital Signage": "Displays & Monitors",
    "Monitor Stands & Mounts": "Displays & Monitors",
    "Monitor Arms": "Displays & Monitors",
    "Monitor Stands Arms": "Displays & Monitors",
    "Monitor Accessories": "Displays & Monitors",

    // 7. Audio & Sound
    "Headphones": "Audio & Sound",
    "Headsets": "Audio & Sound",
    "Earphones": "Audio & Sound",
    "Wireless Headphones": "Audio & Sound",
    "Wired Headphones": "Audio & Sound",
    "Over-Ear Headphones": "Audio & Sound",
    "Over-Ear": "Audio & Sound",
    "On-Ear Headphones": "Audio & Sound",
    "On-Ear": "Audio & Sound",
    "Studio Headphones": "Audio & Sound",
    "Studio": "Audio & Sound",
    "Gaming Headphones": "Audio & Sound",
    "Gaming Headsets": "Audio & Sound",

    "Earbuds": "Audio & Sound",
    "Earbuds & In-Ear": "Audio & Sound",
    "True Wireless": "Audio & Sound",
    "True Wireless Earbuds": "Audio & Sound",
    "True Wireless Earbuds (TWS)": "Audio & Sound",
    "Wired Earbuds": "Audio & Sound",
    "Sports Earbuds": "Audio & Sound",
    "Sports": "Audio & Sound",
    "Open-Ear & Clip-On Earbuds": "Audio & Sound",

    "Microphones": "Audio & Sound",
    "USB Streaming Microphones": "Audio & Sound",

    "Speakers": "Audio & Sound",
    "Speakers & Soundbars": "Audio & Sound",
    "Bluetooth Speakers": "Audio & Sound",
    "Bluetooth": "Audio & Sound",
    "Bookshelf Speakers": "Audio & Sound",
    "Bookshelf": "Audio & Sound",
    "Portable Speakers": "Audio & Sound",
    "Portable": "Audio & Sound",
    "Smart Speakers": "Audio & Sound",
    "Soundbars": "Audio & Sound",

    "Audio Interfaces & Mixers": "Audio & Sound",
    "DACs": "Audio & Sound",
    "Amplifiers": "Audio & Sound",
    "Headphone Stands": "Audio & Sound",
    "Microphone Stands & Boom Arms": "Audio & Sound",
    "Microphone Arms": "Audio & Sound",
    "Microphone Accessories": "Audio & Sound",
    "Audio Accessories": "Audio & Sound",
    "Audio Cables & Connectors": "Audio & Sound",

    // 8. Gaming & Consoles
    "Gaming Consoles": "Gaming & Consoles",
    "Consoles": "Gaming & Consoles",
    "PlayStation Consoles": "Gaming & Consoles",
    "Xbox Consoles": "Gaming & Consoles",
    "Handheld Consoles": "Gaming & Consoles",
    "Handheld Gaming Consoles": "Gaming & Consoles",
    "VR Headsets": "Gaming & Consoles",

    "Console Accessories": "Gaming & Consoles",
    "Gaming Accessories": "Gaming & Consoles",
    "Gaming Peripherals & Accessories": "Gaming & Consoles",
    "Gaming Decor & Lighting": "Gaming & Consoles",

    // 9. Cameras & Imaging
    "Action Cameras": "Cameras & Imaging",
    "Action Cameras & Dashcams": "Cameras & Imaging",
    "Instant Cameras (Instax)": "Cameras & Imaging",
    "360 Degree Cameras": "Cameras & Imaging",
    "Digital Cameras": "Cameras & Imaging",
    "Cameras": "Cameras & Imaging",
    "DSLR": "Cameras & Imaging",
    "Mirrorless": "Cameras & Imaging",
    "Security Cameras": "Cameras & Imaging",
    "Dash Cameras": "Cameras & Imaging",
    "Lenses": "Cameras & Imaging",
    "Camera Lenses & Filters": "Cameras & Imaging",
    "Tripods": "Cameras & Imaging",
    "Tripods & Stands": "Cameras & Imaging",
    "Lighting": "Cameras & Imaging",
    "Ring Lights": "Cameras & Imaging",
    "Camera Accessories": "Cameras & Imaging",
    "Camera Mounts": "Cameras & Imaging",
    "Camera Cases & Bags": "Cameras & Imaging",

    // 10. Networking & Connectivity
    "Routers": "Networking & Connectivity",
    "Routers & Mesh WiFi": "Networking & Connectivity",
    "Mesh Systems": "Networking & Connectivity",
    "Switches": "Networking & Connectivity",
    "Network Switches": "Networking & Connectivity",
    "Access Points": "Networking & Connectivity",
    "Modems": "Networking & Connectivity",
    "Network Cards": "Networking & Connectivity",
    "WiFi Adapters & Dongles": "Networking & Connectivity",
    "Wireless Adapters": "Networking & Connectivity",
    "NAS": "Networking & Connectivity",
    "Networking Accessories": "Networking & Connectivity",
    "Networking & Connectivity": "Networking & Connectivity",

    // 11. Power & Charging
    "Power Banks": "Power & Charging",
    "Wall Chargers": "Power & Charging",
    "Portable Chargers": "Power & Charging",
    "Chargers": "Power & Charging",
    "Chargers & Power Adapters": "Power & Charging",
    "Wireless Chargers": "Power & Charging",
    "Surge Protectors": "Power & Charging",
    "Surge Protectors & Power Strips": "Power & Charging",
    "UPS": "Power & Charging",
    "UPS & Power Protection": "Power & Charging",
    "Power Adapters": "Power & Charging",
    "Batteries": "Power & Charging",
    "PSU Accessories": "Power & Charging",

    // 12. Mobile Devices & Accessories
    "Smartphones": "Mobile Devices & Accessories",
    "Android Smartphones": "Mobile Devices & Accessories",
    "Phone Accessories": "Mobile Devices & Accessories",
    "Phone & Tablet Accessories": "Mobile Devices & Accessories",
    "Phone Cases & Covers": "Mobile Devices & Accessories",
    "Phone Cases": "Mobile Devices & Accessories",
    "Screen & Lens Protectors": "Mobile Devices & Accessories",

    "Smartwatches & Wearables": "Mobile Devices & Accessories",
    "Smartwatches": "Mobile Devices & Accessories",
    "Smart Watches": "Mobile Devices & Accessories",
    "Android & Universal Smartwatches": "Mobile Devices & Accessories",
    "Fitness Trackers": "Mobile Devices & Accessories",
    "Smart Bands & Fitness Trackers": "Mobile Devices & Accessories",
    "Smart Rings": "Mobile Devices & Accessories",
    "Wearables": "Mobile Devices & Accessories",
    "Wearable Accessories": "Mobile Devices & Accessories",
    "Watch Bands & Straps": "Mobile Devices & Accessories",
    "AirTags & Tracking Devices": "Mobile Devices & Accessories",

    // 13. Smart Home & IoT
    "Smart Home": "Smart Home & IoT",
    "Smart Home & Appliances": "Smart Home & IoT",
    "Smart Lighting": "Smart Home & IoT",
    "Smart Plugs": "Smart Home & IoT",
    "Smart Locks": "Smart Home & IoT",
    "Smart Sensors": "Smart Home & IoT",
    "Smart Displays": "Smart Home & IoT",
    "Smart Thermostats": "Smart Home & IoT",
    "Smart Hubs": "Smart Home & IoT",
    "Smart Security": "Smart Home & IoT",
    "Smart Kitchen Appliances": "Smart Home & IoT",

    // 14. Printers & Office Equipment
    "Printers": "Printers & Office Equipment",
    "Printers & Scanners": "Printers & Office Equipment",
    "Laser Printers": "Printers & Office Equipment",
    "Inkjet Printers": "Printers & Office Equipment",
    "All-in-One Printers": "Printers & Office Equipment",
    "Scanners": "Printers & Office Equipment",
    "Label Printers": "Printers & Office Equipment",
    "Ink": "Printers & Office Equipment",
    "Printer Consumables": "Printers & Office Equipment",
    "Toner": "Printers & Office Equipment",
    "Office Supplies": "Printers & Office Equipment",
    "Office Accessories": "Printers & Office Equipment",
    "Office Equipment": "Printers & Office Equipment",
    "Shredders": "Printers & Office Equipment",

    // 15. Laptop & Computer Accessories
    "Laptop Stands": "Laptop & Computer Accessories",
    "Laptop Stands & Mounts": "Laptop & Computer Accessories",
    "Laptop Cooling Pads": "Laptop & Computer Accessories",
    "Laptop Bags & Sleeves": "Laptop & Computer Accessories",
    "Bags & Sleeves": "Laptop & Computer Accessories",
    "Laptop Accessories": "Laptop & Computer Accessories",
    "Docking Stations": "Laptop & Computer Accessories",
    "USB Hubs & Docking Stations": "Laptop & Computer Accessories",

    // 16. Cables & Connectivity Solutions
    "Cables & Adapters": "Cables & Connectivity Solutions",
    "Cables, Adapters & Hubs": "Cables & Connectivity Solutions",
    "USB": "Cables & Connectivity Solutions",
    "USB & Charging Cables": "Cables & Connectivity Solutions",
    "HDMI": "Cables & Connectivity Solutions",
    "HDMI & Display Cables": "Cables & Connectivity Solutions",
    "DisplayPort": "Cables & Connectivity Solutions",
    "Ethernet": "Cables & Connectivity Solutions",
    "Ethernet Cables": "Cables & Connectivity Solutions",
    "Audio Cables": "Cables & Connectivity Solutions",
    "SATA": "Cables & Connectivity Solutions",
    "Power Cables": "Cables & Connectivity Solutions",
    "Video Adapters": "Cables & Connectivity Solutions",
    "USB Adapters": "Cables & Connectivity Solutions",
    "USB Hubs": "Cables & Connectivity Solutions",
    "OTG & Connectivity Adapters": "Cables & Connectivity Solutions",

    // 17. Cooling & Thermal Solutions
    "CPU Coolers": "Cooling & Thermal Solutions",
    "AIO Liquid Coolers": "Cooling & Thermal Solutions",
    "AIO Coolers": "Cooling & Thermal Solutions",
    "Air Coolers": "Cooling & Thermal Solutions",
    "CPU/Case Coolers": "Cooling & Thermal Solutions",
    "Case Fans": "Cooling & Thermal Solutions",
    "PC Fans & Cooling": "Cooling & Thermal Solutions",
    "Thermal Paste": "Cooling & Thermal Solutions",
    "Thermal Pads": "Cooling & Thermal Solutions",
    "Liquid Metal": "Cooling & Thermal Solutions",
    "Thermal Shield": "Cooling & Thermal Solutions",
    "Cooling Accessories": "Cooling & Thermal Solutions",
    "Custom Water Cooling": "Cooling & Thermal Solutions",

    // 18. Streaming & Content Creation
    "Capture Cards": "Streaming & Content Creation",
    "accessories_capture-card": "Streaming & Content Creation",
    "Stream Decks": "Streaming & Content Creation",
    "Streaming Equipment": "Streaming & Content Creation",

    // 19. Software & Licenses
    "Software": "Software & Licenses",
    "Operating Systems": "Software & Licenses",

    // 20. Furniture & Workspace
    "Gaming Chairs": "Furniture & Workspace",
    "Gaming Desks": "Furniture & Workspace",

    // 21. Miscellaneous Tech Accessories
    "Storage": "Miscellaneous Tech Accessories",
    "External SSD": "Miscellaneous Tech Accessories",
    "External HDD": "Miscellaneous Tech Accessories",
    "External Storage": "Miscellaneous Tech Accessories",
    "USB Flash Drives": "Miscellaneous Tech Accessories",
    "Memory Cards": "Miscellaneous Tech Accessories",
    "MicroSD": "Miscellaneous Tech Accessories",
    "NAS Drives": "Miscellaneous Tech Accessories",
    "Backup Devices": "Miscellaneous Tech Accessories",
    "Storage Accessories": "Miscellaneous Tech Accessories",

    "Mounts & Holders": "Miscellaneous Tech Accessories",
    "Screen Protectors": "Miscellaneous Tech Accessories",
    "Skins & Covers": "Miscellaneous Tech Accessories",
    "Stands": "Miscellaneous Tech Accessories",
    "Travel Accessories": "Miscellaneous Tech Accessories",
    "Other Accessories": "Miscellaneous Tech Accessories",
    "Accessories": "Miscellaneous Tech Accessories",
    "all Accessories": "Miscellaneous Tech Accessories",
    "General Electronics": "Miscellaneous Tech Accessories",
    "General": "Miscellaneous Tech Accessories",

    // 22. Apple Ecosystem
    "Apple iPhones": "Apple Ecosystem",
    "Apple Watch": "Apple Ecosystem",
    "MacBooks": "Apple Ecosystem",
    "AirPods": "Apple Ecosystem",
    "Apple TV": "Apple Ecosystem",
  };

  window.products = window.products.map(p => {
    const storeKey = (window.STORE_KEYS && window.STORE_KEYS[p[7]]) ? window.STORE_KEYS[p[7]] : ((window.STORES && window.STORES[p[7]]) ? window.STORES[p[7]] : 'general');
    const storeName = (window.STORES && window.STORES[p[7]]) ? window.STORES[p[7]] : storeKey;
    
    const catIdxs = Array.isArray(p[2]) ? p[2] : [p[2]];
    const categories = catIdxs.map(idx => typeof idx === 'number' && window.CATEGORIES ? window.CATEGORIES[idx] : idx).filter(Boolean);
    const parentCategories = categories.map(cat => SCHEMA_MAP[cat] || 'Accessories');
    
    const primaryCat = categories[0] || 'All other';
    const primaryParent = parentCategories[0] || 'other gadgets';
    
    return {
      id: p[0],
      name: p[1],
      category: primaryCat,
      subcategory: primaryCat,
      category1: primaryCat,
      parent_category: primaryParent,
      parentCategory1: primaryParent,
      categories: categories,
      parent_categories: parentCategories,
      image: p[3],
      image_url: p[3],
      description: p[4],
      specs: p[5] || {},
      price: p[6],
      price_jod: p[6],
      store: storeName,
      storeKey: storeKey,
      color: (window.STORE_COLORS && window.STORE_COLORS[storeName]) || '#7C3AED',
      url: p[8],
      product_url: p[8],
      inStock: p[9] === 1,
      in_stock: p[9] === 1
    };
  });
  window.PRODUCTS_DATA = window.products;
} else if (Array.isArray(window.products) && window.products.length > 0) {
  window.products = window.products.map(p => {
    if (!p.categories) {
      p.categories = [p.category || 'All other'];
    }
    if (!p.parent_categories) {
      p.parent_categories = [p.parent_category || 'other gadgets'];
    }
    if (p.category1 && !p.category) p.category = p.category1;
    if (p.parentCategory1 && !p.parent_category) p.parent_category = p.parentCategory1;
    if (p.price_jod !== undefined && p.price === undefined) p.price = p.price_jod;
    if (p.image_url && !p.image) p.image = p.image_url;
    if (p.product_url && !p.url) p.url = p.product_url;
    return p;
  });
  window.PRODUCTS_DATA = window.products;
}

let activeCategory = 'All';
let activeStorageSubcat = 'All'; // Storage sub-category selection
let searchQuery = '';
let priceMin = 0;
let priceMax = 3000;
let selectedStores = [];
let sortBy = 'price-asc';

// --- Dynamic Category Themes ---
const CATEGORY_THEMES = {
  "Laptops & Notebooks":            { primary: '#3B82F6', secondary: '#6366F1', glow: 'rgba(59, 130, 246, 0.15)' },
  "Desktop PCs & Workstations":     { primary: '#6366F1', secondary: '#3B82F6', glow: 'rgba(99, 102, 241, 0.15)' },
  "PC Components":                  { primary: '#10B981', secondary: '#3B82F6', glow: 'rgba(16, 185, 129, 0.15)' },
  "Monitors & Displays":            { primary: '#8B5CF6', secondary: '#EC4899', glow: 'rgba(139, 92, 246, 0.15)' },
  "Keyboards & Mice":               { primary: '#A855F7', secondary: '#EC4899', glow: 'rgba(168, 85, 247, 0.15)' },
  "Gaming Peripherals & Accessories": { primary: '#EF4444', secondary: '#F97316', glow: 'rgba(239, 68, 68, 0.15)' },
  "Microphones & Webcams":          { primary: '#06B6D4', secondary: '#3B82F6', glow: 'rgba(6, 182, 212, 0.15)' },
  "Audio & Headphones":             { primary: '#EC4899', secondary: '#8B5CF6', glow: 'rgba(236, 72, 153, 0.15)' },
  "Smartphones & Tablets":          { primary: '#10B981', secondary: '#3B82F6', glow: 'rgba(16, 185, 129, 0.15)' },
  "Phone & Tablet Accessories":     { primary: '#F97316', secondary: '#F59E0B', glow: 'rgba(249, 115, 22, 0.15)' },
  "Smartwatches & Wearables":       { primary: '#F43F5E', secondary: '#FB7185', glow: 'rgba(244, 63, 94, 0.15)' },
  "Cameras & Photography":          { primary: '#D946EF', secondary: '#8B5CF6', glow: 'rgba(217, 70, 239, 0.15)' },
  "Networking & Connectivity":      { primary: '#0EA5E9', secondary: '#6366F1', glow: 'rgba(14, 165, 233, 0.15)' },
  "Printers & Scanners":            { primary: '#64748B', secondary: '#94A3B8', glow: 'rgba(100, 116, 139, 0.15)' },
  "Smart TVs & Home Entertainment": { primary: '#8B5CF6', secondary: '#3B82F6', glow: 'rgba(139, 92, 246, 0.15)' },
  "Smart Home & Appliances":        { primary: '#84CC16', secondary: '#10B981', glow: 'rgba(132, 204, 22, 0.15)' },
  "PlayStation Games & Consoles":   { primary: '#2563EB', secondary: '#1D4ED8', glow: 'rgba(37, 99, 235, 0.2)' },
  "Xbox Games & Accessories":       { primary: '#16A34A', secondary: '#15803D', glow: 'rgba(22, 163, 74, 0.2)' },
  "Cables, Adapters & Hubs":        { primary: '#64748B', secondary: '#3B82F6', glow: 'rgba(100, 116, 139, 0.15)' },
  "Office Equipment":               { primary: '#475569', secondary: '#0EA5E9', glow: 'rgba(71, 85, 105, 0.15)' },
  "Electronics & Accessories":      { primary: '#94A3B8', secondary: '#64748B', glow: 'rgba(148, 163, 184, 0.15)' },
  Default: { primary: '#3B82F6', secondary: '#10B981', glow: 'rgba(59, 130, 246, 0.15)' }
};

const STORE_DOMAINS = {
  igeek: 'igeekjo.com',
  osjo: 'os-jo.com',
  citycenter: 'citycenter.jo',
  pccircle: 'pccircle.com',
  taipei: 'taipeicomputer.jo',
  mcc: 'mcc-jo.com',
  gameonjo: 'gameonjo.com',
  jocell: 'jo-cell.com',
  platinum: 'www.platinum-jo.com',
  compume: 'www.compume.jo',
  isystem: 'www.isystem.jo',
  cr: 'cr-jo.com',
  htech: 'htech.jo',
  atcsjo: 'atcsjo.com',
  pluto: 'plutogamesonline.com',
  zigzagjo: 'zigzagjo.com',
  nt: 'nasertech.com',
  officejo: 'officejo.com',
  xmart: 'www.xmart.jo',
  buzz: 'electro-buzz.com',
  cse: 'cse.jo'
};

const STORE_LOGOS = {
};

function applyCategoryTheme(category) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.Default;
  document.documentElement.style.setProperty('--theme-primary', theme.primary);
  document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
  document.documentElement.style.setProperty('--theme-glow', theme.glow);
}

function handleHashChange() {
  const hash = window.location.hash;
  let targetCat = 'All';
  if (hash) {
    if (hash.toLowerCase() === '#home') {
      targetCat = 'All';
    } else {
      const match = hash.match(/^#category=(.+)$/);
      if (match) {
        targetCat = decodeURIComponent(match[1]);
      }
    }
  }

  if (activeCategory !== targetCat || (targetCat === 'All' && searchQuery.trim() !== '')) {
    if (targetCat === 'All') {
      searchQuery = '';
      if (desktopSearchInput) desktopSearchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
    }
    activeCategory = targetCat;
    currentPage = 1;
    selectedBrand = 'All';
    selectedSpecs = {};
    renderCategoryTabs();
    applyFiltersAndRender();
  }
}

// Dynamic Filter State
let selectedBrand = 'All';
let selectedSpecs = {};
let inStockOnly = false;

// Pagination state
let currentPage = 1;
const ITEMS_PER_PAGE = 80;
let currentFilteredList = [];

// Icons for category tabs
const categoryIcons = {
  All: "🖥️",
  "Laptops": "💻",
  "Laptop Accessories": "💼",
  "CPUs": "⚙️",
  "GPUs": "🎮",
  "GPU Accessories": "🔌",
  "Motherboards": "🔌",
  "Desktop RAM": "💾",
  "Laptop RAM": "💾",
  "NVMe SSD": "⚡",
  "SATA SSD": "💿",
  "HDD": "💿",
  "Storage Accessories": "💾",
  "PC Cases": "📦",
  "Case Fans": "🌬️",
  "PSU": "⚡",
  "PSU Accessories": "🔌",
  "AIO Liquid Coolers": "❄️",
  "Air Coolers": "🌬️",
  "Thermal Paste": "🧪",
  "Thermal Pads": "🌡️",
  "Liquid Metal": "🧪",
  "Monitors": "🖥️",
  "Monitor Stands Arms": "🔧",
  "Keyboards": "⌨️",
  "Mice": "🖱️",
  "Mousepads": "🖼️",
  "Earphones": "🎧",
  "Headsets": "🎧",
  "Microphones": "🎙️",
  "Speakers": "🔊",
  "Audio Accessories": "🎧",
  "Phone Cases": "📱",
  "Smartphones": "📱",
  "Tablets": "📟",
  "Mobile Accessories": "🔌",
  "Consoles": "🎮",
  "Controllers": "🕹️",
  "Console Games": "🎮",
  "Gaming Accessories": "🎮",
  "Smart Watches": "⌚",
  "TV & Chromecast": "📺",
  "LED Lights": "💡",
  "Servers": "🖥️",
  "Smart Home": "🏠",
  "Cables & Adapters": "🔌",
  "General": "🧸"
};

// Preferred display order for spec filters per category
const SPEC_ORDER = {
  "Monitors": ['Size', 'Resolution', 'Refresh Rate', 'Panel Type', 'Sync Tech', 'Curvature'],
  "Cooling Solutions": ['Cooler Type', 'Radiator Size', 'Fan Count', 'Fan Size', 'Lighting', 'Socket Support'],
  "AIO Liquid Coolers": ['Cooler Type', 'Radiator Size', 'Fan Count', 'Fan Size', 'Lighting', 'Socket Support'],
  "Air Coolers": ['Cooler Type', 'Radiator Size', 'Fan Count', 'Fan Size', 'Lighting', 'Socket Support'],
  "Audio": ['Use Type', 'Connection', 'Noise Cancellation', 'Surround Sound'],
  "Headsets": ['Use Type', 'Connection', 'Noise Cancellation', 'Surround Sound'],
  "Earphones": ['Use Type', 'Connection', 'Noise Cancellation', 'Surround Sound'],
  "Motherboards": ['Socket', 'Chipset', 'Form Factor', 'Memory Type', 'M.2 Slots'],
  "PC Cases": ['Form Factor', 'Window', 'Lighting', 'Included Fans', 'Color'],
  "Power Supplies": ['Wattage', 'Efficiency', 'Modularity', 'Form Factor'],
  "RAM": ['Generation', 'Capacity', 'Speed', 'Type'],
  "Desktop RAM": ['Generation', 'Capacity', 'Speed', 'Type'],
  "Laptop RAM": ['Generation', 'Capacity', 'Speed', 'Type'],
  "GPUs": ['Chip', 'Series', 'VRAM', 'Memory Type'],
  "CPUs": ['Platform', 'Socket', 'Cores', 'Base Clock', 'TDP', 'Cooler Included'],
  "Storage (SSDs/HDDs)": ['Type', 'Capacity', 'Interface', 'Speed'],
  "NVMe SSD": ['Type', 'Capacity', 'Interface', 'Speed'],
  "SATA SSD": ['Type', 'Capacity', 'Interface', 'Speed'],
  "HDD": ['Type', 'Capacity', 'Interface', 'Speed'],
  "Mice": ['Connection', 'Use Type', 'Max DPI', 'Lighting'],
  "Keyboards": ['Connection', 'Switch Type', 'Layout', 'Lighting'],
  "Laptops": ['Screen', 'Refresh Rate', 'Cores', 'VRAM']
};

// --- DOM Nodes ---
const desktopSearchInput = document.getElementById('desktop-search');
const mobileSearchInput = document.getElementById('mobile-search');
const categoryTabs = document.getElementById('category-tabs');
const sortSelect = document.getElementById('sort-select');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const storeFilters = document.getElementById('store-filters');
const productGrid = document.getElementById('product-grid');
const noProductsContainer = document.getElementById('no-products');
const resultCountEl = document.getElementById('result-count');
const activeCategoryTitle = document.getElementById('active-category-title');
const searchQueryDisplay = document.getElementById('search-query-display');
const searchQueryText = document.getElementById('search-query-text');
const resetFiltersBtn = document.getElementById('reset-filters');
const noProductsResetBtn = document.getElementById('no-products-reset');
const subcategoryTabs = document.getElementById('subcategory-tabs');
const landingSection = document.getElementById('landing-section');
const catalogSection = document.getElementById('catalog-section');
const logoHomeBtn = document.getElementById('logo-home-btn');

// Cart Elements
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCountBadge = document.getElementById('cart-count-badge');
const cartDownloadBtn = document.getElementById('cart-download-btn');
const cartDownloadExcelBtn = document.getElementById('cart-download-excel-btn');

// Dynamic Filters Elements
const inStockOnlyToggle = document.getElementById('in-stock-only');
const dynamicFiltersWrapper = document.getElementById('dynamic-filters-wrapper');
const dynamicFilters = document.getElementById('dynamic-filters');

// Modal Elements
const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalImageContainer = document.getElementById('modal-image-container');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalSpecs = document.getElementById('modal-specs');
const modalDescription = document.getElementById('modal-description');
const modalBestPrice = document.getElementById('modal-best-price');
const modalBestStore = document.getElementById('modal-best-store');
const modalSavingsText = document.getElementById('modal-savings-text');
const modalOffers = document.getElementById('modal-offers');

// --- Helper Functions ---
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getModelCodes(name) {
  // Extract alphanumeric codes that specify models (e.g., 9700X, 4060, B650, 14900KF, G502)
  const matches = name.match(/\b\d+[A-Za-z-]*\b|\b[A-Za-z-]*\d+\b/g);
  return matches ? matches.map(m => m.toLowerCase()) : [];
}

function getBrandName(name) {
  const lowercase = name.toLowerCase();
  const brands = ['amd', 'intel', 'asus', 'msi', 'gigabyte', 'logitech', 'razer', 'corsair', 'hyperx', 'kingston', 'lexar', 'samsung', 'crucial', 'nzxt', 'deepcool', 'cougar', 'thermaltake', 'fantech', 'redragon', 'nvidia', 'g.skill'];
  for (const b of brands) {
    if (lowercase.includes(b)) return b;
  }
  return null;
}

/**
 * Finds alternative prices for the same physical product model in other stores.
 */
function findSimilarProducts(targetProduct) {
  const targetName = targetProduct.name.toLowerCase();
  const targetBrand = getBrandName(targetProduct.name);
  const targetModels = getModelCodes(targetProduct.name);

  return window.products.filter(p => {
    // 1. Must be in the same category
    const hasSharedCat = p.categories.some(c => targetProduct.categories.includes(c));
    if (!hasSharedCat) return false;

    // 2. If brands are detected, they must match
    const pBrand = getBrandName(p.name);
    if (targetBrand && pBrand && targetBrand !== pBrand) return false;

    // 3. If specific model codes exist, they must overlap
    const pModels = getModelCodes(p.name);
    if (targetModels.length > 0 && pModels.length > 0) {
      const hasOverlap = targetModels.some(m => pModels.includes(m));
      if (!hasOverlap) return false;
    }

    // 4. Word-based token matching fallback
    const words = targetName
      .replace(/[(),\-+]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !['pro', 'cpu', 'tray', 'box', 'processor', 'series', 'gaming', 'black', 'white', 'edition'].includes(w));

    if (words.length === 0) return p.name.toLowerCase() === targetName;

    const matches = words.filter(w => p.name.toLowerCase().includes(w));
    const threshold = Math.min(3, Math.ceil(words.length * 0.6));
    return matches.length >= threshold;
  });
}

// --- App Initialization ---
function init() {
  if (!window.products || !window.STORES) {
    console.error('Data not loaded from products.js');
    return;
  }

  refreshDynamicSchema();
  clearCategoryCountCache();

  // Pre-fill selectedStores with all available stores
  selectedStores = [...window.STORES];

  // Set default values based on loaded products
  const allPrices = window.products.map(p => p.price);
  const maxPriceInDataset = allPrices.length > 0 ? Math.max(...allPrices) : 3000;
  priceMax = Math.ceil(maxPriceInDataset);
  priceMaxInput.value = priceMax;

  // Render initial components
  // Set category from URL hash if present
  const hash = window.location.hash;
  if (hash && hash.toLowerCase() !== '#home') {
    const match = hash.match(/^#category=(.+)$/);
    if (match) {
      activeCategory = decodeURIComponent(match[1]);
    }
  }

  renderCategoryTabs();
  renderStoreFilters();
  renderDynamicFilters();
  applyFiltersAndRender();
  renderCart();

  // Listen to hash changes
  window.addEventListener('hashchange', handleHashChange);

  // Setup Event Listeners
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCart);
  if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
  if (cartDownloadBtn) cartDownloadBtn.addEventListener('click', downloadCartTxt);
  if (cartDownloadExcelBtn) cartDownloadExcelBtn.addEventListener('click', downloadCartExcel);
  desktopSearchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    mobileSearchInput.value = searchQuery;
    applyFiltersAndRender();
  });

  mobileSearchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    desktopSearchInput.value = searchQuery;
    applyFiltersAndRender();
  });

  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    applyFiltersAndRender();
  });

  priceMinInput.addEventListener('change', (e) => {
    priceMin = Number(e.target.value) || 0;
    applyFiltersAndRender();
  });

  priceMaxInput.addEventListener('change', (e) => {
    priceMax = Number(e.target.value) || 3000;
    applyFiltersAndRender();
  });

  if (logoHomeBtn) {
    logoHomeBtn.addEventListener('click', () => {
      resetAllFilters();
      window.location.hash = 'Home';
    });
  }
  resetFiltersBtn.addEventListener('click', resetAllFilters);
  noProductsResetBtn.addEventListener('click', resetAllFilters);

  inStockOnlyToggle.addEventListener('change', (e) => {
    inStockOnly = e.target.checked;
    currentPage = 1;
    applyFiltersAndRender();
  });

  modalClose.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
  });

  // Handle scroll for lazy loading
  window.addEventListener('scroll', handleScroll);

  // Spec pill click delegation — clicking a pill on any card instantly applies that spec filter
  productGrid.addEventListener('click', (e) => {
    const pill = e.target.closest('.spec-pill');
    if (!pill) return;
    const key = pill.dataset.key;
    const val = pill.dataset.val;
    const cat = pill.dataset.cat;
    if (!key || !val) return;
    applySpecFilter(cat, key, val);
  });
}

// --- Cart Functions ---
function toggleCart() {
  cartSidebar.classList.toggle('translate-x-full');
  cartOverlay.classList.toggle('hidden');
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('righub_cart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('righub_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  if (!cartCountBadge || !cartItemsContainer) return;

  cartCountBadge.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div id="cart-empty-state" class="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50 py-10">
        <span class="text-4xl">🛒</span>
        <p class="text-sm font-medium text-slate-400">Your build is empty.</p>
      </div>
    `;
    cartTotalPrice.textContent = 'JOD 0.00';
    cartDownloadBtn.disabled = true;
    cartDownloadBtn.classList.add('opacity-50', 'cursor-not-allowed');
    return;
  }

  cartDownloadBtn.disabled = false;
  cartDownloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-3';

    const imgHtml = item.image
      ? `<img src="${item.image}" alt="${escHtml(item.name)}" class="h-12 w-12 rounded object-contain bg-slate-900/40">`
      : `<div class="flex h-12 w-12 items-center justify-center rounded bg-slate-900/40 text-xl">🖥️</div>`;

    itemEl.innerHTML = `
      ${imgHtml}
      <div class="flex-1 min-w-0">
        <h4 class="truncate text-xs font-semibold text-white" title="${escHtml(item.name)}">${escHtml(item.name)}</h4>
        <p class="text-[10px] text-purple-400">${escHtml(item.category)} • ${escHtml(item.store)}</p>
        <p class="mt-1 text-sm font-black text-emerald-400">JOD ${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-item-btn flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-900/30 text-red-400 hover:bg-red-900/60 transition" data-index="${index}">✕</button>
    `;

    itemEl.querySelector('.remove-item-btn').addEventListener('click', () => {
      removeFromCart(index);
    });

    cartItemsContainer.appendChild(itemEl);
  });

  cartTotalPrice.textContent = `JOD ${total.toFixed(2)}`;
  updateBuildHelper();
}

function updateBuildHelper() {
  const helperEl = document.getElementById('cart-build-helper');
  if (!helperEl) return;

  let cpu = null;
  let gpu = null;
  let psu = null;

  cart.forEach(item => {
    const cat = item.category;
    if (cat === 'CPU') cpu = item;
    if (cat === 'GPU') gpu = item;
    if (cat === 'PSU') psu = item;
  });

  if (!cpu && !gpu) {
    helperEl.classList.add('hidden');
    return;
  }

  helperEl.classList.remove('hidden');

  // Estimate CPU TDP
  let cpuTdp = 65;
  if (cpu) {
    const name = cpu.name.toLowerCase();
    if (name.includes('i9') || name.includes('ryzen 9') || name.includes('ultra 9') || name.includes('threadripper') || name.includes('14900') || name.includes('13900')) {
      cpuTdp = 170;
    } else if (name.includes('i7') || name.includes('ryzen 7') || name.includes('ultra 7') || name.includes('14700') || name.includes('13700')) {
      cpuTdp = 125;
    } else if (name.includes('i5') || name.includes('ryzen 5') || name.includes('ultra 5')) {
      cpuTdp = 85;
    }
    if (cpu.specs && cpu.specs['TDP']) {
      const parsedTdp = parseInt(cpu.specs['TDP']);
      if (!isNaN(parsedTdp)) cpuTdp = parsedTdp;
    }
  }

  // Estimate GPU TDP
  let gpuTdp = 0;
  if (gpu) {
    const name = gpu.name.toLowerCase();
    if (name.includes('4090') || name.includes('7900 xtx') || name.includes('3090') || name.includes('5090')) {
      gpuTdp = 450;
    } else if (name.includes('4080') || name.includes('7900 xt') || name.includes('3080') || name.includes('4070 ti super') || name.includes('5080')) {
      gpuTdp = 320;
    } else if (name.includes('4070 super') || name.includes('4070 ti') || name.includes('4070') || name.includes('7800 xt') || name.includes('3070') || name.includes('5070')) {
      gpuTdp = 220;
    } else if (name.includes('4060') || name.includes('7600') || name.includes('3060') || name.includes('5060')) {
      gpuTdp = 130;
    }
    if (gpu.specs && gpu.specs['VRAM']) {
      const vram = parseInt(gpu.specs['VRAM']);
      if (vram >= 16 && gpuTdp === 0) gpuTdp = 300;
      else if (vram >= 12 && gpuTdp === 0) gpuTdp = 200;
      else if (gpuTdp === 0) gpuTdp = 150;
    } else if (gpuTdp === 0) {
      gpuTdp = 200;
    }
  }

  const overhead = 120; // overhead for standard parts
  const totalTdp = (cpu ? cpuTdp : 0) + gpuTdp + overhead;
  const recommendedPsu = Math.ceil((totalTdp * 1.3) / 50) * 50;
  const minimumPsu = Math.max(500, recommendedPsu);

  let psuWarning = '';
  let psuStatusClass = 'text-purple-400';

  if (psu) {
    let userPsuWattage = 0;
    const name = psu.name.toLowerCase();
    const wattMatch = name.match(/(\d{3,4})\s*w/);
    if (wattMatch) {
      userPsuWattage = parseInt(wattMatch[1]);
    } else if (psu.specs && psu.specs['Wattage']) {
      userPsuWattage = parseInt(psu.specs['Wattage']);
    }

    if (userPsuWattage > 0) {
      if (userPsuWattage < totalTdp) {
        psuWarning = `⚠️ Your PSU (${userPsuWattage}W) is too weak for this system (needs min ${totalTdp}W).`;
        psuStatusClass = 'text-red-400 font-bold';
      } else if (userPsuWattage < minimumPsu) {
        psuWarning = `⚠️ Your PSU (${userPsuWattage}W) is sufficient but lacks safety headroom (recommended: ${minimumPsu}W).`;
        psuStatusClass = 'text-amber-400';
      } else {
        psuWarning = `✅ Your PSU (${userPsuWattage}W) is compatible and has plenty of headroom!`;
        psuStatusClass = 'text-emerald-400';
      }
    }
  }

  let html = `
    <div class="font-bold text-white mb-1.5 flex items-center justify-between">
      <span>🛠️ Build Helper</span>
      <span class="text-[10px] uppercase tracking-wider text-slate-500">Power Check</span>
    </div>
    <div class="space-y-1">
  `;

  if (cpu && gpu) {
    html += `
      <div class="flex justify-between">
        <span class="text-slate-400">Est. Power Draw:</span>
        <span class="font-semibold text-white">${totalTdp}W</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-400 font-medium">Recommended PSU:</span>
        <span class="font-bold text-cyan-400">${minimumPsu}W+</span>
      </div>
    `;
  } else if (cpu) {
    html += `
      <div class="flex justify-between">
        <span class="text-slate-400">Est. CPU TDP:</span>
        <span class="font-semibold text-white">${cpuTdp}W</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-400 font-medium">Recommended PSU:</span>
        <span class="font-bold text-cyan-400">${Math.max(500, Math.ceil((cpuTdp + 150) * 1.3 / 50) * 50)}W+</span>
      </div>
    `;
  } else if (gpu) {
    html += `
      <div class="flex justify-between">
        <span class="text-slate-400">Est. GPU TDP:</span>
        <span class="font-semibold text-white">${gpuTdp}W</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-400 font-medium">Recommended PSU:</span>
        <span class="font-bold text-cyan-400">${Math.max(500, Math.ceil((gpuTdp + 150) * 1.3 / 50) * 50)}W+</span>
      </div>
    `;
  }

  if (psuWarning) {
    html += `<div class="mt-2 pt-2 border-t border-purple-500/20 ${psuStatusClass}">${psuWarning}</div>`;
  } else if (cpu || gpu) {
    html += `<div class="mt-2 pt-2 border-t border-purple-500/20 text-slate-400">No PSU added to your build yet.</div>`;
  }

  html += `</div>`;
  helperEl.innerHTML = html;
}


function downloadCartTxt() {
  if (cart.length === 0) return;

  let content = `
 ____  ___ ____   _   _ _   _ ____  
|  _ \\|_ _/ ___| | | | | | | | __ ) 
| |_) || | |  _  | |_| | | | |  _ \\ 
|  _ < | | |_| | |  _  | |_| | |_) |
|_| \\_\\___\\____| |_| |_|\\___/|____/ 
                                    

 ______   __  _____ __  __ _  __  _____  __  __   ____ 
| __ ) \\ / / |___ /|  \\/  | |/ / |  ___| \\ \\/ /  / ___|
|  _ \\\\ V /    |_ \\| |\\/| | ' /  | |_     \\  /  | |  _ 
| |_) || |    ___) | |  | | . \\  |  _|    /  \\  | |_| |
|____/ |_|   |____/|_|  |_|_|\\_\\ |_|     /_/\\_\\  \\____|

======================================================================
`;


  // Group cart items by category
  const groupedCart = {};
  cart.forEach(item => {
    const cat = item.category.toUpperCase();
    if (!groupedCart[cat]) groupedCart[cat] = [];
    groupedCart[cat].push(item);
  });

  // Generate formatted text
  for (const [category, items] of Object.entries(groupedCart)) {
    content += `[ ${category} ]\n`;
    content += `--------------------------------------------------\n`;

    items.forEach(item => {
      const stockStatus = item.inStock ? "IN STOCK" : "OUT OF STOCK";
      const desc = item.description ? item.description.replace(/\n/g, ' ') : 'No description';
      content += `Name        : ${item.name}\n`;
      content += `Status      : ${stockStatus}\n`;
      content += `Price       : JOD ${item.price.toFixed(2)}\n`;
      content += `Store       : ${item.store}\n`;
      content += `URL         : ${item.url || 'No URL'}\n`;
      content += `Description : ${desc}\n\n`;
    });
  }

  // Add Total Price at the bottom
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  content += `==================================================\n`;
  content += `TOTAL PRICE : JOD ${total.toFixed(2)}\n`;
  content += `==================================================\n`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '3MK F X G .TXT';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadCartExcel() {
  if (cart.length === 0) return;

  const escapeXml = str => (str || '').replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>3MK PC Build</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>
  body { font-family: Arial, sans-serif; }
  table { border-collapse: collapse; width: 100%; }
  th { background-color: #0f172a; color: #ffffff; font-weight: bold; border: 1px solid #334155; padding: 10px; text-align: left; }
  td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; vertical-align: top; }
  .number { text-align: right; }
  .total-row td { background-color: #1e293b; color: #38bdf8; font-weight: bold; font-size: 13px; border: 1px solid #0f172a; }
</style>
</head>
<body>
<h2>3MK RigHub — PC Build Cart Summary</h2>
<table border="1">
  <thead>
    <tr>
      <th>#</th>
      <th>Main Category</th>
      <th>Subcategory</th>
      <th>Product Name</th>
      <th>Price (JOD)</th>
      <th>Store</th>
      <th>Stock Status</th>
      <th>Product Link</th>
    </tr>
  </thead>
  <tbody>`;

  cart.forEach((item, idx) => {
    const parentCat = item.parentCategory || item.parent_category || 'General';
    const cat = item.category || '';
    const name = item.name || '';
    const price = typeof item.price === 'number' ? item.price.toFixed(2) : "0.00";
    const store = item.store || '';
    const stock = item.inStock ? "IN STOCK" : "OUT OF STOCK";
    const url = item.url || '';

    html += `
    <tr>
      <td>${idx + 1}</td>
      <td>${escapeXml(parentCat)}</td>
      <td>${escapeXml(cat)}</td>
      <td>${escapeXml(name)}</td>
      <td class="number">${price}</td>
      <td>${escapeXml(store)}</td>
      <td>${stock}</td>
      <td><a href="${escapeXml(url)}">${escapeXml(url)}</a></td>
    </tr>`;
  });

  html += `
    <tr class="total-row">
      <td colspan="4" style="text-align: right;">TOTAL PRICE:</td>
      <td class="number">JOD ${total.toFixed(2)}</td>
      <td colspan="3"></td>
    </tr>
  </tbody>
</table>
</body>
</html>`;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '3MK_PC_Build.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Apply a spec filter by clicking a pill — sets the category, spec value, and re-renders
function applySpecFilter(category, key, value) {
  if (category && activeCategory !== category) {
    activeCategory = category;
    selectedBrand = 'All';
    selectedSpecs = {};
  }
  selectedSpecs[key] = value;
  currentPage = 1;
  renderCategoryTabs();
  applyFiltersAndRender();
  // Scroll sidebar into view so the user can see the active filter
  dynamicFiltersWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetAllFilters() {
  searchQuery = '';
  activeCategory = 'All';
  sortBy = 'price-asc';
  priceMin = 0;
  selectedBrand = 'All';
  selectedSpecs = {};
  inStockOnly = false;

  window.location.hash = 'Home';

  const allPrices = window.products.map(p => p.price);
  priceMax = Math.ceil(allPrices.length > 0 ? Math.max(...allPrices) : 3000);

  desktopSearchInput.value = '';
  mobileSearchInput.value = '';
  sortSelect.value = 'price-asc';
  priceMinInput.value = 0;
  priceMaxInput.value = priceMax;
  selectedStores = [...window.STORES];
  if (inStockOnlyToggle) inStockOnlyToggle.checked = false;

  renderCategoryTabs();
  renderStoreFilters();
  renderDynamicFilters();
  applyFiltersAndRender();
}

// --- Render UI Components ---
const DEFAULT_SCHEMA_GROUPS = {
  "Desktop Computers & Workstations": [
    "Gaming PCs", "Prebuilt Desktops", "Pre-Built Desktop PCs", "Pre-built PC",
    "Workstation PCs", "Workstations", "Mini PCs", "Mini PC", "Desktop PCs",
    "Desktop PCs & Workstations", "Gaming Desktop PCs", "Gaming Desktops",
    "Business Desktops & Workstations", "All-in-One", "All-in-One PCs", "Servers", "Thin Clients"
  ],
  "Laptops & Portable Computers": [
    "Gaming Laptops", "Business Laptops", "Student/Home Laptops", "Student & Home Laptops",
    "Ultrabooks & Lightweight", "Ultrabooks", "2-in-1 Convertibles", "2-in-1",
    "2-in-1 Convertible Laptops", "2-in-1 Laptops", "Laptops", "Laptops & Notebooks",
    "Creator Laptops", "Chromebooks", "Laptop RAM"
  ],
  "Tablets & iPads": [
    "iPad Models", "Apple iPads", "Android Tablets", "Tablets", "Smartphones & Tablets",
    "E-Readers", "Stylus & Accessories", "Smart Pens", "Tablet Cases & Covers",
    "iPad & Tablet Cases", "Tablet Accessories"
  ],
  "PC Components": [
    "Processors (CPUs)", "CPUs", "Processors", "CPU", "AMD CPUs", "Intel CPUs", "AMD", "Intel",
    "Graphics Cards (GPUs)", "Graphics Cards", "GPUs", "GPU Cards", "NVIDIA GPUs", "AMD GPUs", "Intel Arc GPUs", "NVIDIA", "Intel Arc",
    "Motherboards", "Memory (RAM)", "RAM", "RAM & Memory", "Desktop RAM", "Other Memory",
    "Storage Devices", "NVMe SSDs", "NVMe SSD", "SATA SSDs", "SATA SSD", "Internal SSDs", "SSDs", "HDDs", "HDD",
    "Power Supplies", "Power Supplies (PSU)", "PSU", "PC Cases", "Computer Cases", "Expansion Cards", "PC Accessories", "GPU Accessories"
  ],
  "Peripherals & Input Devices": [
    "Keyboards", "Keyboards & Mice", "Wired Gaming Keyboards", "Wireless Gaming Keyboards",
    "Office Keyboards", "Keyboard & Mouse Combos", "Mechanical Keyboards", "Membrane Keyboards",
    "Ergonomic Keyboards", "Mechanical", "Membrane", "Ergonomic",
    "Mice", "Wired Gaming Mice", "Wireless Gaming Mice", "Ergonomic & Office Mice",
    "Office & Wireless Mice", "Gaming Mice", "Wireless Mice", "Ergonomic Mice",
    "Mousepads", "Mouse Pads & Desk Mats", "Gamepads & Controllers", "Controllers",
    "PS5 Controllers", "PS4 Controllers", "Xbox Controllers", "Universal Game Controllers",
    "Steering Wheels & Racing Equipment", "Racing Wheels", "Racing Wheels & Sim Accessories",
    "Webcams", "Scanner & Barcode Readers", "Barcode Scanners", "Barcode Scanners & Industrial Mobile",
    "Drawing Tablets", "Card Readers"
  ],
  "Displays & Monitors": [
    "Gaming Monitors", "Professional Monitors", "Business/Office Monitors", "Office Monitors",
    "Office & Home Monitors", "Curved Monitors", "Portable Monitors", "Monitors", "Monitors & Displays",
    "TV Screens & Large Displays", "TVs", "Smart TVs", "Projectors", "Led Projector", "Digital Signage",
    "Monitor Stands & Mounts", "Monitor Arms", "Monitor Stands Arms", "Monitor Accessories"
  ],
  "Audio & Sound": [
    "Headphones", "Headsets", "Earphones", "Wireless Headphones", "Wired Headphones",
    "Over-Ear Headphones", "Over-Ear", "On-Ear Headphones", "On-Ear", "Studio Headphones", "Studio",
    "Gaming Headphones", "Gaming Headsets", "Earbuds", "Earbuds & In-Ear", "True Wireless",
    "True Wireless Earbuds", "True Wireless Earbuds (TWS)", "Wired Earbuds", "Sports Earbuds", "Sports",
    "Open-Ear & Clip-On Earbuds", "Microphones", "USB Streaming Microphones", "Speakers",
    "Speakers & Soundbars", "Bluetooth Speakers", "Bluetooth", "Bookshelf Speakers", "Bookshelf",
    "Portable Speakers", "Portable", "Smart Speakers", "Soundbars", "Audio Interfaces & Mixers",
    "DACs", "Amplifiers", "Headphone Stands", "Microphone Stands & Boom Arms", "Microphone Arms",
    "Microphone Accessories", "Audio Accessories", "Audio Cables & Connectors"
  ],
  "Gaming & Consoles": [
    "Gaming Consoles", "Consoles", "PlayStation Consoles", "Xbox Consoles", "Handheld Consoles",
    "Handheld Gaming Consoles", "VR Headsets", "Console Accessories", "Gaming Accessories",
    "Gaming Peripherals & Accessories", "Gaming Decor & Lighting"
  ],
  "Cameras & Imaging": [
    "Action Cameras", "Action Cameras & Dashcams", "Instant Cameras (Instax)", "360 Degree Cameras",
    "Digital Cameras", "Cameras", "DSLR", "Mirrorless", "Security Cameras", "Dash Cameras",
    "Lenses", "Camera Lenses & Filters", "Tripods", "Tripods & Stands", "Lighting", "Ring Lights",
    "Camera Accessories", "Camera Mounts", "Camera Cases & Bags"
  ],
  "Networking & Connectivity": [
    "Routers", "Routers & Mesh WiFi", "Mesh Systems", "Switches", "Network Switches",
    "Access Points", "Modems", "Network Cards", "WiFi Adapters & Dongles", "Wireless Adapters",
    "NAS", "Networking Accessories", "Networking & Connectivity"
  ],
  "Power & Charging": [
    "Power Banks", "Wall Chargers", "Portable Chargers", "Chargers", "Chargers & Power Adapters",
    "Wireless Chargers", "Surge Protectors", "Surge Protectors & Power Strips", "UPS",
    "UPS & Power Protection", "Power Adapters", "Batteries", "PSU Accessories"
  ],
  "Mobile Devices & Accessories": [
    "Smartphones", "Android Smartphones", "Phone Accessories", "Phone & Tablet Accessories",
    "Phone Cases & Covers", "Phone Cases", "Screen & Lens Protectors", "Smartwatches & Wearables",
    "Smartwatches", "Smart Watches", "Android & Universal Smartwatches", "Fitness Trackers",
    "Smart Bands & Fitness Trackers", "Smart Rings", "Wearables", "Wearable Accessories",
    "Watch Bands & Straps", "AirTags & Tracking Devices"
  ],
  "Smart Home & IoT": [
    "Smart Home", "Smart Home & Appliances", "Smart Lighting", "Smart Plugs", "Smart Locks",
    "Smart Sensors", "Smart Displays", "Smart Thermostats", "Smart Hubs", "Smart Security", "Smart Kitchen Appliances"
  ],
  "Printers & Office Equipment": [
    "Printers", "Printers & Scanners", "Laser Printers", "Inkjet Printers", "All-in-One Printers",
    "Scanners", "Label Printers", "Ink", "Printer Consumables", "Toner", "Office Supplies",
    "Office Accessories", "Office Equipment", "Shredders"
  ],
  "Laptop & Computer Accessories": [
    "Laptop Stands", "Laptop Stands & Mounts", "Laptop Cooling Pads", "Laptop Bags & Sleeves",
    "Bags & Sleeves", "Laptop Accessories", "Docking Stations", "USB Hubs & Docking Stations"
  ],
  "Cables & Connectivity Solutions": [
    "Cables & Adapters", "Cables, Adapters & Hubs", "USB", "USB & Charging Cables",
    "HDMI", "HDMI & Display Cables", "DisplayPort", "Ethernet", "Ethernet Cables",
    "Audio Cables", "SATA", "Power Cables", "Video Adapters", "USB Adapters", "USB Hubs",
    "OTG & Connectivity Adapters"
  ],
  "Cooling & Thermal Solutions": [
    "CPU Coolers", "AIO Liquid Coolers", "AIO Coolers", "Air Coolers", "CPU/Case Coolers",
    "Case Fans", "PC Fans & Cooling", "Thermal Paste", "Thermal Pads", "Liquid Metal",
    "Thermal Shield", "Cooling Accessories", "Custom Water Cooling"
  ],
  "Streaming & Content Creation": [
    "Capture Cards", "accessories_capture-card", "Stream Decks", "Streaming Equipment"
  ],
  "Software & Licenses": [
    "Software", "Operating Systems"
  ],
  "Furniture & Workspace": [
    "Gaming Chairs", "Gaming Desks"
  ],
  "Miscellaneous Tech Accessories": [
    "Storage", "External SSD", "External HDD", "External Storage", "USB Flash Drives",
    "Memory Cards", "MicroSD", "NAS Drives", "Backup Devices", "Storage Accessories",
    "Mounts & Holders", "Screen Protectors", "Skins & Covers", "Stands", "Travel Accessories",
    "Other Accessories", "Accessories", "all Accessories", "General Electronics", "General"
  ],
  "Apple Ecosystem": [
    "Apple iPhones", "Apple Watch", "MacBooks", "AirPods", "Apple TV"
  ]
};

function buildDynamicSchemaGroups() {
  const dynamicGroups = {};

  for (const [parent, subcats] of Object.entries(DEFAULT_SCHEMA_GROUPS)) {
    dynamicGroups[parent] = new Set(subcats);
  }

  if (Array.isArray(window.products)) {
    window.products.forEach(p => {
      const pcat = (p.parent_category || p.parentCategory1 || '').trim();
      const cat = (p.category || p.category1 || p.subcategory || '').trim();

      if (pcat && pcat !== "NULL" && pcat !== "None" && pcat !== "Unassigned" && pcat !== "other gadgets") {
        if (!dynamicGroups[pcat]) {
          dynamicGroups[pcat] = new Set();
        }
        if (cat && cat !== "NULL" && cat !== "None" && cat !== "Unassigned" && cat !== "All other" && cat !== pcat) {
          dynamicGroups[pcat].add(cat);
        }
      }
    });
  }

  const result = {};
  Object.keys(dynamicGroups).sort().forEach(parent => {
    result[parent] = Array.from(dynamicGroups[parent]).sort();
  });

  return result;
}

let SCHEMA_GROUPS = buildDynamicSchemaGroups();

function refreshDynamicSchema() {
  SCHEMA_GROUPS = buildDynamicSchemaGroups();
  window.SCHEMA_GROUPS = SCHEMA_GROUPS;
}

window.SCHEMA_GROUPS = SCHEMA_GROUPS;

const parentIcons = {
  "Desktop Computers & Workstations": "🖥️",
  "Laptops & Portable Computers": "💻",
  "Tablets & iPads": "📱",
  "PC Components": "⚙️",
  "Peripherals & Input Devices": "⌨️",
  "Displays & Monitors": "📺",
  "Audio & Sound": "🎧",
  "Gaming & Consoles": "🎮",
  "Cameras & Imaging": "📷",
  "Networking & Connectivity": "🌐",
  "Power & Charging": "⚡",
  "Mobile Devices & Accessories": "📱",
  "Smart Home & IoT": "🏠",
  "Printers & Office Equipment": "🖨️",
  "Laptop & Computer Accessories": "💼",
  "Cables & Connectivity Solutions": "🔌",
  "Cooling & Thermal Solutions": "❄️",
  "Streaming & Content Creation": "🎙️",
  "Software & Licenses": "💾",
  "Furniture & Workspace": "🪑",
  "Miscellaneous Tech Accessories": "🧰",
  "Apple Ecosystem": "🍎"
};

// --- Category Item Counter with Caching ---
const _categoryCountCache = new Map();

function countProductsForCategory(catName) {
  if (!catName) return 0;
  if (_categoryCountCache.has(catName)) {
    return _categoryCountCache.get(catName);
  }
  let count = 0;
  if (Array.isArray(window.products)) {
    for (let i = 0; i < window.products.length; i++) {
      if (isCategoryMatch(window.products[i], catName)) {
        count++;
      }
    }
  }
  _categoryCountCache.set(catName, count);
  return count;
}

function clearCategoryCountCache() {
  _categoryCountCache.clear();
}

// --- Render UI Components ---
function renderLandingPage() {
  if (!landingSection) return;

  // Calculate counts per store
  const storeCounts = {};
  window.products.forEach(p => {
    storeCounts[p.store] = (storeCounts[p.store] || 0) + 1;
  });

  // Let's create store cards
  let storesHtml = '';
  const storeKeysByDisplay = {};
  window.products.forEach(p => {
    if (p.store && p.storeKey) {
      storeKeysByDisplay[p.store] = p.storeKey;
    }
  });

  window.STORES.forEach(storeName => {
    const storeKey = storeKeysByDisplay[storeName] || storeName;
    const color = window.STORE_COLORS[storeName] || '#7C3AED';
    const count = storeCounts[storeName] || 0;

    storesHtml += `
      <div 
        class="store-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/25 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60 cursor-pointer select-none"
        style="--store-color: ${color}; hover: border-color: ${color}60;"
        data-store="${escHtml(storeName)}"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--store-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl overflow-hidden shadow-md bg-slate-950 border border-slate-800/80">
            <img 
              referrerpolicy="no-referrer"
              src="${STORE_LOGOS[storeKey] || 'https://www.google.com/s2/favicons?sz=128&domain=' + (STORE_DOMAINS[storeKey] || 'google.com')}" 
              alt="${escHtml(storeName)} Logo" 
              class="h-full w-full object-contain p-1"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >
            <div class="hidden h-full w-full items-center justify-center font-bold text-white text-xs" style="background-color: ${color}">
              ${storeName.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div class="min-w-0">
            <h4 class="text-xs font-black text-white truncate group-hover:text-[var(--store-color)] transition-colors">${escHtml(storeName)}</h4>
            <p class="text-[10px] text-slate-500 font-medium">${count.toLocaleString()} products</p>
          </div>
        </div>
      </div>
    `;
  });

  // Categories list (ONLY showing categories and subcategories that have items)
  let catsHtml = `
    <div 
      class="cat-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-900/40 bg-gradient-to-b from-slate-900/50 to-slate-950/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-950/40 cursor-pointer select-none text-center"
      data-cat="AllProducts"
    >
      <div class="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">📦</div>
      <div>
        <h4 class="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">All Products</h4>
        <p class="mt-1 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">${window.products.length.toLocaleString()} Items</p>
      </div>
    </div>
  `;

  Object.entries(SCHEMA_GROUPS).forEach(([parent, subcats]) => {
    const icon = parentIcons[parent] || "🖥️";
    const count = countProductsForCategory(parent);

    // Skip parent categories with 0 items
    if (count === 0) return;

    // Filter subcategories that have items > 0
    const validSubcats = subcats
      .map(sub => ({ name: sub, count: countProductsForCategory(sub) }))
      .filter(s => s.count > 0);

    let subcatPillsHtml = '';
    if (validSubcats.length > 0) {
      subcatPillsHtml = `
        <div class="mt-3.5 flex flex-wrap justify-center gap-1 border-t border-slate-800/80 pt-2.5">
          ${validSubcats.slice(0, 4).map(s => `
            <span class="subcat-pill px-2 py-0.5 text-[10px] font-medium rounded-lg bg-slate-900/80 text-cyan-400/90 border border-slate-800 hover:border-cyan-500/50 hover:text-white transition-all cursor-pointer" data-sub="${escHtml(s.name)}">
              ${escHtml(s.name)} <span class="opacity-60 text-[9px]">(${s.count.toLocaleString()})</span>
            </span>
          `).join('')}
          ${validSubcats.length > 4 ? `<span class="px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">+${validSubcats.length - 4} more</span>` : ''}
        </div>
      `;
    }

    catsHtml += `
      <div 
        class="cat-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-900/40 bg-gradient-to-b from-slate-900/50 to-slate-950/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-950/40 cursor-pointer select-none text-center"
        data-cat="${escHtml(parent)}"
      >
        <div class="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">${icon}</div>
        <div>
          <h4 class="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">${escHtml(parent)}</h4>
          <p class="mt-1 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">${count.toLocaleString()} Items</p>
          ${subcatPillsHtml}
        </div>
      </div>
    `;
  });

  landingSection.innerHTML = `
    <!-- Hero / Intro -->
    <div class="text-center max-w-4xl mx-auto space-y-6">
      <div class="inline-flex items-center gap-2.5 rounded-full bg-blue-500/15 border-2 border-blue-500/40 px-6 py-2.5 text-sm font-bold text-blue-200 shadow-lg shadow-blue-500/10">
        <span class="relative flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
        </span>
        <span>${products.length.toLocaleString()} Items</span>
      </div>
      <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
        Jordan's Ultimate <span class="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">PC Hardware</span> Platform
      </h1>
      <p class="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-medium">
        We scanned <span class="text-white font-bold">21 local websites in Jordan</span> and compiled them into one unified, super-fast catalog. Compare pricing, verify stock, and find exactly what you need in milliseconds.
      </p>
    </div>

    <!-- Stores Logos Grid -->
    <div class="space-y-6">
      <h3 class="text-xs font-black uppercase tracking-widest text-slate-500 text-center border-b border-slate-900 pb-3 max-w-md mx-auto">
        Scanned Jordan Merchants
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        ${storesHtml}
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="space-y-6 pt-4">
      <h3 class="text-xs font-black uppercase tracking-widest text-slate-500 text-center border-b border-slate-900 pb-3 max-w-md mx-auto">
        Browse by Category
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        ${catsHtml}
      </div>
    </div>
  `;

  // Attach event listeners
  landingSection.querySelectorAll('.store-card').forEach(card => {
    card.addEventListener('click', () => {
      const storeName = card.dataset.store;
      selectedStores = [storeName];
      activeCategory = 'All';
      currentPage = 1;
      renderStoreFilters();
      searchQuery = '';
      desktopSearchInput.value = '';
      mobileSearchInput.value = '';
      applyFiltersAndRender();
    });
  });

  landingSection.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      window.location.hash = 'category=' + encodeURIComponent(cat);
    });
  });

  landingSection.querySelectorAll('.subcat-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const sub = pill.dataset.sub;
      window.location.hash = 'category=' + encodeURIComponent(sub);
    });
  });
}

function renderCategoryTabs() {
  if (!categoryTabs) return;
  categoryTabs.innerHTML = '';

  const totalProductCount = window.products ? window.products.length : 0;

  // 1. Render 'Home / Intro' button
  const isAllActive = activeCategory === 'All';
  const allBtn = document.createElement('button');
  allBtn.className = `flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all mb-1 ${isAllActive
    ? "active-theme-tab border"
    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
    }`;
  allBtn.innerHTML = `<span>🏠 &nbsp;Home / Intro</span>`;
  allBtn.addEventListener('click', () => {
    window.location.hash = 'Home';
  });
  categoryTabs.appendChild(allBtn);

  // 2. Render 'All Products' button
  const isAllProductsActive = activeCategory === 'AllProducts';
  const allProductsBtn = document.createElement('button');
  allProductsBtn.className = `flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all mb-2 ${isAllProductsActive
    ? "active-theme-tab border"
    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
    }`;
  allProductsBtn.innerHTML = `<span>📦 &nbsp;All Products</span> <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold border border-slate-700/60">${totalProductCount.toLocaleString()}</span>`;
  allProductsBtn.addEventListener('click', () => {
    window.location.hash = 'category=AllProducts';
  });
  categoryTabs.appendChild(allProductsBtn);

  // Divider
  const divider = document.createElement('div');
  divider.className = 'my-2 border-t border-slate-800/80';
  categoryTabs.appendChild(divider);

  // 3. Render Parent Categories and Subcategories (ONLY categories with items > 0)
  Object.entries(SCHEMA_GROUPS).forEach(([parent, subcats]) => {
    const parentCount = countProductsForCategory(parent);

    // SKIP ANY PARENT CATEGORY WITH 0 ITEMS
    if (parentCount === 0) return;

    const isParentActive = activeCategory === parent || subcats.includes(activeCategory);

    const groupContainer = document.createElement('div');
    groupContainer.className = 'mb-1';

    const parentHeader = document.createElement('button');
    parentHeader.className = `flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all text-left ${isParentActive
      ? "active-theme-tab border"
      : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
      }`;
    const pIcon = parentIcons[parent] || "📦";
    parentHeader.innerHTML = `
      <span class="truncate flex items-center gap-1.5">${pIcon} ${escHtml(parent)}</span>
      <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400/90 font-bold border border-slate-700/60 shrink-0 ml-1">${parentCount.toLocaleString()}</span>
    `;

    parentHeader.addEventListener('click', () => {
      window.location.hash = 'category=' + encodeURIComponent(parent);
    });

    groupContainer.appendChild(parentHeader);

    // If active, render its subcategories that have >0 items
    if (isParentActive) {
      const subContainer = document.createElement('div');
      subContainer.className = 'ml-3 pl-2 border-l border-cyan-500/30 my-1 flex flex-col gap-0.5';

      const activeSubcats = subcats
        .map(sub => ({ name: sub, count: countProductsForCategory(sub) }))
        .filter(s => s.count > 0);

      activeSubcats.forEach(s => {
        const isSubActive = activeCategory === s.name;
        const subBtn = document.createElement('button');
        subBtn.className = `flex w-full items-center justify-between rounded-md px-2 py-1 text-[11px] font-medium transition-all text-left ${isSubActive
          ? "text-cyan-300 font-bold bg-cyan-950/40 border border-cyan-500/40 shadow-sm"
          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
          }`;

        const subIcon = categoryIcons[s.name] || "▫️";
        subBtn.innerHTML = `
          <span class="truncate flex items-center gap-1">${subIcon} ${escHtml(s.name)}</span>
          <span class="text-[9px] px-1 py-0.2 rounded bg-slate-900 text-slate-500 font-semibold shrink-0 ml-1">${s.count.toLocaleString()}</span>
        `;

        subBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.location.hash = 'category=' + encodeURIComponent(s.name);
        });

        subContainer.appendChild(subBtn);
      });

      if (activeSubcats.length > 0) {
        groupContainer.appendChild(subContainer);
      }
    }

    categoryTabs.appendChild(groupContainer);
  });
}

function renderSubcategoryTabs() {
  if (!subcategoryTabs) return;
  subcategoryTabs.innerHTML = '';
  subcategoryTabs.classList.add('hidden');

  let activeParent = null;
  let subcats = [];

  if (SCHEMA_GROUPS[activeCategory]) {
    activeParent = activeCategory;
    subcats = SCHEMA_GROUPS[activeCategory];
  } else {
    for (const [parent, subs] of Object.entries(SCHEMA_GROUPS)) {
      if (subs.includes(activeCategory)) {
        activeParent = parent;
        subcats = subs;
        break;
      }
    }
  }

  if (!activeParent || subcats.length === 0) {
    return;
  }

  // Filter to ONLY subcategories that have items > 0
  const activeSubcats = subcats
    .map(sub => ({ name: sub, count: countProductsForCategory(sub) }))
    .filter(s => s.count > 0);

  if (activeSubcats.length === 0) {
    return;
  }

  subcategoryTabs.classList.remove('hidden');

  const parentTotalCount = countProductsForCategory(activeParent);

  // Add the "All Parent" tab first
  const isAllActive = activeCategory === activeParent;
  const allBtn = document.createElement('button');
  allBtn.className = `rounded-xl px-4 py-2 text-xs font-bold border transition-all flex items-center gap-1.5 ${isAllActive
    ? 'bg-purple-600/30 text-purple-300 border-purple-500/60 shadow-lg shadow-purple-950/40'
    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40'
    }`;

  const pIcon = parentIcons[activeParent] || "📦";
  allBtn.innerHTML = `<span>${pIcon} All ${escHtml(activeParent)}</span> <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-950 text-slate-400 font-bold border border-slate-800">${parentTotalCount.toLocaleString()}</span>`;
  allBtn.addEventListener('click', () => {
    window.location.hash = 'category=' + encodeURIComponent(activeParent);
  });
  subcategoryTabs.appendChild(allBtn);

  // Add each subcategory tab (that has items > 0)
  activeSubcats.forEach(s => {
    const isActive = activeCategory === s.name;
    const btn = document.createElement('button');
    btn.className = `rounded-xl px-4 py-2 text-xs font-semibold border transition-all flex items-center gap-1.5 ${isActive
      ? 'bg-purple-600/30 text-purple-300 border-purple-500/60 shadow-lg shadow-purple-950/40'
      : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40'
      }`;

    const subIcon = categoryIcons[s.name] || "➖";
    btn.innerHTML = `<span>${subIcon} ${escHtml(s.name)}</span> <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-950 text-slate-400 font-bold border border-slate-800">${s.count.toLocaleString()}</span>`;
    btn.addEventListener('click', () => {
      window.location.hash = 'category=' + encodeURIComponent(s.name);
    });
    subcategoryTabs.appendChild(btn);
  });
}

function renderStoreFilters() {
  storeFilters.innerHTML = '';
  window.STORES.forEach(store => {
    const isSelected = selectedStores.includes(store);
    const color = window.STORE_COLORS[store] || '#7C3AED';

    const btn = document.createElement('button');
    btn.className = `flex w-full items-center justify-between rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer hover:bg-white/5`;
    btn.style.borderColor = isSelected ? `${color}40` : 'transparent';
    btn.style.backgroundColor = isSelected ? `${color}10` : 'transparent';
    btn.style.color = isSelected ? 'white' : '#94a3b8';

    btn.innerHTML = `
      <div class="flex items-center gap-2.5">
        <span class="h-2 w-2 rounded-full" style="background-color: ${color}; opacity: ${isSelected ? '1' : '0.4'}; box-shadow: ${isSelected ? `0 0 8px ${color}` : 'none'}"></span>
        <span>${store}</span>
      </div>
      ${isSelected ? `<span class="text-xs" style="color: ${color}">✓</span>` : ''}
    `;

    btn.addEventListener('click', () => {
      if (selectedStores.includes(store)) {
        selectedStores = selectedStores.filter(s => s !== store);
      } else {
        selectedStores.push(store);
      }
      currentPage = 1;
      renderStoreFilters();
      applyFiltersAndRender();
    });

    storeFilters.appendChild(btn);
  });
}

function isCategoryMatch(p, cat) {
  if (!cat || cat === 'All' || cat === 'AllProducts' || cat === 'All Products') return true;

  const target = String(cat).toLowerCase().trim();
  const pCat = String(p.category || '').toLowerCase();
  const pSub = String(p.subcategory || '').toLowerCase();
  const pParent = String(p.parent_category || '').toLowerCase();

  const pCats = (p.categories || []).map(c => String(c).toLowerCase());
  const pParents = (p.parent_categories || []).map(c => String(c).toLowerCase());

  // 1. Direct EXACT match — always wins, always correct
  if (pCat === target || pSub === target || pParent === target) return true;
  if (pCats.includes(target) || pParents.includes(target)) return true;

  // 2. SCHEMA_GROUPS lookup — only used when cat is a PARENT group key
  //    (e.g. "PC Components" → shows GPUs + GPU Accessories + Motherboards etc.)
  //    NOT used when cat is a specific subcategory like "GPUs"
  const group = SCHEMA_GROUPS[cat];
  if (Array.isArray(group)) {
    const groupLower = group.map(g => String(g).toLowerCase());
    if (groupLower.includes(pCat) || groupLower.includes(pSub)) return true;
    if (pCats.some(c => groupLower.includes(c))) return true;
    // Stop here for parent groups — don't fall through to substring matching
    return false;
  }

  // 3. Smart Category Aliasing — for known fuzzy parent labels
  //    Only applies when the clicked category is NOT a precise subcategory label
  const isKnownSubcat = Object.values(SCHEMA_GROUPS).some(subs => subs.map(s => s.toLowerCase()).includes(target));
  if (isKnownSubcat) {
    // It's a known precise subcategory — exact match only, already checked above
    return false;
  }

  // 4. Fuzzy aliasing only for broad/parent categories not in SCHEMA_GROUPS
  if (target.includes('laptop')) {
    if (pParent === 'computers' && (pCat.includes('laptop') || pSub.includes('laptop') || pCat.includes('macbook') || pCat.includes('2-in-1') || pCat.includes('ultrabook'))) return true;
    if (pCat.includes('laptop') || pSub.includes('laptop')) return true;
  }

  if (target.includes('desktop')) {
    if (pParent === 'computers' && !pCat.includes('laptop') && !pSub.includes('laptop')) return true;
    if (pCat.includes('desktop') || pSub.includes('desktop') || pCat.includes('workstation') || pCat.includes('mini pc') || pCat.includes('all-in-one')) return true;
  }

  if (target.includes('component')) {
    if (pParent === 'components' || pParent === 'power') return true;
    if (['cpu', 'cpus', 'gpu', 'gpus', 'graphics card', 'motherboard', 'ram', 'ssd', 'hdd', 'cooler', 'psu', 'power supply'].some(k => pCat.includes(k) || pSub.includes(k))) return true;
  }

  if (target.includes('monitor') || target.includes('display')) {
    if (pParent === 'displays') return true;
    if (pCat.includes('monitor') || pSub.includes('monitor') || pCat.includes('tv') || pCat.includes('projector')) return true;
  }

  if (target.includes('keyboard') || target.includes('mice') || target.includes('mouse')) {
    if (pParent === 'peripherals') return true;
    if (pCat.includes('keyboard') || pSub.includes('keyboard') || pCat.includes('mouse') || pCat.includes('mice') || pCat.includes('mousepad')) return true;
  }

  if (target.includes('gaming')) {
    if (pParent === 'gaming') return true;
    if (pCat.includes('gaming') || pSub.includes('gaming') || pCat.includes('console') || pCat.includes('controller')) return true;
  }

  if (target.includes('audio') || target.includes('headphone') || target.includes('earbud') || target.includes('speaker')) {
    if (pParent === 'audio') return true;
    if (pCat.includes('headphone') || pSub.includes('headphone') || pCat.includes('headset') || pCat.includes('earbud') || pCat.includes('speaker') || pCat.includes('microphone')) return true;
  }

  if (target.includes('smartphone') || target.includes('phone') || target.includes('tablet')) {
    if (pParent === 'phones & tablets') return true;
    if (pCat.includes('phone') || pSub.includes('phone') || pCat.includes('tablet') || pCat.includes('tablet') || pCat.includes('ipad') || pCat.includes('iphone')) return true;
  }

  if (target.includes('wearable') || target.includes('smartwatch')) {
    if (pParent === 'wearables') return true;
    if (pCat.includes('watch') || pSub.includes('watch') || pCat.includes('wearable')) return true;
  }

  if (target.includes('camera')) {
    if (pParent === 'cameras') return true;
    if (pCat.includes('camera') || pSub.includes('camera') || pCat.includes('lens') || pCat.includes('tripod')) return true;
  }

  if (target.includes('network')) {
    if (pParent === 'networking') return true;
    if (pCat.includes('router') || pCat.includes('switch') || pCat.includes('access point') || pCat.includes('modem')) return true;
  }

  if (target.includes('printer')) {
    if (pParent === 'printers & office') return true;
    if (pCat.includes('printer') || pCat.includes('scanner') || pCat.includes('ink') || pCat.includes('toner')) return true;
  }

  if (target.includes('smart home')) {
    if (pParent === 'smart home') return true;
  }

  if (target.includes('cable') || target.includes('adapter')) {
    if (pParent === 'cables & adapters') return true;
    if (pCat.includes('cable') || pCat.includes('adapter') || pCat.includes('usb') || pCat.includes('hdmi')) return true;
  }

  if (target.includes('accessory') || target.includes('accessories')) {
    if (pParent === 'accessories') return true;
  }

  if (target.includes('storage')) {
    if (pParent === 'storage') return true;
    if (pCat.includes('ssd') || pCat.includes('hdd') || pCat.includes('flash drive') || pCat.includes('memory card')) return true;
  }

  return false;
}

// Helpers for Dynamic/Cascade Filtering options
function getBaseFilteredProducts() {
  let list = [...window.products];

  // 1. Category Filter
  if (activeCategory !== 'All' && activeCategory !== 'AllProducts') {
    list = list.filter(p => isCategoryMatch(p, activeCategory));
  }

  // 2. Keyword Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // 3. Price Filter (matches product price directly)
  list = list.filter(p => p.price >= priceMin && p.price <= priceMax);

  // 4. Stores Filter
  list = list.filter(p => {
    if (!selectedStores || selectedStores.length === 0) return true;
    return (
      selectedStores.includes(p.store) ||
      selectedStores.includes(p.storeKey) ||
      (window.STORE_DISPLAY && selectedStores.includes(window.STORE_DISPLAY[p.storeKey]))
    );
  });

  // 5. In-Stock Filter
  if (inStockOnly) {
    list = list.filter(p => p.inStock !== false);
  }

  return list;
}

function getFilteredProductsForDropdown(excludeKey) {
  let list = getBaseFilteredProducts();

  // Filter by brand (if not excluded)
  if (excludeKey !== 'brand' && selectedBrand !== 'All') {
    list = list.filter(p => getBrandName(p.name) === selectedBrand);
  }

  // Filter by specs (except the excluded spec key)
  for (const [specKey, specVal] of Object.entries(selectedSpecs)) {
    if (specKey !== excludeKey) {
      list = list.filter(p => p.specs && p.specs[specKey] === specVal);
    }
  }

  return list;
}

function renderDynamicFilters() {
  if (activeCategory === 'All' || activeCategory === 'AllProducts') {
    dynamicFiltersWrapper.classList.add('hidden');
    selectedBrand = 'All';
    selectedSpecs = {};
    return;
  }

  dynamicFiltersWrapper.classList.remove('hidden');
  dynamicFilters.innerHTML = '';

  const categoryProducts = window.products.filter(p => (p.categories && p.categories.includes(activeCategory)) || (p.parent_categories && p.parent_categories.includes(activeCategory)) || p.subcategory === activeCategory || p.parent_category === activeCategory || p.category === activeCategory);

  // Extract overall category unique brands and specs maps to know which dropdown filters should exist
  const allCategoryBrands = new Set();
  const allCategorySpecsMap = {};

  categoryProducts.forEach(p => {
    const b = getBrandName(p.name);
    if (b) allCategoryBrands.add(b);

    if (p.specs) {
      Object.entries(p.specs).forEach(([k, v]) => {
        if (!allCategorySpecsMap[k]) allCategorySpecsMap[k] = new Set();
        allCategorySpecsMap[k].add(v);
      });
    }
  });

  // Create Brand dropdown
  if (allCategoryBrands.size > 0) {
    // Dynamic/Cascade: only show brands available for products matching all other filters
    const brandProducts = getFilteredProductsForDropdown('brand');
    const availableBrands = new Set();
    brandProducts.forEach(p => {
      const b = getBrandName(p.name);
      if (b) availableBrands.add(b);
    });
    // Always include selected brand so it can be deselected
    if (selectedBrand !== 'All') {
      availableBrands.add(selectedBrand);
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<label class="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 ml-0.5">Brand</label>`;
    const brandSelect = document.createElement('select');
    brandSelect.className = 'w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-purple-500 cursor-pointer hover:bg-slate-900 transition';

    const defOpt = document.createElement('option');
    defOpt.value = 'All'; defOpt.textContent = 'Any Brand';
    brandSelect.appendChild(defOpt);
    Array.from(availableBrands).sort().forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b.charAt(0).toUpperCase() + b.slice(1);
      if (b === selectedBrand) opt.selected = true;
      brandSelect.appendChild(opt);
    });

    brandSelect.value = selectedBrand;
    brandSelect.addEventListener('change', (e) => {
      selectedBrand = e.target.value;
      currentPage = 1;
      applyFiltersAndRender();
    });

    wrapper.appendChild(brandSelect);
    dynamicFilters.appendChild(wrapper);
  }

  // Determine ordered spec keys: priority order first, then remaining alphabetically
  const priorityOrder = SPEC_ORDER[activeCategory] || [];
  const allSpecKeys = Object.keys(allCategorySpecsMap);
  const orderedKeys = [
    ...priorityOrder.filter(k => allSpecKeys.includes(k)),
    ...allSpecKeys.filter(k => !priorityOrder.includes(k)).sort(),
  ];

  // Create Spec dropdowns in priority order
  orderedKeys.forEach(specName => {
    const overallValues = allCategorySpecsMap[specName];
    if (overallValues.size > 1) { // Only show if multiple options exist overall
      // Dynamic/Cascade: only show spec values available for products matching all other filters
      const specProducts = getFilteredProductsForDropdown(specName);
      const availableVals = new Set();
      specProducts.forEach(p => {
        if (p.specs && p.specs[specName]) {
          availableVals.add(p.specs[specName]);
        }
      });
      // Always include selected spec value so it can be deselected
      if (selectedSpecs[specName]) {
        availableVals.add(selectedSpecs[specName]);
      }

      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<label class="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 ml-0.5">${escHtml(specName)}</label>`;

      const specSelect = document.createElement('select');
      specSelect.className = 'w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-purple-500 cursor-pointer hover:bg-slate-900 transition';

      // Build options with createElement so special chars (like ") are always encoded correctly
      const anyOpt = document.createElement('option');
      anyOpt.value = 'All'; anyOpt.textContent = `Any ${specName}`;
      specSelect.appendChild(anyOpt);

      Array.from(availableVals)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .forEach(v => {
          const opt = document.createElement('option');
          opt.value = v;
          opt.textContent = v;
          if (v === (selectedSpecs[specName] || '')) opt.selected = true;
          specSelect.appendChild(opt);
        });

      specSelect.value = selectedSpecs[specName] || 'All';
      specSelect.addEventListener('change', (e) => {
        if (e.target.value === 'All') {
          delete selectedSpecs[specName];
        } else {
          selectedSpecs[specName] = e.target.value;
        }
        currentPage = 1;
        applyFiltersAndRender();
      });

      wrapper.appendChild(specSelect);
      dynamicFilters.appendChild(wrapper);
    }
  });
}

// --- Filter, Search, and Sort Engine ---
function applyFiltersAndRender() {
  applyCategoryTheme(activeCategory);

  if (activeCategory === 'All' && !searchQuery.trim()) {
    if (landingSection && catalogSection) {
      landingSection.classList.remove('hidden');
      catalogSection.classList.add('hidden');
    }
    renderLandingPage();
    return;
  } else {
    if (landingSection && catalogSection) {
      landingSection.classList.add('hidden');
      catalogSection.classList.remove('hidden');
    }
  }

  // Re-evaluate available specifications based on other criteria selections
  renderDynamicFilters();

  let list = getBaseFilteredProducts();

  // Keyword search query UI toggle
  if (searchQuery.trim()) {
    searchQueryDisplay.classList.remove('hidden');
    searchQueryText.textContent = searchQuery;
  } else {
    searchQueryDisplay.classList.add('hidden');
  }

  // 6. Brand Filter
  if (selectedBrand !== 'All') {
    list = list.filter(p => getBrandName(p.name) === selectedBrand);
  }

  // 7. Dynamic Specs Filter
  for (const [specKey, specVal] of Object.entries(selectedSpecs)) {
    list = list.filter(p => p.specs && p.specs[specKey] === specVal);
  }

  // 7.1. Dynamic Subcategory Tabs
  renderSubcategoryTabs();

  // 8. Sorting Options
  if (sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  currentFilteredList = list;
  resultCountEl.textContent = list.length;
  const icon = activeCategory === 'AllProducts' ? "📦" : (parentIcons[activeCategory] || categoryIcons[activeCategory] || "🖥️");
  activeCategoryTitle.textContent = activeCategory === 'AllProducts' ? '📦 All Products' : (activeCategory === 'All' ? '🖥️ All PC Parts' : `${icon} ${activeCategory}`);
  currentPage = 1;

  renderProductGrid();
}

// --- Render Product Grid (Paginated to prevent browser lag) ---
function renderProductGrid() {
  if (currentPage === 1) {
    productGrid.innerHTML = '';
  }

  const itemsToRender = currentFilteredList.slice(0, currentPage * ITEMS_PER_PAGE);

  if (itemsToRender.length === 0) {
    productGrid.classList.add('hidden');
    noProductsContainer.classList.remove('hidden');
    return;
  }

  productGrid.classList.remove('hidden');
  noProductsContainer.classList.add('hidden');

  const fragment = document.createDocumentFragment();

  itemsToRender.slice((currentPage - 1) * ITEMS_PER_PAGE).forEach(product => {
    const card = document.createElement('div');
    card.className = "group relative flex flex-col overflow-hidden rounded-2xl border border-purple-900/40 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-600/60 hover:shadow-xl hover:shadow-purple-900/30";

    // Spec Pills — clickable to instantly filter
    let specsHtml = '';
    if (Object.keys(product.specs).length > 0) {
      specsHtml = '<div class="mb-3 flex flex-wrap gap-1">';
      Object.entries(product.specs).slice(0, 3).forEach(([k, v]) => {
        specsHtml += `<span
          class="spec-pill rounded-md border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[9px] text-slate-400 whitespace-nowrap cursor-pointer transition-all hover:border-purple-500/60 hover:bg-purple-900/20 hover:text-purple-300 select-none"
          data-key="${escHtml(k)}"
          data-val="${escHtml(v)}"
          data-cat="${escHtml(product.category)}"
          title="Filter by ${escHtml(k)}: ${escHtml(v)}"
        >${escHtml(k)}: ${escHtml(v)}</span>`;
      });
      specsHtml += '</div>';
    }

    // Stock Badge & Filter
    const inStockBadgeHtml = product.inStock
      ? `<div class="absolute top-3 right-3 z-10 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/50">In Stock</div>`
      : `<div class="absolute top-3 right-3 z-10 rounded-full bg-red-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-400 border border-red-500/50">Out of Stock</div>`;

    const imgFilter = product.inStock ? "" : "grayscale opacity-50";

    // Image logic
    const imageHtml = product.image
      ? `<img referrerpolicy="no-referrer" src="${product.image}" alt="${product.name}" class="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105 ${imgFilter}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖥️</text></svg>'">`
      : `<div class="flex h-full w-full items-center justify-center text-4xl text-slate-600 ${imgFilter}">🖥️</div>`;

    card.innerHTML = `
      <!-- Store Tag Badge -->
      <div class="absolute top-3 left-3 z-10 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white" style="background-color: ${product.color}">
        ${product.store}
      </div>
      ${inStockBadgeHtml}
      <!-- Image Wrapper -->
      <div class="relative h-44 overflow-hidden bg-slate-900/40 flex items-center justify-center border-b border-purple-950/20">
        ${imageHtml}
      </div>
      <!-- Body details -->
      <div class="flex flex-1 flex-col p-4">
        <p class="mb-1 text-[9px] font-bold uppercase tracking-widest text-purple-400">
          ${product.category}
        </p>
        <h3 class="mb-3 line-clamp-2 text-xs font-semibold leading-snug text-white group-hover:text-cyan-300 transition-colors">
          ${product.name}
        </h3>

        ${specsHtml}

        <div class="mt-auto">
          <!-- Price summary -->
          <div class="mb-3 flex items-baseline gap-2">
            <span class="text-xl font-black text-white">JOD ${product.price.toFixed(2)}</span>
          </div>

          <!-- CTA Buttons -->
          <div class="flex gap-2">
            <button class="add-cart-btn flex items-center justify-center rounded-xl px-3 py-2 text-xs transition" title="Add to Build">
              ➕
            </button>
            <button class="compare-btn flex-1 rounded-xl py-2 text-xs font-bold text-white transition">
              View Details
            </button>
            <a href="${product.url || '#'}" target="_blank" class="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400" title="Buy this product">
              ↗
            </a>
          </div>
        </div>
      </div>
    `;

    card.querySelector('.compare-btn').addEventListener('click', () => {
      openProductModal(product);
    });

    card.querySelector('.add-cart-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product);
      const btn = e.currentTarget;
      btn.innerHTML = '✅';
      setTimeout(() => btn.innerHTML = '➕', 1000);
    });

    fragment.appendChild(card);
  });

  productGrid.appendChild(fragment);
}

// --- Lazy Loading (Infinite Scroll) ---
function handleScroll() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
    if (currentPage * ITEMS_PER_PAGE < currentFilteredList.length) {
      currentPage++;
      renderProductGrid();
    }
  }
}

// --- Modal Functionality (Dynamic price comparison) ---
function openProductModal(product) {
  // Do not group products from different stores
  const matches = [product];
  const sortedOffers = matches.sort((a, b) => a.price - b.price);
  const cheapest = sortedOffers[0];
  const highest = sortedOffers[sortedOffers.length - 1];
  const savings = sortedOffers.length > 1 ? (highest.price - cheapest.price).toFixed(2) : 0;

  // Set modal details
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description || "No description available on merchant listings.";
  modalBestPrice.textContent = `JOD ${cheapest.price.toFixed(2)}`;
  modalBestStore.textContent = `@ ${cheapest.store}`;
  modalBestStore.style.color = cheapest.color;

  // Set image
  modalImageContainer.innerHTML = product.image
    ? `<img referrerpolicy="no-referrer" src="${product.image}" alt="${product.name}" class="max-h-44 max-w-[185px] object-contain" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖥️</text></svg>'">`
    : `<span class="text-5xl text-slate-600">🖥️</span>`;

  // Set Specs
  modalSpecs.innerHTML = '';
  Object.entries(product.specs).forEach(([k, v]) => {
    const pill = document.createElement('span');
    pill.className = "rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-300";
    pill.innerHTML = `<span class="text-slate-500">${k}: </span>${v}`;
    modalSpecs.appendChild(pill);
  });

  // Set savings
  if (savings > 0) {
    modalSavingsText.textContent = `Save up to JOD ${savings} vs highest store price`;
    modalSavingsText.classList.remove('hidden');
  } else {
    modalSavingsText.classList.add('hidden');
  }

  // Set Offers Table
  modalOffers.innerHTML = '';
  sortedOffers.forEach((s, idx) => {
    const row = document.createElement('div');
    const isCheapest = idx === 0;

    const buyBtn = s.inStock
      ? `<a href="${s.url || '#'}" target="_blank" class="rounded-lg border border-slate-700 bg-slate-850 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-purple-500 hover:text-white">Buy →</a>`
      : `<span class="rounded-lg border border-red-900/50 bg-red-900/20 px-3 py-1 text-xs font-semibold text-red-400 cursor-not-allowed">Sold Out</span>`;

    row.className = `flex items-center justify-between rounded-xl px-4 py-3 transition ${isCheapest
      ? "border border-emerald-700/50 bg-emerald-950/20"
      : "border border-slate-800 bg-slate-900/50"
      }`;

    row.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="h-2.5 w-2.5 rounded-full flex-shrink-0" style="background-color: ${s.color}"></span>
        <span class="text-sm font-semibold text-white">${s.store}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm font-black ${isCheapest ? "text-emerald-400" : "text-white"}">JOD ${s.price.toFixed(2)}</span>
        ${buyBtn}
      </div>
    `;
    modalOffers.appendChild(row);
  });

  // Show Modal
  productModal.classList.remove('hidden');
  productModal.classList.add('flex');
}

function closeProductModal() {
  productModal.classList.add('hidden');
  productModal.classList.remove('flex');
}

// Start App when loaded
window.addEventListener('DOMContentLoaded', init);
