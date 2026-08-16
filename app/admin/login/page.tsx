import { LockKeyhole } from "lucide-react";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { loginAdmin } from "@/app/admin/login/actions";
import { legacyAdminEnabled } from "@/lib/admin-auth";

interface AdminLoginPageProps { searchParams: Promise<{ error?: string; loggedOut?: string }> }

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const error = params.error === "rate" ? "Demasiados intentos. Espera 15 minutos antes de volver a probar." : params.error ? "Email o contraseña incorrectos." : null;
  const legacyEnabled = legacyAdminEnabled();

  return (
    <Section className="pt-16 md:pt-20">
      <Container size="narrow">
        <LockKeyhole className="mb-7 h-5 w-5 text-rust" aria-hidden />
        <Eyebrow>NOAM OS</Eyebrow>
        <Heading as="h1" size="xl" className="mb-4">Acceso interno.</Heading>
        <p className="mb-8 text-sm leading-7 text-ink/70">Cada operador utiliza una identidad propia. Las sesiones vencen, pueden revocarse y las acciones críticas quedan registradas.</p>

        {params.loggedOut ? <p className="mb-4 rounded-sm border border-border bg-panel px-4 py-3 text-sm text-ink/70">La sesión fue cerrada y revocada.</p> : null}
        <form action={loginAdmin} className="space-y-5 rounded-md border border-border bg-panel p-6 shadow-subtle">
          <label className="grid gap-2 text-sm font-medium text-ink">Email
            <input name="email" type="email" required autoComplete="username" className="min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm text-ink outline-none focus:border-ink" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">Contraseña
            <input name="password" type="password" required minLength={14} maxLength={128} autoComplete="current-password" className="min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm text-ink outline-none focus:border-ink" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">Código MFA <span className="font-normal text-muted">(si está activado)</span>
            <input name="secondFactor" inputMode="numeric" autoComplete="one-time-code" placeholder="6 dígitos o código de recuperación" className="min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm uppercase text-ink outline-none focus:border-ink" />
          </label>
          {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
          <Button type="submit">Entrar</Button>
        </form>
        {legacyEnabled ? <details className="mt-4 rounded-md border border-border bg-panel p-5"><summary className="cursor-pointer text-xs font-medium text-muted">Acceso heredado temporal</summary><form action={loginAdmin} className="mt-4 flex flex-col gap-3"><label className="grid gap-2 text-sm font-medium text-ink">Token heredado<input name="legacyToken" type="password" required autoComplete="off" className="min-h-11 rounded-sm border border-border bg-canvas px-3 text-sm" /></label><Button type="submit" variant="secondary">Entrar temporalmente</Button></form></details> : null}
        <p className="mt-6 text-xs leading-6 text-muted">La primera identidad se crea desde terminal con <code className="rounded bg-panel px-1 py-0.5">npm run admin:create</code>. La contraseña inicial sólo se muestra una vez.</p>
      </Container>
    </Section>
  );
}
