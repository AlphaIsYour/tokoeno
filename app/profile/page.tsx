"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./style.css";

// Replace Font Awesome with more compatible icons
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEdit,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
  FaBoxOpen,
  FaStar,
  FaClock,
  FaLink,
} from "react-icons/fa";

interface User {
  name: string;
  bio: string;
  location: string;
  joinDate: string;
  profilePic: string;
  coverPic: string;
  social: {
    twitter?: string;
    instagram?: string;
    github?: string;
    linkedin?: string;
  };
  orders: number;
  reviews: number;
  pinnedItems: { id: string; name: string; image: string }[];
}

const dummyUser: User = {
  name: "John Doe",
  bio: "Tech enthusiast, gamer, and coffee lover. Building cool stuff at TOKOENO!",
  location: "Malang, Indonesia",
  joinDate: "April 2023",
  profilePic: "/img/r12.jpg",
  coverPic: "/img/r10.jpg",
  social: {
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  orders: 42,
  reviews: 15,
  pinnedItems: [
    { id: "1", name: "Monitor LED 27'", image: "/img/r7.jpg" },
    { id: "2", name: "Keyboard Mekanikal", image: "/img/r11.jpg" },
    { id: "3", name: "Mouse Gaming", image: "/img/r9.jpg" },
  ],
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "social" | "settings">(
    "profile"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(dummyUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const StatCard = ({
    icon,
    title,
    value,
    trend,
    color = "blue",
  }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    trend?: string;
    color?: "blue" | "yellow" | "purple";
  }) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100",
      yellow: "text-yellow-600 bg-yellow-100",
      purple: "text-purple-600 bg-purple-100",
    };

    return (
      <div
        className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[color]}`}
          >
            {icon}
          </div>
          <div>
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {value}
              </span>
              {trend && (
                <span className="text-sm font-medium text-green-600">
                  {trend}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Cover Section */}
      <div className="relative h-64 sm:h-96 w-full bg-gradient-to-r from-blue-500 to-purple-600 mt-28">
        <div className="relative h-full w-full">
          <Image
            src={user.coverPic || "/img/r10.jpg"}
            alt="Cover"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="opacity-50"
            priority
          />
        </div>
        {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30">
            <FaCamera />
            <span className="hidden sm:inline">Ubah Cover</span>
          </button>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="absolute top-40 sm:top-64 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg overflow-hidden mt-35"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative h-full w-full">
            <Image
              src={user.profilePic || "/img/r12.jpg"}
              alt="Profile"
              fill
              sizes="(max-width: 768px) 8rem, 12rem"
              style={{ objectFit: "cover" }}
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-tl-lg shadow-md">
            <FaCamera className="text-gray-700" />
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative mt-20 sm:mt-32 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Profile Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full mx-auto">
            <FaCheckCircle />
            <span>Akun Terverifikasi</span>
          </div>
          <h1
            className={`text-2xl sm:text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {user.name}
            <span className="ml-2 text-gray-500 text-lg">@johndoe</span>
          </h1>
          <div className="flex justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <span className="font-medium">{user.orders}</span>
              <span className="text-sm">Pesanan</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <span className="font-medium">{user.reviews}</span>
              <span className="text-sm">Ulasan</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden mb-4">
          <button
            onClick={toggleMobileMenu}
            className={`w-full py-3 px-4 flex justify-between items-center rounded-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <span className="font-medium">
              {activeTab === "profile" && "Profil"}
              {activeTab === "social" && "Sosial Media"}
              {activeTab === "settings" && "Pengaturan"}
            </span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div
              className={`mt-2 rounded-lg shadow-lg overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {["profile", "social", "settings"].map((tab) => (
                <button
                  key={tab}
                  className={`w-full text-left px-4 py-3 ${
                    activeTab === tab
                      ? darkMode
                        ? "bg-gray-700 text-blue-400"
                        : "bg-gray-100 text-blue-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setActiveTab(tab as any);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {tab === "profile" && "Profil"}
                  {tab === "social" && "Sosial Media"}
                  {tab === "settings" && "Pengaturan"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs Navigation - Desktop */}
        <div className="sm:flex justify-center gap-8 mb-8 hidden border-b border-gray-200">
          {["profile", "social", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : darkMode
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(tab as any)}
            >
              {tab === "profile" && "Profil"}
              {tab === "social" && "Sosial Media"}
              {tab === "settings" && "Pengaturan"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          className={`rounded-xl shadow-md p-6 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={<FaBoxOpen className="w-5 h-5" />}
                  title="Total Pesanan"
                  value={user.orders}
                  trend="12% ↑"
                  color="blue"
                />
                <StatCard
                  icon={<FaStar className="w-5 h-5" />}
                  title="Rating"
                  value="4.8"
                  trend="0.2 ↑"
                  color="yellow"
                />
                <StatCard
                  icon={<FaClock className="w-5 h-5" />}
                  title="Bergabung"
                  value={user.joinDate}
                  color="purple"
                />
              </div>

              <div
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Pinned Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {user.pinnedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="group relative overflow-hidden rounded-lg h-32"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="rounded-lg"
                        />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          darkMode
                            ? "from-gray-900/80 to-transparent"
                            : "from-gray-900/50 to-transparent"
                        } flex items-end p-3`}
                      >
                        <p className="text-white font-medium">{item.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* User Bio */}
              <div
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <FaMapMarkerAlt
                    className={darkMode ? "text-gray-300" : "text-gray-500"}
                  />
                  <div>
                    <h4 className="font-medium">Lokasi</h4>
                    <p className="text-gray-500">{user.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCalendarAlt
                    className={darkMode ? "text-gray-300" : "text-gray-500"}
                  />
                  <div>
                    <h4 className="font-medium">Bio</h4>
                    <p className="text-gray-500">{user.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(user.social).map(([platform, url]) => {
                  // Choose icon based on platform
                  let icon;
                  switch (platform) {
                    case "twitter":
                      icon = <FaTwitter />;
                      break;
                    case "instagram":
                      icon = <FaInstagram />;
                      break;
                    case "github":
                      icon = <FaGithub />;
                      break;
                    case "linkedin":
                      icon = <FaLinkedin />;
                      break;
                    default:
                      icon = <FaLink />;
                  }

                  return (
                    <div
                      key={platform}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } hover:border-blue-500 transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-gray-500">{icon}</div>
                        <div>
                          <h4
                            className={`font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {platform.charAt(0).toUpperCase() +
                              platform.slice(1)}
                          </h4>
                          <p className="text-sm text-gray-500">{url}</p>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 rounded-md text-sm ${
                          url
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        {url ? "Terhubung" : "Hubungkan"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">
                  Tambah Sosial Media
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button className="social-icon-btn bg-blue-100 text-blue-800 p-2 rounded-lg hover:bg-blue-200">
                    <FaTwitter className="w-5 h-5" />
                  </button>
                  <button className="social-icon-btn bg-pink-100 text-pink-800 p-2 rounded-lg hover:bg-pink-200">
                    <FaInstagram className="w-5 h-5" />
                  </button>
                  <button className="social-icon-btn bg-gray-100 text-gray-800 p-2 rounded-lg hover:bg-gray-200">
                    <FaGithub className="w-5 h-5" />
                  </button>
                  <button className="social-icon-btn bg-blue-100 text-blue-800 p-2 rounded-lg hover:bg-blue-200">
                    <FaLinkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <textarea
                      value={user.bio}
                      onChange={(e) =>
                        setUser({ ...user, bio: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200"
                      }`}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Lokasi
                    </label>
                    <input
                      type="text"
                      value={user.location}
                      onChange={(e) =>
                        setUser({ ...user, location: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200"
                      }`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex-1"
                      onClick={handleSave}
                    >
                      Simpan Perubahan
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg flex-1 ${
                        darkMode ? "bg-gray-700 text-white" : "bg-gray-200"
                      }`}
                      onClick={() => {
                        setIsEditing(false);
                        setUser(dummyUser); // Reset changes
                      }}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    onClick={handleEdit}
                  >
                    <FaEdit />
                    Edit Profil
                  </button>
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mode Gelap</h4>
                        <p className="text-sm text-gray-500">
                          Aktifkan tema gelap
                        </p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          darkMode ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            darkMode ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifikasi Email</h4>
                        <p className="text-sm text-gray-500">
                          Terima email tentang pesanan baru
                        </p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full p-1 transition-colors bg-blue-500`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6`}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Privasi Profil</h4>
                        <p className="text-sm text-gray-500">
                          Hanya tampilkan profil ke pengguna yang login
                        </p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full p-1 transition-colors bg-gray-300`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform translate-x-0`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center p-4">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © 2025 TOKOENO - User Profile Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
