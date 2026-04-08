'use client'

import Image from 'next/image'
import Link from 'next/link'
import { courseData } from '@/lib/course-data'

export default function Home() {
  // 強制 Vercel 重新部署 - v3
  // 按週次組織課程
  const coursesByWeek = [0, 1, 2, 3, 4].map(week => ({
    week,
    courses: courseData.filter(c => c.week === week)
  }))

  // 進階應用課程
  const advancedCourses = courseData.filter(c => c.week >= 5 && c.week <= 10)

  return (
    <div style={{ background: '#f5f5f7', color: '#000000' }}>
      {/* Header - Apple Glass Effect */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 40px' }}>
          <div className="logo" style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.5px' }}>
            BERK AI
          </div>
          <nav style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <a href="#cases" style={{ color: '#ffffff', fontWeight: 500, textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>課程</a>
            <Link href="/cards" style={{ color: '#ffffff', fontWeight: 500, textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>卡牌</Link>
            <Link href="/quiz" style={{ color: '#ffffff', fontWeight: 500, textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>題庫</Link>
            <Link href="/dashboard/progress" style={{ color: '#ffffff', fontWeight: 500, textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>進度</Link>
          </nav>
        </div>
      </header>

      {/* Hero - Apple Style Black Background */}
      <section className="hero" style={{ background: '#000000', color: '#ffffff', padding: '120px 40px' }}>
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div className="hero-content">
            <h1 style={{ fontSize: '72px', lineHeight: 1.1, color: '#ffffff', fontWeight: 600, letterSpacing: '-0.28px', marginBottom: '24px' }}>
              BERK 的 AI 空間
            </h1>
            <p style={{ fontSize: '21px', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '48px', maxWidth: '600px' }}>
              掌握 Gemini 六大神器，從傳統辦公流程到 AI 驅動決策，完整蛻變。
              <br />
              <br />
              透過卡牌自學和實體課程，開啟 AI 時代的無限可能。
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#cases" style={{
                background: '#0071e3',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
              }}>
                開始學習
              </a>
              <a href="/cards" style={{
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.3s',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
              }}>
                卡牌自學
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="cases" id="cases" style={{ padding: '80px 40px', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.24px', marginBottom: '60px' }}>課程設計</h2>

          {/* 響應式網格 - 桌面 4 列、平板 2 列、手機 1 列 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginTop: '60px',
          }}>
            {coursesByWeek.map(({ week, courses }) => (
              <div key={week} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* 週表頭 */}
                <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '2px solid #0071e3' }}>
                  <h3 style={{ fontSize: '28px', fontWeight: 600, color: '#0071e3', margin: '0', letterSpacing: '-0.2px' }}>
                    {week === 0 ? '課前準備' : `第 ${week} 週`}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.5)', margin: '8px 0 0 0', fontWeight: 500 }}>
                    {courses.length} 門課程
                  </p>
                </div>

                {/* 該週的課程卡片 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  {courses.map((course) => (
                    <Link key={course.id} href={`/course/${course.week}?id=${course.id}`}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '32px',
                          background: '#f5f5f7',
                          border: '1px solid rgba(0, 0, 0, 0.06)',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '380px',
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          const el = e.currentTarget as HTMLDivElement;
                          el.style.background = '#efefef';
                          el.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          const el = e.currentTarget as HTMLDivElement;
                          el.style.background = '#f5f5f7';
                          el.style.boxShadow = 'none';
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0071e3', marginBottom: '12px', letterSpacing: '0.8px', fontWeight: 600 }}>
                            模組 {course.module}
                          </div>
                          <h4 style={{ fontSize: '21px', fontWeight: 600, marginBottom: '12px', color: '#1d1d1f', lineHeight: 1.3, letterSpacing: '-0.2px' }}>
                            {course.title}
                          </h4>
                          <p style={{ fontSize: '15px', color: 'rgba(0, 0, 0, 0.7)', marginBottom: '0', lineHeight: 1.5, letterSpacing: '-0.24px' }}>
                            {course.description}
                          </p>
                        </div>
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                          <p style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 8px 0', fontWeight: 500 }}>
                            ⏱️ {course.duration_minutes} 分鐘
                          </p>
                          <p style={{ fontSize: '13px', color: '#0071e3', fontWeight: 600, margin: '0', letterSpacing: '-0.2px' }}>
                            查看詳情 →
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 進階應用 Section */}
      {advancedCourses.length > 0 && (
        <section style={{ background: '#000000', padding: '80px 40px', marginTop: '0' }}>
          <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{
              background: '#272729',
              padding: '48px',
              borderRadius: '12px',
              color: 'white',
              marginBottom: '60px',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 15px 0', fontSize: '40px', fontWeight: 900 }}>
                ⭐ 進階使用 Tips
              </h2>
              <p style={{ margin: '0', fontSize: '18px', opacity: 0.95, lineHeight: 1.6 }}>
                深入掌握 Gemini 高階功能，打造專屬 AI 助手<br />
                提升工作效率，成為 AI 時代的領航員
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
            }}>
              {advancedCourses.map((course) => (
                <Link key={course.id} href={`/course/${course.week}?id=${course.id}`}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '32px',
                      background: '#2a2a2d',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minHeight: '280px',
                      borderRadius: '12px',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = '#323235';
                      el.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = '#2a2a2d';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0071e3', marginBottom: '12px', letterSpacing: '0.8px', fontWeight: 600 }}>
                        進階 {course.module}
                      </div>
                      <h4 style={{ fontSize: '21px', fontWeight: 600, marginBottom: '12px', color: '#ffffff', lineHeight: 1.3, letterSpacing: '-0.2px' }}>
                        {course.title}
                      </h4>
                      <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0', lineHeight: 1.5, letterSpacing: '-0.24px' }}>
                        {course.description}
                      </p>
                    </div>
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 8px 0', fontWeight: 500 }}>
                        ⏱️ {course.duration_minutes} 分鐘
                      </p>
                      <p style={{ fontSize: '13px', color: '#0071e3', fontWeight: 600, margin: '0', letterSpacing: '-0.2px' }}>
                        進階應用 →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#000000', color: '#ffffff', padding: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
            © 2026 BERK 的 AI 空間 • Gemini 課程
            <br />
            <a href="mailto:52.emperor-widest@icloud.com" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 600 }}>
              聯繫我們
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
