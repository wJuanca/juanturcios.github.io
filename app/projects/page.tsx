"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Home, Filter } from "lucide-react"
import { allProjects, getCategories } from "@/lib/projects-data"

// Usar todos los proyectos y categorías
const categories = getCategories()

export default function AllProjects() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  // Filtrar proyectos por categoría
  useEffect(() => {
    if (selectedCategory === "Todos") {
      setFilteredProjects(allProjects)
    } else {
      setFilteredProjects(allProjects.filter((project) => project.category === selectedCategory))
    }
    setVisibleProjects([]) // Reset visible projects when category changes
  }, [selectedCategory])

  // Inicializar los refs
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, filteredProjects.length)
  }, [filteredProjects])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const index = Number(entry.target.dataset.index || 0)
            setVisibleProjects((prev) => (prev.includes(index) ? prev : [...prev, index]))
          }
        })
      },
      {
        root: null,
        threshold: 0.3,
        rootMargin: "0px",
      },
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <Home className="w-5 h-5" />
              <span>Volver al Inicio</span>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Todos los Proyectos</h1>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filtros de categoría */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Filtrar por categoría:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Display */}
          <div className="space-y-32 relative">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectRefs.current[index] = el
                }}
                data-index={index}
                className={`group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl transition-all duration-700 ${
                  visibleProjects.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="grid md:grid-cols-12 gap-8 p-8 relative">
                  {/* Project background effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Project Image */}
                  <div className="md:col-span-5 lg:col-span-4 relative overflow-hidden rounded-xl group-hover:shadow-lg transition-shadow duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <div className="aspect-[4/3] md:aspect-[16/9] relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                        quality={85}
                        priority={index === 0}
                      />
                    </div>
                    {/* Badge para proyectos destacados */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Destacado
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="md:col-span-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">{project.category}</span>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-3 mb-4">
                          {project.technologies.map((tech, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg group-hover:bg-gray-800 transition-colors"
                            >
                              <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                              <span className="text-xs text-gray-300">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-auto relative z-10">
                      {project.githubUrl ? (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white/5 border border-gray-700 hover:border-purple-500/50 text-white py-3 px-6 rounded-lg transition-all hover:bg-gray-800"
                        >
                          <Github className="w-5 h-5" />
                          <span>Ver Código</span>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-2 bg-white/5 border border-gray-700 text-gray-500 py-3 px-6 rounded-lg cursor-not-allowed opacity-50"
                        >
                          <Github className="w-5 h-5" />
                          <span>Ver Código</span>
                        </button>
                      )}

                      {project.liveUrl ? (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-purple-500/20"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Visitar</span>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white/70 py-3 px-6 rounded-lg cursor-not-allowed opacity-50"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Visitar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Number */}
                <div className="absolute -right-10 -bottom-10 text-gray-800/10 text-[200px] font-bold pointer-events-none">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No se encontraron proyectos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
