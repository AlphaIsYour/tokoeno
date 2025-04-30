"use client";

import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "700"] });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import "./style.css";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  faSignOutAlt,
  faCartShopping,
  faLocationDot,
  faSearch,
  faChevronDown,
  faEdit,
  faBox,
  faCog,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LoginPopup from "@/app/components/LoginPopup";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showKategori, setShowKategori] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="navbar w-full fixed top-0 left-0 bg-white z-50 shadow-md">
        <div className="w-full py-3">
          {/* Desktop Version */}
          <div className="hidden md:block">
            <div className="mx-auto px-8 grid grid-cols-12 p-2 justify-between">
              <div className="flex items-center col-span-12 gap-2">
                <Link
                  href="/"
                  className={`text-blue-400 font-bold text-center text-2xl w-1/12`}
                >
                  Youralpha
                </Link>

                <div
                  className="relative"
                  onMouseEnter={() => setShowKategori(true)}
                  onMouseLeave={() => setShowKategori(false)}
                >
                  <button className="kategori px-4 py-1.5 text-sm bg-white font-medium hover:bg-gray-300">
                    Kategori
                  </button>
                </div>

                <div className="relative w-8/12 mx-2">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Cari di Tokoeno"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-gray-400 text-base"
                      />
                    </button>
                  </form>
                </div>

                <div className="w-1/12">
                  <button className="p-2 text-gray-700">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-3xl ml-5"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 w-1/12 justify-end">
                  {session ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <button className="flex items-center gap-2 px-4 py-1.5 text-sm text-blue-500 rounded-lg font-medium hover:bg-blue-50">
                        {session?.user?.image && (
                          <Image
                            src="/img/r6.jpg"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        )}
                        <span className="truncate max-w-[100px]">
                          {session.user?.name || "User"}
                        </span>
                      </button>

                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                          <Link href="/profile">
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FontAwesomeIcon icon={faEdit} />
                              Profil
                            </button>
                          </Link>
                          <Link href="/orders">
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FontAwesomeIcon icon={faBox} />
                              Pesanan Saya
                            </button>
                          </Link>
                          <Link href="/settings">
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FontAwesomeIcon icon={faCog} />
                              Pengaturan
                            </button>
                          </Link>
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsLoginOpen(true)}
                        className="px-4 py-1.5 text-sm text-blue-500 border border-blue-500 rounded-lg font-medium hover:bg-blue-50"
                      >
                        Masuk
                      </button>
                      <Link href="/register">
                        <button className="px-4 py-1.5 text-sm text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600">
                          Daftar
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden px-4">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <Link href="/" className="text-blue-400 font-bold text-2xl">
                Youralpha
              </Link>

              <div className="flex items-center gap-4">
                <button
                  className="p-2 text-gray-700"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <FontAwesomeIcon icon={faBars} className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari di Tokoeno"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-gray-400 text-base"
                    />
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="absolute w-full bg-white shadow-lg rounded-b-lg z-50 left-0 mt-1 border-t border-gray-200">
                <div className="space-y-1 py-2">
                  {/* Kategori */}
                  <button
                    className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                    onClick={() => {
                      setShowKategori(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-gray-500 w-3 h-3"
                    />
                    <span>Kategori</span>
                  </button>

                  {/* Cart */}
                  <Link href="/cart" className="block">
                    <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-gray-500 w-4 h-4"
                      />
                      <span>Keranjang</span>
                    </button>
                  </Link>

                  {session ? (
                    <>
                      {/* Profile Menu - Mirip dengan desktop */}
                      <div className="border-t border-gray-200 pt-1">
                        <Link href="/profile">
                          <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-gray-500 w-4 h-4"
                            />
                            <span>Edit Profil</span>
                          </button>
                        </Link>
                        <Link href="/orders">
                          <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                            <FontAwesomeIcon
                              icon={faBox}
                              className="text-gray-500 w-4 h-4"
                            />
                            <span>Pesanan Saya</span>
                          </button>
                        </Link>
                        <Link href="/settings">
                          <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                            <FontAwesomeIcon
                              icon={faCog}
                              className="text-gray-500 w-4 h-4"
                            />
                            <span>Pengaturan</span>
                          </button>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-200 pt-1">
                        <button
                          onClick={() => signOut()}
                          className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-gray-100 flex items-center gap-3"
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="w-4 h-4"
                          />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t border-gray-200 pt-1">
                      {/* Login */}
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-blue-500 hover:bg-blue-50 flex items-center gap-3"
                      >
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                        <span>Masuk</span>
                      </button>

                      {/* Register */}
                      <Link href="/register">
                        <button className="w-full px-4 py-3 text-left text-sm text-white bg-blue-500 hover:bg-blue-600 flex items-center gap-3 mt-1">
                          <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                          <span>Daftar</span>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full border-b border-gray-200 py-2 custom">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 gap-4 overflow-x-auto whitespace-nowrap text-xs text-gray-600 ml-6">
                <span className="none">Monitor LED</span>
                <span className="none">Keyboard Mekanikal</span>
                <span className="none">Motherboard</span>
                <span className="none">RAM 8GB</span>
                <span className="none">Power Supply</span>
                <span className="none">HP Bekas</span>
                <div className="flex items-center text-gray-600 ml-1 pl-98">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-xs mr-1"
                    style={{ width: "10px", height: "16px" }}
                  />
                  <span className="text-xs mr-1">Dikirim ke</span>
                  <span className="font-medium text-xs">Malang Kota ..</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-xs mr-1"
                    style={{ width: "12px", height: "12px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Kategori Dropdown */}
      <div
        className={`fixed w-full h-90 bg-white shadow-lg z-40 transition-all duration-700 ease-in-out overflow-hidden mt-custom ${
          showKategori ? "opacity-100 max-h-90" : "opacity-0 max-h-0"
        }`}
        style={{ top: "97px" }}
        onMouseEnter={() => setShowKategori(true)}
        onMouseLeave={() => setShowKategori(false)}
      >
        <div
          className={`${grotesk.className} max-w-7xl mx-auto px-8 py-6 grid grid-cols-5 gap-6`}
        >
          <div>
            <h3 className="font-xs text-gray-800 mb-3">Elektronik</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Audio</li>
              <li className="hover:text-blue-500 cursor-pointer">Kamera</li>
              <li className="hover:text-blue-500 cursor-pointer">
                TV & Aksesoris
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Gaming</li>
            </ul>
          </div>
          <div>
            <h3 className="font-xs text-gray-800 mb-3">Komputer</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Laptop</li>
              <li className="hover:text-blue-500 cursor-pointer">
                PC & Desktop
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Monitor</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Komponen PC
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Storage</li>
            </ul>
          </div>
          <div>
            <h3 className="font-xs text-gray-800 mb-3">Handphone</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Smartphone</li>
              <li className="hover:text-blue-500 cursor-pointer">Tablet</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Aksesoris HP
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Smartwatch</li>
            </ul>
          </div>
          <div>
            <h3 className="font-xs text-gray-800 mb-3 ml-1">Fashion Pria</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Pakaian</li>
              <li className="hover:text-blue-500 cursor-pointer">Sepatu</li>
              <li className="hover:text-blue-500 cursor-pointer">Jam Tangan</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Tas & Dompet
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-xs text-gray-800 mb-3">Fashion Wanita</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Pakaian</li>
              <li className="hover:text-blue-500 cursor-pointer">Sepatu</li>
              <li className="hover:text-blue-500 cursor-pointer">Tas</li>
              <li className="hover:text-blue-500 cursor-pointer">Aksesoris</li>
            </ul>
          </div>
        </div>
      </div>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
