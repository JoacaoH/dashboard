'use client'

import React from 'react'
import { use, useEffect, useState } from 'react'
import axios from 'axios'

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts'
export function Ludicos({ userEmail }: { userEmail: string }) {
    const [ludicosData, setLudicosData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
    if (!userEmail) return;
    async function loadLudicosData() {
        try {
        const res = await axios.get('http://localhost:8000/api/stats/ludicos', {
            headers: { Authorization: `Bearer ${userEmail}` }
        })
        setLudicosData(res.data)
        } catch (error) {
        console.error("Erro ao buscar dados:", error)
        } finally {
        setLoading(false)
        }
    }
    loadLudicosData()
    }, [userEmail])

    if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 h-[320px] flex items-center justify-center border border-gray-100">
        <div className="w-8 h-8 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
    )
  const data = [
    {
      progression: 85,
      performance: 90,
      status: 'high-high',
    },
    {
      progression: 80,
      performance: 85,
      status: 'high-high',
    },
    {
      progression: 75,
      performance: 45,
      status: 'high-low',
    },
    {
      progression: 70,
      performance: 50,
      status: 'high-low',
    },
    {
      progression: 45,
      performance: 85,
      status: 'low-high',
    },
    {
      progression: 40,
      performance: 80,
      status: 'low-high',
    },
    {
      progression: 35,
      performance: 40,
      status: 'low-low',
    },
    {
      progression: 30,
      performance: 35,
      status: 'low-low',
    },
    {
      progression: 90,
      performance: 95,
      status: 'high-high',
    },
    {
      progression: 25,
      performance: 30,
      status: 'low-low',
    },
  ]
  const getColor = (status: string) => {
    switch (status) {
      case 'high-high':
        return '#10b981'
      case 'high-low':
        return '#fbbf24'
      case 'low-high':
        return '#3b82f6'
      case 'low-low':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Plataforma Lúdicos
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Progressão vs Performance - 4 Quadrantes
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="progression"
            name="Progressão"
            domain={[0, 100]}
          />
          <YAxis
            type="number"
            dataKey="performance"
            name="Performance"
            domain={[0, 100]}
          />
          <Tooltip
            cursor={{
              strokeDasharray: '3 3',
            }}
          />
          <ReferenceLine x={50} stroke="#94a3b8" strokeDasharray="3 3" />
          <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="3 3" />
          <Scatter data={ludicosData} fill="#8884d8">
            {ludicosData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          <span>Engajados e performando</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
          <span>Avançando com dificuldade</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span>Performam mas não avançam</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
          <span>Em risco</span>
        </div>
      </div>
    </div>
  )
}
