import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
export function EngagementTimeSeries({ userEmail }: { userEmail: string }) {
  const [timeSeries, setTimeSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userEmail) return;
    async function loadTimeSeries() {
      try {
        const res = await axios.get('http://localhost:8000/api/stats/engagement_time_series', {
          headers: { Authorization: `Bearer ${userEmail}` }
        })
        setTimeSeries(res.data)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    loadTimeSeries()
  }, [userEmail])

  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 h-[320px] flex items-center justify-center border border-gray-100">
      <div className="w-8 h-8 border-4 border-[#95be43] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Evolução do Engajamento ao Longo do Tempo
      </h3>
      <p className="text-sm text-gray-600 mb-4">IEG médio por semana</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timeSeries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data_snapshot" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="IEG_medio"
            stroke="#3a3d4d"
            strokeWidth={3}
            name="IEG Médio"
            dot={{
              fill: '#95be43',
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
