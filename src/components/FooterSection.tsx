"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function FooterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    // console.log('Form submitted:', formData);
    // Reset form
    alert("Masih dalam pengembangan");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <section id="contact" className="relative min-h-screen w-full  py-20 overflow-hidden">
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
        Contact Me
      </h2>
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

                  <a 
                    href="mailto:adzazarf@gmail.com" 
                    className="group flex items-center space-x-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.273L12 10.728l10.091-6.907h.273c.904 0 1.636.732 1.636 1.636z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400 text-sm">adzazarf@gmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="tel:+6281234567890" 
                    className="group flex items-center space-x-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Telepon</h4>
                      <p className="text-gray-400 text-sm">+62 859-4297-2801</p>
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