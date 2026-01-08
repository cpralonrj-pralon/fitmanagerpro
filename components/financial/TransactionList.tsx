
import React, { useState } from 'react';

interface Transaction {
    id: string;
    description: string;
    studentName?: string;
    amount: number;
    type: 'Receita' | 'Despesa';
    category: string;
    date: string;
    status: 'Pago' | 'Pendente' | 'Atrasado';
    paymentMethod: string;
}

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const [filter, setFilter] = useState('Todos');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pago': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Pendente': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Atrasado': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeIcon = (type: string) => {
        return type === 'Receita' ? 'arrow_upward' : 'arrow_downward';
    };

    const getTypeColor = (type: string) => {
        return type === 'Receita' ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-red-500 bg-red-50 dark:bg-red-900/20';
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm flex flex-col h-full">
            <div className="p-6 border-b border-[#e8eceb] dark:border-gray-800 flex justify-between items-center">
                <h3 className="font-black text-lg text-text-main dark:text-white">Transações Recentes</h3>
                <div className="flex gap-2">
                    {['Todos', 'Receita', 'Despesa'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-gray-800 text-text-sub hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-sub">Tipo</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-sub">Descrição/Aluno</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-sub">Categoria</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-sub">Data</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-sub">Status</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-text-sub">Valor</th>
                            <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest text-text-sub">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className={`size-8 rounded-full flex items-center justify-center ${getTypeColor(tx.type)}`}>
                                        <span className="material-symbols-outlined text-sm font-bold">{getTypeIcon(tx.type)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-sm text-text-main dark:text-white">{tx.description}</p>
                                    {tx.studentName && <p className="text-xs text-text-sub">{tx.studentName}</p>}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-text-sub">{tx.category}</td>
                                <td className="px-6 py-4 text-xs font-medium text-text-sub">
                                    {new Date(tx.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getStatusColor(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-bold text-sm ${tx.type === 'Despesa' ? 'text-red-500' : 'text-green-500'}`}>
                                    {tx.type === 'Despesa' ? '-' : '+'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-text-sub hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-[#e8eceb] dark:border-gray-800 flex justify-center">
                <button className="text-xs font-bold text-primary hover:underline">Ver todas as transações</button>
            </div>
        </div>
    );
};

export default TransactionList;
