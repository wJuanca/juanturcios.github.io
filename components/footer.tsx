import Link from "next/link"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main content  */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* informacion personal*/}
          <div className="mb-6">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Juan Turcios
            </Link>
            <p className="text-gray-400 mt-2 text-sm">Computer Science Engineer</p>
          </div>

          {/* Mis redes*/}
          <div className="flex flex-col items-center">
            <h3 className="text-white font-medium mb-3">Conecta conmigo</h3>
            <div className="flex justify-center gap-8 mt-2">
              <Link
                href="https://github.com/wJuanca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 group-hover:text-purple-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/juanturcios1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 group-hover:text-blue-400" />
              </Link>
              <Link
                href="https://www.instagram.com/_juancat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 group-hover:text-pink-400" />
              </Link>
              <Link
                href="mailto:juanturciosicc@gmail.com"
                className="text-gray-400 hover:text-white transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-6 h-6 group-hover:text-green-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-center items-center mt-10 pt-8 border-t border-white/5">
          <p className="text-gray-500 text-sm">© {currentYear} Juan Turcios. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}