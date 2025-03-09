"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold gradient-text">
                JT
                </Link>

                {/* Navegacion para escritorio */}
                <div className="hidden md:flex space-x-8">
            <Link href="#home" className="text-white hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link href="#projects" className="text-white hover:text-purple-400 transition-colors">
              Projects
            </Link>
            <Link href="#skills" className="text-white hover:text-purple-400 transition-colors">
              Skills
            </Link>
            <Link href="#tools" className="text-white hover:text-purple-400 transition-colors">
              Tools & Languages
            </Link>
            <Link href="#contact" className="text-white hover:text-purple-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Naveacion para movil */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
            {/* Menu de navegacion movil */}
        {isOpen && (
          <div className="md:hidden bg-black/95 absolute top-full left-0 right-0 p-4 flex flex-col space-y-4 shadow-lg animate-fade-in">
            <Link
              href="#home"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#projects"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#tools"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Tools & Languages
            </Link>
            <Link
              href="#contact"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}