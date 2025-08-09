"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Linkedin, Phone, Map } from "lucide-react";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState("tentang");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const sections = [
    { id: "tentang", label: "Tentang" },
    { id: "pengalaman", label: "Pengalaman" },
    { id: "skill", label: "Skill" },
    { id: "tools", label: "Tools" },
  ];

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSection("tentang");
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sortedEntries = entries.sort((a, b) => {
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          return aRect.top - bRect.top;
        });
        const visibleEntry = sortedEntries.find(
          (entry) => entry.isIntersecting
        );

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        root: scrollContainerRef.current,
        rootMargin: "-20% 0px -20% 0px",
      }
    );
    const timeoutId = setTimeout(() => {
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      const firstSection = document.getElementById("tentang");
      if (firstSection && scrollContainerRef.current) {
        const rect = firstSection.getBoundingClientRect();
        const containerRect =
          scrollContainerRef.current.getBoundingClientRect();

        if (rect.top >= containerRect.top && rect.top < containerRect.bottom) {
          setActiveSection("tentang");
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    if (!scrollContainerRef.current || !sectionRef.current) return;

    const scrollContent = scrollContainerRef.current;
    const totalScrollHeight =
      scrollContent.scrollHeight - scrollContent.clientHeight;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${scrollContent.scrollHeight}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        scrollContent.scrollTop = self.progress * totalScrollHeight;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    const articles = gsap.utils.toArray<HTMLElement>(
      "#tentang, #pengalaman, #skill, #tools"
    );

    articles.forEach((article, index) => {
      gsap.fromTo(
        article,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index === 0 ? 0 : 0,
          scrollTrigger: {
            trigger: article,
            start: index === 0 ? "top 90%" : "top 80%",
            toggleActions: "play none none reverse",
            scroller: scrollContainerRef.current || undefined,
            onToggle: (self) => {
              if (index === 0 && self.isActive) {
                setActiveSection("tentang");
              }
            },
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const timelineContainer = document.querySelector(
      "#pengalaman .timeline-container"
    );
    if (!timelineContainer) return;

    const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-item");
    const timelineLine = document.querySelector(".timeline-line");
    const timelineDots = gsap.utils.toArray<HTMLElement>(".timeline-dot");

    // Animasi untuk garis timeline
    if (timelineLine) {
      gsap.fromTo(
        timelineLine,
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#pengalaman",
            start: "top 60%",
            end: "bottom 40%",
            scroller: scrollContainerRef.current || undefined,
            scrub: 1,
          },
        }
      );
    }

    timelineItems.forEach((item, index) => {
      const isLeft = index % 2 === 0;

      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            scroller: scrollContainerRef.current || undefined,
            toggleActions: "play none none reverse",
          },
        }
      );

      const dot = timelineDots[index];
      if (dot) {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            backgroundColor: "#ffffff",
          },
          {
            scale: 1,
            backgroundColor: "#06b6d4",
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              scroller: scrollContainerRef.current || undefined,
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(dot, {
          boxShadow: "0 0 0 10px rgba(6, 182, 212, 0.3)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            scroller: scrollContainerRef.current || undefined,
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen max-w-screen-2xl m-auto px-0 md:px-24 bg-[#0B0D14] text-white font-mono flex flex-col justify-center"
      id="abouts"
    >
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

      <div className="flex gap-10 px-5 md:px-16 h-[60vh] md:h-[80vh] overflow-hidden">
        {/* Desktop Navigation - Hidden on mobile */}
        <nav
          className="hidden md:flex flex-col items-center px-4 pt-8"
          aria-label="Sidebar Navigation"
        >
          {sections.map((section, idx) => (
            <div
              className="relative z-10 flex flex-col items-center"
              key={section.id}
            >
              <button
                className={`rounded-xl px-6 py-3 border w-[150px] flex items-center justify-center transition-all duration-300
                ${
                  activeSection === section.id
                    ? "border-cyan-400 shadow-[0_0_15px_#00ffff] text-white bg-cyan-500/90"
                    : "border-gray-400 text-white"
                } bg-[#0d1117]`}
                onClick={() => {
                  const el = document.getElementById(section.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {section.label}
              </button>
              {idx < sections.length - 1 && (
                <div
                  className={`h-8 w-1 ${
                    activeSection === sections[idx].id ||
                    activeSection === sections[idx + 1].id
                      ? "bg-cyan-400"
                      : "bg-gray-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Navigation - Dot indicators */}
        <div className="md:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-4">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 relative group
                ${
                  activeSection === section.id
                    ? "bg-cyan-400 border-cyan-400 shadow-[0_0_8px_#00ffff]"
                    : "bg-transparent border-gray-400"
                }`}
                onClick={() => {
                  const el = document.getElementById(section.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                title={section.label}
              >
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {section.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 p-4 md:p-8 space-y-8 overflow-hidden pointer-events-none rounded-lg h-full"
        >
          <article
            id="tentang"
            className={`scroll-snap-start relative overflow-hidden rounded-2xl p-6 md:p-8 scroll-mt-20 transition-all duration-500 ${
              activeSection === "tentang"
                ? "border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                : "border border-gray-600 shadow-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 hover:border-gray-500"
            } backdrop-blur-sm`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
            </div>

            {/* Header */}
            <div className="relative flex items-center gap-4 mb-6">
              <div>
                <h3 className="text-2xl md:text-2xl font-bold text-white mb-1">
                  Tentang Saya
                </h3>
                <div className="w-20 h-1 bg-cyan-500/90 rounded-full" />
              </div>
            </div>

            {/* Main Content */}
            <div className="relative space-y-6">
              {/* Profile Card */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="bg-cyan-500/90 p-0.5 rounded-xl">
                    <div className="bg-gray-800 rounded-xl p-4 text-center">
                      {/* <div className="w-20 h-20 bg-cyan-500/90 rounded-full mx-auto mb-4 flex items-center justify-center">
                        
                      </div> */}
                      <Image
                        src="/images/profile2.png"
                        alt="Profile"
                        width={80}
                        height={80}
                        className="w-20 h-20 bg-cyan-500/90 rounded-full mx-auto mb-4 flex items-center justify-center object-cover"
                      />
                      <h1 className="text-white font-semibold text-lg mb-1">
                        Adza Zarif Nur Iskandar
                      </h1>
                      <p className="text-cyan-400 text-sm">
                        Teknologi Informasi
                      </p>
                      <p className="text-gray-400 text-xs">
                        Politeknik Negeri Jember
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  {/* Stats */}
                  <div className="grid grid-cols-3 mb-8 gap-6">
                    {[
                      { number: "10+", label: "Projek" },
                      { number: "5+", label: "Lomba" },
                      { number: "15+", label: "Sertifikat" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {stat.number}
                        </div>
                        <div className="text-sm text-white/60">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300">
                        Semester 6 - Teknologi Informasi
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center">
                        <Linkedin className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300">3+ Tahun Pengalaman</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center">
                        <Map className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300">
                        Fokus Pengembangan Website
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}

              <p className="leading-relaxed text-gray-300 text-sm md:text-base">
                Saya Adza Zarif Nur Iskandar seorang mahasiswa semester 6
                Teknologi Informasi di Politeknik Negeri Jember dan sudah terjun
                di bidang IT dengan pengalaman 3+ tahun yang berfokus dalam
                pengembangan aplikasi website. Dalam Kecintaan saya pada
                perangkat lunak menjadi bahan bakar semangat untuk terus belajar
                dan berkembang. Selain itu, saya suka mencoba hal-hal baru, yang
                membuat saya terus memperluas wawasan dan keterampilan. Saya
                siap membuat aplikasi untuk kebutuhan dan fungsionalitas
                pengguna untuk meningkatkan produktifitas dan efisiensi
                pekerjaan.
              </p>
            </div>
          </article>

          <article
            id="pengalaman"
            className={`scroll-snap-start border rounded-lg p-4 md:p-6 scroll-mt-20 transition-all duration-300 ${
              activeSection === "pengalaman"
                ? "border-cyan-400 shadow-[0_0_15px_#00ffff]"
                : "border-gray-500 shadow-lg"
            }`}
          >
            {/* Header */}
            <div className="relative flex items-center gap-4 mb-0">
              <div>
                <h3 className="text-2xl md:text-2xl font-bold text-white mb-0">
                  Pengalaman
                </h3>
                <div className="w-20 h-1 bg-cyan-500/90 rounded-full" />
              </div>
            </div>

            <div className="timeline-container flex flex-col items-center w-full space-y-8 bg-primary text-white py-6 md:py-12">
              <div className="relative w-full max-w-4xl">
                <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500 origin-top"></div>

                <div className="timeline-item relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 bg-white h-4 w-4 rounded-full border-4 border-gray-900 z-10"></div>
                  <div className="w-full md:w-1/2 text-center md:text-right md:pr-6">
                    <div className="bg-cyan-400/10 p-3 md:p-4 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
                      <h3 className="font-bold text-base md:text-lg text-cyan-300">
                        Front-End & Back-End Developer (Studi Independent)
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-2">
                        Coding Camp By DBS Foundation (Feb 2025 - Now)
                      </p>
                      <p className="text-xs md:text-sm text-gray-300">
                        Mengembangkan bisnis jasa software development bersama
                        tim berpengalaman
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>

                <div className="timeline-item relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-12">
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 bg-white h-4 w-4 rounded-full border-4 border-gray-900 z-10"></div>
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="w-full md:w-1/2 text-center md:text-left md:pl-6">
                    <div className="bg-cyan-500/10 p-3 md:p-4 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
                      <h3 className="font-bold text-base md:text-lg text-cyan-300">
                        Fullstack Web Developer
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-2">
                        Thalassa Blue (2024 - 2025)
                      </p>
                      <p className="text-xs md:text-sm text-gray-300">
                        Membuat aplilasi pemesanan boat dan trip untuk
                        perusahaan Thalassa purple
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline-item relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-12">
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 bg-white h-4 w-4 rounded-full border-4 border-gray-900 z-10"></div>
                  <div className="w-full md:w-1/2 text-center md:text-right md:pr-6">
                    <div className="bg-cyan-400/10 p-3 md:p-4 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
                      <h3 className="font-bold text-base md:text-lg text-cyan-300">
                        Front End Web Developer
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-2">
                        Kilau Sri Purnama (2022)
                      </p>
                      <p className="text-xs md:text-sm text-gray-300">
                        Membuat website portfolio yang bergerak di bidang
                        transportasi perusahaan Kilau Sri Purnama
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>

                <div className="timeline-item relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-12">
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 bg-white h-4 w-4 rounded-full border-4 border-gray-900 z-10"></div>
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="w-full md:w-1/2 text-center md:text-left md:pl-6">
                    <div className="bg-cyan-500/10 p-3 md:p-4 rounded-lg border border-cyan-400/20 backdrop-blur-sm">
                      <h3 className="font-bold text-base md:text-lg text-cyan-300">
                        Front End Web Developer
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-2">
                        Akasha Shatya Wibawa (2021)
                      </p>
                      <p className="text-xs md:text-sm text-gray-300">
                        Membuat website portfolio perusahaan Akasha Shatya
                        Wibawa
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article
            id="skill"
            className={`scroll-snap-start border rounded-lg p-6 scroll-mt-20 transition-all duration-300 ${
              activeSection === "skill"
                ? "border-cyan-400 shadow-[0_0_15px_#00ffff]"
                : "border-gray-500 shadow-lg"
            }`}
          >
            {/* Header */}
            <div className="relative flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-2xl md:text-2xl font-bold text-white mb-0">
                  Skill
                </h3>
                <div className="w-20 h-1 bg-cyan-500/90 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">Frontend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <span className="text-sm text-gray-300">React.js</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-black to-gray-800 rounded flex items-center justify-center border border-gray-600">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                    <span className="text-sm text-gray-300">Next.js</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <span className="text-sm text-gray-300">Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <span className="text-sm text-gray-300">Boostrap</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                      <span className="text-black text-xs font-bold">JS</span>
                    </div>
                    <span className="text-sm text-gray-300">JavaScript</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TS</span>
                    </div>
                    <span className="text-sm text-gray-300">TypeScript</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">Backend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                    <span className="text-sm text-gray-300">Node.js</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">E</span>
                    </div>
                    <span className="text-sm text-gray-300">Express.js</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-sm text-gray-300">PHP</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">L</span>
                    </div>
                    <span className="text-sm text-gray-300">Laravel</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-yellow-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Py</span>
                    </div>
                    <span className="text-sm text-gray-300">Python</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">API</span>
                    </div>
                    <span className="text-sm text-gray-300">REST API</span>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">Database</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-orange-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">My</span>
                    </div>
                    <span className="text-sm text-gray-300">MySQL</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-800 to-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Pg</span>
                    </div>
                    <span className="text-sm text-gray-300">PostgreSQL</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <span className="text-sm text-gray-300">Redis</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article
            id="tools"
            className={`scroll-snap-start border rounded-lg p-6 scroll-mt-20 transition-all duration-300 ${
              activeSection === "tools"
                ? "border-cyan-400 shadow-[0_0_15px_#00ffff]"
                : "border-gray-500 shadow-lg"
            }`}
          >
            {/* Header */}
            <div className="relative flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-2xl md:text-2xl font-bold text-white mb-0">
                  Tools & Software
                </h3>
                <div className="w-20 h-1 bg-cyan-500/90 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">
                  Development Tools
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-300">VS Code</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-300">Git</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-300">GitHub</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-300">Postman</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">
                  Design Tools
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-pink-500 rounded"></div>
                    <span className="text-sm text-gray-300">Figma</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-purple-600 rounded"></div>
                    <span className="text-sm text-gray-300">Photoshop</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-orange-600 rounded"></div>
                    <span className="text-sm text-gray-300">Illustrator</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-300">Canva</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">
                  DevOps & Cloud
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-purple-400 rounded"></div>
                    <span className="text-sm text-gray-300">Docker</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm text-gray-300">Vercel</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span className="text-sm text-gray-300">Netlify</span>
                  </div>
                </div>
              </div>

              {/* <div className="bg-cyan-400/10 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-cyan-400 mb-3">
                  Project Management
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-300">Trello</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-purple-600 rounded"></div>
                    <span className="text-sm text-gray-300">Notion</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-red-600 rounded"></div>
                    <span className="text-sm text-gray-300">Jira</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span className="text-sm text-gray-300">Slack</span>
                  </div>
                </div>
              </div> */}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
