import * as React from "react";
import {
  GoogleSignInApp,
  AppleSignInApp,
  StripePaymentApp,
  TextApp,
  BadgeApp,
  ButtonApp,
} from "@/packages/design-system";
import type { StripePaymentVariant } from "@/packages/design-system";
import { LogIn, Info } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

export function AuthProviderPaymentDisplayModule() {
  const [stripeVariant, setStripeVariant] = React.useState<StripePaymentVariant>("elements");

  return (
    <ModuleCard
      id="demo-auth-provider-payment"
      icon={<LogIn className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Auth Provider & Payment"
      description="Tombol sign-in pihak ketiga (GoogleSignInApp, AppleSignInApp) dan form pembayaran bergaya Stripe (StripePaymentApp) — seluruhnya presentasional dengan data dummy, tanpa SDK atau kredensial nyata."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseGroup id="auth-provider-payment-group-social-sign-in" title="Google & Apple Sign-In" description="GoogleSignInApp (standard · one-tap) dan AppleSignInApp (black · white-outline)" cols={4}>
          <ShowcaseCard
            id="auth-provider-payment-showcase-google-standard"
            title="Google Sign-In standard"
            description='variant="standard" buttonStyle="light" shape="pill"'
            code={`<GoogleSignInApp id="gsi" variant="standard" buttonStyle="light" shape="pill" />`}
          >
            <GoogleSignInApp
              id="auth-provider-payment-showcase-google-standard-demo"
              variant="standard"
              buttonStyle="light"
              shape="pill"
              size="md"
              clientId="p4d-bpkad.apps.googleusercontent.com"
              scopes={["openid", "email", "profile"]}
            />
          </ShowcaseCard>

          <ShowcaseCard
            id="auth-provider-payment-showcase-google-one-tap"
            title="Google Sign-In one-tap"
            description='variant="one-tap" — kartu overlay ringkas'
            code={`<GoogleSignInApp id="gsi-onetap" variant="one-tap" />`}
          >
            <GoogleSignInApp id="auth-provider-payment-showcase-google-one-tap-demo" variant="one-tap" />
          </ShowcaseCard>

          <ShowcaseCard
            id="auth-provider-payment-showcase-apple-black"
            title="Apple Sign-In black"
            description='buttonStyle="black"'
            code={`<AppleSignInApp id="asi" buttonStyle="black" size="md" />`}
          >
            <AppleSignInApp id="auth-provider-payment-showcase-apple-black-demo" buttonStyle="black" size="md" />
          </ShowcaseCard>

          <ShowcaseCard
            id="auth-provider-payment-showcase-apple-white-outline"
            title="Apple Sign-In white-outline"
            description='buttonStyle="white-outline"'
            code={`<AppleSignInApp id="asi" buttonStyle="white-outline" size="md" />`}
          >
            <AppleSignInApp id="auth-provider-payment-showcase-apple-white-outline-demo" buttonStyle="white-outline" size="md" />
          </ShowcaseCard>
        </ShowcaseGroup>

        <ShowcaseCard
          id="auth-provider-payment-showcase-stripe"
          title="Stripe Payment"
          description="Form pembayaran bergaya Stripe Elements (input kartu & metode pembayaran) dan ringkasan Checkout"
          align="start"
          className="md:col-span-2"
          code={`<StripePaymentApp id="stripe-payment" variant="elements" amount={155000} currency="IDR" />`}
        >
          <div className="w-full space-y-4">
            <div className="flex flex-wrap gap-2">
              <ButtonApp id="stripe-tab-elements" variant={stripeVariant === "elements" ? "primary" : "secondary"} size="sm" onClick={() => setStripeVariant("elements")}>Elements</ButtonApp>
              <ButtonApp id="stripe-tab-checkout" variant={stripeVariant === "checkout" ? "primary" : "secondary"} size="sm" onClick={() => setStripeVariant("checkout")}>Checkout</ButtonApp>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <TextApp id="stripe-disclaimer" variant="micro" className="text-ink-secondary">
                Catatan: seluruh nomor kartu, kode OTP, dan nominal pada modul ini adalah data contoh (dummy). Komponen ini tidak terhubung ke SDK Stripe maupun memproses transaksi sungguhan.
              </TextApp>
            </div>
            <div className="flex justify-center rounded-2xl border border-hairline-soft bg-surface-soft/40 p-4 sm:p-6">
              <StripePaymentApp id={`stripe-payment-preview-${stripeVariant}`} variant={stripeVariant} amount={155000} currency="IDR" />
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
