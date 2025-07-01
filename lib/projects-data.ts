import type React from "react"
import {
  SiReact,
  SiApachenetbeanside,
  SiVite,
  SiJavascript,
  SiLess,
  SiAstro,
  SiTailwindcss,
  SiNextdotjs,
  SiFirebase,
  SiTypescript,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { DiMsqlServer } from "react-icons/di"

// Definición de tipos para los proyectos
export interface Technology {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: Technology[]
  githubUrl: string | null
  liveUrl: string | null
  category: string
  featured: boolean
}

// Todos los proyectos (incluyendo los destacados y otros)
export const allProjects: Project[] = [
  {
    id: 1,
    title: "POS de Honduras",
    description:
      "Diseño e implementación de un sitio web para la empresa de sistemas POS de Honduras. Incluye un catálogo de productos, carrito de cotización y un panel administrativo para gestión de contenido. El sitio fue desarrollado con diseño responsivo y enfoque en mejorar la presencia digital y eficiencia operativa de la empresa.",
    image: "/img/posdehonduras.png",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
    githubUrl: "",
    liveUrl: "https://posdehonduras.com",
    category: "Web Development",
    featured: true,
  },
  {
    id: 2,
    title: "Chrishop",
    description:
      "Desarrollo de una plataforma de comercio electrónico para la venta de productos personalizados, con funcionalidades como filtrado por categorías, visualización de productos destacados y diseño responsivo.",
    image: "/img/chrishop.png",
    technologies: [
      { name: "Astro", icon: SiAstro, color: "#ffffff" },
      { name: "TailwindCss", icon: SiTailwindcss, color: "#3B82F6" },
      { name: "JavaScript", icon: SiJavascript, color: "#ffff00" },
    ],
    githubUrl: "https://github.com/wJuanca/chrishop",
    liveUrl: "https://wjuanca.github.io/chrishop/",
    category: "E-commerce",
    featured: true,
  },
  {
    id: 3,
    title: "Dental Health",
    description:
      "Se desarrolló un sistema para una clínica dental con funciones como la programación de citas, impresión de certificados y, como su uso principal, la creación de historias clínicas para los pacientes.",
    image: "/img/dental-health.png",
    technologies: [
      { name: "Java", icon: FaJava, color: "#61DAFB" },
      { name: "NetBeans", icon: SiApachenetbeanside, color: "#ffffff" },
      { name: "SQL Server", icon: DiMsqlServer, color: "#ff0000" },
    ],
    githubUrl: "https://github.com/wJuanca/clinica-odontologica",
    liveUrl: null,
    category: "Desktop Application",
    featured: true,
  },
  {
    id: 4,
    title: "ONG Huellas de Amor",
    description:
      "Se desarrolló un sitio web para una ONG dedicada al rescate de animales y darles una nueva vida y una nueva familia. Este sitio web tiene la capacidad de recibir donaciones para apoyar a la ONG.",
    image: "/img/ong.png",
    technologies: [
      { name: "Vite", icon: SiVite, color: "#ffff00" },
      { name: "React", icon: SiReact, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#ffff00" },
      { name: "Less", icon: SiLess, color: "#ffffff" },
    ],
    githubUrl: "https://github.com/wJuanca/ProyectoFinal",
    liveUrl: "https://wjuanca.github.io/ProyectoFinal/",
    category: "Non-profit",
    featured: false,
  },
]

// Obtener solo proyectos destacados
export const getFeaturedProjects = () => allProjects.filter((project) => project.featured)

// Obtener proyectos por categoría
export const getProjectsByCategory = (category: string) => {
  if (category === "Todos") return allProjects
  return allProjects.filter((project) => project.category === category)
}

// Obtener todas las categorías
export const getCategories = () => {
  const categories = ["Todos", ...new Set(allProjects.map((project) => project.category))]
  return categories
}

// ===== NUEVAS FUNCIONES DE NAVEGACIÓN =====

// Obtener proyecto por ID
export const getProjectById = (id: number): Project | undefined => {
  return allProjects.find((project) => project.id === id)
}

// Obtener el índice de un proyecto en un array específico
export const getProjectIndex = (projectId: number, projects: Project[]): number => {
  return projects.findIndex((project) => project.id === projectId)
}

// Navegar al proyecto anterior
export const getPreviousProject = (currentProjectId: number, projects: Project[] = allProjects): Project | null => {
  const currentIndex = getProjectIndex(currentProjectId, projects)

  if (currentIndex === -1) return null

  // Si estamos en el primer proyecto, ir al último (navegación circular)
  const previousIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1

  return projects[previousIndex] || null
}

// Navegar al proyecto siguiente
export const getNextProject = (currentProjectId: number, projects: Project[] = allProjects): Project | null => {
  const currentIndex = getProjectIndex(currentProjectId, projects)

  if (currentIndex === -1) return null

  // Si estamos en el último proyecto, ir al primero (navegación circular)
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1

  return projects[nextIndex] || null
}

// Obtener información de navegación completa para un proyecto
export const getProjectNavigation = (currentProjectId: number, projects: Project[] = allProjects) => {
  const currentProject = getProjectById(currentProjectId)
  const previousProject = getPreviousProject(currentProjectId, projects)
  const nextProject = getNextProject(currentProjectId, projects)
  const currentIndex = getProjectIndex(currentProjectId, projects)

  return {
    current: currentProject,
    previous: previousProject,
    next: nextProject,
    currentIndex: currentIndex + 1, // +1 para mostrar posición humana (1, 2, 3...)
    total: projects.length,
    hasPrevious: previousProject !== null,
    hasNext: nextProject !== null,
  }
}

// Obtener proyectos relacionados (misma categoría, excluyendo el actual)
export const getRelatedProjects = (currentProjectId: number, limit = 3): Project[] => {
  const currentProject = getProjectById(currentProjectId)

  if (!currentProject) return []

  return allProjects
    .filter((project) => project.id !== currentProjectId && project.category === currentProject.category)
    .slice(0, limit)
}

// Obtener proyectos aleatorios (útil para sugerencias)
export const getRandomProjects = (excludeId?: number, limit = 3): Project[] => {
  let availableProjects = allProjects

  if (excludeId) {
    availableProjects = allProjects.filter((project) => project.id !== excludeId)
  }

  // Mezclar array y tomar los primeros 'limit' elementos
  const shuffled = [...availableProjects].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, limit)
}

// Buscar proyectos por término
export const searchProjects = (searchTerm: string): Project[] => {
  const term = searchTerm.toLowerCase().trim()

  if (!term) return allProjects

  return allProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.category.toLowerCase().includes(term) ||
      project.technologies.some((tech) => tech.name.toLowerCase().includes(term)),
  )
}

// Obtener estadísticas de proyectos
export const getProjectStats = () => {
  const totalProjects = allProjects.length
  const featuredProjects = getFeaturedProjects().length
  const categories = getCategories().length - 1 // -1 porque "Todos" no es una categoría real
  const projectsWithLiveUrl = allProjects.filter((project) => project.liveUrl).length
  const projectsWithGithub = allProjects.filter((project) => project.githubUrl).length

  return {
    total: totalProjects,
    featured: featuredProjects,
    categories,
    withLiveUrl: projectsWithLiveUrl,
    withGithub: projectsWithGithub,
    completionRate: Math.round((projectsWithLiveUrl / totalProjects) * 100),
  }
}
