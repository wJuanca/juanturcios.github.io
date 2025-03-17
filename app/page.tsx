import Hero from "@/components/ladingpage"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Tools from "@/components/tools"
import Footer from "@/components/footer"
import Contact from "@/components/contact"


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <Tools />
      <Contact />
      <Footer />
    </main>
  )
}

