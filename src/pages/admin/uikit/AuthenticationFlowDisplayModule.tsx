import * as React from "react";
import {
  BadgeApp, ButtonApp, CardApp, CheckboxApp, InputApp, OtpInputApp, ScorecardApp, SeparatorApp, TextApp,
} from "@/packages/design-system";
import { ArrowRight, KeyRound, LockKeyhole, Mail, ShieldCheck, UserPlus, Wallet, TrendingUp, Receipt } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

export type AuthenticationPattern = "login" | "register" | "forgot-password" | "otp" | "split-earning";

function AuthPatternCard({ id, badge, title, description, children }: { id: string; badge: string; title: string; description: string; children: React.ReactNode }) {
  // Plain <div>, not <section> — ScrollProgressApp auto-scans the whole page for
  // `section[id]` to build its dot navigation, and this is a sub-pattern inside
  // one UI Kit category (10 - Templates & Patterns), not its own top-level section.
  return <div id={id} className="scroll-mt-20"><CardApp id={`${id}-card`} className="mx-auto max-w-md gap-5 p-5 md:p-6">
    <div className="text-center"><div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] bg-vibrant-purple/10 text-vibrant-purple-dark"><ShieldCheck className="h-5 w-5" /></div><BadgeApp id={`${id}-badge`} variant="solidPurple" size="sm">{badge}</BadgeApp><TextApp id={`${id}-title`} variant="h3" weight="bold" className="mt-3">{title}</TextApp><TextApp id={`${id}-description`} variant="caption" className="mt-1 text-ink-secondary">{description}</TextApp></div>
    {children}
  </CardApp></div>;
}

