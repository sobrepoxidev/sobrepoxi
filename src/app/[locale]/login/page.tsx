'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const [returnUrl, setReturnUrl] = useState('/')

  // Usar los hooks de Next.js
  const searchParams = useSearchParams();
  
  useEffect(() => {
    setMounted(true)
    
    // Extraer returnUrl o redirect del query string usando Next.js searchParams
    const returnUrlParam = searchParams.get('returnUrl') || searchParams.get('redirect');
    if (returnUrlParam) {
      setReturnUrl(returnUrlParam);
    }
  }, [searchParams])

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
        setLoading(false)
      } else {
        setConfirmationMsg('Iniciando sesión...')
        // Use replace instead of push to avoid navigation issues
        // Delayed redirect to ensure state updates properly
        //llevar hacia la url que viene en el query string
        // En lugar de redirect, que causa problemas con componentes cliente,
        // usamos router.replace que es más adecuado para componentes cliente
        router.replace(returnUrl)

      }
    } catch {
      setErrorMsg('Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      // Construir la URL de redirección con el parámetro de retorno
      const redirectUrl = new URL(window.location.origin);
      
      // Si hay una URL de retorno, agregarla como parámetro de estado para recuperarla después
      if (returnUrl && returnUrl !== '/') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              next: returnUrl,
            },
           
          },
        })
        if (error) throw error
      } else {
        // Login normal sin URL de retorno
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              next: '/login',
            },
          },

        })
        if (error) throw error
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setErrorMsg(errorMessage)
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-[#b3d5c3] via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Inicia sesión
            </h1>
            <p className="text-gray-600">
              Bienvenido de nuevo a Handmade Art
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:ring-teal-500 focus:border-teal-500 shadow-sm transition-all duration-200 focus:shadow-md"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-700 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm transition-all duration-200 focus:shadow-md"
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 mt-2"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            
          </form>
          {/* Google Sign In Button */}
          <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
              >
                <FaGoogle className="mr-2 h-5 w-5" />
                Iniciar sesión con Google
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              ¿No tienes una cuenta?{' '}
              <Link
                href={`/register${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
                className="font-medium text-teal-600 hover:text-teal-500 transition-colors duration-200"
              >
                Regístrate aquí
              </Link>
            </div>
        </div>
      </div>
    </section>
  )
}