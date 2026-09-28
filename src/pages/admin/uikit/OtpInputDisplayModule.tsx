import * as React from "react";
import {
  OtpInputApp,
  TextApp,
  CardApp,
  BadgeApp,
  ButtonApp,
} from "@/packages/design-system";
import { KeyRound, Settings, Info, Code, Check, RefreshCw } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function OtpInputDisplayModule() {
  // Playground State
  const [playLength, setPlayLength] = React.useState<4 | 6>(6);
  const [playMasked, setPlayMasked] = React.useState<boolean>(false);
  const [playVariant, setPlayVariant] = React.useState<"default" | "error" | "success">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "xl" | "full">("lg");
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playValue, setPlayValue] = React.useState<string>("");
  const [completedCode, setCompletedCode] = React.useState<string>("");

  // Demo interactive states
  const [resendTimer, setResendTimer] = React.useState<number>(30);
  const [canResend, setCanResend] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timer: any;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResend = () => {
    setResendTimer(30);
    setCanResend(false);
  };

  const codeString = `<OtpInputApp\n  id="demo-otp-input"\n  length={${playLength}}\n  variant="${playVariant}"\n  size="${playSize}"\n  rounded="${playRounded}"${playMasked ? "\n  masked" : ""}${playDisabled ? "\n  disabled" : ""}\n  onChange={(val) => console.log(val)}\n  onComplete={(val) => alert("Complete: " + val)}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-otpinput-module"
      icon={<KeyRound className="w-5 h-5 text-vibrant-purple-dark" />}
      title="OtpInputApp (OTP / PIN Input)"
      description="Komponen masukan OTP/PIN multi-digit dengan dukungan auto-advance, backspace-advance, paste 4/6 digit, mode tersembunyi (masked PIN), serta indikator state error/success."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container) */}
      <CardApp id="otp-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="otp-card-showcase-title" variant="h4" weight="bold">
              OtpInputApp Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="otp-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: 4-Digit Standard Input */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="otp-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. 4-Digit Standard OTP Input (length={4})
            </TextApp>
            <OtpInputApp
              id="otp-demo-4digit"
              length={4}
              label="Kode Verifikasi 4-Digit"
              description="Masukkan 4 digit kode OTP yang dikirim melalui SMS"
              defaultValue="74"
            />
          </div>

          {/* Item 2: 6-Digit Masked PIN Input */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="otp-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. 6-Digit Masked PIN Input (masked)
            </TextApp>
            <OtpInputApp
              id="otp-demo-masked"
              length={6}
              masked
              label="PIN Transaksi Keuangan"
              description="Digit tersembunyi untuk keamanan transaksi"
              defaultValue="123456"
            />
          </div>

          {/* Item 3: Error State Input */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="otp-item3-badge" variant="caption" weight="bold" className="text-red-500 uppercase tracking-wider block">
              3. Error State (error / variant="error")
            </TextApp>
            <OtpInputApp
              id="otp-demo-error"
              length={6}
              error
              label="Kode OTP Kadaluarsa"
              description="Contoh tampilan ketika kode salah atau expired"
              defaultValue="982104"
              errorMessage="Kode OTP tidak valid atau telah kadaluarsa. Silakan minta kode baru."
            />
          </div>

          {/* Item 4: Success State Input */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="otp-item4-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              4. Success State (success / variant="success")
            </TextApp>
            <OtpInputApp
              id="otp-demo-success"
              length={6}
              success
              label="Verifikasi Berhasil"
              description="Contoh tampilan ketika kode OTP telah sesuai"
              defaultValue="882190"
              successMessage="Kode verifikasi cocok! Melanjutkan ke halaman dashboard..."
            />
          </div>

          {/* Item 5: Disabled & Resend Action State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <TextApp id="otp-item5-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
                5. Resend Timer &amp; Action Utility Demo
              </TextApp>
              <div className="flex items-center gap-2">
                {!canResend ? (
                  <TextApp id="otp-timer-count" variant="caption" className="text-ink-muted text-xs font-mono">
                    Kirim ulang dalam 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                  </TextApp>
                ) : (
                  <ButtonApp
                    id="otp-resend-btn"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResend}
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" /> Kirim Ulang Kode
                  </ButtonApp>
                )}
              </div>
            </div>

            <OtpInputApp
              id="otp-demo-timer"
              length={6}
              label="Kirim Ulang OTP Demo"
              description="Integrasi penghitung waktu mundur kirim ulang OTP"
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="otp-sec2-title" variant="h4" weight="bold">
            Live Interactive OtpInput Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="otp-play-len-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Length (`length`)
                </TextApp>
                <div className="flex gap-1">
                  {([4, 6] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setPlayLength(l)}
                      className={cn(
                        "flex-1 px-2.5 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer",
                        playLength === l
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {l} Digits
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <TextApp id="otp-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Variant (`variant`)
                </TextApp>
                <div className="flex gap-1">
                  {(["default", "error", "success"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setPlayVariant(v)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer capitalize",
                        playVariant === v
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="otp-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Size (`size`)
                </TextApp>
                <div className="flex gap-1">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPlaySize(s)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer uppercase",
                        playSize === s
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <TextApp id="otp-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Rounded (`rounded`)
                </TextApp>
                <select
                  value={playRounded}
                  onChange={(e) => setPlayRounded(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1 text-ink"
                >
                  <option value="none">none</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                  <option value="full">full</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playMasked}
                  onChange={(e) => setPlayMasked(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="otp-play-mask-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Mode PIN Tersembunyi (`masked`)
                </TextApp>
              </label>

              <br />

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="otp-play-dis-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Control (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="otp-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>

            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[150px] flex flex-col items-center justify-center space-y-3">
              <OtpInputApp
                id="interactive-otp-input"
                label="Uji Coba Masukan OTP Interaktif"
                description="Ketik angka atau tempel (paste) kode OTP ke kotak digit"
                length={playLength}
                variant={playVariant}
                size={playSize}
                rounded={playRounded}
                masked={playMasked}
                disabled={playDisabled}
                value={playValue}
                onChange={setPlayValue}
                onComplete={(val) => setCompletedCode(val)}
                errorMessage={playVariant === "error" ? "Kode OTP salah!" : undefined}
                successMessage={playVariant === "success" ? "Verifikasi sukses!" : undefined}
              />

              {completedCode && (
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center w-full">
                  <TextApp id="otp-completed-alert" variant="caption" weight="semibold" className="text-emerald-700 dark:text-emerald-300">
                    Callback `onComplete` Dipicu: <strong>{completedCode}</strong>
                  </TextApp>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="otp-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> JSX Snippet
                </TextApp>
                <button
                  onClick={copyCode}
                  className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-success" /> Copied!
                    </>
                  ) : (
                    "Copy JSX"
                  )}
                </button>
              </div>
              <pre className="text-[10px] font-mono bg-vibrant-grey-bg/60 p-2.5 rounded border border-hairline-soft text-ink-muted overflow-x-auto">
                {codeString}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: INFORMATIONAL UTILITIES */}
      <div className="flex items-start gap-3 bg-block-cream/40 border border-block-cream/80 p-4 rounded-card-custom text-left mt-4">
        <Info className="w-5 h-5 text-vibrant-purple-dark flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed space-y-1">
          <TextApp id="otp-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System OtpInput Matrix &amp; Rules
          </TextApp>
          <TextApp id="otp-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>OtpInputApp</code> mengikuti aturan Spacing Step 2 (8px / <code>gap-2</code>) untuk jarak antar digit box dan pesan feedback, Step 3 (12px / <code>gap-3</code>) untuk pemisah kelompok 3-3 digit, dan Step 4 (16px / <code>gap-4</code>) untuk spacing antar varian.
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
