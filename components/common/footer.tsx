"use client";
import React, { useState, useEffect } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUp,
  Heart,
  Code, // Keeping Code as it might be useful for developer section if desired
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Removed mousePosition and handleMouseMove as animated blobs are being removed
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Removed handleMouseMove as it's no longer needed for subtle animations
  // const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   setMousePosition({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   });
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/muhammadyaqoobmuet",
      label: "GitHub",
      color: "hover:text-purple-400",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/donthavefornowtwiiterwillbeadded",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammad-yaqoob-59971625b/",
      label: "LinkedIn",
      color: "hover:text-cyan-400",
    },
    {
      icon: Mail,
      href: "yaqoobahmed45700@gmail.com",
      label: "Email",
      color: "hover:text-pink-400",
    },
    // Removed Globe as it's less common for a personal dev footer, keeps it concise
    // {
    //   icon: Globe,
    //   href: "#",
    //   label: "Website",
    //   color: "hover:text-emerald-400",
    // },
  ];

  return (
    <>
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" />
        </button>
      )}

      <footer
        className="relative bg-gray-950 text-gray-400 py-12 border-t border-rose-500/10 overflow-hidden" // Simpler background, border
        // Removed onMouseMove
      >
        {/* Removed Animated background elements (blobs and grid) for conciseness */}

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Developer's Profile Section - Condensed */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left group flex-shrink-0">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-500/20 mb-4 transform transition-all duration-500 hover:scale-105">
              <Image
                src="/devImage.png" // **IMPORTANT: Replace with your actual image path**
                alt="Yaqoob - Developer"
                layout="fill"
                objectFit="cover"
                className="rounded-full filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-1">
              Crafted by Yaqoob
            </h3>
            <p className="text-sm">
              <Code className="inline-block w-4 h-4 text-purple-400 mr-1" />
              Developer of Zhrnuty.
            </p>
          </div>

          {/* Social Links - Centered or aligned nicely */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={`group relative p-3 bg-gray-800 rounded-lg border border-gray-700 transition-all duration-300 hover:scale-110 hover:border-gray-600 ${social.color} hover:shadow-md hover:shadow-purple-500/15`} // Removed glow class for simplicity, added shadow
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-500 group-hover:text-current transition-colors duration-300" />
                {/* Tooltip (kept as it's useful) */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  {social.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Copyright and Legal Links */}
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            © {new Date().getFullYear()} Zhrnuty - AI Powered PDF Summarizer.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Bottom gradient line - kept as it's a nice subtle touch */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500  to-pink-600 animate-pulse"></div>
      </footer>
    </>
  );
};

export default Footer;
