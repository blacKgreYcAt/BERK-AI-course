'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Course {
  id: string
  week: number
  title: string
  description: string
  duration_minutes: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // 檢查登入狀態
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      fetchCourses()
    }

    checkAuth()
  }, [router])

  // 獲取課程
  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('week', { ascending: true })
        .order('order', { ascending: true })

      if (!error && data) {
        setCourses(data)
      }
    } finally {
      setLoading(false)
    }
  }

  // 搜尋過濾
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = !searchQuery ||
      course.title.includes(searchQuery) ||
      course.description.includes(searchQuery)

    const matchesWeek = !selectedWeek || course.week === selectedWeek

    return matchesSearch && matchesWeek
  })

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加載中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-clay sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gemini 課程平台</h1>
              <p className="text-gray-600 text-sm mt-1">歡迎，{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-clay border-2 border-primary text-primary hover:bg-primary/5 transition"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Section */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              🔍 搜尋課程
            </label>
            <input
              type="text"
              placeholder="搜尋課程標題或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-clay border-2 border-gray-200 focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Week Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              📅 按週次篩選
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedWeek(null)}
                className={`px-4 py-2 rounded-clay transition ${
                  selectedWeek === null
                    ? 'bg-primary text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-primary'
                }`}
              >
                全部課程
              </button>
              {[1, 2, 3, 4].map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`px-4 py-2 rounded-clay transition ${
                    selectedWeek === week
                      ? 'bg-primary text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-primary'
                  }`}
                >
                  第 {week} 週
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            找到 {filteredCourses.length} 門課程
          </h2>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">查無符合條件的課程</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/dashboard/course/${course.id}`}
                >
                  <div className="h-full p-6 rounded-clay bg-white shadow-clay hover:shadow-clay-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    {/* Week Badge */}
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                      第 {course.week} 週
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        ⏱️ {course.duration_minutes} 分鐘
                      </span>
                      <span className="text-primary font-semibold text-sm">
                        查看 →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="mt-16 p-8 rounded-clay-lg bg-gradient-to-r from-primary/10 to-primary-dark/10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📊 學習進度</h3>
          <p className="text-gray-600 mb-4">
            你已完成 0 / {courses.length} 門課程（0%）
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-primary to-primary-dark h-3 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
