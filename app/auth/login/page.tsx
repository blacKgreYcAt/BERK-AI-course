'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('登入失敗，請稍後重試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-clay flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">G</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            歡迎回來
          </h1>
          <p className="text-gray-600">
            登入你的 Gemini 學習帳戶
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="rounded-clay-lg bg-white shadow-clay p-8 space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              電子郵件
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-clay bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-clay bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-clay-lg transition-all disabled:opacity-50"
          >
            {loading ? '登入中...' : '登入'}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">或</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              還沒有帳戶？{' '}
              <Link href="/auth/signup" className="text-primary font-semibold hover:text-primary-dark">
                立即註冊
              </Link>
            </p>
          </div>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-primary text-sm">
            ← 回到首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
