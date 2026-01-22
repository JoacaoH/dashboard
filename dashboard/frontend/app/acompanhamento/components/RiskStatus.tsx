'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
export function RiskStatus({ userEmail }: { userEmail: string }) {
  const [dataRiskStatus, setDataRiskStatus] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userEmail) return;
    async function loadRiskStatus() {
      try {
        const res = await axios.get('http://localhost:8000/api/stats/risk_status', {
          headers: { Authorization: `Bearer ${userEmail}` }
        })
        setDataRiskStatus(res.data)
      }catch (error) {
        setDataRiskStatus([])
      } finally {
        setLoading(false)
      }
    }
    loadRiskStatus()
  }, [userEmail])

  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 h-[320px] flex items-center justify-center border border-gray-100">
      <div className="w-8 h-8 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Status de Risco dos Cursistas
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Distribuição por categoria de engajamento
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataRiskStatus}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"   // Deve ser idêntico ao nome da coluna no SQL (value)
            nameKey="status"  // Deve ser idêntico ao nome da coluna no SQL (status)
          >
            {dataRiskStatus.map((entry: any, index: number) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || '#eee'} // Usa a cor do SQL ou um cinza de fallback
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
      {dataRiskStatus.map((item: any, index: number) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <span className="flex items-center text-black">
            <span 
              className="w-3 h-3 rounded-full mr-2 " 
              style={{ backgroundColor: item.color }}
            ></span>
            {item.status}
          </span>
          <span className="font-semibold text-black">{item.value} cursistas</span>
        </div>
      ))}
    </div>
    </div>
  )
}
