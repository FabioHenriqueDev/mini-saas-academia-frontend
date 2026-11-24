import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  FileText,
} from "lucide-react";
import { requestRegister } from "../../services/criar_conta/criar-conta";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !cpf.trim() || !password.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    if (password.length < 5){
      setError("A senha tem que ter no mínimo 5 caracteres.");
      return
    }

    setError("");
    setIsLoading(true);

    try {
      console.log({ name, email, cpf, password });
      const userCreated =  await requestRegister({ name, email, password, cpf })
      if (!userCreated.success) {
        setError("Não foi possível criar o usuário verifique se os campos estão preenchidos corretamente para continuar.");
        return;
      }
      
      navigate("/login");

    } catch {
      setError("Não foi possível criar sua conta. Tente novamente.");
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

        {/* Card de cadastro */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-white">
              Crie sua conta
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Preencha seus dados para começar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Nome completo
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  autoComplete="name"
                  className="w-full bg-slate-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  className="w-full bg-slate-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                />
              </div>
            </div>

            {/* CPF */}
            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                CPF
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  autoComplete="off"
                  maxLength={14}
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
                  placeholder="Crie uma senha"
                  autoComplete="new-password"
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

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Botão de cadastro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-xl py-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-lime-400/10 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar minha conta
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <p className="text-sm text-slate-400">
              Já possui uma conta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-lime-400 hover:text-lime-300 transition-colors font-medium cursor-pointer"
              >
                Entrar
              </button>
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