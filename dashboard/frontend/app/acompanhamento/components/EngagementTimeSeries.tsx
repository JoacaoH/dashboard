import React from 'react'
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
export function EngagementTimeSeries() {
  const data = [
    {
      week: 'Sem 1',
      ieg: 82,
    },
    {
      week: 'Sem 2',
      ieg: 78,
    },
    {
      week: 'Sem 3',
      ieg: 75,
    },
    {
      week: 'Sem 4',
      ieg: 71,
    },
    {
      week: 'Sem 5',
      ieg: 68,
    },
    {
      week: 'Sem 6',
      ieg: 72,
    },
    {
      week: 'Sem 7',
      ieg: 75,
    },
    {
      week: 'Sem 8',
      ieg: 77,
    },
  ]
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Evolução do Engajamento ao Longo do Tempo
      </h3>
      <p className="text-sm text-gray-600 mb-4">IEG médio por semana</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ieg"
            stroke="#3b82f6"
            strokeWidth={3}
            name="IEG Médio"
            dot={{
              fill: '#3b82f6',
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
