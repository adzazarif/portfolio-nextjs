"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const menuRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const updateBackgroundPosition = (id: string): void => {
    const el = menuRefs.current[id];
    const bg = backgroundRef.current;

    if (el && bg) {
      const offsetLeft = el.offsetLeft;
      bg.style.transform = `translateX(${offsetLeft}px)`;
      bg.style.width = `${el.offsetWidth}px`;
      bg.style.height = `${el.offsetHeight}px`;
    }
  };

  useLayoutEffect(() => {
    updateBackgroundPosition("home");
  }, []);

  useEffect(() => {
    const sections = ["home", "abouts", "achievement", "project", "contact"];

    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = "home";

      if (scrollPosition < 300) {
        currentSection = "home";
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const section = document.getElementById(sectionId);

          if (section) {
            const sectionTop = section.offsetTop - 150;
            if (scrollPosition >= sectionTop) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        updateBackgroundPosition(currentSection);
      }
    };

    handleScroll();

    let ticking = false;
    const throttledScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [activeSection]);

  const handleNavClick = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80;
      const targetPosition = section.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="backdrop-blur-md dark:bg-dark fixed w-full z-40 top-0 start-0 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-0 lg:mx-auto p-4 lg:px-16">
          <h1>
            <Link href="/" className="text text-white text-xl font-bold">
              Adza Zarif
            </Link>
          </h1>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => setIsModalOpen(true)}
              className=" duration-300 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer border-cyan-300/25 shadow-[0_0_15px_#00ffff] shadow-cyan-400/40 text-white bg-cyan-400/40 hover:bg-cyan-500"
            >
              Resume
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:text-cyan-400 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between ${
              isMobileMenuOpen ? "" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="relative md:flex md:flex-row flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-4 md:mt-0 md:border-0 rtl:space-x-reverse">
              <div
                ref={backgroundRef}
                className="absolute z-[-1] bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 border border-cyan-300/25 rounded-2xl shadow-[0_0_10px_#00ffff] transition-all duration-300 ease-in-out hidden md:block"
                style={{ transform: "translateX(0px)", width: 0, height: 0 }}
              />
              {["home", "abouts", "achievement", "project", "contact"].map(
                (id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      ref={(el) => {
                        menuRefs.current[id] = el;
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(id);
                      }}
                      className={`block py-2 px-4 duration-300 rounded-2xl relative z-10 ${
                        activeSection === id
                          ? "text-white"
                          : "text-white hover:text-cyan-400"
                      }`}
                    >
                      {id === "abouts"
                        ? "About"
                        : id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 max-w-3xl w-full p-4">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Resume
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4">
              <embed
                src="/images/image/cv.pdf"
                type="application/pdf"
                className="w-full h-[80vh]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
