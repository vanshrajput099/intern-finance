'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { convertToCategoryData } from '../utils/convertDataToCategories'

const COLORS = [
    '#3b82f6', '#10b981', '#f97316', '#8b5cf6',
    '#ef4444', '#14b8a6', '#6366f1', '#eab308',
    '#ec4899', '#0ea5e9', '#facc15', '#16a34a',
];

export default function PieChartComponent({ data }) {

    const fData = convertToCategoryData(data);

    return (
        <div className="w-full h-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-white">Category Breakdown</h2>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={fData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {fData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="transition-all duration-300" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: 'white', border: 'none' }}
                        labelStyle={{ color: 'white' }}
                        formatter={(value) => [`₹${value}`, 'Spent']}
                    />
                    <Legend className='' />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
