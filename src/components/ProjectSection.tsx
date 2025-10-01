"use client";

import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, Github, Calendar, Filter } from "lucide-react";
import colorData from "../data/colorTech.json";
import data from "../data/project.json";
import Image from "next/image";

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  type: string | string[];
  date: string;
  image: string;
  tech: string[];
  github: string;
  website: string;
}

interface FilterCategory {
  id: string;
  label: string;
  count: number;
}

interface TechColors {
  [key: string]: string;
}

const HomeSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const techColors: TechColors = colorData;
  const projects: Project[] = data;

  // Utility functions
  const getTechColor = (techName: string): string => {
    return techColors[techName] || techColors["default"];
  };

  const isValidLink = (link: string): boolean => {
    return Boolean(link && link !== "-" && link.trim() !== "");
  };

  const projectMatchesFilter = (
    project: Project,
    filterId: string
  ): boolean => {
    if (filterId === "all") return true;

    if (Array.isArray(project.type)) {
      return project.type.some(
        (type) => type.toLowerCase() === filterId.toLowerCase()
      );
    }

    return project.type.toLowerCase() === filterId.toLowerCase();
  };

  const getProjectCount = (filterId: string): number => {
    return projects.filter((project) => projectMatchesFilter(project, filterId))
      .length;
  };

  const getTypeColor = (type: string): string => {
    const typeColors: { [key: string]: string } = {
      fullstack: "from-purple-500 to-pink-500",
      frontend: "from-blue-500 to-cyan-500",
      iot: "from-green-500 to-emerald-500",
      desktop: "from-orange-500 to-red-500",
      backend: "from-yellow-500 to-orange-500",
    };
    return typeColors[type.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  // Data processing
  const filterCategories: FilterCategory[] = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "fullstack",
      label: "Full Stack",
      count: getProjectCount("fullstack"),
    },
    { id: "frontend", label: "Frontend", count: getProjectCount("frontend") },
    { id: "backend", label: "Backend", count: getProjectCount("backend") },
    { id: "iot", label: "IoT", count: getProjectCount("iot") },
    { id: "desktop", label: "Desktop", count: getProjectCount("desktop") },
  ].filter((category) => category.count > 0);

  const filteredProjects = projects.filter((project) =>
    projectMatchesFilter(project, activeFilter)
  );

  // Effects
  useEffect(() => {
    if (!containerRef.current) return;

    const activeBtn = containerRef.current.querySelector(
      `[data-filter="${activeFilter}"]`
    ) as HTMLElement;

    if (activeBtn) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeBtn;
      setIndicatorStyle({
        left: offsetLeft,
        top: offsetTop,
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [activeFilter]);

  // Render functions
  const renderTypeBadges = (types: string | string[]) => {
    const typeArray = Array.isArray(types) ? types : [types];

    return typeArray.map((type, index) => (
      <span
        key={index}
        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${getTypeColor(
          type
        )} text-white shadow-lg ${index > 0 ? "ml-2" : ""}`}
      >
        {type.toUpperCase()}
      </span>
    ));
  };

  const renderHeader = () => (
    <header className="relative flex items-center justify-center pt-0 pb-8 px-4 sm:px-0 max-w-screen-lg mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl"></div>

      {/* Left line */}
      <div className="hidden sm:flex relative items-center">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
        <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400"></div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></div>
      </div>

      {/* Center content */}
      <div className="relative bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-2xl px-4 sm:px-8 py-6 mx-2 sm:mx-6 w-full max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent rounded-2xl"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-3">
            My Project
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Berikut project - project yang pernah saya buat dengan berbagai
            platform seperti Web, IoT dan Desktop
          </p>
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse delay-200"></div>
          </div>
        </div>
      </div>

      {/* Right line */}
      <div className="hidden sm:flex relative items-center">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
        <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400"></div>
        <div className="w-20 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></div>
      </div>
    </header>
  );

  const renderFilterTabs = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center justify-center mb-4 px-2">
        <div className="w-full sm:w-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-2 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <div className="flex items-center justify-center sm:justify-start mb-2 sm:mb-0">
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          <div
            ref={containerRef}
            className="relative flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-1"
          >
            <div
              className="absolute z-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/25 transition-all duration-300"
              style={indicatorStyle}
            ></div>
            {filterCategories.map((category) => (
              <button
                key={category.id}
                data-filter={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`relative z-10 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? "text-white"
                    : "shadow-cyan-400/25 text-cyan-300 hover:text-white"
                }`}
              >
                <span>{category.label}</span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${
                    activeFilter === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-700/50 text-gray-500"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderActionButtons = (project: Project) => (
    <div className="flex justify-end space-x-3 mt-auto">
      {/* GitHub Button */}
      <button
        onClick={() =>
          isValidLink(project.github) && window.open(project.github, "_blank")
        }
        disabled={!isValidLink(project.github)}
        className={`flex items-center justify-center w-10 h-10 border rounded-lg transition-all duration-200 group/btn ${
          isValidLink(project.github)
            ? "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/10 cursor-pointer"
            : "bg-gray-800/20 border-gray-700/30 text-gray-600 cursor-not-allowed opacity-50"
        }`}
        title={
          isValidLink(project.github)
            ? "View on GitHub"
            : "GitHub tidak tersedia"
        }
      >
        <Github className="w-5 h-5" />
      </button>

      {/* Website Button */}
      <button
        onClick={() =>
          isValidLink(project.website) && window.open(project.website, "_blank")
        }
        disabled={!isValidLink(project.website)}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group/btn ${
          isValidLink(project.website)
            ? "bg-cyan-500 text-white hover:bg-cyan-400  shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
            : "bg-gray-800/20 border border-gray-700/30 text-gray-600 cursor-not-allowed opacity-50"
        }`}
        title={
          isValidLink(project.website) ? "Live Demo" : "Website tidak tersedia"
        }
      >
        <ExternalLink className="w-5 h-5" />
      </button>
    </div>
  );

  const renderProjectCard = (project: Project, index: number) => (
    <div
      key={project.id}
      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col h-full"
      style={{
        animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`,
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Project image */}
      <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden rounded-t-2xl group">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
          sizes="(max-width: 1024px) 100vw, 800px"
          priority={index === 0} // opsional: berikan prioritas LCP pada gambar pertama
        />

        {/* Type badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {renderTypeBadges(project.type)}
        </div>

        {/* Date badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="w-3 h-3 text-cyan-400" />
            <span className="text-xs text-gray-300">{project.date}</span>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="relative p-8 flex flex-col flex-grow">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-b-2xl"></div>
        <div className="relative z-10 flex flex-col h-full">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-base leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className={`px-4 py-2 border rounded-xl text-sm hover:scale-105 hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${getTechColor(
                  tech
                )}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          {renderActionButtons(project)}
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/25 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-tr-full"></div>
    </div>
  );

  return (
    <section id="project" className="min-h-screen">
      {renderHeader()}
      {renderFilterTabs()}

      {/* Portfolio cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) =>
            renderProjectCard(project, index)
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default HomeSection;
