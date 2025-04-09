'use client'

import React, { useState, useEffect } from 'react'
import { useSupabase } from '@/app/supabase-provider/provider'
import { FaEnvelope, FaLock, FaUser, FaPhone, FaGoogle } from 'react-icons/fa'
//import { Tooltip } from 'react-tooltip' // Ejemplo: npm install react-tooltip (o quítalo si no lo quieres)
import Link from 'next/link'

export default function RegisterPage() {
  const { supabase } = useSupabase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [confirmationMsg, setConfirmationMsg] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [receivePromotions, setReceivePromotions] = useState(true)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (password !== confirmPass) {
      setErrorMsg('Las contraseñas no coinciden.')
      return
    }
    if (!acceptTerms) {
      setErrorMsg('Debes aceptar los términos para continuar.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { 
            name, 
            phone,
            receive_promotions: receivePromotions
          } 
        },
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        setConfirmationMsg('Registro exitoso. Revisa tu correo y confirma tu cuenta antes de iniciar sesión.')
      }
    } catch {
      setErrorMsg('Error inesperado. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      })
      if (error) throw error
    } catch (error) {
      setErrorMsg('Error al iniciar sesión con Google. Por favor, intenta de nuevo.')
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Regístrate
            </h1>
            <p className="text-gray-600">
              Crea tu cuenta para comenzar a explorar
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-6">
              {confirmationMsg && (
                <div className="mb-6 p-4 rounded-lg bg-teal-50 text-teal-700">
                  {confirmationMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Right Column */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPass" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPass"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  Acepto los términos y condiciones
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="promotions"
                  checked={receivePromotions}
                  onChange={(e) => setReceivePromotions(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="promotions" className="ml-2 text-sm text-gray-700">
                  Deseo recibir correos promocionales y actualizaciones sobre nuevos productos
                </label>
              </div>

              {errorMsg && (
                <div className="text-red-500 text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registrando...' : 'Registrarme'}
              </button>

              {/* Google Sign In Button */}
              <div className="mt-6">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <FaGoogle className="mr-2 h-5 w-5" />
                  Iniciar sesión con Google
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 text-center">
                  ¿Ya tienes una cuenta?
                  <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500 ml-2">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}