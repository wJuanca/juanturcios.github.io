"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Instagram, FileDown, Mail, Code } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "Innovative Solutions Through Code"
  const typingSpeed = 100

  useEffect(() => {
    setIsVisible(true)

    let currentIndex = 0
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, typingSpeed)
      }
    }

    setTimeout(() => {
      typeText()
    }, 500)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Elementos del fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-800/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-600/10 rounded-full filter blur-2xl"></div>
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Contenido del texto */}
          <div className={`md:w-1/2 space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-block mb-2">
              <div className="px-4 py-1 bg-purple-600/20 rounded-full border border-purple-500/20">
                <p className="text-purple-400 font-medium text-sm">FULL-STACK DEVELOPER</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-purple-400 font-medium text-lg">Hello, I am</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Juan Turcios
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 font-semibold pt-1">
                Computer Science Engineer
              </h2>
            </div>
            
            <div className="relative h-0.5 w-40 bg-gradient-to-r from-purple-600 to-transparent my-6"></div>
            
            <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
              I create <span className="text-purple-400 font-medium">{typedText}</span><span className="animate-pulse">|</span>
              <span className="block mt-3">Passionate about building high-quality applications that solve
              real-world problems and deliver exceptional user experiences.</span>
            </p>

            {/* Botones para contactarme y descargar curriculum */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
              <a
                href="/path-to-your-cv.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md hover:shadow-purple-500/20 font-medium group"
              >
                <FileDown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </a>

              <Link 
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-white/5 border border-gray-700 hover:border-purple-500/50 text-white rounded-lg transition-all hover:bg-gray-800 font-medium"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Link>
            </div>

            <div className="pt-6">
              <p className="text-gray-400 text-sm mb-3">Find me on</p>
              <div className="flex space-x-5">
                <Link
                  href="https://github.com/juanturcios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </Link>
                <Link
                  href="https://linkedin.com/in/juanturcios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link
                  href="https://instagram.com/juanturcios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className={`md:w-1/2 flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-20 filter blur-2xl transform scale-110 animate-pulse-slow"></div>
              
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 bg-clip-border transform animate-spin-slow"></div>
              
              {/* Code brackets decoration */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-6xl text-gray-700 font-mono">{"{"}</div>
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-6xl text-gray-700 font-mono">{"}"}</div>
              
              {/* Image container */}
              <div className="absolute inset-5 rounded-full overflow-hidden border-4 border-gray-800">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Juan Turcios"
                  fill
                  className="object-cover relative z-10"
                  priority
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -right-4 top-10 bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center shadow-lg border border-gray-700">
                <Code className="w-4 h-4 mr-2 text-purple-400" />
                <span>Full-Stack</span>
              </div>
              
              <div className="absolute -left-8 bottom-20 bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center shadow-lg border border-gray-700">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span>Available for hire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-2">Scroll Down</p>
            <Link 
              href="#projects" 
              className="w-8 h-12 border-2 border-purple-500 rounded-full flex justify-center pt-1"
              aria-label="Scroll to projects"
            >
              <div className="w-1 h-2 bg-purple-500 rounded-full animate-scroll-down"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Add CSS for custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes scroll-down {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          75% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(8px);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .animate-scroll-down {
          animation: scroll-down 1.5s infinite;
        }
      `}</style>
    </section>
  )
}

