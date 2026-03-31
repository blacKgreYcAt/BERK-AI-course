/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aeef',
        'primary-light': '#66d9ff',
        'primary-dark': '#0088bb',
        success: '#10b981',
        warning: '#f87171',
      },
      boxShadow: {
        'clay': '0 4px 6px rgba(0, 174, 239, 0.1), 0 10px 20px rgba(0, 0, 0, 0.08)',
        'clay-lg': '0 8px 12px rgba(0, 174, 239, 0.15), 0 20px 40px rgba(0, 0, 0, 0.1)',
        'clay-md': '0 2px 4px rgba(0, 174, 239, 0.08), 0 6px 12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'clay': '20px',
        'clay-lg': '30px',
        '25': '25px',
      },
    },
  },
  safelist: [
    'rounded-[25px]',
    'shadow-[0_8px_16px_rgba(0,174,239,0.2),0_12px_24px_rgba(0,136,187,0.15)]',
    'hover:shadow-[0_12px_28px_rgba(0,174,239,0.3),0_16px_40px_rgba(0,136,187,0.2)]',
    'hover:bg-[#00aeef]/5',
    'bg-gradient-to-r',
    'from-[#00aeef]',
    'to-[#0088bb]',
  ],
  plugins: [],
}
