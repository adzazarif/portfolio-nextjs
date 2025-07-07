'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Navbar */}
      <nav className="backdrop-blur-md dark:bg-dark fixed w-full z-40 top-0 start-0 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="text text-white text-xl font-bold">
            Adza Zarif
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white bg-dark hover:bg-yellow duration-300 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Resume
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
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

          {/* Desktop Menu */}
          <div
            className={`items-center justify-between ${isMobileMenuOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white hover:bg-slate-700 rounded md:hover:bg-transparent duration-300 md:hover:text-yellow md:text-white md:p-0 md:dark:text-yellow"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:bg-transparent duration-300 md:hover:text-yellow md:p-0 md:dark:hover:text-yellow"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="block py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:bg-transparent duration-300 md:hover:text-yellow md:p-0 md:dark:hover:text-yellow"
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  href="#project"
                  className="block py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:bg-transparent duration-300 md:hover:text-yellow md:p-0 md:dark:hover:text-yellow"
                >
                  Project
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="block py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:bg-transparent duration-300 md:hover:text-yellow md:p-0 md:dark:hover:text-yellow"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 max-w-3xl w-full p-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
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

            {/* Modal Body */}
            <div className="p-4">
              <embed src="/image/cv.pdf" type="application/pdf" className="w-full h-[80vh]" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
