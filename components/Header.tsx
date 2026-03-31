'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-clay flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="hidden sm:inline font-bold text-gray-900">大豐 Gemini 學院</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#courses" className="text-gray-700 hover:text-primary transition">
              課程
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-primary transition">
              關於
            </Link>
            <Link href="/auth/login" className="px-6 py-2 rounded-clay bg-primary text-white hover:bg-primary-dark transition shadow-clay">
              登入
            </Link>
            <Link href="/auth/signup" className="px-6 py-2 rounded-clay border-2 border-primary text-primary hover:bg-primary/5 transition">
              註冊
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="#courses" className="block text-gray-700 hover:text-primary">
              課程
            </Link>
            <Link href="#about" className="block text-gray-700 hover:text-primary">
              關於
            </Link>
            <Link href="/auth/login" className="block text-center px-6 py-2 rounded-clay bg-primary text-white">
              登入
            </Link>
            <Link href="/auth/signup" className="block text-center px-6 py-2 rounded-clay border-2 border-primary text-primary">
              註冊
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
