"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import emailjs from '@emailjs/browser'

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar correo usando EmailJS
      const result = await emailjs.sendForm(
        'NEXT_PUBLIC_EMAILJS_SERVICE_ID', //ID del servici de Gmail
        'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', //ID del template de los correos
        form.current!, 
        'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY' //Key publica de la cuenta
      )

      if (result.text === 'OK') {
        setSubmitStatus({
          success: true,
          message: "¡Tu mensaje ha sido enviado con éxito!",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error('Falló el envío del mensaje')
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
      setSubmitStatus({
        success: false,
        message: "No se pudo enviar el mensaje. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black/90">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="gradient-text">Contáctame</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-gray-300 text-lg">
              ¿Tienes un proyecto en mente o quieres discutir posibles oportunidades? No dudes en contactarme a través del
              formulario o utilizando mi información de contacto.
            </p>

            {/* informacion de mi correo electronico */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Correo Electrónico</h3>
                  <p className="text-gray-400">juanturciosicc@gmail.com</p>
                </div>
              </div>

              {/* Informacion de numero de telefono */}
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Teléfono</h3>
                  <p className="text-gray-400">+504 9833-3365</p>
                </div>
              </div>

              {/* Mi Ubicacion */}
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Ubicación</h3>
                  <p className="text-gray-400">Tegucigalpa, Honduras</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white/5 rounded-xl p-8">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              {/* Campo oculto para enviar la hora actual */}
              <input 
                type="hidden" 
                name="time" 
                value={new Date().toLocaleString()}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>

              {submitStatus.message && (
                <div
                  className={`p-3 rounded-md ${
                    submitStatus.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}