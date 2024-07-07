"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  const [nav, setNav] = useState(false);
  const [token, setToken] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedToken : any = Cookies.get("token");
    setToken(storedToken);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/competition", label: "Competition" },
    { href: "/register", label: "Register" },
    { href: "/login", label: "Login" },
    { href: "/events", label: "Events & News" },
    { href: "/get-plant", label: "Get Plant" },
    { href: "/group-list", label: "Group List" },
    { href: "/participant-list", label: "Participant List" },
    { href: "/faq", label: "FAQ" },
    { href: "/result", label: "Result" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white py-5 mb-2">
      <div className="w-full mx-auto px-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl text-primary font-medium font-sans mb-5">
          <a href="https://www.greencleanearth.org/" target="_blank" rel="noreferrer">
            GreenCleanEarth
          </a>
        </h1>

        <ul className="hidden md:flex md:justify-center md:items-center flex-wrap">
          {links.map((link) => (
            <li key={link.href} className="m-0 mx-1">
              <Link href={link.href} passHref>
                <p
                  className={`text-black no-underline px-3 py-1 rounded-full transition-colors duration-300 ${
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "bg-light-gray text-black"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-20 text-gray-800 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>

      {nav && (
        <ul className="z-10 flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white text-gray-800">
          {links.map((link) => (
            <li
              key={link.href}
              className="px-4 py-6 cursor-pointer capitalize text-4xl"
            >
              <Link href={link.href} passHref>
                <p
                  onClick={() => setNav(!nav)}
                  className={`no-underline p-1.5 rounded-full transition-colors duration-300 ${
                    pathname === link.href
                      ? "bg-green-600 text-white"
                      : "hover:bg-yellow-300"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default NavigationBar;
