'use client'

import { Header } from '@/components/Header'
import { CourseCard } from '@/components/CourseCard'
import Link from 'next/link'

const courseWeeks = [
  {
    week: 1,
    title: '見樹又見林 —— Gemini 六大神器總覽',
    description: '帶領主管巡禮左側工具列的所有功能，了解 AI 的能力邊界，建立多模態辦公的全新思維。',
    duration: 120,
    count: 3,
  },
  {
    week: 2,
    title: '把 AI 當作超級實習生 —— Prompt 溝通術',
    description: '打破「AI 是搜尋工具」的舊觀念，掌握商業實用的四段式交辦公式。',
    duration: 120,
    count: 3,
  },
  {
    week: 3,
    title: '超級大腦與私人圖書館 —— 深度研究與資料處理',
    description: '告別 Google 海洋迷航，讓 AI 幫你找資料、讀重點，將死板檔案變活字典。',
    duration: 120,
    count: 3,
  },
  {
    week: 4,
    title: '沉浸式協作與視覺點綴 —— Canvas 與多模態生成',
    description: '專攻長文修改與 SOP 撰寫，用 AI 為簡報做漂亮配圖，融會四週技能。',
    duration: 120,
    count: 3,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              ✨ Gemini 企業協作大師課
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            讓 AI 成為你的<br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              24 小時超級幕僚
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            四週課程，八小時精華教學。從零開始，讓主管掌握 Gemini 的六大神器，提升部門 AI 應用能力，產出企業 AI 導入計畫。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-clay-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-clay-lg transition-all duration-300 hover:-translate-y-1"
            >
              立即報名 →
            </Link>
            <Link
              href="#courses"
              className="px-8 py-4 rounded-clay-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition"
            >
              查看課程大綱
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-primary">4</div>
              <p className="text-gray-600 text-sm mt-2">週完整課程</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">8</div>
              <p className="text-gray-600 text-sm mt-2">小時精華教學</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">6</div>
              <p className="text-gray-600 text-sm mt-2">大神器精通</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            完整課程架構
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            由淺入深，系統化學習 Gemini 在企業中的應用，每週專注一個核心主題。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {courseWeeks.map((course) => (
            <CourseCard
              key={course.week}
              week={course.week}
              title={course.title}
              description={course.description}
              duration={course.duration}
              count={course.count}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-primary/5 to-primary-dark/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            課程核心特色
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: '針對傳產設計',
                desc: '所有案例來自實際製造業工作場景',
              },
              {
                icon: '💼',
                title: '立即可用',
                desc: '課程內容直接應用於日常工作',
              },
              {
                icon: '📊',
                title: '實踐導向',
                desc: '每堂課都有實戰演練與反思時間',
              },
              {
                icon: '🔒',
                title: '資安防線',
                desc: '重視企業機密保護與資安意識',
              },
              {
                icon: '🚀',
                title: '系統化框架',
                desc: '掌握黃金公式，輕鬆駕馭 AI',
              },
              {
                icon: '👥',
                title: '小班教學',
                desc: '20 人高管精英班，互動討論充分',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-clay bg-white shadow-clay hover:shadow-clay-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
          主管推薦
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              name: '王董 - 金屬加工廠廠長',
              content: '這堂課讓我們工廠的效率提升了 40%，員工再也不用花時間找資料，AI 幫忙做初稿，我們只需審核！',
            },
            {
              name: '李經理 - 電子產業採購主管',
              content: '學到的 Prompt 公式真的很實用，原本一份合約要改半小時，現在只要 5 分鐘！',
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-clay bg-white shadow-clay border-l-4 border-primary"
            >
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            準備好升級你的管理能力了嗎？
          </h2>
          <p className="text-white/90 text-xl mb-12">
            加入 20 位企業主管，一起探索 AI 如何改變工作方式
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-10 py-4 rounded-clay-lg bg-white text-primary font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            現在就報名，掌握未來！
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2026 大豐集團 Gemini 企業協作大師課. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
