"use client";

import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "700"] });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import {
  faCartShopping,
  faLocationDot,
  faSearch,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [showKategori, setShowKategori] = useState(false);

  return (
    <>
      <header className="navbar w-full fixed top-0 left-0 bg-white z-50 shadow-md">
        {/* Top Navbar - Main elements */}
        <div className="w-full py-3">
          <div className="mx-auto px-8 grid grid-cols-12 p-2 justify-between">
            <div className="flex items-center col-span-12 gap-2">
              {/* Logo */}
              <Link
                href="/"
                className={`text-blue-400 font-bold text-center text-2xl w-1/12`}
              >
                Youralpha
              </Link>

              {/* Kategori Button */}
              <div
                className="relative"
                onMouseEnter={() => setShowKategori(true)}
                onMouseLeave={() => setShowKategori(false)}
              >
                <button className="kategori px-4 py-1.5 text-sm bg-white font-medium hover:bg-gray-300">
                  Kategori
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-8/12 mx-2">
                <input
                  type="text"
                  placeholder="Cari di Youralpha"
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-gray-400 text-base"
                  />
                </div>
              </div>

              {/* Cart Icon */}
              <div className="w-1/12">
                <button className="p-2 text-gray-700">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-3xl ml-5"
                    style={{ width: "24px", height: "24px" }}
                  />
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 w-1/12 justify-end">
                <button className="px-4 py-1.5 text-sm text-blue-500 border border-blue-500 rounded-lg font-medium hover:bg-blue-50">
                  Masuk
                </button>
                <button className="px-4 py-1.5 text-sm text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600">
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navbar - Location and product names */}
        <div className=" w-full border-b border-gray-200 py-2 pl-52">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Popular Product Names - Right side */}
              <div className="flex flex-1 gap-4 overflow-x-auto whitespace-nowrap text-xs text-gray-600 ml-6">
                <span>Monitor LED</span>
                <span>Keyboard Mekanikal</span>
                <span>Motherboard</span>
                <span>RAM 8GB</span>
                <span>Power Supply</span>
                <span>HP Bekas</span>
                {/* Delivery Location - Left side */}
                <div className="flex items-center text-gray-600 ml-1 pl-135">
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

      {/* Kategori Dropdown dengan animasi */}
      <div
        className={`fixed w-full h-90 bg-white shadow-lg z-40 transition-all duration-700 ease-in-out overflow-hidden ${
          showKategori ? "opacity-100 max-h-90" : "opacity-0 max-h-0"
        }`}
        style={{ top: "97px" }} // Sesuaikan dengan tinggi navbar
        onMouseEnter={() => setShowKategori(true)}
        onMouseLeave={() => setShowKategori(false)}
      >
        <div
          className={`${grotesk.className} max-w-7xl mx-auto px-8 py-6 grid grid-cols-5 gap-6`}
        >
          {/* Kolom 1 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Elektronik</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Audio</li>
              <li className="hover:text-blue-500 cursor-pointer">Kamera</li>
              <li className="hover:text-blue-500 cursor-pointer">
                TV & Aksesoris
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Gaming</li>
            </ul>
          </div>

          {/* Kolom 2 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Komputer</h3>
            <ul className="space-y-2 text-sm text-gray-600">
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

          {/* Kolom 3 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Handphone</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Smartphone</li>
              <li className="hover:text-blue-500 cursor-pointer">Tablet</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Aksesoris HP
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Smartwatch</li>
            </ul>
          </div>

          {/* Kolom 4 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Fashion Pria</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Pakaian</li>
              <li className="hover:text-blue-500 cursor-pointer">Sepatu</li>
              <li className="hover:text-blue-500 cursor-pointer">Jam Tangan</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Tas & Dompet
              </li>
            </ul>
          </div>

          {/* Kolom 5 */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Fashion Wanita</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Pakaian</li>
              <li className="hover:text-blue-500 cursor-pointer">Sepatu</li>
              <li className="hover:text-blue-500 cursor-pointer">Tas</li>
              <li className="hover:text-blue-500 cursor-pointer">Aksesoris</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tambahkan style untuk animasi */}
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
