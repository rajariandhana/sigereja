import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      safelist: [
        "bg-red-500", "bg-red-100", "text-red-500", "text-red-100",
        "bg-orange-500", "bg-orange-100", "text-orange-500", "text-orange-100",
        "bg-amber-500", "bg-amber-100", "text-amber-500", "text-amber-100",
        "bg-yellow-500", "bg-yellow-100", "text-yellow-500", "text-yellow-100",
        "bg-lime-500", "bg-lime-100", "text-lime-500", "text-lime-100",
        "bg-green-500", "bg-green-100", "text-green-500", "text-green-100",
        "bg-emerald-500", "bg-emerald-100", "text-emerald-500", "text-emerald-100",
        "bg-teal-500", "bg-teal-100", "text-teal-500", "text-teal-100",
        "bg-cyan-500", "bg-cyan-100", "text-cyan-500", "text-cyan-100",
        "bg-sky-500", "bg-sky-100", "text-sky-500", "text-sky-100",
        "bg-blue-500", "bg-blue-100", "text-blue-500", "text-blue-100",
        "bg-indigo-500", "bg-indigo-100", "text-indigo-500", "text-indigo-100",
        "bg-violet-500", "bg-violet-100", "text-violet-500", "text-violet-100",
        "bg-purple-500", "bg-purple-100", "text-purple-500", "text-purple-100",
        "bg-fuchsia-500", "bg-fuchsia-100", "text-fuchsia-500", "text-fuchsia-100",
        "bg-pink-500", "bg-pink-100", "text-pink-500", "text-pink-100",
        "bg-rose-500", "bg-rose-100", "text-rose-500", "text-rose-100",
      ]
    }),
  ],
})
