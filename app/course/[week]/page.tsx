'use client'

import Link from 'next/link'
import { courseData } from '@/lib/course-data'
import { useEffect, useState } from 'react'

export default function CoursePage({ params }: any) {
  const [week, setWeek] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params)
        const weekNum = parseInt(resolvedParams.week)
        setWeek(weekNum)
        setMounted(true)
      } catch (err) {
        setError('參數解析失敗')
      }
    }
    resolveParams()
  }, [params])

  if (!mounted || week === null) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '20px' }}>加載中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', color: '#ff6b6b' }}>錯誤</h1>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>{error}</p>
          <Link href="/" style={{ color: '#00aeef', fontSize: '18px', fontWeight: 700 }}>
            ← 返回首頁
          </Link>
        </div>
      </div>
    )
  }

  const weekCourses = courseData.filter((c) => c.week === week)

  if (weekCourses.length === 0) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>課程未找到</h1>
          <Link href="/" style={{ color: '#00aeef', fontSize: '18px', fontWeight: 700 }}>
            ← 返回首頁
          </Link>
        </div>
      </div>
    )
  }

  // 計算總頁數並驗證有效性
  const totalPages = weekCourses.reduce((sum, c) => sum + (c.pages?.length || 0), 0)

  if (totalPages === 0) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>課程無效：沒有頁面內容</h1>
          <Link href="/" style={{ color: '#00aeef', fontSize: '18px', fontWeight: 700 }}>
            ← 返回首頁
          </Link>
        </div>
      </div>
    )
  }

  // 計算當前課程和頁面（加入邊界檢查）
  let totalPageCount = 0
  let currentCourseIndex = 0
  let currentPageInCourse = 0

  for (let i = 0; i < weekCourses.length; i++) {
    const coursePageCount = weekCourses[i].pages?.length || 0
    if (totalPageCount + coursePageCount > currentPageIndex) {
      currentCourseIndex = i
      currentPageInCourse = currentPageIndex - totalPageCount
      break
    }
    totalPageCount += coursePageCount
  }

  // 邊界檢查
  if (currentCourseIndex >= weekCourses.length) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', color: '#ff6b6b' }}>課程索引超出範圍</h1>
          <Link href="/" style={{ color: '#00aeef', fontSize: '18px', fontWeight: 700 }}>
            ← 返回首頁
          </Link>
        </div>
      </div>
    )
  }

  const currentCourse = weekCourses[currentCourseIndex]

  if (!currentCourse.pages || currentCourse.pages.length === 0) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', color: '#ff6b6b' }}>課程頁面為空</h1>
          <Link href="/" style={{ color: '#00aeef', fontSize: '18px', fontWeight: 700 }}>
            ← 返回首頁
          </Link>
        </div>
      </div>
    )
  }

  const currentPage = currentCourse.pages[currentPageInCourse]

  if (!currentPage) {
    return (
      <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', color: '#ff6b6b' }}>頁面內容遺失</h1>
          <Link href="/" style={{ color: '#00aeef', fontSize: '18px', fontWeight: 700 }}>
            ← 返回首頁
          </Link>
        </div>
      </div>
    )
  }

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
    }
  }

  // 鍵盤導航
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') window.location.href = '/'
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPageIndex, totalPages])

  return (
    <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ borderBottom: '2px solid #00aeef', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#00aeef', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
          ← 返回首頁
        </Link>
        <div style={{ fontSize: '14px', color: '#999' }}>
          第 {week} 週 • 頁碼：{currentPageIndex + 1} / {totalPages}
        </div>
      </header>

      {/* Main Content - Full Screen Slide */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 60px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Page Title */}
        <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '40px', color: '#00aeef', textAlign: 'center', lineHeight: 1.2 }}>
          {currentPage.title}
        </h1>

        {/* Page Content */}
        <div style={{ fontSize: '28px', color: '#ccc', lineHeight: 1.8, textAlign: 'left', whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxWidth: '900px' }}>
          {currentPage.content}
        </div>

        {/* Course Info */}
        <div style={{ marginTop: '60px', fontSize: '16px', color: '#999', textAlign: 'center' }}>
          {currentCourse.title} • {currentCourse.duration_minutes} 分鐘
        </div>
      </section>

      {/* Navigation Bar */}
      <section style={{ borderTop: '2px solid #00aeef', padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPageIndex === 0}
          style={{
            padding: '12px 30px',
            border: '2px solid #00aeef',
            color: currentPageIndex === 0 ? '#666' : '#00aeef',
            background: 'transparent',
            fontWeight: 900,
            fontSize: '14px',
            textTransform: 'uppercase',
            cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentPageIndex === 0 ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          ← 上一頁
        </button>

        <div style={{ fontSize: '14px', color: '#00aeef', fontWeight: 700 }}>
          {currentPageIndex + 1} / {totalPages}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPageIndex === totalPages - 1}
          style={{
            padding: '12px 30px',
            background: currentPageIndex === totalPages - 1 ? '#333' : '#00aeef',
            color: currentPageIndex === totalPages - 1 ? '#666' : '#0a0a0a',
            border: 'none',
            fontWeight: 900,
            fontSize: '14px',
            textTransform: 'uppercase',
            cursor: currentPageIndex === totalPages - 1 ? 'not-allowed' : 'pointer',
            opacity: currentPageIndex === totalPages - 1 ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          下一頁 →
        </button>
      </section>

      {/* Keyboard Hints */}
      <footer style={{ borderTop: '1px solid #333', padding: '15px 40px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
        ⌨️ 鍵盤快捷鍵：← 上一頁 • → 下一頁 • ESC 返回首頁
      </footer>
    </div>
  )
}
