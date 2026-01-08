import React from 'react';

interface TermsProps {
    onBack: () => void;
}

const Terms: React.FC<TermsProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-8 md:p-16">
            <div className="max-w-4xl mx-auto bg-white dark:bg-surface-dark rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-text-sub hover:text-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wide"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Voltar para Login
                </button>

                <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-8 tracking-tight">Termos de Uso</h1>

                <div className="prose dark:prose-invert max-w-none text-text-sub dark:text-gray-300">
                    <p className="mb-4">Última atualização: {new Date().toLocaleDateString()}</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">1. Aceitação dos Termos</h3>
                    <p>Ao acessar e usar o FitManager Pro, você concorda em cumprir e ficar vinculado a estes Termos de Uso.</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">2. Uso do Serviço</h3>
                    <p>O FitManager Pro é uma plataforma de gestão para academias. Você concorda em usar o serviço apenas para fins legais e de acordo com todas as leis aplicáveis.</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">3. Contas de Usuário</h3>
                    <p>Você é responsável por manter a confidencialidade das credenciais da sua conta e por todas as atividades que ocorrem sob sua conta.</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">4. Cancelamento</h3>
                    <p>Você pode cancelar sua assinatura a qualquer momento. O cancelamento entrará em vigor no final do ciclo de faturamento atual.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
