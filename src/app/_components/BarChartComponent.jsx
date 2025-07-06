'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { convertToMonthlyData } from '../utils/convertDataToMonths'

export default function BarChartComponent({ data }) {

    const fData = convertToMonthlyData(data);
  
    return (
        <div className="w-full h-[350px] lg:h-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-white">Monthly Expenses</h2>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={fData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} labelStyle={{ color: 'white' }} />
                    <Bar dataKey="expenses" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
