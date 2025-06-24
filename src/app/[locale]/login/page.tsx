'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSupabase } from '@/app/supabase-provider/provider'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { getCommonMetadata, buildTitle } from '@/lib/seo';
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: buildTitle(locale === "es" ? "Iniciar sesión" : "Login", locale),
    ...getCommonMetadata(locale),
  };
}

export default function LoginPage() {
  const router = useRouter()
  const { supabase } = useSupabase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        // Manejar específicamente el error de límite de tasa
        if (error.message.includes('rate limit')) {
          setErrorMsg('Has excedido el número de intentos permitidos. Por favor, espera unos minutos antes de intentarlo nuevamente o usa el inicio de sesión con Google.')
        } else {
          setErrorMsg(error.message)
        }
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
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      setErrorMsg('Error inesperado. Intenta de nuevo o usa el inicio de sesión con Google.')
      setLoading(false)
    }
  }

  const signInWithGoogle = async (returnUrl: string) => {
    setLoading(true);
    setErrorMsg("");
  
    // 1. Armamos la ruta de callback UNA sola vez
    const redirectTo =
      `${window.location.origin}/auth/callback` +
      (returnUrl && returnUrl !== "/"
        ? `?next=${encodeURIComponent(returnUrl)}`
        : "");
  
    // 2. Llamamos a Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  
    // 3. Manejamos posibles errores
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
  
    // 4. Forzamos la redirección (por si el SDK no lo hace)
    if (data?.url) window.location.href = data.url;
  };
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 text-gray-700 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm transition-all duration-200 focus:shadow-md"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
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
                onClick={() => signInWithGoogle(returnUrl)}
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