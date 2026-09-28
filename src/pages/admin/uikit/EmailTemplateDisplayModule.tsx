import * as React from "react";
import {
  WelcomeEmailApp,
  PasswordResetEmailApp,
  ButtonApp,
  WelcomeEmailVariant,
  PasswordResetEmailVariant,
} from "@/packages/design-system";
import { Mail, KeyRound } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

export function EmailTemplateDisplayModule() {
  const [welcomeVariant, setWelcomeVariant] = React.useState<WelcomeEmailVariant>("onboarding");
  const [resetVariant, setResetVariant] = React.useState<PasswordResetEmailVariant>("standard");

  return (
    <ModuleCard
      id="demo-email-template"
      icon={<Mail className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Email Templates"
      description="Template email transaksional (WelcomeEmailApp & PasswordResetEmailApp) disusun dari CardApp, TextApp, ButtonApp, SeparatorApp, BadgeApp, dan AlertApp — konsisten dengan token foundation."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="email-template-showcase-welcome"
          title="Welcome Email"
          description="Email sambutan untuk onboarding pengguna baru maupun konfirmasi pembuatan akun"
          align="start"
          code={`<WelcomeEmailApp id="welcome-email" variant="onboarding" />`}
        >
          <div className="w-full space-y-3">
            <div className="flex flex-wrap gap-2">
              <ButtonApp id="welcome-tab-onboarding" variant={welcomeVariant === "onboarding" ? "primary" : "secondary"} size="sm" onClick={() => setWelcomeVariant("onboarding")}>Onboarding</ButtonApp>
              <ButtonApp id="welcome-tab-account" variant={welcomeVariant === "account-creation" ? "primary" : "secondary"} size="sm" onClick={() => setWelcomeVariant("account-creation")}>Account Creation</ButtonApp>
            </div>
            <div className="rounded-2xl border border-hairline-soft bg-surface-soft/40 p-4 sm:p-6">
              <WelcomeEmailApp id={`welcome-email-preview-${welcomeVariant}`} variant={welcomeVariant} />
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="email-template-showcase-password-reset"
          title="Password Reset Email"
          description="Varian standard (tautan reset) dan OTP (kode verifikasi), dilengkapi alert masa kedaluwarsa"
          align="start"
          code={`<PasswordResetEmailApp id="reset-email" variant="standard" />`}
        >
          <div className="w-full space-y-3">
            <div className="flex flex-wrap gap-2">
              <ButtonApp id="reset-tab-standard" variant={resetVariant === "standard" ? "primary" : "secondary"} size="sm" onClick={() => setResetVariant("standard")}>Standard</ButtonApp>
              <ButtonApp id="reset-tab-otp" variant={resetVariant === "otp" ? "primary" : "secondary"} size="sm" onClick={() => setResetVariant("otp")}>OTP</ButtonApp>
            </div>
            <div className="rounded-2xl border border-hairline-soft bg-surface-soft/40 p-4 sm:p-6">
              <PasswordResetEmailApp id={`reset-email-preview-${resetVariant}`} variant={resetVariant} />
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
