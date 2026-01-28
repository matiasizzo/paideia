import { useState } from "react";
import { BRAND } from "../constants/brand";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Servicios", href: "#services" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contact" },
  ];

  const handleNavClick = (href) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
<div className="flex-shrink-0">
  <a href="#" className="flex items-center">
    <img src="/images/paideia-navbar.png" alt="Paideia" className="h-20 object-contain" />
  </a>
</div>

{/* Desktop Menu */}
<div className="hidden md:flex space-x-8">
  {navLinks.map((link) => (
    <button
      key={link.label}
      onClick={() => handleNavClick(link.href)}
      className="text-paideia-primary hover:text-paideia-primary-light transition-colors duration-300 font-raleway font-medium cursor-pointer"
    >
      {link.label}
    </button>
  ))}
</div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-paideia-primary hover:bg-paideia-cream focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

{/* Mobile Menu */}
{isOpen && (
  <div className="md:hidden pb-4">
    {navLinks.map((link) => (
      <button
        key={link.label}
        onClick={() => {
          handleNavClick(link.href);
          setIsOpen(false);
        }}
        className="block w-full text-left px-3 py-2 rounded-md text-paideia-primary hover:bg-paideia-cream transition-colors duration-300 font-raleway cursor-pointer"
      >
        {link.label}
      </button>
    ))}
  </div>
)}
      </div>
    </nav>
  );
}
