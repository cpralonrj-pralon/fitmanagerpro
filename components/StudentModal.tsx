
import React, { useState, useEffect } from 'react';
import { Button } from './ui';
import { supabase } from '../supabaseClient';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    studentId?: string | null; // For editing
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, onSuccess, studentId }) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        plan: 'Plano Black',
        status: 'Ativo',
        avatar: ''
    });

    useEffect(() => {
        if (studentId) {
            fetchStudent();
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                plan: 'Plano Black',
                status: 'Ativo',
                avatar: ''
            });
            setAvatarPreview(null);
            setAvatarFile(null);
        }
    }, [studentId, isOpen]);

    const fetchStudent = async () => {
        try {
            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('id', studentId)
                .single();
            if (error) throw error;
            if (data) {
                setFormData({
                    name: data.name,
                    email: data.email,
                    phone: data.phone || '',
                    plan: data.plan || 'Plano Black',
                    status: data.status || 'Ativo',
                    avatar: data.avatar || ''
                });
                setAvatarPreview(data.avatar || null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const uploadAvatar = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let avatarUrl = formData.avatar;

            if (avatarFile) {
                setUploading(true);
                avatarUrl = await uploadAvatar(avatarFile);
                setUploading(false);
            }

            const submissionData = { ...formData, avatar: avatarUrl };

            if (studentId) {
                const { error } = await supabase
                    .from('students')
                    .update(submissionData)
                    .eq('id', studentId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('students')
                    .insert([submissionData]);
                if (error) throw error;
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black tracking-tight">{studentId ? 'Editar Aluno' : 'Novo Aluno'}</h3>
                        <p className="text-text-sub text-xs font-bold uppercase tracking-widest mt-1">Preencha as informações abaixo</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-text-sub hover:text-text-main hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="relative group">
                            <div className="size-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-3xl text-primary/40">add_a_photo</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                title="Carregar foto"
                            />
                            <div className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full flex items-center justify-center text-background-dark shadow-lg">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-sub">Foto do Aluno (Opcional)</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-sub">Nome Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                            placeholder="Ex: João Silva"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">E-mail</label>
                            <input
                                type="email"
                                required
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                                placeholder="joao@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Telefone</label>
                            <input
                                type="text"
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                                placeholder="(00) 00000-0000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Plano</label>
                            <select
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold appearance-none"
                                value={formData.plan}
                                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            >
                                <option value="Plano Black">Plano Black</option>
                                <option value="Plano Start">Plano Start</option>
                                <option value="Frequência Livre">Frequência Livre</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-sub">Status</label>
                            <select
                                className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold appearance-none"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="outline" fullWidth type="button" onClick={onClose}>Cancelar</Button>
                        <Button fullWidth type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : (studentId ? 'Salvar Alterações' : 'Cadastrar Aluno')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentModal;
