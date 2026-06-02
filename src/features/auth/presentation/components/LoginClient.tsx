'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Link } from '@/shared/i18n/navigation'
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useLocale } from 'next-intl'
import { useAuth } from '../providers/AuthProvider'

export default function LoginClient() {
  const router = useRouter()
  const { supabase } = useAuth()
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [confirmationMsg, setConfirmationMsg] = useState('')
  const [returnUrl, setReturnUrl] = useState('/')

  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    const returnUrlParam = searchParams.get('returnUrl') || searchParams.get('redirect')
    if (returnUrlParam) {
      setReturnUrl(returnUrlParam)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if (error.message.includes('rate limit')) {
          setErrorMsg(
            locale === 'es'
              ? 'Has excedido el número de intentos permitidos. Por favor, espera unos minutos antes de intentarlo nuevamente o usa el inicio de sesión con Google.'
              : 'You have exceeded the allowed number of attempts. Please wait a few minutes before trying again or use Google sign-in.',
          )
        } else {
          setErrorMsg(error.message)
        }
        setLoading(false)
      } else {
        setConfirmationMsg(locale === 'es' ? 'Iniciando sesión...' : 'Signing in...')
        router.replace(decodeURIComponent(returnUrl))
      }
    } catch (err) {
      console.error('[LoginClient] sign-in error:', err)
      setErrorMsg(
        locale === 'es'
          ? 'Error inesperado. Intenta de nuevo o usa el inicio de sesión con Google.'
          : 'Unexpected error. Please try again or use Google sign-in.',
      )
      setLoading(false)
    }
  }

  const signInWithGoogle = async (returnUrl: string) => {
    setLoading(true)
    setErrorMsg('')

    const redirectTo =
      `${window.location.origin}/auth/callback` +
      (returnUrl && returnUrl !== '/' ? `?next=${encodeURIComponent(returnUrl)}` : '')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    if (data?.url) window.location.href = data.url
  }

  if (!mounted) return null

  const inputClass =
    'w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40 transition-colors'
  const inputClassPwd =
    'w-full pl-10 pr-12 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40 transition-colors'

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      {/* Ambient theme glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-md">
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black gold-gradient-bright mb-2">
              {locale === 'es' ? 'Inicia sesión' : 'Login'}
            </h1>
            <p className="text-gray-400 text-sm">
              {locale === 'es' ? 'Bienvenido de nuevo a SobrePoxi' : 'Welcome back to SobrePoxi'}
            </p>
          </div>

          {confirmationMsg && (
            <div className="mb-6 p-4 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-500/20 text-sm">
              {confirmationMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                {locale === 'es' ? 'Correo electrónico' : 'Email'}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                {locale === 'es' ? 'Contraseña' : 'Password'}
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClassPwd}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? (locale === 'es' ? 'Ocultar contraseña' : 'Hide password') : (locale === 'es' ? 'Mostrar contraseña' : 'Show password')}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {errorMsg && <div className="text-red-400 text-sm">{errorMsg}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-bold text-black bg-gold-gradient hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (locale === 'es' ? 'Iniciando sesión...' : 'Logging in...') : (locale === 'es' ? 'Iniciar sesión' : 'Login')}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => signInWithGoogle(returnUrl)}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-white/10 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors"
            >
              <FaGoogle className="mr-2 h-5 w-5 text-amber-400" />
              {locale === 'es' ? 'Iniciar sesión con Google' : 'Login with Google'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            {locale === 'es' ? '¿No tienes una cuenta?' : "Don't have an account?"}
            <Link
              href={`/register${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
              className="font-medium text-amber-400 hover:text-amber-300 ml-2 transition-colors"
            >
              {locale === 'es' ? 'Regístrate aquí' : 'Register here'}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
