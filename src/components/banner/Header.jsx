import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";

const Header = () => {
  const title = "FFV";
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setMenu] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;

      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false);
        setIsScrolled(true);
      } else {
        setIsVisible(true);
        if (currentScrollTop === 0) {
          setIsScrolled(false);
        }
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const toggleMenu = () => {
    setMenu(!isMenuOpen);
    if (!isMenuOpen) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative" ref={headerRef}>
      <header
        className={`fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-4 px-4 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "text-white bg-opacity-5 bg-white font-semibold"
            : "text-white"
        } header`}
      >
        <div className="flex items-center p-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {title}
          </h1>
        </div>
        {/* <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="p-2 hover:text-gray-400">
            Home
          </Link>
          <Link to="#" className="p-2 hover:text-gray-400">
            About Us
          </Link>
          <Link to="/shop" className="p-2  hover:text-gray-400">
            Shop
          </Link>
          <Link to="#" className="p-2 hover:text-gray-400">
            Contact Us
          </Link>
        </div> */}

        <div className="md:hidden hover:cursor-pointer" onClick={toggleMenu}>
          <CgMenu size="1.50rem" />
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="absolute left-0 right-0 bg-white p-4 bg-opacity-30 text-white flex flex-col z-10 mt-[70px] transition-all duration-300 ease-in-out backdrop-blur-lg"
          style={{ top: "100%" }}
        >
          <Link to="/" className="p-2 border-b hover:text-gray-400">
            Home
          </Link>
          <Link to="#" className="p-2 border-b hover:text-gray-400">
            About Us
          </Link>
          <Link to="/shop" className="p-2 border-b hover:text-gray-400">
            Shop
          </Link>
          <Link to="#" className="p-2 hover:text-gray-400">
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
