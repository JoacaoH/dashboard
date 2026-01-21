'use client'
import { signIn } from "next-auth/react"

export default function LoginScreen({ isLoading, handleLogin }: { isLoading: boolean, handleLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#3a3d4d] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fundo decorativo interativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#95be43] opacity-10 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#95be43] opacity-10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>
        </div>

        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 relative z-10 border border-white/10">
          <div className="w-20 h-20 bg-[#95be43] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-3xl font-black text-[#3a3d4d] mb-2 tracking-tight text-center">
            Dashboard <span className="text-[#95be43]">Colaborativa</span>
          </h1>
          
          <p className="text-gray-500 mb-10 leading-relaxed font-medium text-center">
            Portal de Inteligência Educacional. <br/>Entre para acessar seus indicadores.
          </p>

          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full h-16 bg-[#3a3d4d] rounded-xl text-white font-bold overflow-hidden transition-all active:scale-95 disabled:opacity-90"
          >
            {isLoading && (
              <div className="absolute inset-0 bg-[#95be43]/20">
                <div className="h-full bg-[#95be43] w-full origin-left animate-loading-bar"></div>
              </div>
            )}
            <div className="relative z-10 flex items-center justify-center gap-4">
              {!isLoading ? (
                <>
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6 bg-white rounded-full p-1" alt="Google" />
                  <span>Acessar com Google</span>
                </>
              ) : (
                <span className="animate-pulse">Autenticando...</span>
              )}
            </div>
          </button>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
              Tecnologia & Dados para Educação
            </p>
          </div>
        </div>
    </div>
  )
}