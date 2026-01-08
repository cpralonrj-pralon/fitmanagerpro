
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
    { name: 'Jan', receita: 4000, despesa: 2400 },
    { name: 'Fev', receita: 3000, despesa: 1398 },
    { name: 'Mar', receita: 2000, despesa: 9800 },
    { name: 'Abr', receita: 2780, despesa: 3908 },
    { name: 'Mai', receita: 1890, despesa: 4800 },
    { name: 'Jun', receita: 2390, despesa: 3800 },
    { name: 'Jul', receita: 3490, despesa: 4300 },
];

const FinancialCharts: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm flex flex-col">
                <h3 className="font-black text-lg text-text-main dark:text-white mb-6">Fluxo de Caixa</h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(val) => `R$${val / 1000}k`} />
                            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                            />
                            <Area type="monotone" dataKey="receita" stroke="#10B981" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={3} name="Receita" />
                            <Area type="monotone" dataKey="despesa" stroke="#EF4444" fillOpacity={1} fill="url(#colorDespesa)" strokeWidth={3} name="Despesa" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm flex flex-col">
                <h3 className="font-black text-lg text-text-main dark:text-white mb-6">Comparativo Semestral</h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                            <Legend />
                            <Bar dataKey="receita" fill="#10B981" radius={[4, 4, 0, 0]} name="Receita" />
                            <Bar dataKey="despesa" fill="#EF4444" radius={[4, 4, 0, 0]} name="Despesa" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FinancialCharts;
