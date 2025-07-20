"use client"
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Creative<span className="text-[#B6F500]">Hub</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Transforming ideas into stunning visual experiences through creative design and development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#B6F500] transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#B6F500] transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#B6F500] transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#B6F500] transition">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-[#B6F500] transition">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-[#B6F500] transition">Services</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-[#B6F500] transition">Projects</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#B6F500] transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#B6F500] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/web-design" className="text-gray-400 hover:text-[#B6F500] transition">Web Design</Link></li>
              <li><Link href="/services/graphic-design" className="text-gray-400 hover:text-[#B6F500] transition">Graphic Design</Link></li>
              <li><Link href="/services/video-editing" className="text-gray-400 hover:text-[#B6F500] transition">Video Editing</Link></li>
              <li><Link href="/services/branding" className="text-gray-400 hover:text-[#B6F500] transition">Branding</Link></li>
              <li><Link href="/services/seo" className="text-gray-400 hover:text-[#B6F500] transition">SEO Optimization</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#B6F500] w-full"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-[#B6F500] text-black font-medium rounded-r-md hover:bg-[#9ED600] transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CreativeHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-[#B6F500] text-sm transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#B6F500] text-sm transition">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-[#B6F500] text-sm transition">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}