"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FaHeart,
  FaShareAlt,
  FaShoppingCart,
  FaComment,
  FaPlus,
  FaMinus,
  FaStar,
  FaStarHalfAlt,
  FaUserPlus,
} from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: { id: string; url: string }[];
  variants: {
    name: string;
    options: { id: string; name: string; additionalPrice: number }[];
  }[];
  store: {
    id: string;
    name: string;
    logo: string;
    followers: number;
  };
  rating: number;
}

export default function ProdukDetail() {
  const params = useParams();
  const [produk, setProduk] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("detail");
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, { id: string; name: string; additionalPrice: number }>
  >({});

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const data = await res.json();

        const enhancedData = {
          ...data,
          variants: [
            {
              name: "Warna",
              options: [
                { id: "w1", name: "Hitam", additionalPrice: 0 },
                { id: "w2", name: "Putih", additionalPrice: 0 },
                { id: "w3", name: "Merah", additionalPrice: 10000 },
              ],
            },
            {
              name: "Ukuran",
              options: [
                { id: "s1", name: "S", additionalPrice: 0 },
                { id: "s2", name: "M", additionalPrice: 5000 },
                { id: "s3", name: "L", additionalPrice: 10000 },
                { id: "s4", name: "XL", additionalPrice: 15000 },
              ],
            },
          ],
          store: {
            id: "st1",
            name: "Toko Fashion Kece",
            logo: "/api/placeholder/40/40",
            followers: 5432,
          },
          rating: 4.7,
        };

        setProduk(enhancedData);
        setSelectedImage(enhancedData.images[0]?.url || "");

        const initialVariants: Record<
          string,
          { id: string; name: string; additionalPrice: number }
        > = {};
        enhancedData.variants.forEach(
          (variant: {
            name: string;
            options: { id: string; name: string; additionalPrice: number }[];
          }) => {
            initialVariants[variant.name] = variant.options[0];
          }
        );
        setSelectedVariants(initialVariants);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) fetchProduct();
  }, [params.slug]);

  const calculateTotalPrice = () => {
    if (!produk) return 0;
    return (
      (produk.price +
        Object.values(selectedVariants).reduce(
          (sum, variant) => sum + variant.additionalPrice,
          0
        )) *
      quantity
    );
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-gray-500 text-xl">Memuat...</div>
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="text-center py-8">
        <h1 className="text-red-500 text-xl">Produk tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-5 mt-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Column */}
          <div className="lg:sticky lg:top-20 self-start">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt={`Gambar Utama ${produk.name}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {produk.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`flex-shrink-0 relative block rounded-lg border-2 transition-all ${
                    selectedImage === img.url
                      ? "border-blue-500 scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${img.id}`}
                    fill
                    className="object-cover rounded-md"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Column */}
          <div className="space-y-6">
            {/* Store Info */}
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Image
                src={produk.store.logo}
                alt={`Logo ${produk.store.name}`}
                fill
                className="rounded-full object-cover"
                sizes="48px"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{produk.store.name}</h2>
                <p className="text-sm text-gray-500">
                  {produk.store.followers.toLocaleString()} pengikut
                </p>
              </div>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-full border border-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2">
                <FaUserPlus /> Follow
              </button>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-2xl font-bold">{produk.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-lg">
                  {renderRating(produk.rating)}
                </div>
                <span className="text-orange-500 font-medium">
                  {produk.rating}/5
                </span>
              </div>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold bg-blue-50 px-4 py-3 rounded-lg">
              Rp {produk.price.toLocaleString()}
            </p>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <div className="flex">
                {["detail", "varian", "toko", "pengiriman"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium flex-shrink-0 border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-blue-500"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "detail" && (
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {produk.description}
                  </p>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      Stok Tersedia:{" "}
                      <span className="text-blue-600">
                        {produk.stock.toLocaleString()} pcs
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "varian" && (
                <div className="space-y-6">
                  {produk.variants.map((variant) => (
                    <div key={variant.name}>
                      <h3 className="font-medium mb-3">{variant.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              setSelectedVariants({
                                ...selectedVariants,
                                [variant.name]: option,
                              })
                            }
                            className={`px-4 py-2 rounded-full border transition-all ${
                              selectedVariants[variant.name]?.id === option.id
                                ? "border-blue-500 bg-blue-50 text-blue-600"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {option.name}
                            {option.additionalPrice > 0 && (
                              <span className="ml-2 text-sm">
                                +Rp{option.additionalPrice.toLocaleString()}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "toko" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Image
                      src={produk.store.logo}
                      alt={`Logo ${produk.store.name}`}
                      fill
                      className="rounded-full object-cover"
                      sizes="64px"
                    />

                    <div>
                      <h2 className="font-bold text-lg">{produk.store.name}</h2>
                      <p className="text-gray-500">Online 10 menit lalu</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["Produk", "1.2rb+"],
                      ["Rating Toko", "4.9"],
                      ["Pengikut", produk.store.followers.toLocaleString()],
                      ["Bergabung", "2 tahun lalu"],
                    ].map(([label, value]) => (
                      <div key={label} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-sm">{label}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "pengiriman" && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Lokasi Toko</h3>
                    <p className="text-gray-600">Jakarta Selatan</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-3">Pilihan Kurir</h3>
                    <div className="flex flex-wrap gap-2">
                      {["JNE", "J&T", "SiCepat", "AnterAja"].map((kurir) => (
                        <span
                          key={kurir}
                          className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                        >
                          {kurir}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Estimasi Pengiriman</h3>
                    <p className="text-gray-600">
                      1-3 hari kerja (tergantung lokasi)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Column */}
          <div className="lg:sticky lg:top-20 self-start">
            <div className="border p-6 rounded-xl bg-white shadow-lg">
              <div className="space-y-6">
                {/* Selected Variants */}
                {Object.keys(selectedVariants).length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Varian Dipilih</h3>
                    {Object.entries(selectedVariants).map(
                      ([variantName, option]) => (
                        <div
                          key={variantName}
                          className="flex justify-between text-sm py-1"
                        >
                          <span className="text-gray-600">{variantName}:</span>
                          <span className="font-medium">{option.name}</span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <h3 className="font-medium mb-3">Jumlah Pembelian</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity === 1}
                      className={`p-2 rounded-lg border ${
                        quantity === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaMinus />
                    </button>
                    <span className="text-xl font-medium w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(produk.stock, quantity + 1))
                      }
                      disabled={quantity === produk.stock}
                      className={`p-2 rounded-lg border ${
                        quantity === produk.stock
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Maksimal: {produk.stock.toLocaleString()} pcs
                  </p>
                </div>

                {/* Total Price */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Subtotal:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rp{calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <FaShoppingCart /> Tambah ke Keranjang
                    </button>
                    <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Beli Sekarang
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  {[
                    { icon: <FaComment />, label: "Chat" },
                    { icon: <FaHeart />, label: "Wishlist" },
                    { icon: <FaShareAlt />, label: "Share" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-1"
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Ulasan Pembeli</h2>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-4 h-80 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-6">
                <span className="text-4xl font-bold mr-4">4.7</span>
                <div>
                  <div className="flex text-xl">{renderRating(4.7)}</div>
                  <p className="text-gray-500 mt-1">128 ulasan</p>
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-8">{stars}</span>
                    <FaStar className="text-yellow-400 shrink-0" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{
                          width: `${(Math.random() * 70 + 10).toFixed(0)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-8">
              {/* Review Filters */}
              <div className="space-y-6">
                {/* Filter Options */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Semua",
                    "Dengan Foto",
                    "5 Bintang",
                    "4 Bintang",
                    "3 Bintang",
                  ].map((filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        filter === "Semua"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-8">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="pb-6 border-b border-gray-200">
                      {/* Review Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="font-medium">U{idx}</span>
                        </div>
                        <div>
                          <p className="font-medium">User {idx}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span>Varian:</span>
                            <span className="font-medium">
                              {idx === 1
                                ? "Hitam, M"
                                : idx === 2
                                ? "Putih, L"
                                : "Merah, XL"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <FaStar
                                key={i}
                                className={`${
                                  i < 4 ? "fill-current" : "fill-gray-300"
                                }`}
                              />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          2 minggu lalu
                        </span>
                      </div>

                      {/* Review Content */}
                      <p className="text-gray-600 mb-4">
                        {idx === 1
                          ? "Produk sangat bagus dan sesuai dengan ekspektasi. Bahannya nyaman dipakai dan jahitannya rapi. Pengiriman juga cepat. Puas dengan pembelian ini!"
                          : idx === 2
                          ? "Kualitasnya oke banget, gak nyesel beli di sini. Ukurannya pas dan warnanya sesuai dengan gambar. Recommended seller!"
                          : "Barangnya cepat sampai dan sesuai dengan deskripsi. Harga juga worth it dengan kualitas yang diberikan. Akan repeat order lagi nanti."}
                      </p>

                      {/* Review Photos */}
                      {idx === 1 && (
                        <div className="flex gap-3">
                          {[1, 2].map((photoIdx) => (
                            <div
                              key={photoIdx}
                              className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
                            >
                              <Image
                                src="/placeholder-review.jpg" // Ganti dengan path gambar sebenarnya
                                alt={`Ulasan ${idx}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Helpful Actions */}
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <FaHeart className="text-xs" />
                          <span>Membantu (12)</span>
                        </button>
                        <button className="hover:text-blue-600">
                          Laporkan
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Load More Button */}
                  <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Lihat Semua 128 Ulasan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
