
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gymName, setGymName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isResettingPassword) {
        if (!email) throw new Error('Por favor, informe seu e-mail.');

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });

        if (resetError) throw resetError;

        setSuccess('Link de redefinição enviado! Verifique seu e-mail.');
      } else if (isRegistering) {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              gym_name: gymName,
            },
          },
        });

        if (authError) throw authError;

        if (data.user && data.session) {
          onLogin();
        } else {
          setSuccess('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
          setIsRegistering(false);
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] bg-white dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[640px] border border-gray-100 dark:border-gray-800">
        {/* Left Side: Branding */}
        <div className="hidden md:flex md:w-1/2 relative bg-background-dark flex-col justify-between p-16 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAe6gMet6MRXrx3UFisNEtQgyYpKphsRKm08RWLHz05g_-XZVumwtVYnMu9znhH6d1_wCSZJf6xl4NuSNYlcLaZ4tW7hqZGMhg9vwvaY1sWXoZQJwSZSbse9KT_ebFdiv8HcjPQ6w0BW5hvQNtCcrY60ZhwXRLUMu5I1J3npczGXqggSZEzTuI79i05V6icABLdlDfpkPwtOW1EMOJR9Zkl7MJVH0Ju__fwfQs-VB-617pXsSxJ-d2U80mpGPBoVW-zxvhafp8OL5k")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-background-dark shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined font-black text-2xl">fitness_center</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">GymSaaS</h2>
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
              Gestão inteligente para o seu negócio fitness.
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed max-w-md mb-10">
              Otimize processos, organize finanças e fidelize seus alunos em uma única plataforma robusta.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxjijVnkBfzi2jllYd10ZRU2dLCe8Nux_IvRiBy7gnGHDmyYGk9VnOB21gAeRyfdCL9w_7by6SxF1X2H793zRXOYHCl9nQXILcUz_gUbAm_30b3woiBdYi9FXpFjtMtSs4-t9t5rTz8QwbkMHFK0QkdySdAvqEbdNXNbYgc2QHmIfIm4VFrxKoaqPWPhkcrrc5PQ2SmPnwt9KNadf7VfZu9cjxo4dUUVUOK78EYjUVIum1iHLxESO1PB47w7JddUyCAxCopMwrn5U",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtGF1_zfAaTrUf3YjCB9GOhuxt7XTpswr9Ych7npMjBZeYOSVPZdQFNJLsV-zUgrydIrbyPPPh5SYNsX2rtla88BHCASQ2RXmfGfR9ArKsH5v8RI7sjFWzyu0wUMGkOqIab3u2vtSt1lAWh1N88JcZrlJL3ppFAbQCnhge2xb6k6DL41LsC-lfiMLkT_cbUgaLNwqrZzx54CbglGUD0CoEZcwXOA634zVt4kXNr8E64Xx5hcgM5zzMD4PdpNgYAd2e23mbo13a_aY",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-2i9XIhRCT4C8rEAAvlbhdHVaiFlr9xV3gF8iTr-9JfLMhpMDBAamDdGf6PUh1gj1_Ng0Luoi6q8EUVGyY8tRWXzjFpDWLvkCNDvpinX4iCQai7Ky9LOCAldOAt1a0WS38kr9fEIE4JUb3c-yXqnwgs5j25ptVkNNqHaPHlkBjJeO4nmAQig5nf0uu5Y1AUC4PVP6I2OYQHA3aHioLK538pGvWNVoSChOeSrmDtneH2eHVlyTj1wN9T20N-po_891t7Wnquz7PNc"
                ].map((src, i) => (
                  <img key={i} src={src} className="size-10 rounded-full border-2 border-background-dark object-cover shadow-lg" alt="User avatar" />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-300">Mais de <span className="text-primary tracking-wider">2.000</span> academias confiam.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center bg-white dark:bg-surface-dark">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-text-main dark:text-white mb-3 tracking-tight">
                {isResettingPassword
                  ? 'Redefinir Senha'
                  : (isRegistering ? 'Crie sua conta' : 'Bem-vindo de volta!')}
              </h2>
              <p className="text-text-sub dark:text-gray-400 font-medium">
                {isResettingPassword
                  ? 'Informe seu e-mail para receber o link de redefinição.'
                  : (isRegistering
                    ? 'Comece a gerenciar sua academia de forma inteligente hoje.'
                    : 'Insira suas credenciais para acessar o painel.')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {error === 'Invalid login credentials' ? 'E-mail ou senha incorretos' : error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-bold">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  {success}
                </div>
              )}

              {isRegistering && !isResettingPassword && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-main dark:text-gray-200">Nome da Academia</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">fitness_center</span>
                    <input
                      type="text"
                      value={gymName}
                      onChange={(e) => setGymName(e.target.value)}
                      required={isRegistering}
                      className="w-full h-14 pl-12 pr-4 bg-background-light dark:bg-background-dark border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                      placeholder="Nome do seu negócio"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-main dark:text-gray-200">E-mail ou Usuário</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-12 pr-4 bg-background-light dark:bg-background-dark border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                    placeholder="exemplo@academia.com.br"
                  />
                </div>
              </div>

              {!isResettingPassword && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase tracking-widest text-text-main dark:text-gray-200">Senha</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsResettingPassword(true);
                        setError(null);
                        setSuccess(null);
                      }}
                      className="text-xs font-black text-primary uppercase hover:underline"
                    >
                      Esqueceu?
                    </button>
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">lock</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-12 bg-background-light dark:bg-background-dark border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                      placeholder="Sua senha secreta"
                    />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub hover:text-text-main">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-14 bg-primary hover:bg-primary-dark text-background-dark font-black rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>
                  {loading
                    ? 'Processando...'
                    : (isResettingPassword
                      ? 'Enviar Link'
                      : (isRegistering ? 'Criar Conta' : 'Entrar no Sistema'))}
                </span>
                {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>

              {isResettingPassword && (
                <button
                  type="button"
                  onClick={() => {
                    setIsResettingPassword(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="w-full mt-2 text-sm font-bold text-text-sub hover:text-text-main transition-colors"
                >
                  Voltar para o Login
                </button>
              )}
            </form>

            {!isResettingPassword && (
              <div className="mt-12 text-center pt-8 border-t border-gray-100 dark:border-gray-800">
                <p className="text-text-sub text-sm font-medium">
                  {isRegistering ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-primary font-black hover:underline ml-1"
                  >
                    {isRegistering ? 'Fazer login' : 'Cadastrar academia'}
                  </button>
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-text-sub/50">
              <a href="#" className="hover:text-primary transition-colors">Termos</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Ajuda</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
