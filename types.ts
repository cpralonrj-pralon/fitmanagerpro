
export enum AppView {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  STUDENTS = 'students',
  PROFILE = 'profile',
  SCHEDULE = 'schedule',
  FINANCIAL = 'financial',
  REPORTS = 'reports',
  COMMUNICATION = 'communication',
  MARKETING = 'marketing',
  TERMS = 'terms',
  PRIVACY = 'privacy',
  HELP = 'help',
  SETTINGS = 'settings'
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  avatar?: string;
  nextPayment?: string;
}

export interface ClassSession {
  id: string;
  time: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  room: string;
  status: 'Confirmada' | 'Em breve' | 'Aguardando' | 'Cancelado';
}
