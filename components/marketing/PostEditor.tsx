
import React, { useState } from 'react';

interface PostEditorProps {
    initialContent: {
        headline: string;
        script: string;
        type: 'Reels' | 'Carousel' | 'Post';
    } | null;
}

const PostEditor: React.FC<PostEditorProps> = ({ initialContent }) => {
    const [slides, setSlides] = useState<string[]>(
        initialContent?.type === 'Carousel'
            ? initialContent.script.split('\n').filter(l => l.trim().length > 0)
            : ['Capa: Título do Post', 'Conteúdo Principal', 'Chamada para Ação']
    );
    const [activeSlide, setActiveSlide] = useState(0);

    const handleTextChange = (text: string) => {
        const newSlides = [...slides];
        newSlides[activeSlide] = text;
        setSlides(newSlides);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[500px]">
            {/* Editor Controls */}
            <div className="flex-1 bg-white dark:bg-surface-dark border border-[#e8eceb] dark:border-gray-800 rounded-2xl p-6 flex flex-col">
                <div className="mb-6">
                    <label className="block text-xs font-bold text-text-sub uppercase mb-2">Editor de Texto</label>
                    <textarea
                        className="w-full h-32 p-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
                        value={slides[activeSlide]}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder="Digite o texto do slide aqui..."
                    ></textarea>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-text-sub uppercase">Slides</label>
                        <button className="text-xs font-bold text-primary hover:text-primary-dark">Adicionar Slide</button>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3
                                    ${activeSlide === index
                                        ? 'bg-primary/5 border-primary ring-1 ring-primary/20'
                                        : 'bg-white dark:bg-white/5 border-gray-100 dark:border-gray-800 hover:bg-gray-50'}`}
                            >
                                <span className="size-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-[10px] font-black">
                                    {index + 1}
                                </span>
                                <p className="text-xs font-medium truncate flex-1">{slide}</p>
                                <span className="material-symbols-outlined text-gray-400 text-[14px]">drag_indicator</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Preview */}
            <div className="w-full lg:w-[400px] bg-gray-100 dark:bg-black/40 rounded-3xl p-4 flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-inner">
                <div className="aspect-[4/5] w-full max-w-[320px] bg-white dark:bg-surface-dark rounded-xl shadow-2xl overflow-hidden flex flex-col relative group">
                    {/* Mock Instagram Header */}
                    <div className="p-3 flex items-center gap-2 border-b border-gray-50 dark:border-gray-800">
                        <div className="size-8 rounded-full bg-primary/20"></div>
                        <div className="flex-1">
                            <div className="h-2 w-20 bg-gray-100 dark:bg-white/10 rounded mb-1"></div>
                            <div className="h-1.5 w-12 bg-gray-50 dark:bg-white/5 rounded"></div>
                        </div>
                    </div>

                    {/* Content Preview */}
                    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 p-8 flex items-center justify-center text-center">
                        <div>
                            <p className="font-black text-xl text-text-main dark:text-white leading-tight mb-4">
                                {slides[activeSlide].split(':')[1] || slides[activeSlide]}
                            </p>
                            <div className="inline-block px-4 py-2 bg-primary text-white font-bold text-xs rounded-full shadow-lg shadow-primary/20">
                                {slides[activeSlide].includes('Capa') ? 'FITMANAGER' : 'SAIBA MAIS'}
                            </div>
                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
                        {slides.map((_, i) => (
                            <div key={i} className={`size-1.5 rounded-full ${i === activeSlide ? 'bg-primary' : 'bg-gray-300 dark:bg-white/20'}`}></div>
                        ))}
                    </div>

                    {/* Mock Instagram Footer */}
                    <div className="p-3 border-t border-gray-50 dark:border-gray-800 flex justify-between text-2xl text-text-main dark:text-white">
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined">favorite</span>
                            <span className="material-symbols-outlined">chat_bubble</span>
                            <span className="material-symbols-outlined">send</span>
                        </div>
                        <span className="material-symbols-outlined">bookmark</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;
