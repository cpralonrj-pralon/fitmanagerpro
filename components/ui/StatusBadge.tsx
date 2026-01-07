
import React from 'react';

type StatusType =
    | 'Ativo'
    | 'Inativo'
    | 'Pendente'
    | 'Confirmada'
    | 'Em breve'
    | 'Aguardando'
    | 'Cancelado';

interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
    'Ativo': { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
    'Confirmada': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-600' },
    'Inativo': { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
    'Cancelado': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-600' },
    'Pendente': { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' },
    'Em breve': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-600' },
    'Aguardando': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-600' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
    const config = statusConfig[status] || statusConfig['Aguardando'];

    return (
        <span
            className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
        text-[10px] font-black uppercase tracking-wider
        ${config.bg} ${config.text} ${className}
      `}
        >
            <span className={`size-1.5 rounded-full ${config.dot}`}></span>
            {status}
        </span>
    );
};

export default StatusBadge;
