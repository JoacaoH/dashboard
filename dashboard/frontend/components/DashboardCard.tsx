'use client'
import Link from "next/link"

interface CardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function DashboardCard({ href, title, description, icon }: CardProps) {
  return (
    <Link href={href} className="group relative">
      <div className="h-72 bg-[#464a5c] border-2 border-transparent rounded-[2.5rem] p-10 flex flex-col justify-between items-start text-left transition-all duration-500 hover:border-[#95be43] hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(149,190,67,0.25)]">
        <div className="w-16 h-16 bg-[#3a3d4d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl text-[#95be43]">
          {icon}
        </div>
        <div>
          <h2 className="text-white text-3xl font-black mb-2">{title}</h2>
          <p className="text-white/50 font-medium group-hover:text-white/80 transition-colors">
            {description}
          </p>
        </div>
        <div className="absolute top-8 right-8 text-[#95be43] opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}