import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
export function EngagementFunnel() {
  const data = [
    {
      stage: 'Inscritos',
      value: 100,
      percentage: 100,
    },
    {
      stage: 'Ativos',
      value: 85,
      percentage: 85,
    },
    {
      stage: 'Presentes 1º Encontro',
      value: 72,
      percentage: 72,
    },
    {
      stage: 'Entregaram 1ª Ativ.',
      value: 58,
      percentage: 58,
    },
    {
      stage: 'Presença > 75%',
      value: 45,
      percentage: 45,
    },
    {
      stage: 'Aprovados',
      value: 38,
      percentage: 38,
    },
  ]
  const COLORS = [
    '#3b82f6',
    '#60a5fa',
    '#93c5fd',
    '#bfdbfe',
    '#dbeafe',
    '#eff6ff',
  ]
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Funil de Engajamento
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Identifica onde ocorre o maior abandono
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="stage" type="category" width={150} />
          <Tooltip formatter={(value: number) => [`${value}%`, 'Taxa']} />
          <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
