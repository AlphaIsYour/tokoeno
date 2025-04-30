// app/search/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Star, MapPin } from "lucide-react";
import CategoryPills from "@/app/components/CategoryPills";
import SearchFilters from "@/app/components/SearchFilters";
import {
  mockProducts,
  categories,
  filterProducts,
  Product,
} from "@/app/data/mockProducts";

// Komponen Skeleton untuk loading state
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="w-full h-32 sm:h-50 bg-gray-200 animate-shimmer rounded-t-xl"></div>
      <div className="p-2 sm:p-3">
        <div className="h-4 bg-gray-200 animate-shimmer rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 animate-shimmer rounded w-1/2"></div>
      </div>
    </div>
  );
};

// Format price to IDR
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// Calculate discounted price
const calculateDiscountedPrice = (
  price: number,
  discountPercentage?: number
) => {
  if (!discountPercentage) return price;
  return price - (price * discountPercentage) / 100;
};

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse query parameters
  const query = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  const priceRangeFilter = searchParams.get("priceRange") || "";
  const ratingFilter = searchParams.get("rating")
    ? parseInt(searchParams.get("rating") || "0")
    : null;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  // Simulate API call and apply filters
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Filter products based on all filters
      const filtered = filterProducts(mockProducts, {
        query,
        category: categoryFilter,
        priceRange: priceRangeFilter,
        rating: ratingFilter ?? undefined,
      });

      setProducts(filtered);
      setLoading(false);

      // Restore scroll position after filter changes
      if (typeof window !== "undefined") {
        const scrollY = sessionStorage.getItem("scrollPosition");
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY));
          sessionStorage.removeItem("scrollPosition");
        }
      }
    };

    fetchAndFilterProducts();
  }, [query, categoryFilter, priceRangeFilter, ratingFilter]);

  // Handle product click to navigate to product page
  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 mt-27">
      {/* Search bar section */}

      {/* Category pills */}
      <CategoryPills categories={categories} activeCategory={categoryFilter} />

      {/* Search results section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        <aside className="w-full md:w-64 mb-6 md:mb-0">
          <SearchFilters
            categoryFilter={categoryFilter}
            priceRangeFilter={priceRangeFilter}
            ratingFilter={ratingFilter}
          />
        </aside>

        {/* Product grid */}
        <div className="flex-grow">
          {/* Results header */}
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {query ? `Hasil pencarian untuk "${query}"` : "Semua Produk"}
              {categoryFilter && categoryFilter !== "Semua Kategori"
                ? ` - ${categoryFilter}`
                : ""}
            </h1>
            <p className="text-gray-600">{products.length} produk ditemukan</p>
          </div>

          {/* Product grid or loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => {
                const discountedPrice = calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                );

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product.slug)}
                  >
                    <div className="relative pb-[75%]">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                      {product.discountPercentage && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                          {product.discountPercentage}% OFF
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                        {product.name}
                      </h3>

                      <div className="mb-1">
                        <p className="font-semibold text-sm">
                          {formatPrice(discountedPrice)}
                        </p>
                        {product.discountPercentage && (
                          <p className="text-xs text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <div className="flex items-center mr-2">
                          <Star
                            size={12}
                            className="text-yellow-400 fill-yellow-400 mr-0.5"
                          />
                          <span>{product.rating}</span>
                        </div>

                        <div className="flex items-center">
                          <MapPin size={12} className="mr-0.5" />
                          <span>{product.store.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`text-xs px-1 py-0.5 rounded ${
                            product.store.isOfficial
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {product.store.isOfficial
                            ? "Official"
                            : product.store.name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 mb-4 text-gray-300">
                <Search size={80} strokeWidth={1} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                Produk tidak ditemukan
              </h3>
              <p className="text-gray-600 max-w-md">
                Coba cari dengan kata kunci yang berbeda atau hapus beberapa
                filter untuk melihat lebih banyak produk.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
