import { useState } from "react";
import {
  Dumbbell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { requestLogin } from "../../services/login/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const ctx = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    setIsLoading(true);

    try {
        console.log({
            email,
            password,
            rememberMe,
        });
      
        const data = await requestLogin({email, password});
        
        ctx.signIn({
          token: data.token, 
          user: {id: Number(data.user.id), 
          name: data.user.name, 
          email: data.user.email, 
          personal: data.user.personal}
        })
        
        navigate("/teste");

    } catch {
      setError("Não foi possível realizar o login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo e identificação */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-lime-400 text-slate-950 mb-4 shadow-lg shadow-lime-400/20">
            <Dumbbell size={30} strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            IRON<span className="text-lime-400">CORE</span>
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Performance, disciplina e evolução.
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-white">Bem-vindo de volta</h2>
            <p className="text-slate-400 text-sm mt-1">
              Entre na sua conta para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                E-mail ou matrícula
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail ou matrícula"
                  autoComplete="username"
                  className="w-full bg-slate-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Senha
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full bg-slate-950 border border-zinc-800 rounded-xl pl-11 pr-12 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-lime-400 transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Lembrar e recuperar senha */}
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 bg-slate-950 accent-lime-400 cursor-pointer"
                />
                Lembrar de mim
              </label>

              <a
                href="#"
                className="text-lime-400 hover:text-lime-300 transition-colors font-medium"
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Botão de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-xl py-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-lime-400/10 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar na plataforma
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <p className="text-xs text-slate-500">
              Acesso exclusivo para alunos e profissionais.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} IronCore Fitness. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}