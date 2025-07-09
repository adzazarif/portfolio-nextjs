"use client";
import React, { useState } from 'react';

export default function FooterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <section className="relative min-h-screen w-full  py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="relative flex items-center justify-center pt-0 pb-8 px-4 sm:px-0 max-w-screen-lg mx-auto">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl"></div>

  {/* Garis kiri */}
  <div className="hidden sm:flex relative items-center">
    <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
    <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400"></div>
    <div className="w-16 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></div>
  </div>

  {/* Konten tengah */}
  <div className="relative bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-2xl px-4 sm:px-8 py-6 mx-2 sm:mx-6 w-full max-w-2xl">
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent rounded-2xl"></div>
    <div className="relative z-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-3">
        About Me
      </h2>
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
        Mengenal lebih dalam tentang pengalaman, keahlian, dan tools saya
      </p>
      <div className="flex justify-center space-x-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse delay-100"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse delay-200"></div>
      </div>
    </div>
  </div>

  {/* Garis kanan */}
  <div className="hidden sm:flex relative items-center">
    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
    <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400"></div>
    <div className="w-20 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></div>
  </div>
</header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="relative">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div> */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg mr-3 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 group-hover:border-gray-500/50"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 group-hover:border-gray-500/50"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows={6}
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 group-hover:border-gray-500/50 resize-none"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <span className="relative flex items-center justify-center">
                    Send Message
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div> */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Adza Zarif Nur Iskandar
                  </h3>
              
                </div>

                <p className="text-gray-300 text-center mb-8 leading-relaxed">
                  Jangan ragu untuk menghubungi saya jika ada pertanyaan, saran, atau kritik. Jika anda ingin membuat sebuah proyek, jangan ragu untuk menghubungi saya. Saya siap membantu anda.
                </p>

                {/* Social Links */}
                <div className="space-y-4">
                  <a 
                    href="https://github.com/Adzazarif" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">GitHub</h4>
                      <p className="text-gray-400 text-sm">adza zarif</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.instagram.com/adzazarifnur/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Instagram</h4>
                      <p className="text-gray-400 text-sm">adzazarifnur</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/adzazarif/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">LinkedIn</h4>
                      <p className="text-gray-400 text-sm">Adza Zarif Nur Iskandar</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
      <footer className="p-4 text-center text-white">
    <small>@ 2025 Copyright: Developed by Adza Zarif Nur Iskandar</small>
</footer>
</>
  );
}