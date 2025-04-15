"use client";
import "./style.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: { id: string; url: string }[];
}

// Komponen Skeleton untuk placeholder
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="w-full h-50 bg-gray-200 animate-shimmer rounded-t-xl"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 animate-shimmer rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 animate-shimmer rounded w-1/2"></div>
      </div>
    </div>
  );
};

const Produk = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch produk dari API dengan jeda visual
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Simulasi jeda 1.5 detik untuk efek skeleton
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Gagal mengambil data produk");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-auto p-5 mt-5">
      <div className="bg-white w-full p-2">
        <h1 className="text-xl font-bold">Rekomendasi :</h1>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {/* Tampilkan 6 skeleton card sebagai placeholder */}
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-10">Tidak ada produk ditemukan</div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {products.map((produk) => (
            <div
              key={produk.slug}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/produk/${produk.slug}`)}
            >
              <Image
                src={produk.images[0]?.url || "/img/default.jpg"}
                alt={produk.name}
                width={200}
                height={200}
                className="w-full h-50 object-cover rounded-t-xl"
              />
              <div className="p-3">
                <h2 className="text-sm font-semibold truncate">
                  {produk.name}
                </h2>
                <p className="text-red-500 text-sm font-bold mt-1">
                  Rp {produk.price.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">Toko Official</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Produk;
