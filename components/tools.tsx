"use client";

import { useEffect, useState, useRef } from "react";
import {
  SiGit,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiAdobephotoshop,
  SiFigma,
  SiAstro,
  SiAndroidstudio,
  SiVercel,
  SiLess,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IconType } from "react-icons";

// Define types for our data structure
type ToolItem = {
  name: string;
  icon: IconType | string;
  color: string;
};

type ToolCategory = {
  category: string;
  description: string;
  items: ToolItem[];
};

// Updated tools and languages data
const toolsData: ToolCategory[] = [
  {
    category: "Herramientas y Frameworks",
    description:
      "Tecnologías que utilizo para desarrollar aplicaciones web robustas y soluciones digitales escalables.",
    items: [
      { name: "Visual Studio Code", icon: "VS", color: "#007ACC" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Astro", icon: SiAstro, color: "#FFFFFF" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "DaVinci Resolve", icon: "DR", color: "#FFFF4D" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#669933" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Less", icon: SiLess, color: "#FFFFFF" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#3b82f6" },
    ],
  },
  {
    category: "Lenguajes de Programación",
    description:
      "Lenguajes de programación que domino para desarrollar aplicaciones web, sistemas y soluciones tecnológicas.",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss3, color: "#1572B6" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
];

export default function Tools() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [categoriesVisible, setCategoriesVisible] = useState<number[]>([]);

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, toolsData.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use getAttribute to access data attributes
            const indexStr = (entry.target as HTMLElement).getAttribute(
              "data-index"
            );
            if (indexStr) {
              const index = parseInt(indexStr);
              if (!categoriesVisible.includes(index)) {
                setCategoriesVisible((prev) => [...prev, index]);
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [categoriesVisible]);

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  // Callback function to set refs
  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    categoryRefs.current[index] = element;
  };

  return (
    <section
      id="tools"
      className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Seccion ovalo */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
          <div className="inline-block mb-4 mt-8">
            <div className="px-5 py-1 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-500/20">
              <p className="text-purple-400 font-medium text-sm tracking-wider">
              Experiencia
              </p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Mi Stack Tecnológico
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Herramientas y lenguajes con los que trabajo para desarrollar soluciones digitales eficientes e innovadoras.
          </p>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>

        {/* Categories in accordion-like layout - Different from Projects */}
        <div className="max-w-4xl mx-auto space-y-8">
          {toolsData.map((category, categoryIndex) => {
            const isExpanded = expandedCategory === categoryIndex;
            const isVisible = categoriesVisible.includes(categoryIndex);

            return (
              <div
                key={categoryIndex}
                ref={setRef(categoryIndex)}
                data-index={categoryIndex.toString()}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${categoryIndex * 150}ms` }}
              >
                {/* Category Header - Clickable */}
                <div
                  className={`
                    p-6 bg-gradient-to-r rounded-xl cursor-pointer transition-all duration-300
                    ${
                      isExpanded
                        ? "from-purple-900/30 to-pink-900/30 shadow-lg shadow-purple-500/10"
                        : "from-gray-800/50 to-gray-900/50 hover:from-purple-900/20 hover:to-pink-900/20"
                    }
                  `}
                  onClick={() => toggleCategory(categoryIndex)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {category.category}
                      </h3>
                      <p className="text-gray-400 mt-2 max-w-3xl">
                        {category.description}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-full p-2 text-white">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Skills Grid - Animated */}
                <div
                  className={`
                    grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 mt-6 px-2
                    transition-all duration-500 overflow-hidden
                    ${
                      isExpanded
                        ? "max-h-screen opacity-100 py-4"
                        : "max-h-0 opacity-0 py-0"
                    }
                  `}
                >
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="group flex flex-col items-center transition-all duration-300"
                      style={{
                        transitionDelay: isExpanded
                          ? `${itemIndex * 50}ms`
                          : "0ms",
                        opacity: isExpanded ? 1 : 0,
                        transform: isExpanded
                          ? "translateY(0)"
                          : "translateY(20px)",
                      }}
                    >
                      <div className="relative w-16 h-16 mb-3">
                        {/* Glowing background effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>

                        {/* Icon container */}
                        <div className="relative z-10 w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 group-hover:border-purple-500/30 transition-all duration-300">
                          {typeof item.icon === "string" ? (
                            <div
                              className="text-lg font-bold"
                              style={{ color: item.color }}
                            >
                              {item.icon}
                            </div>
                          ) : (
                            <item.icon
                              className="w-8 h-8"
                              style={{ color: item.color }}
                            />
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-white text-center transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative line between categories */}
                {categoryIndex < toolsData.length - 1 && (
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-6"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Decorative bottom elements */}
        <div className="mt-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
          <div className="text-gray-500 text-sm mt-12">
            Constantemente expandiendo mi conocimiento con nuevas tecnologías
          </div>
        </div>
      </div>
    </section>
  );
}
