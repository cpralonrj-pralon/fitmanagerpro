
import React, { useState } from 'react';
import ContentGenerator from './ContentGenerator';
import PostEditor from './PostEditor';

const CampaignBuilder: React.FC = () => {
    const [step, setStep] = useState(1);
    const [campaignGoal, setCampaignGoal] = useState('Recuperação de Inativos');
    const [selectedIdea, setSelectedIdea] = useState<any>(null);

    const steps = [
        { num: 1, title: 'Estratégia' },
        { num: 2, title: 'Conteúdo' },
        { num: 3, title: 'Editor' },
        { num: 4, title: 'Revisão' }
    ];

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Wizard Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-text-main dark:text-white">Criar Campanha Inteligente</h2>
                    <p className="text-text-sub text-sm font-medium mt-1">Siga os passos para lançar sua campanha.</p>
                </div>
                <div className="flex items-center gap-2">
                    {steps.map((s) => (
                        <div key={s.num} className="flex items-center text-sm">
                            <div className={`size-8 rounded-full flex items-center justify-center font-bold border-2 transition-colors 
                                ${step === s.num ? 'bg-primary border-primary text-white' :
                                    step > s.num ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 text-gray-400'}`}>
                                {step > s.num ? <span className="material-symbols-outlined text-sm">check</span> : s.num}
                            </div>
                            <span className={`ml-2 font-bold ${step === s.num ? 'text-text-main dark:text-white' : 'text-gray-400 hidden md:block'}`}>{s.title}</span>
                            {s.num < 4 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-800 mx-2 hidden md:block"></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-[#e8eceb] dark:border-gray-800 shadow-sm min-h-[400px]">
                {step === 1 && (
                    <div className="space-y-6 max-w-xl mx-auto">
                        <h3 className="text-lg font-black text-center mb-6">Defina o objetivo da campanha</h3>

                        <div>
                            <label className="block text-xs font-bold text-text-sub uppercase mb-2">Objetivo (Sugerido pelo Insight)</label>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl flex items-center gap-3">
                                <span className="material-symbols-outlined text-indigo-600">auto_awesome</span>
                                <span className="font-bold text-indigo-900 dark:text-indigo-100">{campaignGoal}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-sub uppercase mb-2">Nome da Campanha</label>
                            <input type="text" defaultValue="Campanha de Retorno - Outubro" className="w-full p-3 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-xl font-medium focus:ring-2 focus:ring-primary/50 outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text-sub uppercase mb-2">Data Início</label>
                                <input type="date" className="w-full p-3 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-xl font-medium outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-sub uppercase mb-2">Data Fim</label>
                                <input type="date" className="w-full p-3 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-xl font-medium outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-sub uppercase mb-2">Público Alvo</label>
                            <div className="p-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-xl">
                                <span className="font-bold text-text-main dark:text-white">Segmento Automático:</span>
                                <p className="text-sm text-text-sub mt-1">Alunos inativos a mais de 30 dias (Total: 5)</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-lg font-black text-center mb-6">Gere conteúdo com IA</h3>
                        <ContentGenerator
                            campaignGoal={campaignGoal}
                            onSelect={(idea) => {
                                setSelectedIdea(idea);
                                setStep(3);
                            }}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3 className="text-lg font-black text-center mb-6">Personalize seu Post</h3>
                        <PostEditor initialContent={selectedIdea} />
                    </div>
                )}

                {step === 4 && (
                    <div className="max-w-xl mx-auto text-center space-y-6">
                        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                        </div>
                        <h3 className="text-2xl font-black">Tudo pronto para lançar!</h3>
                        <p className="text-text-sub">Sua campanha foi configurada com sucesso. Os posts foram salvos na galeria e a lista de transmissão está pronta.</p>

                        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-left space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-text-sub font-bold">Campanha</span>
                                <span className="text-sm font-black">Campanha de Retorno</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-text-sub font-bold">Público</span>
                                <span className="text-sm font-black">5 Alunos</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-text-sub font-bold">Canais</span>
                                <span className="text-sm font-black">WhatsApp, Instagram</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Actions */}
            <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => step > 1 && setStep(step - 1)}
                    className={`px-6 py-3 font-bold text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors ${step === 1 ? 'invisible' : ''}`}
                >
                    Voltar
                </button>

                {step < 4 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2"
                    >
                        Próximo Passo
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                ) : (
                    <button className="px-8 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:bg-green-600 transition-all flex items-center gap-2">
                        Lançar Campanha
                        <span className="material-symbols-outlined">check</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default CampaignBuilder;
