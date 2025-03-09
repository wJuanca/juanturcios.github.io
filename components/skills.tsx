"use client"

import { useEffect, useState } from "react"
import { UserCheck, Brain, Users, MessageSquare, Repeat, Layout } from "lucide-react"

// Informacion de las skills
const skillsData = [
  {
    id: 1,
    title: "Liderazgo",
    description:
      "Demuestro un liderazgo positivo fomentando la colaboración y guiando a los equipos hacia el logro de metas compartidas mediante una comunicación clara y motivadora.",
    icon: UserCheck,
  },
  {
    id: 2,
    title: "Aprendizaje rápido",
    description: "Poseo la capacidad de adaptarme rápidamente a nuevos entornos y tecnologías, adquiriendo habilidades y conocimientos de manera eficiente en un corto período de tiempo.",
    icon: Brain,
  },
  {
    id: 3,
    title: "Trabajo en equipo",
    description: "Destaco en el trabajo colaborativo, contribuyendo con ideas, resolviendo conflictos y manteniendo un ambiente positivo para alcanzar los objetivos comunes.",
    icon: Users,
  },
  {
    id: 4,
    title: "Comunicación efectiva",
    description:
      "Poseo habilidades de comunicación claras y asertivas que me permiten transmitir ideas e información de manera comprensible y profesional.",
    icon: MessageSquare,
  },
  {
    id: 5,
    title: "Adaptabilidad",
    description: "Tengo la capacidad de ajustarme de manera efectiva a los cambios y desafíos, manteniendo un enfoque positivo y productivo en entornos dinámicos.",
    icon: Repeat,
  },
  {
    id: 6,
    title: "Diseño UI/UX",
    description: "Tengo experiencia en la creación de interfaces de usuario atractivas y funcionales, enfocadas en ofrecer experiencias de usuario fluidas y satisfactorias.",
    icon: Layout,
  },
]

export default function Skills() {
  const [visibleSkills, setVisibleSkills] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillId = Number.parseInt(entry.target.id.split("-")[1])
            setVisibleSkills((prev) => (prev.includes(skillId) ? prev : [...prev, skillId]))
          }
        })
      },
      { threshold: 0.1 },
    )

    skillsData.forEach((skill) => {
      const element = document.getElementById(`skill-${skill.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 bg-black/90">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="gradient-text">Mis Habilidades</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill) => {
            const IconComponent = skill.icon
            return (
              <div
                key={skill.id}
                id={`skill-${skill.id}`}
                className={`bg-white/5 rounded-xl p-6 skill-card transition-all duration-700 ${
                  visibleSkills.includes(skill.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{
                  transitionDelay: `${(skill.id % 3) * 150}ms`,
                }}
              >
                <div className="bg-purple-600/20 p-3 rounded-full w-fit mb-4">
                  <IconComponent className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                <p className="text-gray-400">{skill.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

