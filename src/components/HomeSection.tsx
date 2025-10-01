"use client";
import {
  Linkedin,
  Github,
  ArrowRight,
  Instagram,
  Code,
  Palette,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HomeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { icon: Code, text: "Fullstack Developer" },
    { icon: Zap, text: "IoT Developer" },
    { icon: Palette, text: "UI/UX Designer" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 md:pt-0 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-cyan-500 to-purple-600 blur-3xl"
          style={{
            left: mousePosition.x * 0.02 + "%",
            top: mousePosition.y * 0.02 + "%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="absolute w-80 h-80 rounded-full opacity-15 bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl  delay-1000"
          style={{
            right: 100 - mousePosition.x * 0.015 + "%",
            bottom: 100 - mousePosition.y * 0.015 + "%",
            transform: "translate(50%, 50%)",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section */}
            <div
              className={`space-y-8 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">
                    Available for work
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {/* <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Adza Zarif
                  </span>
                  <br />
                  <span className="text-white/90">Nur Iskandar</span> */}
                  Adza Zarif Nur Iskandar
                </h1>

                <div className="w-24 h-1 bg-cyan-400 rounded-full"></div>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <skill.icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-sm text-white/80">{skill.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/adzazarifnur/",
                    color: "hover:text-pink-400",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/adzazarif/",
                    color: "hover:text-blue-400",
                  },
                  {
                    icon: Github,
                    href: "https://github.com/Adzazarif",
                    color: "hover:text-gray-300",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div
              className={`space-y-8 ${
                isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
              }`}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium">
                  <div className="w-8 h-px bg-purple-400"></div>
                  <span>Introduction</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Creating digital experiences that{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    inspire and innovate
                  </span>
                </h2>

                <p className="text-lg text-white/70 leading-relaxed">
                  Mampu membuat aplikasi untuk kebutuhan dan fungsionalitas
                  pengguna untuk meningkatkan produktivitas dengan teknologi
                  terdepan dan desain yang menarik.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex gap-4">
                <a
                  href="#abouts"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                >
                  <span>Lebih lengkap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  <span>Contact Me</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-[450px] h-[450px] rounded-full opacity-50 absolute right-0 bottom-0 animate-bounce bg-gradient-biru"></div>
      {/* Scroll Indicator */}
      <div className="hidden md:flex flex-col items-center absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        <div className="w-3 h-3 bg-white/50 rounded-full mx-auto mt-2"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}
