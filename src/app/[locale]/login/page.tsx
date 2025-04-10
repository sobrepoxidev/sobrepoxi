'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/app/supabase-provider/provider'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const { supabase } = useSupabase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [confirmationMsg, setConfirmationMsg] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        setConfirmationMsg('Iniciando sesión...')
        router.push('/')
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setErrorMsg(errorMessage)
    }
  }

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Inicia sesión
            </h1>
            <p className="text-gray-600">
              Bienvenido de nuevo
            </p>
          </div>

          {confirmationMsg && (
            <div className="mb-6 p-4 rounded-lg bg-teal-50 text-teal-700">
              {confirmationMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-teal-500 focus:border-teal-500"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
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
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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

            <div className="text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link
                href="/register"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Regístrate aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}