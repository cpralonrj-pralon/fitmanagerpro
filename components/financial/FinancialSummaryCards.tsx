
import React from 'react';

interface FinancialSummaryCardsProps {
    stats: {
        income: number;
        expense: number;
        pending: number;
        forecast: number;
        balance: number;
    };
}

const FinancialSummaryCards: React.FC<FinancialSummaryCardsProps> = ({ stats }) => {
    const cards = [
        { label: 'Faturamento Realizado', value: stats.income, icon: 'trending_up', color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Despesas', value: stats.expense, icon: 'trending_down', color: 'text-red-500', bg: 'bg-red-500/10' },
        { label: 'Em Aberto', value: stats.pending, icon: 'schedule', color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { label: 'Previsão (Mês)', value: stats.forecast, icon: 'analytics', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${card.bg} ${card.color}`}>
                        <span className="material-symbols-outlined">{card.icon}</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-black text-text-sub uppercase tracking-widest mb-1">{card.label}</p>
                        <h3 className={`text-2xl font-black ${card.value < 0 ? 'text-red-500' : 'text-text-main dark:text-white'}`}>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.value)}
                        </h3>
                        {/* Micro-interaction / sparkline placeholder */}
                        <div className="h-1 w-12 bg-gray-100 dark:bg-gray-700 mt-4 rounded-full overflow-hidden">
                            <div className={`h-full ${card.color.replace('text-', 'bg-')} w-2/3 rounded-full opacity-50`}></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FinancialSummaryCards;
