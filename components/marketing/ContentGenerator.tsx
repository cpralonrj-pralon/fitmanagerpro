
import React, { useState } from 'react';

interface ContentIdea {
    id: string;
    type: 'Reels' | 'Carousel' | 'Post';
    headline: string;
    script: string;
}

interface ContentGeneratorProps {
    campaignGoal: string;
    onSelect: (idea: ContentIdea) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ campaignGoal, onSelect }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock AI-generated ideas based on common Pilates goals
    const mockIdeas: ContentIdea[] = [
        {
            id: '1',
            type: 'Carousel',
            headline: '3 Sinais que sua coluna precisa de Pilates',
            script: 'Slide 1: Dor na lombar ao acordar? \nSlide 2: Sente "peso" nos ombros no fim do dia? \nSlide 3: Não consegue tocar os pés sem dobrar o joelho? \nSlide 4: O Pilates resolve isso fortalecendo seu CORE. \nSlide 5: Agende sua experimental hoje!'
        },
        {
            id: '2',
            type: 'Reels',
            headline: 'Pilates não é só alongamento! 💪',
            script: 'Cena 1: Mostrando alguém fazendo esforço no Reformer. \nTexto: "Achou que era só relaxar?" \nCena 2: Suando e tremendo o abdômen. \nCena 3: Sorrindo no fim. \nLegenda: Defina seu corpo com saúde. Vem pro time!'
        },
        {
            id: '3',
            type: 'Post',
            headline: 'Mito ou Verdade: Pilates emagrece?',
            script: 'Legenda: Muita gente pergunta se Pilates emagrece. A resposta é: DEPENDE! O Pilates tonifica, define e melhora a postura, o que visualmente "afina" a cintura. Aliado a uma boa alimentação, é poderoso! Vamos começar?'
        }
    ];

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate AI delay
        setTimeout(() => {
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                        <span className="material-symbols-outlined">smart_toy</span>
                        FitManager AI
                    </h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">Gerando ideias para: <strong>{campaignGoal}</strong></p>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                    {isGenerating ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                            Pensando...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[16px]">autorenew</span>
                            Gerar Novas Ideias
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {mockIdeas.map((idea) => (
                    <div key={idea.id} className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-[#e8eceb] dark:border-gray-800 shadow-sm hover:border-primary transition-colors cursor-pointer group" onClick={() => onSelect(idea)}>
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide 
                                ${idea.type === 'Reels' ? 'bg-pink-100 text-pink-600' :
                                    idea.type === 'Carousel' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                {idea.type}
                            </span>
                            <button className="text-primary opacity-0 group-hover:opacity-100 font-bold text-xs flex items-center gap-1 transition-opacity">
                                Usar este <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                        </div>
                        <h3 className="font-black text-text-main dark:text-white mb-2">{idea.headline}</h3>
                        <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-lg">
                            <p className="text-xs text-text-sub whitespace-pre-line font-mono leading-relaxed">{idea.script}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentGenerator;
