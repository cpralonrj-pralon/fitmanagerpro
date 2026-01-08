
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import FinancialSummaryCards from './financial/FinancialSummaryCards';
import FinancialCharts from './financial/FinancialCharts';
import TransactionList from './financial/TransactionList';
import NewTransactionModal from './financial/NewTransactionModal';
import FinancialIntelligence from './financial/FinancialIntelligence';

interface FinancialProps {
    onOpenCampaign?: () => void;
}

const Financial: React.FC<FinancialProps> = ({ onOpenCampaign }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'intelligence'>('overview');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Data for UI demonstration - Replace with Supabase queries after schema update
    const summaryStats = {
        income: 15450.00,
        expense: 4320.50,
        pending: 1200.00,
        forecast: 18000.00,
        balance: 11129.50
    };

    const transactions = [
        { id: '1', description: 'Mensalidade - Plano Gold', studentName: 'Ana Silva', amount: 250.00, type: 'Receita' as const, category: 'Mensalidade', date: '2024-03-10', status: 'Pago' as const, paymentMethod: 'PIX' },
        { id: '2', description: 'Aluguel Studio', amount: 2000.00, type: 'Despesa' as const, category: 'Aluguel', date: '2024-03-05', status: 'Pago' as const, paymentMethod: 'Boleto' },
        { id: '3', description: 'Mensalidade - Plano Silver', studentName: 'Carlos Souza', amount: 180.00, type: 'Receita' as const, category: 'Mensalidade', date: '2024-03-10', status: 'Pendente' as const, paymentMethod: 'Crédito' },
        { id: '4', description: 'Manutenção Equipamentos', amount: 450.00, type: 'Despesa' as const, category: 'Manutenção', date: '2024-03-01', status: 'Pago' as const, paymentMethod: 'Débito' },
        { id: '5', description: 'Venda de Garrafinha', studentName: 'Julia Lima', amount: 35.00, type: 'Receita' as const, category: 'Venda', date: '2024-03-09', status: 'Pago' as const, paymentMethod: 'Dinheiro' },
    ];

    return (
        <div className="space-y-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-text-main dark:text-white">Gestão Financeira</h2>
                    <p className="text-text-sub text-sm font-medium mt-1">Acompanhe o fluxo de caixa, inteligência e saúde do negócio</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white dark:bg-surface-dark p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-sub hover:bg-gray-50 dark:hover:bg-white/5'}`}
                        >
                            Visão Geral
                        </button>
                        <button
                            onClick={() => setActiveTab('transactions')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'transactions' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-sub hover:bg-gray-50 dark:hover:bg-white/5'}`}
                        >
                            Transações
                        </button>
                        <button
                            onClick={() => setActiveTab('intelligence')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'intelligence' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-text-sub hover:bg-gray-50 dark:hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                            Inteligência
                        </button>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="h-10 px-4 bg-primary text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined">add</span>
                        <span className="hidden sm:inline">Nova Transação</span>
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                    <FinancialSummaryCards stats={summaryStats} />
                    <FinancialCharts />
                    <div className="h-[400px]">
                        <TransactionList transactions={transactions} />
                    </div>
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="h-[600px] animate-fade-in">
                    <TransactionList transactions={transactions} />
                </div>
            )}

            {activeTab === 'intelligence' && (
                <div className="animate-fade-in">
                    <FinancialIntelligence onOpenCampaign={onOpenCampaign} />
                </div>
            )}

            <NewTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    // Logic to refresh data
                }}
            />
        </div>
    );
};

export default Financial;
