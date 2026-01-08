import React from 'react';

interface PrivacyProps {
    onBack: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
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

                <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-8 tracking-tight">Política de Privacidade</h1>

                <div className="prose dark:prose-invert max-w-none text-text-sub dark:text-gray-300">
                    <p className="mb-4">Última atualização: {new Date().toLocaleDateString()}</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">1. Coleta de Informações</h3>
                    <p>Coletamos informações que você nos fornece diretamente ao criar uma conta, como seu nome, endereço de e-mail e dados da academia.</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">2. Uso das Informações</h3>
                    <p>Usamos as informações coletadas para fornecer, manter e melhorar nossos serviços, além de nos comunicarmos com você sobre atualizações e ofertas.</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">3. Compartilhamento de Dados</h3>
                    <p>Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para fornecer nossos serviços ou quando exigido por lei.</p>

                    <h3 className="text-xl font-bold text-text-main dark:text-white mt-8 mb-4">4. Segurança</h3>
                    <p>Tomamos medidas razoáveis para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
