
import React, { useState } from 'react';
import { Button } from '../ui';

interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('Receita');
    const [activeTab, setActiveTab] = useState<'receita' | 'despesa'>('receita');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onSuccess();
            onClose();
            alert('Transação registrada com sucesso!');
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black tracking-tight">Nova Transação</h3>
                        <p className="text-text-sub text-xs font-bold uppercase tracking-widest mt-1">Registre entradas ou saídas</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-text-sub hover:text-text-main hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="px-8 pt-6">
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('receita')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'receita' ? 'bg-white dark:bg-surface-dark shadow-sm text-green-500' : 'text-text-sub'}`}
                        >
                            Receita
                        </button>
                        <button
                            onClick={() => setActiveTab('despesa')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'despesa' ? 'bg-white dark:bg-surface-dark shadow-sm text-red-500' : 'text-text-sub'}`}
                        >
                            Despesa
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-sub">Descrição</label>
                        <input
                            type="text"
                            required
                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                            placeholder={activeTab === 'receita' ? "Ex: Mensalidade João" : "Ex: Conta de Luz"}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Valor (R$)</label>
                            <input
                                type="number"
                                required
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                                placeholder="0,00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Categoria</label>
                            <select className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold appearance-none">
                                {activeTab === 'receita' ? (
                                    <>
                                        <option>Mensalidade</option>
                                        <option>Venda de Produto</option>
                                        <option>Matrícula</option>
                                    </>
                                ) : (
                                    <>
                                        <option>Aluguel</option>
                                        <option>Energia</option>
                                        <option>Manutenção</option>
                                        <option>Salários</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Data de Vencimento</label>
                            <input
                                type="date"
                                required
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Forma de Pagamento</label>
                            <select className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold appearance-none">
                                <option>PIX</option>
                                <option>Cartão de Crédito</option>
                                <option>Dinheiro</option>
                                <option>Boleto</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="outline" fullWidth type="button" onClick={onClose}>Cancelar</Button>
                        <Button fullWidth type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Registrar'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTransactionModal;
