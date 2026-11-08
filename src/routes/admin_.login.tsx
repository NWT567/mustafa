import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Logo } from "@/components/logo";
import { adminLogin, getAdminSession } from "@/lib/admin-auth";

const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email or username"),
  password: z.string().min(1, "Enter your password"),
});

type LoginErrors = Partial<Record<"identifier" | "password" | "form", string>>;

export const Route = createFileRoute("/admin_/login")({
  head: () => ({
    meta: [
      { title: "Admin Login - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Secure administrator access for Mustafa Coffee House operations.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (session.authenticated) {
      throw redirect({ to: "/admin" });
    }
    return { adminConfigured: session.configured };
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { adminConfigured } = Route.useRouteContext();
  const navigate = useNavigate();
  const login = useServerFn(adminLogin);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = loginSchema.safeParse({ identifier, password });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        identifier: fieldErrors.identifier?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await login({ data: parsed.data });
      if (!result.success) {
        setErrors({ form: result.message });
        return;
      }

      await navigate({ to: "/admin", replace: true });
    } catch {
      setErrors({
        form: "Admin login is temporarily unavailable. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-espresso text-cream">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-cream/10 pb-5">
          <Link to="/" aria-label="Mustafa Coffee House home">
            <Logo
              showWordmark
              className="h-11 w-auto brightness-0 invert sm:h-12"
            />
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center gap-2 rounded-lg px-3 text-sm text-cream/65 transition hover:bg-cream/5 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Open public website"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Public website</span>
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,0.65fr)] lg:py-16">
          <section className="hidden max-w-xl lg:block">
            <div className="inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
              <ShieldCheck className="h-4 w-4" />
              Restricted access
            </div>
            <h1 className="mt-7 font-display text-6xl leading-[0.98] tracking-tight text-cream">
              Operations, kept private and focused.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-cream/60">
              The administration console is reserved for authorized Mustafa
              Coffee House team members. Sessions are validated on the server
              and expire automatically.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-cream/10 pt-6 text-sm text-cream/55">
              <div>
                <div className="font-semibold text-cream">Server protected</div>
                <div className="mt-1">HTTP-only encrypted session</div>
              </div>
              <div>
                <div className="font-semibold text-cream">8-hour access</div>
                <div className="mt-1">Automatic session expiry</div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-md rounded-2xl border border-cream/10 bg-cream/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-8">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-soft">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Mustafa Coffee House
            </p>
            <h2 className="mt-2 font-display text-4xl text-cream">
              Admin login
            </h2>
            <p className="mt-3 text-sm leading-6 text-cream/55">
              Enter your administrator credentials to continue.
            </p>

            {!adminConfigured && (
              <div
                role="status"
                className="mt-6 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm leading-6 text-gold-soft"
              >
                Admin access has not been configured on this server. Add the
                required environment variables before signing in.
              </div>
            )}

            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <AdminField
                id="admin-identifier"
                label="Email or username"
                value={identifier}
                onChange={(value) => {
                  setIdentifier(value);
                  setErrors((current) => ({
                    ...current,
                    identifier: undefined,
                    form: undefined,
                  }));
                }}
                icon={Mail}
                autoComplete="username"
                error={errors.identifier}
                disabled={isSubmitting}
              />

              <AdminField
                id="admin-password"
                label="Password"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  setErrors((current) => ({
                    ...current,
                    password: undefined,
                    form: undefined,
                  }));
                }}
                icon={LockKeyhole}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                error={errors.password}
                disabled={isSubmitting}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="rounded-md p-1 text-cream/45 transition hover:bg-cream/5 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              {errors.form && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-100"
                >
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !adminConfigured}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-espresso transition hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-espresso disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-espresso/30 border-t-espresso" />
                    Signing in
                  </>
                ) : (
                  <>
                    Sign in securely
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 border-t border-cream/10 pt-5 text-xs leading-5 text-cream/40">
              Access attempts are validated by the server. Contact the system
              owner if you need administrator credentials.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function AdminField({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  type = "text",
  autoComplete,
  error,
  trailing,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  autoComplete?: string;
  error?: string;
  trailing?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-cream/75"
      >
        {label}
      </label>
      <div
        className={`flex h-12 items-center gap-3 rounded-xl border bg-black/10 px-3.5 transition focus-within:border-gold/70 focus-within:ring-2 focus-within:ring-gold/15 ${
          error ? "border-red-300/50" : "border-cream/15"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0 text-cream/35" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent text-sm text-cream outline-none placeholder:text-cream/25 disabled:cursor-not-allowed"
        />
        {trailing}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
