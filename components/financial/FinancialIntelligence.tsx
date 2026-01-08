
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const forecastData = [
    { name: 'Nov', valor: 18500, type: 'realizado' },
    { name: 'Dez', valor: 19200, type: 'previsão' },
    { name: 'Jan', valor: 21000, type: 'previsão' },
    { name: 'Fev', valor: 20500, type: 'previsão' },
    { name: 'Mar', valor: 22800, type: 'previsão' },
    { name: 'Abr', valor: 24000, type: 'previsão' },
];

const plansData = [
    { name: 'Mensal Pro', value: 45000, percentage: 45 },
    { name: 'Trimestral', value: 25000, percentage: 25 },
    { name: 'Semestral', value: 20000, percentage: 20 },
    { name: 'Avulso', value: 10000, percentage: 10 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const FinancialIntelligence: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Top Stats - The "Wow" Factor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <span className="material-symbols-outlined text-6xl">show_chart</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Previsão 6 Meses</p>
                        <h3 className="text-3xl font-black">R$ 127.5k</h3>
                        <p className="text-xs font-medium mt-2 flex items-center gap-1 bg-white/20 w-fit px-2 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            +15% vs semestre anterior
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-[#e8eceb] dark:border-gray-800 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-text-sub uppercase tracking-widest mb-1">Ticket Médio</p>
                        <h3 className="text-3xl font-black text-text-main dark:text-white">R$ 285,00</h3>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-xs font-bold text-text-sub mb-1">
                            <span>Meta: R$ 300</span>
                            <span>95%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-text-sub uppercase tracking-widest mb-1">Risco de Inadimplência</p>
                            <h3 className="text-3xl font-black text-red-500">3 Alunos</h3>
                        </div>
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {['Lucas Pereira', 'Fernanda Lima', 'Roberto Alves'].map((name, i) => (
                            <div key={i} className="flex justify-between items-center text-xs p-2 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                                <span className="font-bold text-red-700 dark:text-red-300">{name}</span>
                                <span className="text-red-500">2 fat. em aberto</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Forecast Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-6 shadow-sm">
                    <h3 className="font-black text-lg text-text-main dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">ssid_chart</span>
                        Projeção de Faturamento
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={forecastData} barSize={40}>
                                <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(val) => `R$${val / 1000}k`} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                />
                                <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                                    {forecastData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.type === 'realizado' ? '#10B981' : '#3B82F6'} opacity={entry.type === 'previsão' ? 0.7 : 1} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Plan Distribution */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-6 shadow-sm">
                    <h3 className="font-black text-lg text-text-main dark:text-white mb-6">Receita por Plano</h3>
                    <div className="h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={plansData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {plansData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs font-bold text-text-sub uppercase">Total</span>
                            <span className="text-xl font-black text-text-main dark:text-white">100%</span>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        {plansData.map((plan, index) => (
                            <div key={plan.name} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                    <span className="font-bold text-text-sub">{plan.name}</span>
                                </div>
                                <span className="font-black text-text-main dark:text-white">{plan.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Insights Alert Section */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-start gap-4 relatie z-10">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl">
                        <span className="material-symbols-outlined text-2xl">lightbulb</span>
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-yellow-800 dark:text-yellow-100 mb-1">Insight do FitManager</h4>
                        <p className="text-sm text-yellow-800/80 dark:text-yellow-200 font-medium leading-relaxed max-w-2xl">
                            Seu plano <strong>"Trimestral"</strong> tem a maior taxa de renovação (80%), mas representa apenas 25% da receita.
                            Considere criar uma campanha de migração do "Mensal" para o "Trimestral" oferecendo 5% de desconto. Isso pode aumentar sua previsão de caixa em <strong>R$ 15.000</strong> no próximo trimestre.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-lg text-xs uppercase tracking-wide transition-colors">
                            Criar Campanha
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialIntelligence;
