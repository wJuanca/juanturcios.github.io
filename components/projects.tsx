"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import { getFeaturedProjects } from "@/lib/projects-data"

// Usar los proyectos destacados
const featuredProjects = getFeaturedProjects()

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  // Inicializar los refs
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, featuredProjects.length)
  }, [])

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
  }, [])

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-1 bg-purple-600/20 rounded-full">
              <p className="text-purple-400 font-medium text-sm">PORTAFOLIO</p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Proyectos Destacados
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una muestra de mi mejor trabajo, destacando mis habilidades y experiencia en tecnología y desarrollo de
            soluciones.
          </p>
        </div>

        {/* Projects Display */}
        <div className="space-y-32 relative">
          {featuredProjects.map((project, index) => (
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
                </div>

                {/* Detalles de los proyectos */}
                <div className="md:col-span-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Tecnologias utilizadas en los proyectos */}
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

                  {/* Botones para ir al repo y a la vista del proyecto */}
                  <div className="flex flex-wrap gap-4 mt-auto relative z-10">
                    {/* Botón de GitHub - deshabilitado si no hay URL */}
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

                    {/* Botón de Vista Previa - deshabilitado si no hay URL */}
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

              {/* Numero del proyecto */}
              <div className="absolute -right-10 -bottom-10 text-gray-800/10 text-[200px] font-bold pointer-events-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Ver todos los proyectos */}
        <div className="text-center mt-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-purple-500/20 font-medium"
          >
            <span>Ver Todos los Proyectos</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
