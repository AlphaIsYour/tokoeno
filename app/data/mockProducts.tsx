// data/mockProducts.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  images: { id: string; url: string }[];
  category: string;
  subCategory?: string;
  rating: number;
  store: {
    id: string;
    name: string;
    isOfficial: boolean;
    city: string;
  };
}

export const categories = [
  "Semua Kategori",
  "Laptop",
  "Monitor",
  "Komponen PC",
  "Storage",
  "Smartphone",
  "Aksesoris",
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch 2023 M2 Pro",
    slug: "macbook-pro-16-inch-2023",
    description:
      "Laptop MacBook Pro terbaru dengan chip M2 Pro, 16GB RAM, dan 512GB SSD.",
    price: 28999000,
    discountPercentage: 5,
    stock: 10,
    images: [
      { id: "1", url: "/img/default.jpg" },
      { id: "2", url: "/img/default.jpg" },
    ],
    category: "Laptop",
    subCategory: "Apple",
    rating: 4.9,
    store: {
      id: "store1",
      name: "TechStore Official",
      isOfficial: true,
      city: "Jakarta",
    },
  },
  {
    id: "2",
    name: "Keyboard Mechanical RGB Gaming Tokoeno K3",
    slug: "keyboard-mechanical-rgb-tokoeno",
    description:
      "Keyboard gaming mechanical dengan switch blue dan RGB backlight.",
    price: 1500000,
    discountPercentage: 15,
    stock: 50,
    images: [
      { id: "1", url: "/img/default.jpg" },
      { id: "2", url: "/img/default.jpg" },
    ],
    category: "Komponen PC",
    subCategory: "Keyboard",
    rating: 4.7,
    store: {
      id: "store2",
      name: "Komputer Kita",
      isOfficial: false,
      city: "Bandung",
    },
  },
  {
    id: "3",
    name: "Monitor LED Gaming 24-inch Tokoeno M24G 144Hz",
    slug: "monitor-led-gaming-24-inch-tokoeno",
    description:
      "Monitor gaming dengan refresh rate 144Hz dan response time 1ms.",
    price: 2300000,
    discountPercentage: 10,
    stock: 25,
    images: [
      { id: "1", url: "/img/default.jpg" },
      { id: "2", url: "/img/default.jpg" },
    ],
    category: "Monitor",
    subCategory: "Gaming",
    rating: 4.8,
    store: {
      id: "store3",
      name: "Digital Komputer",
      isOfficial: true,
      city: "Surabaya",
    },
  },
  {
    id: "4",
    name: "RAM DDR4 8GB Tokoeno 3200MHz",
    slug: "ram-ddr4-8gb-tokoeno",
    description: "RAM DDR4 dengan frekuensi 3200MHz untuk PC gaming.",
    price: 750000,
    stock: 100,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Komponen PC",
    subCategory: "RAM",
    rating: 4.6,
    store: {
      id: "store4",
      name: "Memory Center",
      isOfficial: false,
      city: "Malang",
    },
  },
  {
    id: "5",
    name: "SSD Tokoeno 512GB SATA III",
    slug: "ssd-tokoeno-512gb",
    description: "SSD dengan kapasitas 512GB dan antarmuka SATA III.",
    price: 950000,
    discountPercentage: 8,
    stock: 75,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Storage",
    subCategory: "SSD",
    rating: 4.5,
    store: {
      id: "store5",
      name: "Storage Solution",
      isOfficial: true,
      city: "Jakarta",
    },
  },
  {
    id: "6",
    name: "Power Supply 650W Tokoeno GOLD",
    slug: "power-supply-650w-tokoeno",
    description: "Power supply 650W dengan sertifikasi Gold untuk PC gaming.",
    price: 1200000,
    stock: 30,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Komponen PC",
    subCategory: "Power Supply",
    rating: 4.4,
    store: {
      id: "store6",
      name: "Power Expert",
      isOfficial: false,
      city: "Semarang",
    },
  },
  {
    id: "7",
    name: "Samsung Galaxy S23 Ultra 256GB",
    slug: "samsung-galaxy-s23-ultra",
    description: "Smartphone Samsung Galaxy terbaru dengan kamera 200MP.",
    price: 18999000,
    discountPercentage: 12,
    stock: 15,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Smartphone",
    subCategory: "Samsung",
    rating: 4.9,
    store: {
      id: "store7",
      name: "Phone Gallery Official",
      isOfficial: true,
      city: "Jakarta",
    },
  },
  {
    id: "8",
    name: "Motherboard Tokoeno Z690 Gaming",
    slug: "motherboard-tokoeno-z690",
    description: "Motherboard gaming dengan chipset Intel Z690.",
    price: 3500000,
    stock: 20,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Komponen PC",
    subCategory: "Motherboard",
    rating: 4.7,
    store: {
      id: "store8",
      name: "Komputer Kita",
      isOfficial: false,
      city: "Bandung",
    },
  },
  {
    id: "9",
    name: "Webcam Tokoeno 1080p dengan Mikrofon",
    slug: "webcam-tokoeno-1080p",
    description: "Webcam full HD dengan mikrofon noise cancelling.",
    price: 550000,
    discountPercentage: 20,
    stock: 40,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Aksesoris",
    subCategory: "Webcam",
    rating: 4.3,
    store: {
      id: "store9",
      name: "Aksesories Komputer",
      isOfficial: false,
      city: "Yogyakarta",
    },
  },
  {
    id: "10",
    name: "iPhone 14 Pro Max 256GB",
    slug: "iphone-14-pro-max",
    description: "iPhone 14 Pro Max dengan kapasitas 256GB.",
    price: 19999000,
    discountPercentage: 5,
    stock: 10,
    images: [{ id: "1", url: "/img/default.jpg" }],
    category: "Smartphone",
    subCategory: "Apple",
    rating: 4.8,
    store: {
      id: "store10",
      name: "iBox Official",
      isOfficial: true,
      city: "Jakarta",
    },
  },
];

// Helper function untuk filter produk
export const filterProducts = (
  products: Product[],
  filters: {
    query?: string;
    category?: string;
    priceRange?: string;
    rating?: number;
  }
) => {
  return products.filter((product) => {
    // Filter by search query
    const matchesQuery =
      !filters.query ||
      product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.query.toLowerCase());

    // Filter by category
    const matchesCategory =
      !filters.category ||
      filters.category === "Semua Kategori" ||
      product.category === filters.category;

    // Filter by price range
    let matchesPriceRange = true;
    if (filters.priceRange) {
      const price = product.price;
      switch (filters.priceRange) {
        case "under1m":
          matchesPriceRange = price < 1000000;
          break;
        case "1m-2m":
          matchesPriceRange = price >= 1000000 && price <= 2000000;
          break;
        case "2m-5m":
          matchesPriceRange = price > 2000000 && price <= 5000000;
          break;
        case "above5m":
          matchesPriceRange = price > 5000000;
          break;
      }
    }

    // Filter by rating
    const matchesRating = !filters.rating || product.rating >= filters.rating;

    return (
      matchesQuery && matchesCategory && matchesPriceRange && matchesRating
    );
  });
};
