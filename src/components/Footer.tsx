import React from 'react';
import { Flower, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flower className="h-8 w-8 text-pink-400" />
              <h3 className="text-xl font-bold">Flower Delivery</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bringing beauty and joy to your doorstep with fresh, handpicked flowers from the finest gardens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Shop Flowers</a></li>
              <li><a href="/favorites" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>My Favorites</span>
              </a></li>
              <li><a href="/coupons" className="text-gray-300 hover:text-white transition-colors">Coupons & Deals</a></li>
              <li><a href="/history" className="text-gray-300 hover:text-white transition-colors">Order History</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-gray-300">info@flowerdelivery.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-pink-400 mt-0.5" />
                <span className="text-gray-300">123 Garden Street<br />Flower City, FC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Flower Delivery. All rights reserved. Made with ❤️ for flower lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}