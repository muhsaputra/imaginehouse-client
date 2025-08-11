"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationBar({ children }) {
  const navItems = [
    { name: "Beranda", link: "/" },
    { name: "Tentang", link: "/about" },
    { name: "Layanan", link: "/service" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Blog", link: "/blog" },
    { name: "Kontak", link: "/contact" },
  ];

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();

    if (link.startsWith("#")) {
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(link);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full z-100">
      <Navbar className="fixed top-10 text-white">
        {/* Desktop Navigation */}
        <NavBody visible={scrolled}>
          <NavbarLogo visible={scrolled} />
          <NavItems items={navItems} visible={scrolled} />
          <NavbarButton
            href="https://wa.me/6287884456638"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Kami
          </NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav visible={scrolled}>
          <MobileNavHeader>
            <NavbarLogo visible={scrolled} />
            <MobileNavToggle
              visible={scrolled}
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <h3 className="text-lg font-bold text-primary mb-2">Menu</h3>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className="relative text-neutral-600 hover:text-primary transition dark:text-neutral-300"
              >
                <span className="block py-1">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Kontak
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Render children dari <Navbar> */}
      {children}
    </div>
  );
}
