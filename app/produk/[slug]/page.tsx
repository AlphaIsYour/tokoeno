"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FaHeart,
  FaShareAlt,
  FaShoppingCart,
  FaComment,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

// Tipe data untuk produk
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: { id: string; url: string }[];
}

export default function ProdukDetail() {
  const params = useParams();
  const [produk, setProduk] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Ambil data produk dari API berdasarkan slug
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const data = await res.json();
        setProduk(data);
        setSelectedImage(data.images[0]?.url || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <h1 className="text-center text-gray-500 text-xl">Memuat...</h1>;
  }

  if (!produk) {
    return (
      <h1 className="text-center text-red-500 text-xl">
        Produk tidak ditemukan
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 grid grid-cols-3 gap-6 mt-30">
      {/* Kolom Gambar */}
      <div>
        <img
          src={selectedImage}
          alt="Produk"
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="flex gap-2 mt-2">
          {produk.images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt="Thumbnail"
              className={`w-16 h-16 cursor-pointer rounded-lg ${
                selectedImage === img.url ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(img.url)}
            />
          ))}
        </div>
      </div>

      {/* Kolom Informasi Produk */}
      <div>
        <h1 className="text-xl font-semibold">{produk.name}</h1>
        <p className="text-2xl font-bold">Rp {produk.price.toLocaleString()}</p>
        <p className="mt-4 text-gray-600">{produk.description}</p>
        <p className="mt-4 font-semibold">Stok: {produk.stock}</p>
      </div>

      {/* Kolom Pembelian */}
      <div className="border p-5 rounded-lg shadow-lg bg-white sticky top-20 w-70 h-85">
        <h3 className="text-lg font-bold">Atur jumlah</h3>
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 border rounded-lg text-gray-500"
          >
            <FaMinus />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(produk.stock, quantity + 1))}
            className="p-2 border rounded-lg text-gray-500"
          >
            <FaPlus />
          </button>
        </div>
        <p className="text-lg font-bold mt-3">
          Subtotal: Rp{(produk.price * quantity).toLocaleString()}
        </p>

        <button className="w-full h-10 bg-blue-400 text-white rounded-lg mt-3 flex items-center justify-center">
          <FaShoppingCart className="mr-2" /> Keranjang
        </button>
        <button className="w-full h-10 border border-blue-400 text-blue-400 rounded-lg mt-2 flex items-center justify-center">
          Beli
        </button>

        <div className="w-full flex justify-between mt-4 text-gray-600 border-t border-gray-300 pt-2">
          <button className="flex items-center space-x-2 px-2">
            <FaComment /> <span>Chat</span>
          </button>
          <button className="flex items-center space-x-2 px-1 border-l border-gray-300">
            <FaHeart /> <span>Wishlist</span>
          </button>
          <button className="flex items-center space-x-2 px-1 border-l border-gray-300">
            <FaShareAlt /> <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
