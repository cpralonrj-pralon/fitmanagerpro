import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Avatar } from './ui';

const Communication: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Mensagens');
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [conversations, setConversations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({});

    const campaigns = [
        { id: '1', title: 'Promoção de Verão', status: 'Ativa', sent: 280, opened: 185, clicked: 45, date: '02/01/2026' },
        { id: '2', title: 'Lembrete de Pagamento', status: 'Agendada', sent: 0, opened: 0, clicked: 0, date: '15/01/2026' },
        { id: '3', title: 'Boas Festas 2025', status: 'Concluída', sent: 318, opened: 250, clicked: 89, date: '23/12/2025' },
    ];

    const templates = [
        { id: '1', name: 'Boas-vindas', type: 'Email', uses: 45 },
        { id: '2', name: 'Lembrete de Aula', type: 'WhatsApp', uses: 320 },
        { id: '3', name: 'Cobrança', type: 'SMS', uses: 87 },
        { id: '4', name: 'Aniversário', type: 'Email', uses: 156 },
    ];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('students')
                    .select('id, name, avatar, phone')
                    .order('name');

                if (error) throw error;

                if (data) {
                    const formatted = data.map(s => ({
                        id: s.id,
                        name: s.name,
                        avatar: s.avatar,
                        phone: s.phone || '5500000000000',
                        message: 'Inicie uma conversa...',
                        time: '',
                        unread: 0
                    }));
                    setConversations(formatted);
                }
            } catch (err) {
                console.error('Erro ao buscar alunos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConvId) return;

        const currentConv = conversations.find(c => c.id === selectedConvId);
        if (!currentConv) return;

        const phone = currentConv.phone;
        const encodedMsg = encodeURIComponent(newMessage);
        const waUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMsg}`;
        window.open(waUrl, '_blank');

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const msgObj = {
            id: Date.now().toString(),
            sender: 'You',
            text: newMessage,
            time: timestamp
        };

        setChatMessages(prev => ({
            ...prev,
            [selectedConvId]: [...(prev[selectedConvId] || []), msgObj]
        }));

        setConversations(prev => prev.map(c =>
            c.id === selectedConvId
                ? { ...c, message: newMessage, time: 'Agora' }
                : c
        ));

        setNewMessage('');
    };

    const selectedConversation = conversations.find(c => c.id === selectedConvId);
    const currentMessages = selectedConvId ? chatMessages[selectedConvId] || [] : [];
    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tabs = ['Mensagens', 'Campanhas', 'Templates'];

    return (
        <div className="space-y-6 pb-10">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl w-fit shadow-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                            ? 'bg-primary text-background-dark shadow-sm'
                            : 'text-text-sub hover:text-text-main'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'Mensagens' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {/* Conversations List */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[700px]">
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub text-lg">search</span>
                                <input
                                    type="text"
                                    placeholder="Buscar conversa..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-11 pl-10 pr-4 bg-background-light dark:bg-background-dark rounded-xl text-sm border-transparent focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
                            {loading ? (
                                <div className="p-12 text-center text-text-sub text-sm">Carregando alunos...</div>
                            ) : filteredConversations.length > 0 ? (
                                filteredConversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => {
                                            setSelectedConvId(conv.id);
                                            setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
                                        }}
                                        className={`p-5 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-all flex items-center gap-4 relative group ${selectedConvId === conv.id ? 'bg-primary/5' : ''}`}
                                    >
                                        {selectedConvId === conv.id && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                        )}
                                        <Avatar src={conv.avatar} name={conv.name} size="md" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className={`text-sm font-bold truncate ${selectedConvId === conv.id ? 'text-primary-dark dark:text-primary' : 'text-text-main dark:text-white'}`}>{conv.name}</p>
                                                <span className="text-[10px] text-text-sub font-medium">{conv.time}</span>
                                            </div>
                                            <p className="text-xs text-text-sub truncate font-medium">{conv.message}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-text-sub text-sm">Nenhum aluno encontrado</div>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-[700px] overflow-hidden">
                        {selectedConversation ? (
                            <>
                                <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-surface-dark z-10">
                                    <div className="flex items-center gap-3">
                                        <Avatar src={selectedConversation.avatar} name={selectedConversation.name} size="md" />
                                        <div>
                                            <p className="font-bold text-sm">{selectedConversation.name}</p>
                                            <p className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                                                <span className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                                                Online
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                            <span className="material-symbols-outlined text-xl">call</span>
                                        </button>
                                        <button className="p-2 text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                            <span className="material-symbols-outlined text-xl">videocam</span>
                                        </button>
                                        <button className="p-2 text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                            <span className="material-symbols-outlined text-xl">more_vert</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 p-6 bg-gray-50 dark:bg-background-dark/30 overflow-y-auto space-y-4">
                                    <div className="flex justify-center mb-6">
                                        <span className="bg-white dark:bg-surface-dark px-3 py-1 rounded-full text-[10px] text-text-sub font-bold shadow-sm border border-gray-100 dark:border-gray-800 uppercase tracking-widest">
                                            Hoje
                                        </span>
                                    </div>
                                    {currentMessages.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full opacity-40 grayscale py-20">
                                            <span className="material-symbols-outlined text-5xl mb-2">history</span>
                                            <p className="text-xs font-medium">Inicie uma nova conversa via WhatsApp</p>
                                        </div>
                                    ) : (
                                        currentMessages.map((msg: any) => (
                                            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm shadow-sm ${msg.sender === 'You'
                                                    ? 'bg-primary text-background-dark rounded-tr-none font-medium'
                                                    : 'bg-white dark:bg-surface-dark text-text-main dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-800'
                                                    }`}>
                                                    <p className="leading-relaxed">{msg.text}</p>
                                                    <p className={`text-[9px] mt-1.5 font-bold uppercase tracking-wider ${msg.sender === 'You' ? 'text-background-dark/50' : 'text-text-sub'}`}>{msg.time}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark flex items-center gap-3">
                                    <button className="p-2.5 text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors flex items-center justify-center">
                                        <span className="material-symbols-outlined">attach_file</span>
                                    </button>
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Digite sua mensagem via WhatsApp..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="w-full h-12 px-5 bg-background-light dark:bg-background-dark rounded-xl text-sm border-transparent focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSendMessage}
                                        className="h-12 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center gap-2 font-bold text-sm whitespace-nowrap"
                                    >
                                        <svg viewBox="0 0 24 24" className="size-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Enviar via WhatsApp
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                                <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-4xl font-light">chat_bubble</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Suas Mensagens</h3>
                                    <p className="text-text-sub text-sm max-w-sm mt-2">Selecione um aluno na lista ao lado para iniciar um atendimento via WhatsApp com histórico centralizado.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'Campanhas' && (
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <Button icon="add">Nova Campanha</Button>
                        <Button variant="outline" icon="schedule">Agendar Envio</Button>
                    </div>

                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-widest">Campanha</th>
                                        <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-widest">Enviados</th>
                                        <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-widest">Abertos</th>
                                        <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-widest">Cliques</th>
                                        <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-widest">Data</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group transition-colors">
                                            <td className="px-6 py-5 font-bold text-sm group-hover:text-primary transition-colors">{campaign.title}</td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase
                                                    ${campaign.status === 'Ativa' ? 'bg-green-50 text-green-600' : ''}
                                                    ${campaign.status === 'Agendada' ? 'bg-blue-50 text-blue-600' : ''}
                                                    ${campaign.status === 'Concluída' ? 'bg-gray-100 text-gray-600' : ''}
                                                `}>
                                                    {campaign.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-medium">{campaign.sent}</td>
                                            <td className="px-6 py-5 text-sm font-medium">{campaign.opened}</td>
                                            <td className="px-6 py-5 text-sm font-medium">{campaign.clicked}</td>
                                            <td className="px-6 py-5 text-sm text-text-sub font-medium">{campaign.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Templates' && (
                <div className="space-y-6">
                    <Button icon="add">Novo Template</Button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {templates.map((template) => (
                            <div key={template.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group relative">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase
                                        ${template.type === 'Email' ? 'bg-blue-50 text-blue-600' : ''}
                                        ${template.type === 'WhatsApp' ? 'bg-green-50 text-green-600' : ''}
                                        ${template.type === 'SMS' ? 'bg-purple-50 text-purple-600' : ''}
                                    `}>
                                        {template.type}
                                    </span>
                                    <button className="size-8 rounded-lg flex items-center justify-center text-text-sub opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                </div>
                                <h4 className="font-black text-lg mb-2 group-hover:text-primary transition-colors">{template.name}</h4>
                                <p className="text-xs text-text-sub font-medium">{template.uses} envios</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Communication;
