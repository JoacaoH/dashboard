'use client'

import { signIn, useSession } from "next-auth/react"
import React, { useState, useEffect, act } from 'react'
import axios from 'axios'
import { LayoutDashboard, BarChart3, Users, MessageSquare, User as UserIcon } from 'lucide-react'
import LogoutButton from "@/components/LogoutButton"

// Importando os sub-componentes (Vou defini-los abaixo para facilitar)
import { IEGGauge } from './components/IEGGauge'
import { RiskStatus } from './components/RiskStatus'
import { EngagementFunnel } from './components/EngagementFunnel'
import { EngagementTimeSeries } from './components/EngagementTimeSeries'
import { Navbar, NavButton } from "./components/Navbar"
import { ActivitiesDelivered } from "./components/ActivitiesDelivered"
import { ActivitiesNotes } from "./components/ActivitiesNotes"
import { Frequency } from "./components/Frequency"
import { Ludicos } from "./components/Ludicos"

export default function AcompanhamentoPage() {
  const { data: session } = useSession()
  const [activeView, setActiveView] = useState<'overview' | 'components' | 'groups' | 'sentiment' | 'student'>('overview');
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(true)
  const [components, setComponents] = useState([])

  // Busca os dados reais do seu BigQuery via FastAPI
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get('http://localhost:8000/api/acompanhamento', {
            headers: { Authorization: `Bearer ${session.user.email}` }
          })
          setDados(response.data)
        } catch (error) {
          console.error("Erro ao buscar dados:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchComponents = async () => {
      if (session?.user?.email) {
        try {
          const res = await axios.get('http://localhost:8000/api/components', {
            headers: { Authorization: `Bearer ${session.user.email}` }
            })
          setComponents(res.data)
        } catch (error) {
          console.error("Erro ao buscar componentes:", error)
        } finally {
          setLoading(false)
        }
        fetchComponents()
        }
      }
    }, [session])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER E NAVEGAÇÃO INTEGRADA */}
      <Navbar
      
        actions={<LogoutButton />}
        >
        <NavButton 
          id="overview" 
          label="Visão Geral" 
          icon={LayoutDashboard} 
          active={activeView} 
          onClick={setActiveView} 
        />
        <NavButton 
          id="components" 
          label="Componentes" 
          icon={BarChart3} 
          active={activeView} 
          onClick={setActiveView} 
        />
        <NavButton 
          id="groups" 
          label="Análises por Grupo" 
          icon={Users} 
          active={activeView} 
          onClick={setActiveView} 
        />
        <NavButton 
          id="sentiment" 
          label="Sentimento X Ação" 
          icon={MessageSquare} 
          active={activeView} 
          onClick={setActiveView} 
        />
        <NavButton 
          id="student" 
          label="Visão 360°" 
          icon={UserIcon} 
          active={activeView} 
          onClick={setActiveView} 
        />
      </Navbar>  
        
      

      {/* ÁREA DO CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'overview' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[#3a3d4d]">Health Check do Projeto</h2>
              <p className="text-gray-500">Status atual baseado em {dados.length} cursistas ativos.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
               <IEGGauge userEmail={session?.user?.email ?? ''} />
               <RiskStatus userEmail={session?.user?.email ?? ''} />            
              </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <EngagementFunnel userEmail={session?.user?.email ?? ''} />
               <EngagementTimeSeries userEmail={session?.user?.email ?? ''} />
            </div>
          </div>
        )}

        {activeView === 'components' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[#3a3d4d]">Análise de Componentes</h2>
              <p className="text-gray-500">Entenda o porquê do engajamento</p>
              <ActivitiesDelivered userEmail={session?.user?.email ?? ''} />
              <ActivitiesNotes userEmail={session?.user?.email ?? ''} />
              <Frequency userEmail={session?.user?.email ?? ''} />
              <Ludicos userEmail={session?.user?.email ?? ''} />

            </header>
          </div>
        )}

        {activeView  === 'groups' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[#3a3d4d]">Análise de Grupos</h2>
              <p className="text-gray-500">Comparativo entre escolas, turmas e cargos</p>
            </header>
          </div>
        )}

        {activeView  === 'sentiment' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[#3a3d4d]">Análise de Sentimento x Ação</h2>
              <p className="text-gray-500">O que eles falam vs. o que eles fazem</p>
            </header>
          </div>
        )}

        {activeView  === 'student' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[#3a3d4d]">Visão 360° do Cursista</h2>
              <p className="text-gray-500">Ficha individual completa</p>
            </header>
          </div>
        )}
      </main>
    </div>
  )
}

