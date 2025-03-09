"use client"

import { useEffect, useState } from "react"
import { Code, Lightbulb, Puzzle, Rocket, Users, Zap } from "lucide-react"

// Informacion de las skills
const skillsData = [
  {
    id: 1,
    title: "Problem Solving",
    description:
      "Analytical approach to breaking down complex problems into manageable components and developing effective solutions.",
    icon: Puzzle,
  },
  {
    id: 2,
    title: "Full-Stack Development",
    description: "Proficient in both frontend and backend technologies, creating seamless end-to-end applications.",
    icon: Code,
  },
  {
    id: 3,
    title: "Creative Thinking",
    description: "Ability to think outside the box and develop innovative solutions to technical challenges.",
    icon: Lightbulb,
  },
  {
    id: 4,
    title: "Performance Optimization",
    description:
      "Expertise in identifying and resolving performance bottlenecks to create fast, responsive applications.",
    icon: Zap,
  },
  {
    id: 5,
    title: "Team Collaboration",
    description: "Strong communication skills and experience working in agile teams to deliver high-quality projects.",
    icon: Users,
  },
  {
    id: 6,
    title: "Project Management",
    description: "Skilled in planning, organizing, and executing projects from conception to deployment.",
    icon: Rocket,
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
          <span className="gradient-text">My Skills</span>
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

