
import React from 'react';
import { Button } from './ui';

const Settings: React.FC = () => {
    return (
        <div className="space-y-6 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-text-main dark:text-white">Configurações</h2>
                    <p className="text-text-sub text-sm font-medium mt-1">Gerencie sua conta e preferências da plataforma</p>
                </div>
                <Button>Salvar Alterações</Button>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-8 shadow-sm">
                <h3 className="text-lg font-black mb-6">Perfil da Academia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-sub">Nome do Studio</label>
                        <input type="text" className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl text-sm font-bold" defaultValue="Camila's Pilates" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-sub">E-mail de Contato</label>
                        <input type="email" className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl text-sm font-bold" defaultValue="contato@camila.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-sub">Telefone</label>
                        <input type="text" className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl text-sm font-bold" defaultValue="(21) 99999-9999" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-8 shadow-sm">
                <h3 className="text-lg font-black mb-6">Preferências</h3>
                <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-800">
                    <div>
                        <p className="font-bold text-sm">Notificações por E-mail</p>
                        <p className="text-xs text-text-sub">Receba atualizações sobre novos alunos</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-primary rounded-full cursor-pointer">
                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform translate-x-6"></span>
                    </div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div>
                        <p className="font-bold text-sm">Tema Escuro</p>
                        <p className="text-xs text-text-sub">Ativar modo escuro na plataforma</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer">
                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
