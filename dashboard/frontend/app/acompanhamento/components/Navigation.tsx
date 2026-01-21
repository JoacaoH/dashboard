import React, { Component } from 'react'
import {
  LayoutDashboard,
  BarChart3,
  Users,
  MessageSquare,
  User,
} from 'lucide-react'

interface NavigationProps {
  activeView: string
  setActiveView: (view: string) => void
}
export function Navigation({ activeView, setActiveView }: NavigationProps) {
  const navItems = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: LayoutDashboard,
    },
    {
      id: 'components',
      label: 'Análise de Componentes',
      icon: BarChart3,
    },
    {
      id: 'groups',
      label: 'Análise de Grupos',
      icon: Users,
    },
    {
      id: 'sentiment',
      label: 'Sentimento x Ação',
      icon: MessageSquare,
    },
    {
      id: 'student',
      label: 'Visão 360° Cursista',
      icon: User,
    },
  ]
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Dashboard de Engajamento
            </h1>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeView === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
