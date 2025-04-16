"use client";
import React from "react";
import "./style.css";
import Image from "next/image";

const Category = () => {
  const featuredCategories = [
    {
      id: 1,
      image: "/img/r1.jpg",
      title: "Makanan",
      subtitle: "Kering",
    },
    {
      id: 2,
      image: "/img/r2.jpg",
      title: "Figure",
      subtitle: "",
    },
    {
      id: 3,
      image: "/img/r3.jpg",
      title: "Tas Selempang",
      subtitle: "Pria",
    },
    {
      id: 4,
      image: "/img/r4.jpg",
      title: "Flat Shoes",
      subtitle: "Wanita",
    },
  ];

  const categoryPills = [
    { id: 1, icon: "grid", label: "Kategori" },
    { id: 2, icon: "smartphone", label: "Handphone & Tablet" },
    { id: 3, icon: "credit-card", label: "Top-Up & Tagihan" },
    { id: 4, icon: "headphones", label: "Elektronik" },
    { id: 5, icon: "heart", label: "Perawatan Hewan" },
    { id: 6, icon: "plane", label: "Travel & Entertainment" },
    { id: 7, icon: "dollar-sign", label: "Keuangan" },
  ];

  const renderIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 shrink-0";
    switch (iconName) {
      case "grid":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-teal-600`}
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        );
      case "smartphone":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-blue-600`}
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12" y2="18"></line>
          </svg>
        );
      case "credit-card":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-green-600`}
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        );
      case "headphones":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-red-600`}
          >
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        );
      case "heart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-purple-600`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        );
      case "plane":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-blue-600`}
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
          </svg>
        );
      case "dollar-sign":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${iconClass} text-yellow-600`}
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="category-section bg-custom rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 mt-5">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">
        Kategori Pilihan
      </h2>

      <div className="featured-categories flex gap-4 mb-8 overflow-x-auto pb-4 scroll-smooth">
        {featuredCategories.map((category) => (
          <div
            key={category.id}
            className="group flex flex-col items-center cursor-pointer min-w-[120px]"
          >
            <div className="category-image-container mb-3 w-28 h-28 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 relative">
              <Image
                src={category.image}
                alt={category.title || "Category"}
                fill
                className="..."
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <h3 className="text-center font-semibold text-gray-800 text-sm mb-1">
              {category.title}
            </h3>
            {category.subtitle && (
              <p className="text-center text-xs text-gray-500 font-medium">
                {category.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="category-pills flex gap-3 overflow-x-auto pb-2">
        {categoryPills.map((pill) => (
          <button
            key={pill.id}
            className="flex items-center px-4 py-2.5 rounded-full border border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md min-w-max"
          >
            <span className="mr-2">{renderIcon(pill.icon)}</span>
            <span className="text-sm font-medium text-gray-700">
              {pill.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
