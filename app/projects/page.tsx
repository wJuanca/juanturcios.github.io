"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home } from "lucide-react"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Elementos para el fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-800/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-600/10 rounded-full filter blur-2xl"></div>
        
        {/* Grid del fondo */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className={`flex flex-col items-center justify-center space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Mensjae*/}
          <div className="text-center space-y-6">
            <div className="inline-block mb-2">
              <div className="px-4 py-1 bg-purple-600/20 rounded-full border border-purple-500/20">
                <p className="text-purple-400 font-medium text-sm">
                  Proyectos
                </p>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Próximamente
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg max-w-xl leading-relaxed mx-auto">
              Estoy trabajando en nuevos proyectos interesantes que estarán disponibles pronto. 
              <span className="block mt-3">¡Vuelve a visitar esta sección para ver mi portafolio actualizado!</span>
            </p>
            
            <div className="relative h-0.5 w-40 bg-gradient-to-r from-purple-600 to-transparent my-6 mx-auto"></div>
            
            {/* Aqui se hace el efecto de carga*/}
            <div className="flex justify-center my-10">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-pink-500 animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-blue-500 border-l-purple-600 animate-spin-reverse"></div>
              </div>
            </div>
            
            {/* Boton de regresar a la pagina principal */}
            <div className="pt-6">
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md hover:shadow-purple-500/20 font-medium group"
              >
                <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Regresar al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones */}
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
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}