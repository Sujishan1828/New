// components/Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-white text-lg font-bold mb-4">MangalaShowRoom</h2>
          <p className="text-gray-400">
            Your one-stop shop for electronics, fashion, home essentials, and more. Quality products at great prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-md font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/offers" className="hover:text-white">Offers</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-md font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping</a></li>
            <li><a href="/returns" className="hover:text-white">Returns</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-white text-md font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">Get updates about latest offers and products.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l bg-gray-800 text-gray-200 border-none focus:outline-none w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r">Subscribe</button>
          </div>
          <div className="flex space-x-4 mt-6">
            <a href="/" className="hover:text-white"><FaFacebookF /></a>
            <a href="/" className="hover:text-white"><FaInstagram /></a>
            <a href="/" className="hover:text-white"><FaTwitter /></a>
            <a href="/" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MangalaShowRoom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
