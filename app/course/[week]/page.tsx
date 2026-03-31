'use client'

import Link from 'next/link'
import { courseData } from '@/lib/course-data'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CoursePage({ params }: any) {
  const [week, setWeek] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await Promise.resolve(params)
      const weekNum = parseInt(resolvedParams.week)
      setWeek(weekNum)
      setMounted(true)
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

  return (
    <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ borderBottom: '3px solid #00aeef', padding: '20px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
          <Link href="/" style={{ color: '#00aeef', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
            ← 返回首頁
          </Link>
        </div>
      </header>

      {/* Content */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
            第 {week} 週課程
          </h1>
          <div style={{ borderLeft: '8px solid #00aeef', paddingLeft: '20px' }}>
            <p style={{ fontSize: '18px', color: '#ccc' }}>
              {weekCourses.length} 個模組 • {weekCourses.reduce((sum, c) => sum + c.duration_minutes, 0)} 分鐘
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', marginTop: '60px' }}>
          {weekCourses.map((course) => (
            <div
              key={course.id}
              style={{
                border: '3px solid #00aeef',
                padding: '40px',
                background: '#111111',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translate(-5px, -5px)';
                el.style.boxShadow = '5px 5px 0 #00aeef';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translate(0, 0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '14px', textTransform: 'uppercase', color: '#00aeef', marginBottom: '15px', letterSpacing: '2px', fontWeight: 700 }}>
                模組 {course.module}
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px', color: '#00aeef', lineHeight: 1.2 }}>
                {course.title}
              </h3>
              <p style={{ fontSize: '16px', color: '#ccc', marginBottom: '20px', lineHeight: 1.5 }}>
                {course.description}
              </p>
              <div style={{ borderTop: '2px solid #333', paddingTop: '20px', marginTop: '20px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                  ⏱️ {course.duration_minutes} 分鐘課程
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  📝 {course.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {week > 1 && (
            <Link
              href={`/course/${week - 1}`}
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                border: '3px solid #00aeef',
                color: '#00aeef',
                fontWeight: 900,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              ← 上一週
            </Link>
          )}
          {week < 4 && (
            <Link
              href={`/course/${week + 1}`}
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: '#00aeef',
                color: '#0a0a0a',
                fontWeight: 900,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              下一週 →
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '3px solid #00aeef', padding: '40px', textAlign: 'center', color: '#666', marginTop: '60px' }}>
        <p>© 2026 大豐集團 • AI 企業協作大師課</p>
      </footer>
    </div>
  )
}
