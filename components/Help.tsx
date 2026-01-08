import React from 'react';

interface HelpProps {
    onBack: () => void;
}

const Help: React.FC<HelpProps> = ({ onBack }) => {
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

                <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-8 tracking-tight">Central de Ajuda</h1>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-4xl text-primary mb-4">support_agent</span>
                        <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">Suporte por Chat</h3>
                        <p className="text-text-sub dark:text-gray-400 mb-4">Converse com nossa equipe em tempo real.</p>
                        <button className="text-primary font-black uppercase text-sm hover:underline">Iniciar Chat</button>
                    </div>

                    <div className="p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-4xl text-primary mb-4">mail</span>
                        <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">E-mail</h3>
                        <p className="text-text-sub dark:text-gray-400 mb-4">Envie sua dúvida para suporte@fitmanager.pro</p>
                        <a href="mailto:suporte@fitmanager.pro" className="text-primary font-black uppercase text-sm hover:underline">Enviar E-mail</a>
                    </div>

                    <div className="p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-4xl text-primary mb-4">quiz</span>
                        <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">Perguntas Frequentes</h3>
                        <p className="text-text-sub dark:text-gray-400 mb-4">Veja respostas para as dúvidas mais comuns.</p>
                        <button className="text-primary font-black uppercase text-sm hover:underline">Acessar FAQ</button>
                    </div>

                    <div className="p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-4xl text-primary mb-4">play_circle</span>
                        <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">Tutoriais</h3>
                        <p className="text-text-sub dark:text-gray-400 mb-4">Aprenda a usar todas as funcionalidades.</p>
                        <button className="text-primary font-black uppercase text-sm hover:underline">Ver Vídeos</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
