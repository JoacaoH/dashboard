'use client'

import React from 'react'
import { use, useEffect, useState } from 'react'
import axios from 'axios'


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts'


export function ActivitiesNotes({ userEmail }: { userEmail: string }) {
  const [deliveryData, setDeliveryData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!userEmail) return;
    async function loadDeliveryData() {
      try {
        const res = await axios.get('http://localhost:8000/api/stats/activities_notes', {
          headers: { Authorization: `Bearer ${userEmail}` }
        })
        setDeliveryData(res.data)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    loadDeliveryData()
  }, [userEmail])

  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 h-[320px] flex items-center justify-center border border-gray-100">
      <div className="w-8 h-8 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
  const chartWidth = deliveryData.length * 45

  const COLORS = ['#3a3d4d', '#4a4e61', '#95be43', '#b4d66d', '#d6e8af']

  const valorMaximo = deliveryData.length > 0 
  ? Math.max(...deliveryData.map(item => item.entregas_percentual))
  : 100; 


  return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades (Classroom) - Nota</h3>
        <p className="text-sm text-gray-600 mb-4">Nota média de entregas por atividade</p>
        <div style={{ height: "100%", minWidth: "100%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="nome_atividade_entregue" 
                interval={0}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, Math.ceil(valorMaximo)]} // Vai exatamente até a maior nota
                width={40} // Mantenha o width fixo para os pixels da legenda
                tickFormatter={(val) => `${val}`} // Remove o % se for uma nota de 0 a 5
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '12px', fill: '#9ca3af' }}
                />
              <Tooltip
              formatter={(value: number) => [`${value}`, 'Nota média']}
              />
              <Bar dataKey="media_nota_entregue" radius={[8, 8, 0, 0]}>
                  {deliveryData.map((entry, index) => (

                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      )

}
