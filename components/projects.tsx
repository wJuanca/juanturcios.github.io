"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react"
import {
  SiReact,
  SiApachenetbeanside,
  SiVite, 
  SiJavascript,
  SiLess,
  SiAstro,
  SiTailwindcss
} from "react-icons/si"
import { FaJava } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";

// Definición de tipos para los proyectos
interface Technology {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  githubUrl: string;
  liveUrl: string;
}

// Sample project data - replace with your actual projects
const projectsData: Project[] = [
  {
    id: 1,
    title: "Dental Health",
    description:
      "Se desarrolló un sistema para una clínica dental con funciones como la programación de citas, impresión de certificados y, como su uso principal, la creación de historias clínicas para los pacientes.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [
      { name: "Jva", icon: FaJava, color: "#61DAFB" },
      { name: "NetBeans", icon: SiApachenetbeanside, color: "#ffffff"},
      { name: "SQL Server", icon: DiMsqlServer , color: "#ff0000" },
    ],
    githubUrl: "https://github.com/juanturcios/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
  },
  {
    id: 2,
    title: "ONG Huellas de Amor",
    description:
      "Se desarrolló un sitio web para una ONG dedicada al rescate de animales y darles una nueva vida y una nueva familia. Este sitio web tiene la capacidad de recibir donaciones para apoyar a la ONG.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [
      { name: "Vite", icon: SiVite, color: "#ffff00" },
      { name: "React", icon: SiReact, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#ffff00" },
      { name: "Less", icon: SiLess, color: "#ffffff" },
    ],
    githubUrl: "https://github.com/juanturcios/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
  },
  {
    id: 3,
    title: "Chrishop",
    description:
      "Desarrollo de una plataforma de comercio electrónico para la venta de productos personalizados, con funcionalidades como filtrado por categorías, visualización de productos destacados y diseño responsivo.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: [
      { name: "Astro", icon: SiAstro, color: "#ffffff" },
      { name: "TailwindCss", icon: SiTailwindcss, color: "#3B82F6" },
      { name: "JavaScript", icon: SiJavascript, color: "#ffff00" },
    ],
    githubUrl: "https://github.com/juanturcios/ai-image-generator",
    liveUrl: "https://ai-image-generator-demo.com",
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  // Corregir el tipo de projectRefs
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projectsData.length)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting)
        if (visibleEntry && visibleEntry.target instanceof HTMLElement) {
          // Corregir el acceso a dataset
          const index = Number(visibleEntry.target.dataset.index)
          setActiveProject(index)
        }
      },
      { threshold: 0.6 }
    )

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Añadir tipo al parámetro index
  const scrollToProject = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveProject(index)
    
    // Corregir el acceso a scrollIntoView
    const currentRef = projectRefs.current[index]
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
    
    setTimeout(() => setIsAnimating(false), 800)
  }

  const nextProject = () => {
    const next = (activeProject + 1) % projectsData.length
    scrollToProject(next)
  }

  const prevProject = () => {
    const prev = (activeProject - 1 + projectsData.length) % projectsData.length
    scrollToProject(prev)
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-1 bg-purple-600/20 rounded-full">
              <p className="text-purple-400 font-medium text-sm">PORTFOLIO</p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my best work, demonstrating my skills and expertise in web development and beyond.
          </p>
        </div>

        {/* Opciones de navegacion para los proyectos */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex space-x-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeProject === index 
                    ? "bg-purple-500 w-8" 
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevProject}
              className="p-2 bg-gray-800 rounded-full hover:bg-purple-600/30 transition-colors text-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="p-2 bg-gray-800 rounded-full hover:bg-purple-600/30 transition-colors text-white"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Display */}
        <div className="space-y-32 relative">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              // Corregir la asignación del ref
              ref={(el) => { projectRefs.current[index] = el }}
              data-index={index}
              className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="grid md:grid-cols-12 gap-8 p-8">
                {/* Project Image - Reduced size */}
                <div className="md:col-span-4 relative overflow-hidden rounded-xl group-hover:shadow-lg transition-shadow duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={150}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Detalles de los proyectos */}
                <div className="md:col-span-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Tecnologias de utilizadas en los proyectos */}
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
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Botones para ir al repo y a la vista del proyecto */}
                  <div className="flex flex-wrap gap-4 mt-auto">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/5 border border-gray-700 hover:border-purple-500/50 text-white py-3 px-6 rounded-lg transition-all hover:bg-gray-800"
                    >
                      <Github className="w-5 h-5" />
                      <span>Ver Código</span>
                    </Link>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-purple-500/20"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Demo en Vivo</span>
                    </Link>
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
        
        {/* Ver todo los poryectos */}
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