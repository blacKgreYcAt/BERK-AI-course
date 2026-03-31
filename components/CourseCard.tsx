import Link from 'next/link'

interface CourseCardProps {
  week: number
  title: string
  description: string
  duration: number
  count: number
}

export function CourseCard({ week, title, description, duration, count }: CourseCardProps) {
  return (
    <Link href={`/dashboard/course/week${week}`}>
      <div className="h-full p-8 rounded-clay-lg bg-white shadow-clay hover:shadow-clay-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
        {/* Week Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-clay bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">第{week}週</span>
          </div>
          <span className="text-xs text-gray-500">{duration} 分鐘 × {count} 模組</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs font-semibold text-primary">立即開始</span>
          <svg className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
