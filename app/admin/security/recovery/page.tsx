import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { getAdminPrincipal } from "@/lib/admin-auth";
import { acknowledgeRecoveryCodesAction } from "../actions";

export default async function RecoveryCodesPage() {
  const principal = await getAdminPrincipal();
  if (!principal?.userId) redirect("/admin/login");
  const cookieStore = await cookies();
  const encoded = cookieStore.get("noam_admin_recovery_codes")?.value;
  if (!encoded) redirect("/admin/security");
  let codes: string[] = [];
  try { codes = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as string[]; } catch { redirect("/admin/security"); }
  return <Section className="pt-16 md:pt-20"><Container size="narrow"><Eyebrow className="text-rust">MFA activado</Eyebrow><Heading as="h1" size="xl">Guarda estos códigos ahora.</Heading><p className="mt-5 text-sm leading-7 text-ink/70">Cada código funciona una sola vez si pierdes acceso a tu aplicación autenticadora. NOAM sólo almacena sus hashes y no podrá volver a mostrarlos.</p><div className="mt-8 grid grid-cols-2 gap-2 rounded-md border border-border bg-panel p-6 font-mono text-sm tracking-[0.08em] text-ink">{codes.map((code) => <span key={code}>{code}</span>)}</div><form action={acknowledgeRecoveryCodesAction} className="mt-8"><Button type="submit">Confirmo que los guardé</Button></form></Container></Section>;
}
