
import React, { useState, useEffect } from 'react';
import { StatusBadge, Button } from './ui';
import { supabase } from '../supabaseClient';

const Financial: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        income: 0,
        expense: 0,
        pending: 0
    });

    useEffect(() => {
        fetchFinancialData();
    }, []);

    const fetchFinancialData = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('payments')
                .select(`
          *,
          student:students(name)
        `)
                .order('due_date', { ascending: false });

            if (error) throw error;
            setTransactions(data || []);

            const income = data?.filter(t => t.status === 'Pago' && t.value > 0).reduce((acc, t) => acc + Number(t.value), 0) || 0;
            const pending = data?.filter(t => t.status === 'Pendente').reduce((acc, t) => acc + Number(t.value), 0) || 0;
            const expense = data?.filter(t => t.value < 0).reduce((acc, t) => acc + Math.abs(Number(t.value)), 0) || 0;

            setStats({ income, expense, pending });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async () => {
        const val = prompt('Valor (positivo para entrada, negativo para saída):');
        if (!val) return;

        try {
            const { error } = await supabase.from('payments').insert([
                { value: Number(val), status: 'Pago', due_date: new Date().toISOString().split('T')[0], type: 'Avulso' }
            ]);
            if (error) throw error;
            fetchFinancialData();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Entradas (Mês)', value: stats.income, icon: 'trending_up', color: 'text-green-500' },
                    { label: 'Saídas (Mês)', value: stats.expense, icon: 'trending_down', color: 'text-red-500' },
                    { label: 'Pendente', value: stats.pending, icon: 'schedule', color: 'text-blue-500' },
                    { label: 'Saldo Atual', value: stats.income - stats.expense, icon: 'account_balance_wallet', color: 'text-primary-dark' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`material-symbols-outlined ${stat.color} text-2xl`}>{stat.icon}</span>
                            <span className="text-xs font-bold text-text-sub uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-black">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stat.value)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    {['Todos', 'Entradas', 'Saídas', 'Pendentes'].map((f) => (
                        <button
                            key={f}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${f === 'Todos' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'bg-white dark:bg-white/5 border border-[#e8eceb] dark:border-gray-800 text-text-sub hover:border-primary/50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <Button icon="add" onClick={handleAddTransaction}>Nova Transação</Button>
            </div>

            {/* Transactions Table */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-white/5">
                                <tr>
                                    <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Aluno</th>
                                    <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Valor</th>
                                    <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Status</th>
                                    <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Vencimento</th>
                                    <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase hidden lg:table-cell">Método</th>
                                    <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-20 text-center text-text-sub">
                                            Nenhuma transação encontrada.
                                        </td>
                                    </tr>
                                ) : transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="py-5 px-6">
                                            <p className="text-sm font-bold text-text-main dark:text-white leading-none mb-1">{t.student?.name || 'Venda Avulsa'}</p>
                                            <p className="text-xs text-text-sub">{t.type || 'Geral'}</p>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`text-sm font-black ${t.value > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <StatusBadge status={t.status} />
                                        </td>
                                        <td className="py-5 px-6">
                                            <p className="text-sm font-medium">{new Date(t.due_date).toLocaleDateString('pt-BR')}</p>
                                        </td>
                                        <td className="py-5 px-6 hidden lg:table-cell">
                                            <span className="text-xs font-bold text-text-sub uppercase tracking-widest">{t.method || '-'}</span>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <button className="p-2 text-text-sub hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Financial;
