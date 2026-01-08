
import React from 'react';
import { AppView } from '../../types';

interface MarketingDashboardProps {
    onNavigate: (view: AppView) => void;
    onNewCampaign: () => void;
}

const MarketingDashboard: React.FC<MarketingDashboardProps> = ({ onNavigate, onNewCampaign }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-text-main dark:text-white">Smart Marketing</h2>
                    <p className="text-text-sub text-sm font-medium mt-1">Transforme dados em campanhas de alta conversão.</p>
                </div>
                <button
                    onClick={onNewCampaign}
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">add_circle</span>
                    Nova Campanha
                </button>
            </div>

            {/* Active Campaigns - Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ROI Card */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                            <span className="material-symbols-outlined">monetization_on</span>
                        </div>
                        <h3 className="font-black text-text-main dark:text-white">ROI Estimado</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-text-main dark:text-white">12x</span>
                        <span className="text-sm font-bold text-green-500 mb-1 flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 15%
                        </span>
                    </div>
                    <p className="text-xs text-text-sub mt-2 font-medium">Retorno sobre campanhas ativas</p>
                </div>

                {/* Active Campaigns Count */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                            <span className="material-symbols-outlined">campaign</span>
                        </div>
                        <h3 className="font-black text-text-main dark:text-white">Campanhas Ativas</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-text-main dark:text-white">3</span>
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mb-1">Em andamento</span>
                    </div>
                    <p className="text-xs text-text-sub mt-2 font-medium">Impactando 142 alunos</p>
                </div>

                {/* Pending Opportunity */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-6xl">auto_awesome</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 opacity-80">
                            <span className="material-symbols-outlined text-sm">lightbulb</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Oportunidade</span>
                        </div>
                        <h3 className="text-xl font-black mb-1">Recuperação de Inativos</h3>
                        <p className="text-sm font-medium opacity-90 mb-4">5 alunos pararam de vir este mês. Estime recuperar R$ 1.500/mês.</p>
                        <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-lg text-sm hover:bg-opacity-90 transition-all">
                            Lançar Campanha Automática
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Campaigns List */}
            <div>
                <h3 className="font-black text-lg text-text-main dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-sub">history</span>
                    Histórico Recente
                </h3>
                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="p-4 text-xs font-black text-text-sub uppercase tracking-widest">Campanha</th>
                                <th className="p-4 text-xs font-black text-text-sub uppercase tracking-widest">Status</th>
                                <th className="p-4 text-xs font-black text-text-sub uppercase tracking-widest">Alcance</th>
                                <th className="p-4 text-xs font-black text-text-sub uppercase tracking-widest">Conversão</th>
                                <th className="p-4 text-xs font-black text-text-sub uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[
                                { name: 'Black Friday Pilates', status: 'Ativo', reach: 450, conv: '12%', color: 'green' },
                                { name: 'Renovação Antecipada', status: 'Rascunho', reach: '-', conv: '-', color: 'gray' },
                                { name: 'Indique um Amigo', status: 'Pausado', reach: 120, conv: '5%', color: 'yellow' },
                            ].map((c, i) => (
                                <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold text-sm text-text-main dark:text-white">{c.name}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide bg-${c.color}-100 text-${c.color}-600`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-text-sub">{c.reach}</td>
                                    <td className="p-4 text-sm font-bold text-text-main dark:text-white">{c.conv}</td>
                                    <td className="p-4">
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded text-text-sub hover:text-text-main transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MarketingDashboard;
