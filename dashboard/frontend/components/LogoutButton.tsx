'use client'

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // O callbackUrl garante que ele volta para a raiz onde está o login
    await signOut({ callbackUrl: '/' })
  }

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="group relative px-6 py-2 bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-[#95be43] transition-all rounded-lg text-sm font-bold overflow-hidden"
    >
      {/* Barra de progresso interna que desliza ao clicar */}
      {isLoggingOut && (
        <div className="absolute inset-0 bg-[#95be43]/20">
          <div className="h-full bg-[#95be43] w-full origin-left animate-loading-bar"></div>
        </div>
      )}

      <span className={`relative z-10 ${isLoggingOut ? 'animate-pulse' : ''}`}>
        {isLoggingOut ? 'A encerrar...' : 'Sair da conta'}
      </span>
    </button>
  )
}