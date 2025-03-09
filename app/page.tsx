import Hero from "@/components/ladingpage"
import Projects from "@/components/projects"
import Skills from "@/components/skills"


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
    </main>
  )
}

