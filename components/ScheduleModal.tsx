
import React, { useState } from 'react';
import { Button } from './ui';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        instructor: '',
        room: 'Sala A',
        type: 'Pilates'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onSuccess();
            onClose();
            alert('Aula agendada com sucesso!');
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black tracking-tight">Agendar Aula</h3>
                        <p className="text-text-sub text-xs font-bold uppercase tracking-widest mt-1">Novo horário na agenda</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-text-sub hover:text-text-main hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-sub">Título da Aula</label>
                        <input
                            type="text"
                            required
                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                            placeholder="Ex: Pilates Avançado"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Data</label>
                            <input
                                type="date"
                                required
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Horário</label>
                            <input
                                type="time"
                                required
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Instrutor</label>
                            <input
                                type="text"
                                required
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                                placeholder="Nome do Instrutor"
                                value={formData.instructor}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Sala</label>
                            <select
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold appearance-none"
                                value={formData.room}
                                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                            >
                                <option value="Sala A">Sala A</option>
                                <option value="Sala B">Sala B</option>
                                <option value="Sala C">Sala C</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="outline" fullWidth type="button" onClick={onClose}>Cancelar</Button>
                        <Button fullWidth type="submit" disabled={loading}>
                            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleModal;
