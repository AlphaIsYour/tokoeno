// components/CategoryPills.tsx
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryPillsProps {
  categories: string[];
  activeCategory: string;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  activeCategory,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    // Buat URL baru dengan kategori yang terpilih
    const params = new URLSearchParams(searchParams.toString());

    if (category === "Semua Kategori") {
      params.delete("category"); // Hapus parameter kategori jika "Semua Kategori"
    } else {
      params.set("category", category);
    }

    // Simpan scroll position sebelum navigasi
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex overflow-x-auto pb-4 gap-2 mb-4 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
            activeCategory === category ||
            (category === "Semua Kategori" && !activeCategory)
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
