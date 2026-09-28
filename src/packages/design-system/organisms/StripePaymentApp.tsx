import * as React from "react";
import { CreditCard, Landmark, Wallet, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { SeparatorApp } from "../atoms/SeparatorApp";
import { InputApp } from "../atoms/InputApp";
import { FormFieldApp } from "../molecules/FormFieldApp";
import { RadioApp } from "../atoms/RadioApp";

export type StripePaymentVariant = "elements" | "checkout";

export interface StripePaymentMethodOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StripePaymentOrderItem {
  label: string;
  amount: number;
}

export interface StripePaymentAppProps {
  id: string;
  variant?: StripePaymentVariant;
  amount: number;
  currency?: string;
  items?: StripePaymentOrderItem[];
  paymentMethods?: StripePaymentMethodOption[];
  paymentMethod?: string;
  onPaymentMethodChange?: (methodId: string) => void;
  onPay?: () => void;
  className?: string;
}

const defaultPaymentMethods: StripePaymentMethodOption[] = [
  { id: "card", label: "Kartu Kredit/Debit", icon: <CreditCard className="h-4 w-4" /> },
  { id: "bank", label: "Transfer Bank", icon: <Landmark className="h-4 w-4" /> },
  { id: "ewallet", label: "E-Wallet", icon: <Wallet className="h-4 w-4" /> },
];

const defaultItems: StripePaymentOrderItem[] = [
  { label: "Retribusi Layanan Digital P4D", amount: 150000 },
  { label: "Biaya Administrasi", amount: 5000 },
];

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function StripePaymentApp({
  id,
  variant = "elements",
  amount,
  currency = "IDR",
  items = defaultItems,
  paymentMethods = defaultPaymentMethods,
  paymentMethod,
  onPaymentMethodChange,
  onPay,
  className,
}: StripePaymentAppProps) {
  const [cardNumber, setCardNumber] = React.useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = React.useState("12/28");
  const [cvc, setCvc] = React.useState("123");
  const [internalMethod, setInternalMethod] = React.useState(paymentMethods[0]?.id ?? "card");

  const method = paymentMethod ?? internalMethod;
  const setMethod = (methodId: string) => {
    if (paymentMethod === undefined) setInternalMethod(methodId);
    onPaymentMethodChange?.(methodId);
  };

  const total = items.length > 0 ? items.reduce((sum, item) => sum + item.amount, 0) : amount;

  return (
    <CardApp
      id={id}
      variant="neutral"
      size="md"
      rounded="lg"
      className={cn("mx-auto w-full max-w-[420px] gap-5 shadow-vibrant-soft", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-purple/15 text-vibrant-purple-dark">
            <CreditCard className="h-4 w-4" />
          </div>
          <TextApp id={`${id}-title`} variant="h6" className="text-ink">
            {variant === "elements" ? "Payment Elements" : "Checkout"}
          </TextApp>
        </div>
        <BadgeApp id={`${id}-mode-badge`} variant="accent" size="sm">
          Demo Data
        </BadgeApp>
      </div>

      {variant === "checkout" && (
        <div id={`${id}-order-summary`} className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-hairline-soft bg-surface-soft/50 p-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs text-ink-secondary">
              <span>{item.label}</span>
              <span className="font-mono">{formatCurrency(item.amount, currency)}</span>
            </div>
          ))}
          <SeparatorApp id={`${id}-order-separator`} orientation="horizontal" variant="soft" className="my-1" />
          <div className="flex items-center justify-between text-sm font-bold text-ink">
            <span>Total</span>
            <span className="font-mono">{formatCurrency(total, currency)}</span>
          </div>
        </div>
      )}

      <div id={`${id}-payment-methods`} className="flex flex-col gap-2">
        <TextApp id={`${id}-methods-label`} variant="micro" weight="semibold" className="uppercase tracking-wider text-ink-secondary">
          Metode Pembayaran
        </TextApp>
        {paymentMethods.map((option) => (
          <label
            key={option.id}
            htmlFor={`${id}-method-${option.id}`}
            className={cn(
              "flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-md)] border p-2.5 transition-colors",
              method === option.id ? "border-vibrant-purple-dark bg-vibrant-purple/5" : "border-hairline-soft hover:bg-surface-soft"
            )}
          >
            <RadioApp
              id={`${id}-method-${option.id}`}
              name={`${id}-method`}
              checked={method === option.id}
              onChange={() => setMethod(option.id)}
            />
            <span className="text-ink-secondary">{option.icon}</span>
            <TextApp id={`${id}-method-${option.id}-label`} variant="body2" className="text-ink">
              {option.label}
            </TextApp>
          </label>
        ))}
      </div>

      {method === "card" && (
        <div id={`${id}-card-input`} className="flex flex-col gap-3">
          <FormFieldApp id={`${id}-card-number-field`} label="Nomor Kartu">
            <InputApp
              id={`${id}-card-number`}
              value={cardNumber}
              onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
              placeholder="4242 4242 4242 4242"
              leadingIcon={<CreditCard className="h-4 w-4" />}
              inputMode="numeric"
            />
          </FormFieldApp>
          <div className="grid grid-cols-2 gap-3">
            <FormFieldApp id={`${id}-expiry-field`} label="Kedaluwarsa">
              <InputApp id={`${id}-expiry`} value={expiry} onChange={(event) => setExpiry(formatExpiry(event.target.value))} placeholder="MM/YY" inputMode="numeric" />
            </FormFieldApp>
            <FormFieldApp id={`${id}-cvc-field`} label="CVC">
              <InputApp id={`${id}-cvc`} value={cvc} onChange={(event) => setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" inputMode="numeric" />
            </FormFieldApp>
          </div>
        </div>
      )}

      <SeparatorApp id={`${id}-summary-separator`} orientation="horizontal" variant="soft" />

      <div className="flex items-center justify-between">
        <TextApp id={`${id}-amount-label`} variant="caption" className="text-ink-muted">
          Total Pembayaran
        </TextApp>
        <TextApp id={`${id}-amount-value`} variant="h4" weight="bold" className="font-mono text-ink">
          {formatCurrency(total, currency)}
        </TextApp>
      </div>

      <ButtonApp id={`${id}-pay-cta`} variant="primary" size="lg" rounded="md" leftIcon={<Lock className="h-4 w-4" />} className="w-full" onClick={onPay}>
        Bayar Sekarang
      </ButtonApp>

      <div className="flex items-center justify-center gap-1.5 text-ink-muted">
        <ShieldCheck className="h-3.5 w-3.5" />
        <TextApp id={`${id}-secure-note`} variant="micro" className="text-ink-muted">
          Tampilan demo — tidak memproses transaksi kartu sungguhan
        </TextApp>
      </div>
    </CardApp>
  );
}
