"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import Image from "next/image";
import data from "../data/achievement.json";

interface Achievement {
  id: string | number;
  title: string;
  institution: string;
  description: string;
  location: string;
  date: string;
  rank: string;
  emoji: string;
  color: string;
  images?: string[];
}

interface Certificate {
  id: string | number;
  title: string;
  issuer: string;
  date: string;
  emoji?: string;
  image?: string;
}

interface Colors {
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  badge: string;
  titleHover: string;
  shadow: string;
  glow: string;
}

type TabType = "perlombaan" | "sertifikat";

export default function AchievementSection() {
  const [activeTab, setActiveTab] = useState<TabType>("perlombaan");
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string | number, number>
  >({});
  const [showAllCompetitions, setShowAllCompetitions] =
    useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Ensure client-side only rendering for certain features
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Unified color scheme
  const colors: Colors = {
    bg: "from-cyan-500/10 to-cyan-600/5",
    border: "border-cyan-400/30 hover:border-cyan-400/50",
    iconBg: "from-cyan-400/20 to-cyan-600/20",
    iconColor: "text-cyan-400",
    badge: "bg-cyan-400/20 border-cyan-400/40 text-cyan-300",
    titleHover: "group-hover:text-cyan-200",
    shadow: "hover:shadow-cyan-400/30 hover:shadow-[0_0_30px]",
    glow: "from-cyan-400/5",
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const cardIndex = parseInt(target.dataset.cardIndex || "", 10);
            if (!isNaN(cardIndex)) {
              setVisibleCards((prev) => new Set([...prev, cardIndex]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentCardRefs = cardRefs.current;
    currentCardRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeTab, showAllCompetitions, isClient]);

  // Reset visible cards when tab changes
  useEffect(() => {
    setVisibleCards(new Set());
    cardRefs.current = [];
    setCurrentImageIndex({});
    setShowAllCompetitions(false);
  }, [activeTab]);

  const nextImage = (itemId: string | number, totalImages: number): void => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (itemId: string | number, totalImages: number): void => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const achievementData: Achievement[] = data.achievements;
  const certificateData: Certificate[] = data.certificates;

  const displayedData =
    activeTab === "perlombaan"
      ? showAllCompetitions
        ? achievementData
        : achievementData.slice(0, 4)
      : certificateData;

  const renderNoImagePlaceholder = (emoji?: string) => (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
        <div
          className={`w-full h-48 lg:h-56 bg-gradient-to-br ${colors.iconBg} flex flex-col items-center justify-center rounded-2xl`}
        >
          {emoji && (
            <div className={`${colors.iconColor} text-6xl mb-2`}>{emoji}</div>
          )}
          <div className="text-gray-500 text-sm text-center px-4">
            Belum ada foto
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  );

  const renderImageSlider = (item: Achievement) => {
    const currentIndex = currentImageIndex[item.id] || 0;
    const images = item.images || [];

    if (images.length === 0) {
      return renderNoImagePlaceholder(item.emoji);
    }

    const handlePrevImage = (e: React.MouseEvent): void => {
      e.preventDefault();
      prevImage(item.id, images.length);
    };

    const handleNextImage = (e: React.MouseEvent): void => {
      e.preventDefault();
      nextImage(item.id, images.length);
    };

    const handleDotClick = (e: React.MouseEvent, index: number): void => {
      e.preventDefault();
      setCurrentImageIndex((prev) => ({
        ...prev,
        [item.id]: index,
      }));
    };

    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
          <div className="w-full h-48 lg:h-56 relative">
            <Image
              src={images[currentIndex]}
              alt={`${item.title} - ${currentIndex + 1}`}
              fill
              className="object-cover rounded-2xl"
              onError={() => {
                // Handle image error silently
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
        </div>

        {/* Slider Controls */}
        {isClient && images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => handleDotClick(e, index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderSingleImage = (item: Certificate) => {
    if (!item.image || item.image.trim() === "") {
      return renderNoImagePlaceholder(item.emoji);
    }

    return (
      <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
        <div className="w-full h-56 relative">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded-2xl"
            onError={() => {
              // Handle image error silently
            }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
      </div>
    );
  };

  const renderImage = (item: Achievement | Certificate) => {
    if (activeTab === "perlombaan") {
      return renderImageSlider(item as Achievement);
    }
    return renderSingleImage(item as Certificate);
  };

  const renderCardBase = (
    item: Achievement | Certificate,
    index: number,
    children: React.ReactNode
  ) => (
    <div
      key={item.id}
      ref={(el) => {
        cardRefs.current[index] = el;
      }}
      data-card-index={index}
      className={`group relative bg-gradient-to-br ${
        colors.bg
      } backdrop-blur-sm border ${
        colors.border
      } rounded-2xl p-6 transition-all duration-700 ${colors.shadow} ${
        isClient && visibleCards.has(index)
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${colors.glow} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10">{children}</div>

      {/* Hover Animation Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
    </div>
  );

  const renderCertificateCard = (item: Certificate, index: number) =>
    renderCardBase(
      item,
      index,
      <>
        {/* Image Section */}
        <div className="mb-6">{renderImage(item)}</div>

        {/* Content Section */}
        <div className="space-y-4">
          {/* Title */}
          <h4
            className={`text-xl font-bold text-white ${colors.titleHover} transition-colors duration-300`}
          >
            {item.title}
          </h4>

          {/* Issuer */}
          <div className="flex items-center text-sm text-gray-300">
            <User size={16} className="mr-2 text-purple-400" />
            <span>{item.issuer}</span>
          </div>

          {/* Date */}
          <div className="flex items-center text-sm text-gray-400">
            <Calendar size={16} className="mr-2 text-purple-400" />
            <span>{item.date}</span>
          </div>
        </div>
      </>
    );

  const renderCompetitionCard = (item: Achievement, index: number) => (
    <div
      key={item.id}
      ref={(el) => {
        cardRefs.current[index] = el;
      }}
      data-card-index={index}
      className={`group relative bg-gradient-to-br ${
        colors.bg
      } backdrop-blur-sm border ${
        colors.border
      } rounded-2xl p-6 transition-all duration-700 ${colors.shadow} ${
        isClient && visibleCards.has(index)
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${colors.glow} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-80">{renderImage(item)}</div>

        {/* Content Section */}
        <div className="flex-1 lg:pl-4">
          {/* Rank Badge */}
          <div className="mb-4">
            <div
              className={`inline-flex items-center px-4 py-2 ${item.color} rounded-full text-sm font-medium backdrop-blur-sm`}
            >
              <span className="mr-2 text-lg">{item.emoji}</span>
              {item.rank}
            </div>
          </div>

          {/* Title */}
          <h4
            className={`text-2xl lg:text-3xl font-bold text-white mb-2 ${colors.titleHover} transition-colors duration-300`}
          >
            {item.title}
          </h4>

          <p className="border p-2 rounded-2xl inline-block mb-2 text-sm text-purple-400">
            By {item.institution}
          </p>

          {/* Description */}
          <p className="text-gray-300 text-base mb-6 leading-relaxed">
            {item.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-center text-sm text-gray-400">
              <MapPin size={18} className="inline-block text-purple-400" />
              <span className="inline-block ml-2">{item.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar size={18} className="inline-block text-purple-400" />
              <span className="inline-block ml-2">{item.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Animation Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-20 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-tr-full" />
    </div>
  );

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handleShowMoreToggle = (): void => {
    setShowAllCompetitions(!showAllCompetitions);
  };

  return (
    <section
      id="achievement"
      className="relative min-h-screen w-full sm:px-0 md:px-24 bg-[#0B0D14] py-20 text-white font-mono"
    >
      <header className="relative flex items-center justify-center pt-0 pb-8 px-4 sm:px-0 max-w-screen-lg mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl" />

        {/* Left line */}
        <div className="hidden sm:flex relative items-center">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gray-400" />
          <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400" />
          <div className="w-16 h-[1px] bg-gradient-to-r from-gray-400 to-transparent" />
        </div>

        {/* Center content */}
        <div className="relative bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-2xl px-4 sm:px-8 py-6 mx-2 sm:mx-6 w-full max-w-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent rounded-2xl" />
          <div className="relative z-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-3">
              My Achievements
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Penghargaan yang saya miliki ketika mengikuti lomba lomba
              Nasional. dan beberapa Sertifikat yang saya miliki
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse delay-200" />
            </div>
          </div>
        </div>

        {/* Right line */}
        <div className="hidden sm:flex relative items-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-400" />
          <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400" />
          <div className="w-20 h-[1px] bg-gradient-to-r from-gray-400 to-transparent" />
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="relative bg-black/30 backdrop-blur-sm border border-cyan-400/20 rounded-2xl">
          {/* Sliding background indicator */}
          <div
            className={`absolute top-2 bottom-2 bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 rounded-xl border border-cyan-400/30 transition-all duration-500 ease-in-out ${
              activeTab === "perlombaan"
                ? "left-2 right-[150px]"
                : "left-[150px] right-2"
            }`}
          />

          <div className="relative flex">
            <button
              onClick={() => handleTabChange("perlombaan")}
              className={`relative z-10 px-6 py-3 rounded-xl font-medium transition-all duration-500 ease-in-out transform hover:scale-105 ${
                activeTab === "perlombaan"
                  ? "text-cyan-300 shadow-lg shadow-cyan-400/25"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              type="button"
            >
              <span className="relative z-10">Perlombaan</span>
              {activeTab === "perlombaan" && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent rounded-xl ${
                    isClient ? "animate-pulse" : ""
                  }`}
                />
              )}
            </button>

            <button
              onClick={() => handleTabChange("sertifikat")}
              className={`relative z-10 px-6 py-3 rounded-xl font-medium transition-all duration-500 ease-in-out transform hover:scale-105 ${
                activeTab === "sertifikat"
                  ? "text-cyan-300 shadow-lg shadow-cyan-400/25"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              type="button"
            >
              <span className="relative z-10">Sertifikat</span>
              {activeTab === "sertifikat" && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent rounded-xl ${
                    isClient ? "animate-pulse" : ""
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        <div className="rounded-2xl p-8">
          {activeTab === "perlombaan" ? (
            /* Single Column Cards for Competitions */
            <div className="space-y-6 max-w-4xl mx-auto">
              {displayedData.map((item, index) =>
                renderCompetitionCard(item as Achievement, index)
              )}

              {/* Show More/Less Button */}
              {achievementData.length > 4 && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleShowMoreToggle}
                    className="group relative bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 hover:from-cyan-500/30 hover:to-cyan-600/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-xl px-8 py-4 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
                    type="button"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex items-center text-cyan-300 font-medium">
                      <span className="mr-2">
                        {showAllCompetitions ? "Show Less" : "Show More"}
                      </span>
                      <div
                        className={`transform transition-transform duration-300 ${
                          showAllCompetitions ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>

                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* 3 Column Grid for Certificates */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {displayedData.map((item, index) =>
                renderCertificateCard(item as Certificate, index)
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
