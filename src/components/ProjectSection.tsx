"use client";
import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, Github, Calendar, Code, Filter } from "lucide-react";
import colorData from "../data/colorTech.json";
import data from "../data/project.json";
export default function HomeSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const techColors = colorData;
  const getTechColor = (techName) => {
    return techColors[techName] || techColors["default"];
  };
  const projects = data;

  const filterCategories = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "fullstack",
      label: "Full Stack",
      count: projects.filter((p) => p.type === "fullstack").length,
    },
    {
      id: "frontend",
      label: "Frontend",
      count: projects.filter((p) => p.type === "frontend").length,
    },
    {
      id: "backend",
      label: "Backend",
      count: projects.filter((p) => p.type === "backend").length,
    },
    {
      id: "iot",
      label: "IoT",
      count: projects.filter((p) => p.type === "iot").length,
    },
    {
      id: "desktop",
      label: "Desktop",
      count: projects.filter((p) => p.type === "desktop").length,
    },
  ].filter((category) => category.count > 0);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

  useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector(
      `[data-filter="${activeFilter}"]`
    );
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

  const getTypeColor = (type) => {
    switch (type) {
      case "fullstack":
        return "from-purple-500 to-pink-500";
      case "frontend":
        return "from-blue-500 to-cyan-500";
      case "iot":
        return "from-green-500 to-emerald-500";
      case "desktop":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <section id="home" className="min-h-screen">
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

        {/* Garis kanan */}
        <div className="hidden sm:flex relative items-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
          <div className="w-32 h-[2px] bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400"></div>
          <div className="w-20 h-[1px] bg-gradient-to-r from-gray-400 to-transparent"></div>
        </div>
      </header>

      {/* Filter Tabs */}
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
                className="absolute z-0 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 transition-all duration-300"
                style={{ ...indicatorStyle }}
              ></div>
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  data-filter={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`relative z-10 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
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

      {/* Portfolio Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col h-full"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`,
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden rounded-t-2xl">
                {/* Gambar project */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge Type */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-xs font-medium bg-gradient-to-r ${getTypeColor(
                      project.type
                    )} text-white shadow-lg`}
                  >
                    {project.type.toUpperCase()}
                  </span>
                </div>

                {/* Badge Tanggal */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-gray-300">
                      {project.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
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

                  {/* Tech Stack */}
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

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 group/btn"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 group/btn"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/25 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-tr-full"></div>
            </div>
          ))}
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
}
