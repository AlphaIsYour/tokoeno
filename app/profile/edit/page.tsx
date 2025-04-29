"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

// Import icons
import {
  FaUser,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaArrowLeft,
  FaSave,
  FaCamera,
  FaCheckCircle,
  FaTimesCircle,
  FaPaintBrush,
  FaMoon,
  FaSun,
} from "react-icons/fa";

// Interface matching the User from the profile page
interface User {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  location: string | null;
  join_date: string;
  image: string | null;
  cover_pic: string | null;
  username: string | null;
  role: string;
  social: {
    twitter?: string;
    instagram?: string;
    github?: string;
    linkedin?: string;
  };
}

const defaultUser: User = {
  id: "",
  name: "User",
  email: "",
  bio: null,
  location: null,
  join_date: new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
  }),
  image: "/img/r12.jpg",
  cover_pic: "/img/r10.jpg",
  username: null,
  role: "user",
  social: {
    twitter: "",
    instagram: "",
    github: "",
    linkedin: "",
  },
};

const EditProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showHelpTips, setShowHelpTips] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    twitter: "",
    instagram: "",
    github: "",
    linkedin: "",
  });

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Optional: Check if user has seen tips before
  useEffect(() => {
    const hasSeenTips = localStorage.getItem("hasSeenProfileEditTips");
    if (!hasSeenTips) {
      // Show tips automatically for first-time users
      setShowHelpTips(true);
      // Set flag so it doesn't show automatically next time
      localStorage.setItem("hasSeenProfileEditTips", "true");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fetch user data when component mounts or session changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setLoading(true);
          const response = await axios.get(
            `/api/user?email=${session.user.email}`
          );

          // Check if we got data or if this is a new user
          const userData = response.data;
          const isNewUser = !userData || Object.keys(userData).length === 0;

          if (isNewUser) {
            // For new users, create a default profile with session data
            const newUserData: User = {
              ...defaultUser,
              id: session.user.id || "",
              name: session.user.name || "User",
              email: session.user.email,
              image: session.user.image || defaultUser.image,
            };
            setUser(newUserData);
            initFormData(newUserData);
          } else {
            // For existing users, merge the database user with default values
            const mergedUser = {
              ...defaultUser, // Provide defaults for any missing fields
              ...userData,
              // Format join date if available
              join_date: userData.join_date
                ? new Date(userData.join_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })
                : defaultUser.join_date,
            };
            setUser(mergedUser);
            initFormData(mergedUser);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // Fall back to session data with default values
          const fallbackUser = {
            ...defaultUser,
            id: session.user.id || "",
            name: session.user.name || "User",
            email: session.user.email,
            image: session.user.image || defaultUser.image,
          };
          setUser(fallbackUser);
          initFormData(fallbackUser);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        // Redirect to login if not authenticated
        window.location.href = "/login";
      }
    };

    fetchUserData();
  }, [session, status]);

  // Initialize form data from user object
  const initFormData = (userData: User) => {
    setFormData({
      name: userData.name || "",
      username: userData.username || "",
      bio: userData.bio || "",
      location: userData.location || "",
      twitter: userData.social?.twitter || "",
      instagram: userData.social?.instagram || "",
      github: userData.social?.github || "",
      linkedin: userData.social?.linkedin || "",
    });

    // Set image previews
    setImagePreview(userData.image);
    setCoverPreview(userData.cover_pic);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover image change
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      setSaving(true);

      // Prepare updated user data
      const updatedUser = {
        ...user,
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        image: imagePreview || user.image,
        cover_pic: coverPreview || user.cover_pic,
        social: {
          twitter: formData.twitter,
          instagram: formData.instagram,
          github: formData.github,
          linkedin: formData.linkedin,
        },
      };

      // Send update request
      await axios.put(`/api/user/${user.id}`, updatedUser);

      // Show success notification with fun message
      const successMessages = [
        "Woohoo! Profil kamu sudah diperbarui! ✨",
        "Keren! Perubahan tersimpan dengan mulus! 🚀",
        "Yesss! Profil baru, semangat baru! 🎉",
        "Siip! Profil kamu sekarang lebih kece! 😎",
        "Mantap! Profil sudah diupdate! 👍",
        "Jreng jreng! Profil baru akan bikin netizen kepo! 🤩",
        "Bravo! Profilmu hari ini jadi lebih kece dari kemarin! 💯",
        "Cihuy! Update profil sukses, siap menggaet followers baru! 🥳",
      ];

      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      setNotification({
        show: true,
        message: randomMessage,
        type: "success",
      });

      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
        // Optional: Navigate back to profile after successful update
        // router.push("/profile");
      }, 5000);

      // Allow some time for the notification to be visible
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      console.error("Failed to update profile:", error);

      const errorMessages = [
        "Ups, ada masalah saat menyimpan profil! 😅",
        "Waduh, gagal simpan! Server sedang tidur kali ya? 😴",
        "Hmm, sepertinya profil kamu terlalu keren untuk sistem kami! 🤔",
        "Eits, gagal update! Mungkin internetmu sedang rebahan? 🧐",
      ];

      const randomError =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];

      setNotification({
        show: true,
        message: randomError,
        type: "error",
      });

      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.push("/profile");
  };

  // Show loading state while fetching data
  if (loading && !user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Cover Image with overlay */}
      <div className="relative h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="relative h-full w-full">
          {coverPreview ? (
            <Image
              src={coverPreview}
              alt="Cover"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="opacity-50"
              priority
            />
          ) : user?.cover_pic ? (
            <Image
              src={user.cover_pic}
              alt="Cover"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="opacity-50"
              priority
            />
          ) : null}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Edit Profil</h1>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-all dark-mode-toggle"
        >
          {darkMode ? (
            <FaSun className="w-5 h-5" />
          ) : (
            <FaMoon className="w-5 h-5" />
          )}
        </button>

        {/* Back button at top */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-all flex items-center gap-2"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>

        {/* Cover photo change button */}
        <label className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-lg cursor-pointer hover:bg-black/70 transition-colors flex items-center gap-2">
          <FaPaintBrush className="w-4 h-4" />
          <span>Ubah Cover</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
        </label>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button text */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-800"
            } transition-colors`}
          >
            <FaArrowLeft /> Kembali ke Profil
          </button>
        </div>

        {/* Edit Form */}
        <motion.div
          className={`rounded-xl shadow-md p-6 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 group profile-image-hover">
                <div className="relative h-full w-full">
                  <Image
                    src={imagePreview || user?.image || "/img/r12.jpg"}
                    alt="Profile"
                    fill
                    sizes="8rem"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all cursor-pointer">
                  <div className="bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <FaCamera className="w-4 h-4" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Arahkan kursor ke foto untuk mengganti
              </p>
            </div>

            {/* Basic Information */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <label
                  htmlFor="name"
                  className={`block mb-2 font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    } border`}
                    placeholder="Nama lengkap"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className={`block mb-2 font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    >
                      @
                    </span>
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    } border`}
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="bio"
                  className={`block mb-2 font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className={`block w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  } border`}
                  placeholder="Ceritakan sedikit tentang dirimu..."
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {formData.bio?.length || 0}/500 karakter
                </p>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="location"
                  className={`block mb-2 font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Lokasi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaMapMarkerAlt
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    } border`}
                    placeholder="Kota, Negara"
                  />
                </div>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-5 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              } mt-8`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Sosial Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="social-input-container">
                  <label
                    htmlFor="twitter"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Twitter
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaTwitter
                        className={`${
                          darkMode ? "text-blue-300" : "text-blue-400"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                        darkMode
                          ? "bg-gray-600 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border`}
                      placeholder="username Twitter"
                    />
                  </div>
                </div>

                <div className="social-input-container">
                  <label
                    htmlFor="instagram"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Instagram
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaInstagram
                        className={`${
                          darkMode ? "text-pink-300" : "text-pink-500"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                        darkMode
                          ? "bg-gray-600 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border`}
                      placeholder="username Instagram"
                    />
                  </div>
                </div>

                <div className="social-input-container">
                  <label
                    htmlFor="github"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    GitHub
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaGithub
                        className={darkMode ? "text-gray-300" : "text-gray-800"}
                      />
                    </div>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                        darkMode
                          ? "bg-gray-600 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border`}
                      placeholder="username GitHub"
                    />
                  </div>
                </div>

                <div className="social-input-container">
                  <label
                    htmlFor="linkedin"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    LinkedIn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaLinkedin
                        className={`${
                          darkMode ? "text-blue-300" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                        darkMode
                          ? "bg-gray-600 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border`}
                      placeholder="username LinkedIn"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                type="button"
                onClick={handleBack}
                className={`px-6 py-3 rounded-lg border transition-all hover:shadow-md ${
                  darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } flex items-center justify-center gap-2`}
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Batal</span>
              </button>
              <motion.button
                type="submit"
                disabled={saving}
                className={`px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all hover:shadow-md ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                } flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Fun Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 left-4 sm:left-auto sm:w-96 p-4 rounded-lg shadow-lg z-50 ${
              notification.type === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {notification.type === "success" ? (
                  <FaCheckCircle className="w-6 h-6 animate-pulse" />
                ) : (
                  <FaTimesCircle className="w-6 h-6 animate-pulse" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() =>
                  setNotification((prev) => ({ ...prev, show: false }))
                }
                className="flex-shrink-0 text-white hover:text-gray-100"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Tips Panel */}
      <AnimatePresence>
        {showHelpTips && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div
              className={`w-full max-w-2xl rounded-xl shadow-2xl ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } p-6`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Tips Edit Profil</h3>
                <button
                  onClick={() => setShowHelpTips(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 mt-1">
                    <FaCamera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Foto Profil</h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Arahkan kursor ke foto profil untuk mengganti dengan foto
                      baru. Foto yang baik akan membuat profilmu lebih menarik!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-purple-500 mt-1">
                    <FaPaintBrush className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Foto Cover</h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Klik tombol &quot;Ubah Cover&quot; di bagian atas untuk
                      mengganti gambar latar profilmu.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-1">
                    <FaUser className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Username</h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Username kamu adalah identitas unikmu di platform. Pilih
                      yang mudah diingat!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-amber-500 mt-1">
                    <FaTwitter className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sosial Media</h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Tambahkan akun sosial mediamu untuk terhubung dengan
                      pengguna lain dan memperluas jaringanmu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowHelpTips(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Mulai Edit Profil
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Features: Accessibility Panel */}
      <button
        onClick={() => {
          // Toggle accessibility panel here
          // This is a placeholder for additional functionality
          setShowHelpTips(true); // Reuse help tips panel for demonstration
        }}
        className={`fixed bottom-4 right-4 rounded-full p-3 shadow-lg ${
          darkMode ? "bg-gray-700 text-blue-400" : "bg-white text-blue-600"
        } hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-label="Accessibility options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>

      {/* Mobile-friendly footer with additional actions */}
      <footer
        className={`mt-12 py-6 ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-sm mb-4 sm:mb-0">
              © {new Date().getFullYear()} | Edit Profil
            </p>
            <div className="flex gap-4">
              <Link href="/help" className="text-sm hover:underline">
                Bantuan
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Privasi
              </Link>
              <Link href="/terms" className="text-sm hover:underline">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EditProfile;
