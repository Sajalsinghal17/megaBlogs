// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-red-600 text-white mt-12 overflow-hidden">
      {/* Decorative subtle gradient on top edge */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 via-white to-red-400 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          {/* Capsule around logo */}
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm transition transform hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5">
            <Logo width="80px" />
            <div>
              <div className="font-semibold text-lg text-red-600">
                megaBlogs
              </div>
              <div className="text-sm text-gray-500">
                Write. Share. Inspire.
              </div>
            </div>
          </div>

          <div className="text-sm opacity-90">
            © {new Date().getFullYear()} megaBlogs. All rights reserved.
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row md:justify-center gap-10">
          <div>
            <h4 className="text-base uppercase tracking-wide mb-3 opacity-90 font-bold">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base uppercase tracking-wide mb-3 opacity-90 font-bold">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:bg-white/10  py-1 rounded-md transition">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social + Contact */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <h4 className="text-xs uppercase tracking-wide mb-1 opacity-90">
            Follow
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Sajalsinghal17"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sajal-singhal-169b4b277/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaLinkedin />
            </a>
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                const email = "sajalsinghal172005@gmail.com";
                const subject = encodeURIComponent(
                  "Let's Connect - From MegaBlogs"
                );
                const body = encodeURIComponent(
                  "Hi Sajal,\n\nI visited your MegaBlogs website and wanted to reach out!\n\n"
                );
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
                window.open(gmailUrl, "_blank");
              }}
              className="inline-block bg-white text-red-600 px-4 py-2 rounded-full font-medium hover:opacity-90 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
