import * as React from "react";
import { CheckboxApp, RadioApp, RadioGroupApp, CardApp, BadgeApp } from "@/packages/design-system";
import { ModuleCard } from "./ModuleCard";
import { CheckSquare, Disc } from "lucide-react";

export function CheckboxRadioDisplayModule() {
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(false);
  const [errorChecked, setErrorChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(true);

  const [selectedRadio, setSelectedRadio] = React.useState("email");
  const [selectedMethod, setSelectedMethod] = React.useState("transfer");

  return (
    <ModuleCard
      id="uikit-checkbox-radio-module"
      icon={<CheckSquare className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CheckboxApp & RadioApp (Komponen Pilihan)"
      description="Komponen atom checkbox dan radio button kustom dengan dukungan label, deskripsi, status indeterminate, error message, dan radio group."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHECKBOX SECTION */}
        <CardApp id="checkbox-demo-card" className="space-y-4 p-4 border border-hairline-soft">
          <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
            <h4 className="text-sm font-bold font-display text-ink flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-vibrant-purple-dark" /> CheckboxApp
            </h4>
            <BadgeApp id="badge-checkbox" variant="purple" size="sm">Atom</BadgeApp>
          </div>

          <div className="space-y-3">
            <CheckboxApp
              id="chk-1"
              label="Ingat Perangkat Ini"
              description="Sesi Anda akan tetap aktif selama 30 hari ke depan"
              checked={checked1}
              onChange={(e) => setChecked1(e.target.checked)}
            />

            <CheckboxApp
              id="chk-2"
              label="Langganan Buletin Informasi BPKAD"
              description="Dapatkan pembaruan terkini mengenai kebijakan pengadaan & aset"
              checked={checked2}
              onChange={(e) => setChecked2(e.target.checked)}
            />

            <CheckboxApp
              id="chk-indeterminate"
              label="Pilih Semua Aset (Status Sebagian)"
              description="Status indeterminate menunjukkan hanya sebagian item yang dipilih"
              checked={false}
              indeterminate={indeterminate}
              onChange={() => setIndeterminate(!indeterminate)}
            />

            <CheckboxApp
              id="chk-disabled"
              label="Akses Super Admin (Non-aktif)"
              description="Fitur ini terkunci dan memerlukan izin verifikasi khusus"
              disabled
              checked={true}
              onChange={() => {}}
            />

            <CheckboxApp
              id="chk-error"
              label="Saya menyetujui syarat & ketentuan pengajuan"
              error={!errorChecked ? "Anda wajib menyetujui syarat dan ketentuan sebelum melanjutkan" : undefined}
              checked={errorChecked}
              onChange={(e) => setErrorChecked(e.target.checked)}
            />
          </div>
        </CardApp>

        {/* RADIO SECTION */}
        <CardApp id="radio-demo-card" className="space-y-4 p-4 border border-hairline-soft">
          <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
            <h4 className="text-sm font-bold font-display text-ink flex items-center gap-2">
              <Disc className="w-4 h-4 text-vibrant-purple-dark" /> RadioApp & RadioGroupApp
            </h4>
            <BadgeApp id="badge-radio" variant="purple" size="sm">Atom</BadgeApp>
          </div>

          <div className="space-y-4">
            <RadioGroupApp
              id="radio-notif-group"
              name="notif-method"
              label="Metode Notifikasi Pengajuan"
              value={selectedRadio}
              onChange={setSelectedRadio}
              options={[
                {
                  value: "email",
                  label: "Surel / Email Resmi",
                  description: "Kirim pemberitahuan langsung ke email instansi Anda",
                },
                {
                  value: "whatsapp",
                  label: "WhatsApp Gateway",
                  description: "Pemberitahuan cepat via pesan instan WhatsApp",
                },
                {
                  value: "sms",
                  label: "SMS Kritis (Non-aktif)",
                  description: "Layanan SMS sementara tidak tersedia",
                  disabled: true,
                },
              ]}
            />

            <div className="pt-2 border-t border-hairline-soft">
              <RadioGroupApp
                id="radio-direction-group"
                name="payment-method"
                label="Opsi Pengembalian Aset (Arah Horizontal)"
                direction="row"
                value={selectedMethod}
                onChange={setSelectedMethod}
                options={[
                  { value: "transfer", label: "Gudang Utama" },
                  { value: "cash", label: "SKPD Asal" },
                  { value: "other", label: "Penghapusan" },
                ]}
              />
            </div>
          </div>
        </CardApp>
      </div>
    </ModuleCard>
  );
}
