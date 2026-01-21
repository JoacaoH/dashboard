'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export function IEGGauge({ userEmail }: { userEmail: string }) {
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const COLORS = ['#95be43', '#3a3d4d10']

  useEffect(() => {
    if (!userEmail) return;
    async function loadIEG() {
      try {
        const res = await axios.get('http://localhost:8000/api/stats/ieg', {
          headers: { Authorization: `Bearer ${userEmail}` }
        })
        const valor = Math.min(Math.max(Number(res.data.iegScore), 0), 100)
        setScore(valor)
      } catch (error) {
        setScore(0)
      } finally {
        setLoading(false)
      }
    }
    loadIEG()
  }, [userEmail])

  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 h-[320px] flex items-center justify-center border border-gray-100">
      <div className="w-8 h-8 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const data = [{ value: score }, { value: 100 - score }]

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 h-full min-h-[320px] relative">
      <h3 className="text-lg font-bold text-[#3a3d4d] mb-4 text-center">IEG - Engajamento Geral</h3>
      
      <div className="relative h-[180px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%" 
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={95}
              dataKey="value"
              stroke="none"
              animationDuration={1200}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* NÚMERO CENTRAL (Reduzido e Posicionado) */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <div className="text-4xl font-black text-[#3a3d4d] leading-none mb-1">
            {score}
          </div>
          <div className="text-[10px] font-bold text-[#95be43] uppercase tracking-widest mb-2">
            {score >= 70 ? 'SAUDÁVEL' : 'ATENÇÃO'}
          </div>
        </div>
      </div>
      
    </div>
  )
}