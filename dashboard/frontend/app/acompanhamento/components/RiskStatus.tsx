import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
export function RiskStatus() {
  const data = [
    {
      name: 'Em Risco',
      value: 25,
      color: '#ef4444',
    },
    {
      name: 'Em Dia',
      value: 55,
      color: '#fbbf24',
    },
    {
      name: 'Destaque',
      value: 20,
      color: '#10b981',
    },
  ]
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
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            Em Risco
          </span>
          <span className="font-semibold">25 cursistas</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
            Em Dia
          </span>
          <span className="font-semibold">55 cursistas</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            Destaque
          </span>
          <span className="font-semibold">20 cursistas</span>
        </div>
      </div>
    </div>
  )
}
