import { LayoutDashboard, BarChart3, UserIcon } from 'lucide-react'; // Ajuste os imports dos ícones conforme sua lib
import { useSession } from "next-auth/react"

interface NavbarProps {
  children: React.ReactNode; 
  actions?: React.ReactNode;
}

export function Navbar({ children, actions }: NavbarProps) {
  const { data: session } = useSession()
  return (
    <nav className="bg-[#3a3d4d] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg border-2 border-[#95be43] flex items-center justify-center bg-[#3a3d4d]">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "Perfil"} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-white font-black text-xl">
                {session?.user?.name?.charAt(0) || "C"}
              </span>
            )}
          </div>
          {/* Slot para os Botões de Navegação */}
          <div className="hidden md:flex space-x-2">
            {children}
          </div>

          {/* Slot para Ações da direita (Logout, Perfil, etc) */}
          <div className="flex items-center">
            {actions}
          </div>

        </div>
      </div>
    </nav>
  );
}

// Mantemos o NavButton exportado para ser usado no page.tsx
export function NavButton({ id, label, icon: Icon, active, onClick }: any) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all ${
        isActive 
        ? 'bg-[#95be43] text-white shadow-lg shadow-[#95be43]/20' 
        : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}