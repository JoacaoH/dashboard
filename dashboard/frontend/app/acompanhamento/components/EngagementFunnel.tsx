import React, { use, useEffect, useState } from 'react'
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
export function EngagementFunnel({ userEmail }: { userEmail: string }) {
  const [dataFunnel, setDataFunnel] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userEmail) return;
    async function loadFunnelData() {
      try {
        const res = await axios.get('http://localhost:8000/api/stats/engagement_funnel', {
          headers: { Authorization: `Bearer ${userEmail}` }
        })
        setDataFunnel(res.data)
      }catch (error) {
        setDataFunnel([])
      } finally {
        setLoading(false)
      }
    }
      loadFunnelData()
    }, [userEmail])

    if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 h-[320px] flex items-center justify-center border border-gray-100">
      <div className="w-8 h-8 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const chartHeight = dataFunnel.length * 45
  const COLORS = ['#3a3d4d', '#4a4e61', '#95be43', '#b4d66d', '#d6e8af']

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Funil de Engajamento
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Identifica onde ocorre o maior abandono
      </p>
      <div style={{ height: `${chartHeight}px`, minHeight: '400px' }}>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataFunnel} layout="vertical" margin={{ left: 50, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#3a3d4d"/>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="trigger" 
            type="category" 
            width={180}
            axisLine={false}
            tickLine={false}
            style={{ fontSize: '12px', fontWeight: 'bold', fill: '#3a3d4d' }} 
            interval={0}
            />
          <Tooltip 
            cursor={{ fill: '#3a3d4d05' }}
            contentStyle={{ 
              backgroundColor: '#3a3d4d', 
              borderRadius: '12px', 
              border: 'none',
              color: '#fff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#95be43', fontWeight: 'bold', marginBottom: '4px' }}
            formatter={(value: any) => [`${value ?? 0}%`, 'Quantidade']}
          />
          <Bar dataKey="porcentagem" barSize={35} radius={[0, 5, 5, 0]}>
            <LabelList 
              dataKey="porcentagem" 
              position="right" 
              formatter={(value: any) => `${value}%`}
              style={{ fill: '#3a3d4d', fontSize: '12px', fontWeight: 'bold' }}
              offset={10}
            />
            {dataFunnel.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}
