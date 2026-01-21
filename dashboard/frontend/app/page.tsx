'use client'
import { signIn, useSession } from "next-auth/react" 
import DashboardCard from "@/components/DashboardCard";
import LogoutButton from "@/components/LogoutButton";
import LoginScreen from "@/components/LoginScreen"
import { useState } from "react"
import Image from 'next/image';


export default function Home() {
  const { data: session, status: authStatus } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  if (authStatus === "loading") {
    return <div className="min-h-screen bg-[#3a3d4d] flex items-center justify-center">
      {/* Um spinner opcional aqui ficaria legal */}
      <div className="w-10 h-10 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
  }
  // LISTA DE DASHBOARDS (Fácil de dar manutenção!)
  const meusDashboards = [
    {
      href: "/acompanhamento",
      title: "Acompanhamento",
      description: "Índice de engajamento dos cursistas e indicadores de projetos",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      href: "/feedback",
      title: "Feedback",
      description: "Avaliação dos cursistas sobre nossas formações",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
    }
  ]
  if (status === "loading") {
    return <div className="min-h-screen bg-[#3a3d4d]" /> 
  }
  if (session) {
    return (
      <><header className="absolute top-0 w-full p-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <Image
          src="/colab.png"
          alt="Colab Logo"
          width={150}
          height={50}
          priority
        />
        </div>
        
        {/* O nosso novo componente inteligente */}
        <LogoutButton />
      </header>
      <main className="min-h-screen bg-[#3a3d4d] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* ... (Header e Fundo decorativo que já temos) ... */}

        <div className="relative z-10 w-full max-w-5xl text-center">
          <h1 className="text-white text-4xl font-black mb-12">
            Olá, <span className="text-[#95be43]">{session.user?.name?.split(' ')[0]}</span>.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {meusDashboards.map((dash, index) => (
              <DashboardCard 
                key={index}
                href={dash.href}
                title={dash.title}
                description={dash.description}
                icon={dash.icon}
              />
            ))}
          </div>
        </div>
      </main>
      </>
    )
  }
  return (
    <LoginScreen 
      isLoading={isLoading} 
      handleLogin={() => { setIsLoading(true); signIn('google'); }} 
    />
  )
  // return <LoginScreen /> ...
}