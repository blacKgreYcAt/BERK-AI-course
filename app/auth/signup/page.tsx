'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('密碼不相符')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('密碼至少需要 6 個字元')
      setLoading(false)
      return
    }

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Insert user profile
      if (authData.user) {
        const { error: dbError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: formData.email,
          name: formData.name,
          department: formData.department,
        })

        if (dbError) {
          setError('無法建立用戶檔案，請稍後重試')
          return
        }

        setSuccess(true)
        setTimeout(() => {
          router.push('/auth/login?registered=true')
        }, 2000)
      }
    } catch (err) {
      setError('註冊失敗，請稍後重試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-clay flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">G</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            開始學習
          </h1>
          <p className="text-gray-600">
            加入 Gemini 企業協作大師課
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-clay bg-green-50 border-l-4 border-green-500 text-green-700 text-sm">
            ✅ 註冊成功！即將導向登入頁面...
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="rounded-clay-lg bg-white shadow-clay p-8 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              姓名
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="您的名字"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              電子郵件
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Department Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              部門
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="例：生產部、採購部"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              密碼
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="至少 6 個字元"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              確認密碼
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
              placeholder="再次輸入密碼"
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
            {loading ? '註冊中...' : '立即註冊'}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              已有帳戶？{' '}
              <Link href="/auth/login" className="text-primary font-semibold hover:text-primary-dark">
                直接登入
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
