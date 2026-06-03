'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/shared/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { FaEnvelope, FaLock, FaUser, FaPhone, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useLocale } from 'next-intl'
import { useAuth } from '../providers/AuthProvider'

export default function RegisterClient() {
  const { supabase } = useAuth()

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
  const [returnUrl, setReturnUrl] = useState('/')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const locale = useLocale()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (password !== confirmPass) {
      setErrorMsg(locale === 'es' ? 'Las contraseñas no coinciden.' : 'Passwords do not match.')
      return
    }
    if (!acceptTerms) {
      setErrorMsg(locale === 'es' ? 'Debes aceptar los términos para continuar.' : 'You must accept the terms to continue.')
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
            receive_promotions: receivePromotions,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent(returnUrl)}`,
        },
      })
      if (error) {
        setErrorMsg(error.message)
        setLoading(false)
      } else {
        setConfirmationMsg(
          locale === 'es'
            ? 'Registro exitoso. Revisa tu correo y confirma tu cuenta antes de iniciar sesión.'
            : 'Registration successful. Check your email and confirm your account before logging in.',
        )
        setLoading(false)
      }
    } catch (err) {
      console.error('[RegisterClient] sign-up error:', err)
      setErrorMsg(locale === 'es' ? 'Error inesperado. Intenta de nuevo.' : 'Unexpected error. Please try again.')
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

  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    const returnUrlParam = searchParams.get('returnUrl')
    if (returnUrlParam) {
      setReturnUrl(returnUrlParam)
    }
  }, [searchParams])

  if (!mounted) return null

  const inputClass =
    'w-full pl-10 pr-4 py-2.5 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40 transition-colors'
  const inputClassPwd =
    'w-full pl-10 pr-10 py-2.5 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40 transition-colors'

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#121212] py-10 px-4 sm:px-6 lg:px-8 text-gray-200">
      {/* Ambient theme glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-md">
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl px-5 py-7 md:p-8 border border-white/10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black gold-gradient-bright mb-2">
              {locale === 'es' ? 'Regístrate' : 'Register'}
            </h1>
            <p className="text-gray-400 text-sm">
              {locale === 'es' ? 'Crea tu cuenta en SobrePoxi' : 'Create your SobrePoxi account'}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {confirmationMsg && (
              <div className="p-4 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-500/20 text-sm">
                {confirmationMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                  {locale === 'es' ? 'Nombre completo' : 'Full name'}
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                  {locale === 'es' ? 'Teléfono' : 'Phone'}
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPass" className="block text-sm font-medium text-gray-300 mb-1.5">
                {locale === 'es' ? 'Confirmar contraseña' : 'Confirm password'}
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPass"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className={inputClassPwd}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? (locale === 'es' ? 'Ocultar contraseña' : 'Hide password') : (locale === 'es' ? 'Mostrar contraseña' : 'Show password')}
                >
                  {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#121212] accent-amber-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                {locale === 'es' ? (
                  <>
                    Acepto los{' '}
                    <Link href="/conditions-service" target="_blank" className="font-medium text-amber-400 hover:text-amber-300 transition-colors">
                      Términos y condiciones
                    </Link>{' '}
                    así como la{' '}
                    <Link href="/privacy-policies" target="_blank" className="font-medium text-amber-400 hover:text-amber-300 transition-colors">
                      política de privacidad
                    </Link>
                  </>
                ) : (
                  <>
                    I accept the{' '}
                    <Link href="/conditions-service" target="_blank" className="font-medium text-amber-400 hover:text-amber-300 transition-colors">
                      terms and conditions
                    </Link>{' '}
                    and the{' '}
                    <Link href="/privacy-policies" target="_blank" className="font-medium text-amber-400 hover:text-amber-300 transition-colors">
                      privacy policy
                    </Link>
                  </>
                )}
              </label>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="promotions"
                checked={receivePromotions}
                onChange={(e) => setReceivePromotions(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#121212] accent-amber-500"
              />
              <label htmlFor="promotions" className="text-sm text-gray-400">
                {locale === 'es' ? 'Deseo recibir correos promocionales y actualizaciones sobre nuevos productos' : 'I want to receive promotional emails and updates about new products'}
              </label>
            </div>

            {errorMsg && <div className="text-red-400 text-sm">{errorMsg}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-bold text-black bg-gold-gradient hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (locale === 'es' ? 'Registrando...' : 'Registering...') : (locale === 'es' ? 'Registrarme' : 'Register')}
            </button>
          </form>

          <div className="mt-3">
            <button
              onClick={() => signInWithGoogle(returnUrl)}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-white/10 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors"
            >
              <FaGoogle className="mr-2 h-5 w-5 text-amber-400" />
              {locale === 'es' ? 'Registrarme con Google' : 'Register with Google'}
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-400 text-center">
            {locale === 'es' ? '¿Ya tienes una cuenta?' : 'Already have an account?'}
            <Link
              href={`/login${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
              className="font-medium text-amber-400 hover:text-amber-300 ml-2 transition-colors"
            >
              {locale === 'es' ? 'Inicia sesión' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
