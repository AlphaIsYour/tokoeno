"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok,
  faApple,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import {
  faChevronRight,
  faMobileAlt,
  faLaptop,
  faHeadphones,
  faGamepad,
  faPlug,
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

// Preload FontAwesome CSS untuk hindari FOUT
export const metadata = {
  links: [
    {
      rel: "preload",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
      as: "style",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 rounded-t-xl shadow-xl overflow-hidden relative py-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-12 w-32 h-32 bg-indigo-300 opacity-5 rounded-full"></div>
        <div className="absolute top-24 right-28 w-16 h-16 bg-blue-200 opacity-5 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-wrap justify-between mb-8 relative z-10">
          {/* Brand section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center mr-2">
                <span className="text-blue-600 font-bold text-xl">T</span>
              </div>
              <h2 className="text-white text-xl font-bold">TOKOENO</h2>
            </div>
            <p className="text-blue-100 text-sm mb-4">
              Your trusted marketplace for pre-owned electronics. Buy, sell, and
              service all in one place.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: faFacebookF, label: "Facebook", href: "#" },
                { icon: faTwitter, label: "Twitter", href: "#" },
                { icon: faInstagram, label: "Instagram", href: "#" },
                { icon: faYoutube, label: "YouTube", href: "#" },
                { icon: faTiktok, label: "TikTok", href: "#" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Follow TOKOENO on ${label}`}
                  className="text-white hover:text-blue-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={icon} size="lg" fixedWidth />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-white font-semibold mb-4 text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/buy", label: "Buy" },
                { href: "/sell", label: "Sell" },
                { href: "/service", label: "Service" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="xs"
                      className="mr-1"
                      fixedWidth
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-white font-semibold mb-4 text-sm">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                {
                  href: "/smartphones",
                  label: "Smartphones",
                  icon: faMobileAlt,
                },
                { href: "/laptops", label: "Laptops", icon: faLaptop },
                { href: "/audio", label: "Audio", icon: faHeadphones },
                { href: "/gaming", label: "Gaming", icon: faGamepad },
                { href: "/accessories", label: "Accessories", icon: faPlug },
              ].map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      size="xs"
                      className="mr-1"
                      fixedWidth
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/3">
            <h3 className="text-white font-semibold mb-4 text-sm">
              Stay Updated
            </h3>
            <p className="text-blue-100 text-sm mb-3">
              Get the latest deals and tech news
            </p>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 rounded-l-lg text-sm flex-grow bg-white bg-opacity-50 text-black placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white border border-blue-400 border-opacity-30"
                aria-label="Email address for newsletter"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 rounded-r-lg px-4 hover:bg-blue-200 transition-colors text-sm font-medium"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>

            <div className="flex space-x-2">
              {[
                {
                  icon: faApple,
                  label: "App Store",
                  href: "/app",
                  text: "Download on the App Store",
                },
                {
                  icon: faGooglePlay,
                  label: "Google Play",
                  href: "/app",
                  text: "Get it on Google Play",
                },
              ].map(({ icon, label, href, text }) => (
                <a
                  key={label}
                  href={href}
                  className="bg-black bg-opacity-30 text-white text-xs px-3 py-2 rounded-lg flex items-center hover:bg-opacity-40 transition-all border border-white border-opacity-10"
                  aria-label={text}
                >
                  <FontAwesomeIcon icon={icon} size="lg" className="mr-2" />
                  <div>
                    <div className="text-[10px] leading-tight">
                      {text.split(" ")[0]} {text.split(" ")[1]}
                    </div>
                    <div>{label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-blue-400 border-opacity-30 relative z-10">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <div className="flex flex-wrap space-x-4">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-blue-100 hover:text-white transition-colors text-xs"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto text-center md:text-right">
              <p className="text-blue-100 text-xs">
                &copy; {new Date().getFullYear()} TOKOENO. All rights reserved.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-blue-200 text-xs">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="xs"
                className="mr-1"
              />{" "}
              Indonesia &nbsp;|&nbsp;
              <FontAwesomeIcon
                icon={faEnvelope}
                size="xs"
                className="mr-1"
              />{" "}
              info@tokoeno.com &nbsp;|&nbsp;
              <FontAwesomeIcon
                icon={faPhoneAlt}
                size="xs"
                className="mr-1"
              />{" "}
              +62 123 4567 890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
