import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, ChevronLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/footer";
import loginShopImg from "../../MUSTAFA PICTURES/1ST/_MG_0039.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in - Mustafa Coffee House" },
      { name: "description", content: "Sign in to order ahead and track your rewards at Mustafa Coffee House." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const emailSchema = z.string().trim().email({ message: "Enter a valid email" }).max(255);
const passwordSchema = z.string().min(6, { message: "At least 6 characters" }).max(72);

type AuthMode = "signin" | "signup";

function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-background via-cream to-latte/25 text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-espresso shadow-glow transition hover:brightness-110">
          <ChevronLeft className="h-4 w-4" /> Back to cafe
        </Link>
        <Link to="/" className="flex max-w-[42vw] cursor-pointer items-center justify-end gap-2 sm:max-w-none"><Logo showWordmark className="h-10 w-auto max-w-[10rem] sm:h-12 sm:max-w-[13rem] lg:h-14" /></Link>
      </header>

      <div className="grid min-h-screen flex-1 grid-cols-1 lg:grid-cols-2">
        <LeftPanel />
        <RightPanel mode={mode} setMode={setMode} />
      </div>
      <SiteFooter />
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="relative hidden overflow-hidden lg:block" data-parallax data-parallax-speed="0.16">
      <img src={loginShopImg} alt="Mustafa Coffee House storefront and exterior sign" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-espresso/85 via-coffee/55 to-espresso/72" />
      <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-background/50 via-background/18 to-transparent" />
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="absolute block animate-bean-float opacity-70 drop-shadow-[0_8px_16px_rgba(20,10,5,0.35)]" style={{ top: `${(i * 47) % 90}%`, left: `${(i * 83) % 95}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${6 + (i % 4)}s` }}>
          <CoffeeBean angle={i * 34} />
        </span>
      ))}
      <div className="relative z-10 flex h-full flex-col justify-center p-14">
        <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-[2rem] border border-background/15 bg-background/20 px-8 py-10 text-center shadow-luxury backdrop-blur-md">
          <Logo showWordmark className="h-24 sm:h-28" />
          <div className="mt-5 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-soft/90">
              Welcome to our coffee house
            </div>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.2vw,2.9rem)] leading-[1.02] text-background drop-shadow-[0_2px_16px_rgba(0,0,0,0.58)]">
              Your cup is
              <span className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-gold-soft/40 bg-background/14 px-4 py-2 text-[0.72em] italic text-gold-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_14px_32px_rgba(0,0,0,0.18)] backdrop-blur-md">
                {/* <span className="h-2 w-2 rounded-full bg-gold-soft shadow-glow" /> */}
                waiting
              </span>
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-center text-sm text-background/82">
            Sign in to pick up rewards, reorder your usual, and keep every visit moving.
          </p>
        </div>
      </div>
    </div>
  );
}

