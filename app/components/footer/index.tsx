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

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 rounded-t-xl shadow-xl overflow-hidden relative py-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
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
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-white font-semibold mb-4 text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/buy"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs mr-1"
                  />{" "}
                  Buy
                </a>
              </li>
              <li>
                <a
                  href="/sell"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs mr-1"
                  />{" "}
                  Sell
                </a>
              </li>
              <li>
                <a
                  href="/service"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs mr-1"
                  />{" "}
                  Service
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs mr-1"
                  />{" "}
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs mr-1"
                  />{" "}
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-white font-semibold mb-4 text-sm">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/smartphones"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faMobileAlt}
                    className="text-xs mr-1"
                  />{" "}
                  Smartphones
                </a>
              </li>
              <li>
                <a
                  href="/laptops"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon icon={faLaptop} className="text-xs mr-1" />{" "}
                  Laptops
                </a>
              </li>
              <li>
                <a
                  href="/audio"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faHeadphones}
                    className="text-xs mr-1"
                  />{" "}
                  Audio
                </a>
              </li>
              <li>
                <a
                  href="/gaming"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon icon={faGamepad} className="text-xs mr-1" />{" "}
                  Gaming
                </a>
              </li>
              <li>
                <a
                  href="/accessories"
                  className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                >
                  <FontAwesomeIcon icon={faPlug} className="text-xs mr-1" />{" "}
                  Accessories
                </a>
              </li>
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
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 rounded-l-lg text-sm flex-grow bg-blue-700 bg-opacity-50 text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-white border border-blue-400 border-opacity-30"
              />
              <button className="bg-white text-blue-600 rounded-r-lg px-4 hover:bg-blue-100 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>

            <div className="flex space-x-2">
              <a
                href="/app"
                className="bg-black bg-opacity-30 text-white text-xs px-3 py-2 rounded-lg flex items-center hover:bg-opacity-40 transition-all border border-white border-opacity-10"
              >
                <FontAwesomeIcon icon={faApple} className="mr-2 text-lg" />
                <div>
                  <div className="text-[10px] leading-tight">
                    Download on the
                  </div>
                  <div>App Store</div>
                </div>
              </a>
              <a
                href="/app"
                className="bg-black bg-opacity-30 text-white text-xs px-3 py-2 rounded-lg flex items-center hover:bg-opacity-40 transition-all border border-white border-opacity-10"
              >
                <FontAwesomeIcon icon={faGooglePlay} className="mr-2 text-lg" />
                <div>
                  <div className="text-[10px] leading-tight">Get it on</div>
                  <div>Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-blue-400 border-opacity-30 relative z-10">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <div className="flex flex-wrap space-x-4">
                <a
                  href="/privacy"
                  className="text-blue-100 hover:text-white transition-colors text-xs"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-blue-100 hover:text-white transition-colors text-xs"
                >
                  Terms of Service
                </a>
                <a
                  href="/faq"
                  className="text-blue-100 hover:text-white transition-colors text-xs"
                >
                  FAQ
                </a>
                <a
                  href="/contact"
                  className="text-blue-100 hover:text-white transition-colors text-xs"
                >
                  Contact
                </a>
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
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />{" "}
              Indonesia &nbsp;|&nbsp;
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />{" "}
              info@tokoeno.com &nbsp;|&nbsp;
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-1" /> +62 123
              4567 890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
