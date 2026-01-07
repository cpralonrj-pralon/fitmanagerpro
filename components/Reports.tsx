
import React, { useState } from 'react';
import { Button } from './ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const Reports: React.FC = () => {
    const [activeReport, setActiveReport] = useState('Alunos');

    const studentData = [
        { month: 'Jan', ativos: 280, novos: 25, cancelados: 8 },
        { month: 'Fev', ativos: 295, novos: 22, cancelados: 7 },
        { month: 'Mar', ativos: 310, novos: 28, cancelados: 13 },
        { month: 'Abr', ativos: 318, novos: 18, cancelados: 10 },
        { month: 'Mai', ativos: 324, novos: 20, cancelados: 14 },
        { month: 'Jun', ativos: 330, novos: 24, cancelados: 18 },
    ];

    const planDistribution = [
        { name: 'Pilates 2x', value: 120, color: '#13eca4' },
        { name: 'Pilates 3x', value: 85, color: '#10b981' },
        { name: 'Musculação', value: 60, color: '#3b82f6' },
        { name: 'Funcional', value: 45, color: '#8b5cf6' },
        { name: 'Yoga', value: 30, color: '#f59e0b' },
    ];

    const revenueData = [
        { month: 'Jan', receita: 38000, despesa: 22000 },
        { month: 'Fev', receita: 40500, despesa: 23500 },
        { month: 'Mar', receita: 39200, despesa: 24000 },
        { month: 'Abr', receita: 41800, despesa: 23000 },
        { month: 'Mai', receita: 43500, despesa: 25000 },
        { month: 'Jun', receita: 45200, despesa: 24500 },
    ];

    const reports = [
        { name: 'Alunos', icon: 'groups' },
        { name: 'Financeiro', icon: 'payments' },
        { name: 'Aulas', icon: 'calendar_month' },
        { name: 'Retenção', icon: 'loyalty' },
    ];

    return (
        <div className="space-y-6 pb-10">
            {/* Report Type Selector */}
            <div className="flex flex-wrap gap-3">
                {reports.map((report) => (
                    <button
                        key={report.name}
                        onClick={() => setActiveReport(report.name)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeReport === report.name
                                ? 'bg-primary text-background-dark shadow-lg shadow-primary/20'
                                : 'bg-white dark:bg-surface-dark border border-[#e8eceb] dark:border-gray-800 text-text-sub hover:text-text-main'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-lg ${activeReport === report.name ? 'icon-fill' : ''}`}>
                            {report.icon}
                        </span>
                        {report.name}
                    </button>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <Button variant="outline" icon="download">Exportar PDF</Button>
                <Button variant="outline" icon="table_chart">Exportar Excel</Button>
                <Button variant="outline" icon="schedule">Agendar Envio</Button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Line Chart - Student Evolution */}
                <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                    <h3 className="text-lg font-black tracking-tight mb-2">Evolução de Alunos</h3>
                    <p className="text-text-sub text-sm mb-6">Últimos 6 meses</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={studentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#61897c' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#61897c' }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="ativos" stroke="#13eca4" strokeWidth={3} dot={{ fill: '#13eca4', strokeWidth: 2 }} name="Ativos" />
                                <Line type="monotone" dataKey="novos" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Novos" />
                                <Line type="monotone" dataKey="cancelados" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="Cancelados" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart - Plan Distribution */}
                <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                    <h3 className="text-lg font-black tracking-tight mb-2">Distribuição por Plano</h3>
                    <p className="text-text-sub text-sm mb-6">Total de alunos ativos</p>
                    <div className="h-72 flex items-center">
                        <ResponsiveContainer width="60%" height="100%">
                            <PieChart>
                                <Pie
                                    data={planDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {planDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-3">
                            {planDistribution.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm font-medium flex-1">{item.name}</span>
                                    <span className="text-sm font-black">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bar Chart - Revenue */}
                <div className="xl:col-span-2 bg-white dark:bg-surface-dark p-8 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                    <h3 className="text-lg font-black tracking-tight mb-2">Receita vs Despesas</h3>
                    <p className="text-text-sub text-sm mb-6">Comparativo mensal</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#61897c' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#61897c' }} tickFormatter={(value) => `R$ ${value / 1000}k`} />
                                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Bar dataKey="receita" fill="#13eca4" radius={[4, 4, 0, 0]} name="Receita" />
                                <Bar dataKey="despesa" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Despesa" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