function CoffeeBean({ angle }: { angle: number }) {
  return (
    <svg
      viewBox="0 0 32 48"
      aria-hidden="true"
      className="h-7 w-5 sm:h-9 sm:w-6"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <path
        d="M16.2 2.7C7.7 4.7 2.8 13.5 4.2 24.1c1.6 12.2 10 21.8 18.1 20 7.3-1.7 10.3-12.8 6.5-24.7C25.5 9 20.9 1.6 16.2 2.7Z"
        fill="#7a4329"
      />
      <path
        d="M9.7 7.7c5.6-3.3 12.3.6 15.3 8.7 3.5 9.5 1.6 19.5-4.2 22.2C15 41.4 8.6 36.4 6.4 27.7 4.5 19.9 5.8 10.1 9.7 7.7Z"
        fill="#b77a49"
        opacity="0.42"
      />
      <path
        d="M17.1 7.9c-4.8 5.4-5.3 10.8-1.5 16.1 3.4 4.7 3.2 9.8-.7 15.4"
        fill="none"
        stroke="#f2d2a5"
        strokeWidth="2.35"
        strokeLinecap="round"
        opacity="0.78"
      />
    </svg>
  );
}
function RightPanel({ mode, setMode }: { mode: AuthMode; setMode: (m: AuthMode) => void }) {
  const isSignup = mode === "signup";
  return (
    <div className="flex items-center justify-center px-5 py-28 sm:px-10 lg:py-16" data-parallax data-parallax-speed="0.08">
      <div className="w-full max-w-md [perspective:1400px]">
        <div className="relative min-h-[620px] transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: `rotateY(${isSignup ? 180 : 0}deg)` }}>
          <AuthCard mode="signin" hidden={isSignup} onFlip={() => setMode("signup")} />
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <AuthCard mode="signup" hidden={!isSignup} onFlip={() => setMode("signin")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthCard({ mode, hidden, onFlip }: { mode: AuthMode; hidden: boolean; onFlip: () => void }) {
  const isSignup = mode === "signup";
  return (
    <div aria-hidden={hidden} className="absolute inset-0 glass-panel rounded-3xl p-8 shadow-luxury [backface-visibility:hidden] sm:p-10">
      <div className="mb-1 text-[11px] uppercase tracking-[0.3em] text-gold-ink">{isSignup ? "Join Mustafa" : "Welcome back"}</div>
      <h1 className="font-display text-4xl leading-[1] text-foreground sm:text-5xl">
        {isSignup ? <>Create your <em className="italic text-gold-gradient">account.</em></> : <>Sign in to your <em className="italic text-gold-gradient">account.</em></>}
      </h1>
      <AuthForm mode={mode} />
      <div className="my-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {isSignup ? "SignUp with" : "Or continue with"}
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SocialButton label="Google" icon={<GoogleIcon />} />
        <SocialButton label="Apple" icon={<AppleIcon />} />
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {isSignup ? "Already have a account? " : "New here? "}
        <button type="button" onClick={onFlip} className="cursor-pointer text-gold-ink">
          {isSignup ? "Login" : "Create an account"}
        </button>
      </p>
    </div>
  );
}

function AuthForm({ mode }: { mode: AuthMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const isSignup = mode === "signup";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (isSignup && name.trim().length < 2) next.name = "Enter your name";
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) next.email = emailResult.error.issues[0].message;
    const pwResult = passwordSchema.safeParse(password);
    if (!pwResult.success) next.password = pwResult.error.issues[0].message;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    window.setTimeout(() => {
      localStorage.setItem("mchUserName", isSignup ? name.trim() : email.split("@")[0] || "Guest");
      setSubmitting(false);
      setSuccess(true);
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
      {isSignup && <Field id="name" type="text" label="Name" value={name} onChange={setName} icon={User} placeholder="Your name" autoComplete="name" error={errors.name} />}
      <Field id={`${mode}-email`} type="email" label="Email" value={email} onChange={setEmail} icon={Mail} placeholder="you@example.com" autoComplete="email" error={errors.email} />
      <Field id={`${mode}-password`} type={showPw ? "text" : "password"} label="Password" value={password} onChange={setPassword} icon={Lock} placeholder="Password" autoComplete={isSignup ? "new-password" : "current-password"} error={errors.password} rightSlot={<button type="button" onClick={() => setShowPw((v) => !v)} className="cursor-pointer text-muted-foreground" aria-label={showPw ? "Hide password" : "Show password"}>{showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>} />
      {!isSignup && (
        <div className="mt-3 flex items-center justify-between text-xs">
          <label className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 cursor-pointer accent-[color:var(--color-gold)]" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
          </label>
          <a href="#" className="cursor-pointer text-gold-ink">Forgot password?</a>
        </div>
      )}
      <button type="submit" disabled={submitting || success} className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow disabled:cursor-not-allowed disabled:opacity-70">
        {success ? (isSignup ? "Account created" : "Signed in") : submitting ? "Brewing..." : isSignup ? "Create account" : "Sign in"}
        {!submitting && !success && <ArrowUpRight className="h-4 w-4" />}
      </button>
    </form>
  );
}

function Field({ id, type, label, value, onChange, icon: Icon, placeholder, autoComplete, error, rightSlot }: { id: string; type: string; label: string; value: string; onChange: (v: string) => void; icon: React.ComponentType<{ className?: string }>; placeholder?: string; autoComplete?: string; error?: string; rightSlot?: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <div className={`flex items-center gap-3 rounded-2xl border bg-background px-4 py-3 transition focus-within:border-gold focus-within:shadow-glow ${error ? "border-destructive/60" : "border-border"}`}>
        <Icon className="h-4 w-4 shrink-0 text-gold-ink" />
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        {rightSlot}
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return <button type="button" className="relative inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background px-4 text-xs uppercase tracking-[0.2em] text-muted-foreground"><span className="absolute left-4 grid h-4 w-4 shrink-0 place-items-center">{icon}</span><span className="text-center">{label}</span></button>;
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#ea4335" d="M12 10.2v3.95h5.62c-.24 1.26-.96 2.33-2.03 3.05v2.53h3.28c1.92-1.77 3.03-4.38 3.03-7.48 0-.72-.06-1.42-.17-2.05H12Z" /><path fill="#34a853" d="M6.55 14.18l-.72.55-2.56 1.99a9.99 9.99 0 0 0 8.73 5.23c2.84 0 5.22-.94 6.96-2.55l-3.28-2.53c-.9.6-2.05.96-3.68.96a6.39 6.39 0 0 1-6.03-4.24Z" /><path fill="#fbbc05" d="M3.27 8.05a9.98 9.98 0 0 0 0 7.15l3.28-2.55a6.35 6.35 0 0 1 0-2.04l-3.28-2.56Z" /><path fill="#4285f4" d="M12 4.1c1.54 0 2.91.53 4 1.56l2.98-2.98A10 10 0 0 0 3.27 8.05l3.28 2.56A6.39 6.39 0 0 1 12 4.1Z" /></svg>;
}

function AppleIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="currentColor" d="M16.5 13.06c-.02-2.28 1.88-3.37 1.96-3.42-1.07-1.56-2.73-1.77-3.31-1.79-1.4-.14-2.74.82-3.45.82-.72 0-1.82-.8-3-.78-1.55.03-2.98.9-3.77 2.29-1.61 2.79-.41 6.92 1.16 9.19.77 1.1 1.68 2.33 2.88 2.28 1.15-.05 1.59-.74 2.98-.74s1.8.74 3.01.72c1.23-.02 2-1.12 2.75-2.24.89-1.29 1.25-2.54 1.27-2.6-.03-.01-2.43-.93-2.48-3.73Zm-2.31-6.66c.63-.76 1.06-1.8.94-2.84-.91.04-2.01.63-2.66 1.39-.58.66-1.09 1.72-.95 2.74 1 .08 2.02-.52 2.67-1.29Z" /></svg>;
}