export function AuthenticationFlowDisplayModule({ pattern, onPatternChange }: { pattern?: AuthenticationPattern; onPatternChange?: (pattern: AuthenticationPattern) => void }) {
  const [otp, setOtp] = React.useState("");
  const show = (candidate: AuthenticationPattern) => !pattern || pattern === candidate;
  return <ModuleCard id="uikit-authentication-flow" icon={<LockKeyhole className="h-5 w-5 text-vibrant-purple-dark" />} title="Authentication Flow Patterns" description="Pattern Login, Register, Forgot Password, dan OTP Verification yang sepenuhnya mengomposisikan atom/molecule design system.">
    <ShowcaseGrid cols={pattern ? 1 : 2}>
      {show("login") && (
        <ShowcaseCard id="auth-flow-login" title="Login" description="Form masuk dengan remember-me, lupa sandi, dan social login" align="start" className={pattern ? "" : undefined} code={`<InputApp id="email" type="email" label="Email" leadingIcon={<Mail />} />\n<InputApp id="password" type="password" label="Kata Sandi" showPasswordToggle leadingIcon={<KeyRound />} />\n<ButtonApp id="submit" type="submit" variant="primary">Masuk</ButtonApp>`}>
          <AuthPatternCard id="auth-login" badge="Login" title="Masuk Portal P4D" description="Akses dashboard monitoring pajak daerah."><form className="space-y-4" onSubmit={(event) => { event.preventDefault(); onPatternChange?.("otp"); }}><InputApp id="auth-login-email" type="email" label="Email" placeholder="nama@jogjakota.go.id" leadingIcon={<Mail />} /><InputApp id="auth-login-password" type="password" label="Kata Sandi" placeholder="Masukkan kata sandi" showPasswordToggle leadingIcon={<KeyRound />} /><div className="flex items-center justify-between gap-3"><CheckboxApp id="auth-login-remember" label="Ingat saya" /><ButtonApp id="auth-login-forgot" type="button" variant="ghost" size="sm" onClick={() => onPatternChange?.("forgot-password")} className="h-auto min-h-0 p-0 text-xs font-semibold text-vibrant-purple-dark hover:underline">Lupa kata sandi?</ButtonApp></div><ButtonApp id="auth-login-submit" type="submit" variant="primary" className="w-full">Masuk <ArrowRight className="h-4 w-4" /></ButtonApp><SeparatorApp id="auth-login-divider" label="atau" /><ButtonApp id="auth-login-social" type="button" variant="secondary" className="w-full">Masuk dengan Google</ButtonApp><ButtonApp id="auth-login-register" type="button" variant="ghost" onClick={() => onPatternChange?.("register")} className="w-full">Belum punya akun? Daftar</ButtonApp></form></AuthPatternCard>
        </ShowcaseCard>
      )}

      {show("register") && (
        <ShowcaseCard id="auth-flow-register" title="Register" description="Form pendaftaran akun petugas atau wajib pajak" align="start" code={`<InputApp id="name" label="Nama Lengkap" leadingIcon={<UserPlus />} />\n<CheckboxApp id="terms" label="Saya menyetujui syarat..." />\n<ButtonApp id="submit" type="submit" variant="primary">Daftar Akun</ButtonApp>`}>
          <AuthPatternCard id="auth-register" badge="Register" title="Buat Akun Baru" description="Daftarkan akun petugas atau wajib pajak."><form className="space-y-4" onSubmit={(event) => { event.preventDefault(); onPatternChange?.("otp"); }}><InputApp id="auth-register-name" label="Nama Lengkap" placeholder="Masukkan nama lengkap" leadingIcon={<UserPlus />} /><InputApp id="auth-register-email" type="email" label="Email" placeholder="nama@jogjakota.go.id" leadingIcon={<Mail />} /><InputApp id="auth-register-password" type="password" label="Kata Sandi" placeholder="Minimal 8 karakter" showPasswordToggle leadingIcon={<KeyRound />} /><CheckboxApp id="auth-register-terms" label="Saya menyetujui syarat dan kebijakan privasi" /><ButtonApp id="auth-register-submit" type="submit" variant="primary" className="w-full">Daftar Akun</ButtonApp><SeparatorApp id="auth-register-divider" label="sudah terdaftar?" /><ButtonApp id="auth-register-login" type="button" variant="ghost" onClick={() => onPatternChange?.("login")} className="w-full">Masuk ke akun</ButtonApp></form></AuthPatternCard>
        </ShowcaseCard>
      )}

      {show("forgot-password") && (
        <ShowcaseCard id="auth-flow-forgot" title="Forgot Password" description="Kirim tautan pemulihan ke email terdaftar" align="start" code={`<InputApp id="email" type="email" label="Email Terdaftar" helperText="..." />\n<ButtonApp id="submit" type="submit" variant="primary">Kirim Tautan Pemulihan</ButtonApp>`}>
          <AuthPatternCard id="auth-forgot" badge="Recovery" title="Lupa Kata Sandi" description="Kami akan mengirimkan tautan pemulihan ke email terdaftar."><form className="space-y-4" onSubmit={(event) => { event.preventDefault(); onPatternChange?.("otp"); }}><InputApp id="auth-forgot-email" type="email" label="Email Terdaftar" placeholder="nama@jogjakota.go.id" leadingIcon={<Mail />} helperText="Pastikan email masih aktif dan dapat diakses." /><ButtonApp id="auth-forgot-submit" type="submit" variant="primary" className="w-full">Kirim Tautan Pemulihan</ButtonApp><ButtonApp id="auth-forgot-back" type="button" variant="ghost" onClick={() => onPatternChange?.("login")} className="w-full">Kembali ke Login</ButtonApp></form></AuthPatternCard>
        </ShowcaseCard>
      )}

      {show("otp") && (
        <ShowcaseCard id="auth-flow-otp" title="OTP Verification" description="Verifikasi enam digit kode dengan resend action" align="start" code={`<OtpInputApp id="otp" length={6} value={otp} onChange={setOtp} onComplete={setOtp} />\n<ButtonApp id="submit" variant="primary" disabled={otp.length < 6}>Verifikasi OTP</ButtonApp>`}>
          <AuthPatternCard id="auth-otp" badge="OTP Verification" title="Verifikasi Kode OTP" description="Masukkan enam digit kode yang dikirim ke email Anda."><div className="space-y-5"><OtpInputApp id="auth-otp-input" length={6} value={otp} onChange={setOtp} onComplete={setOtp} label="Kode Verifikasi" description="Kode berlaku selama 5 menit." size="md" /><ButtonApp id="auth-otp-submit" variant="primary" disabled={otp.length < 6} className="w-full">Verifikasi OTP</ButtonApp><div className="text-center"><TextApp id="auth-otp-resend-label" variant="caption" className="text-ink-muted">Tidak menerima kode?</TextApp><ButtonApp id="auth-otp-resend" variant="ghost" size="sm" className="mt-1">Kirim Ulang Kode</ButtonApp></div><ButtonApp id="auth-otp-back" variant="secondary" size="sm" onClick={() => { setOtp(""); onPatternChange?.("login"); }} className="w-full">Kembali ke Login</ButtonApp></div></AuthPatternCard>
        </ShowcaseCard>
      )}

      {show("split-earning") && (
        <ShowcaseCard id="auth-flow-split-earning" title="Split Layout · Login + Ringkasan Earning" description="Satu layar gabungan: form login di kiri, ringkasan capaian pendapatan daerah di kanan" align="start" className="md:col-span-2" code={`<div className="grid lg:grid-cols-2">\n  <form>...</form>\n  <ScorecardApp id="earning" title="Total Earning" value="Rp 42,8 M" variant="clayPurple" />\n</div>`}>
          <div id="auth-split-earning" className="w-full">
            <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-hairline shadow-vibrant-soft lg:grid-cols-2">
              {/* Left: Login form */}
              <div className="flex flex-col justify-center gap-5 bg-surface p-6 md:p-8">
                <div>
                  <BadgeApp id="auth-split-badge" variant="solidPurple" size="sm">Login · Total Earning</BadgeApp>
                  <TextApp id="auth-split-title" variant="h3" weight="bold" className="mt-3">Masuk Portal P4D</TextApp>
                  <TextApp id="auth-split-desc" variant="caption" className="mt-1 text-ink-secondary">Satu layar gabungan: form login di kiri, ringkasan capaian pendapatan daerah di kanan.</TextApp>
                </div>
                <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                  <InputApp id="auth-split-email" type="email" label="Email" placeholder="nama@jogjakota.go.id" leadingIcon={<Mail />} />
                  <InputApp id="auth-split-password" type="password" label="Kata Sandi" placeholder="Masukkan kata sandi" showPasswordToggle leadingIcon={<KeyRound />} />
                  <div className="flex items-center justify-between gap-3">
                    <CheckboxApp id="auth-split-remember" label="Ingat saya" />
                    <ButtonApp id="auth-split-forgot" type="button" variant="ghost" size="sm" className="h-auto min-h-0 p-0 text-xs font-semibold text-vibrant-purple-dark hover:underline">Lupa kata sandi?</ButtonApp>
                  </div>
                  <ButtonApp id="auth-split-submit" type="submit" variant="primary" className="w-full">Masuk <ArrowRight className="h-4 w-4" /></ButtonApp>
                  <SeparatorApp id="auth-split-divider" label="atau" />
                  <ButtonApp id="auth-split-social" type="button" variant="secondary" className="w-full">Masuk dengan Google</ButtonApp>
                </form>
              </div>

              {/* Right: Total Earning promo panel */}
              <div className="flex flex-col justify-center gap-5 bg-vibrant-purple-dark p-6 text-white md:p-8">
                <div>
                  <TextApp id="auth-split-panel-title" variant="h4" weight="bold" className="text-white">Ringkasan Penerimaan Daerah</TextApp>
                  <TextApp id="auth-split-panel-desc" variant="caption" className="mt-1 text-white/70">Pantau capaian pendapatan sebelum masuk ke dashboard lengkap.</TextApp>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ScorecardApp id="auth-split-total-earning" title="Total Earning" value="Rp 42,8 M" description="Bulan berjalan" icon={<Wallet className="h-4 w-4" />} trend={{ direction: "up", value: "12%" }} variant="clayPurple" />
                  <ScorecardApp id="auth-split-growth" title="Pertumbuhan" value="8,4%" description="vs bulan lalu" icon={<TrendingUp className="h-4 w-4" />} trend={{ direction: "up", value: "2,1%" }} variant="clayPurple" />
                  <ScorecardApp id="auth-split-transactions" title="Transaksi" value="1.284" description="Wajib pajak aktif" icon={<Receipt className="h-4 w-4" />} variant="clayPurple" className="sm:col-span-2" />
                </div>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      )}
    </ShowcaseGrid>
  </ModuleCard>;
}
