import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { ROLES, Role } from "@/constants/roles";
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { JogjaLogo } from "@/components/ui/JogjaLogo";
import { SelectApp } from "@/packages/design-system";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Drs. Kadarisman, M.Si.",
    handle: "@kepala_bpkad",
    text: "Sistem P4D sangat membantu evaluasi dan pemantauan realisasi penerimaan pajak daerah secara terpadu."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Sri Rahayu, S.E.",
    handle: "@sekretaris_p4d",
    text: "Dashboard responsif dan memudahkan rekapitulasi data kepatuhan wajib pajak hotel & restoran."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Heru Handoko, S.IP.",
    handle: "@kabid_pendataan",
    text: "Integrasi visualisasi grafik Recharts memudahkan pengambilan keputusan strategis instansi."
  },
];

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = React.useState<Role>("kepala-bpkad");
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    const defaultNames: Record<Role, string> = {
      "kepala-bpkad": "Drs. Kadarisman, M.Si.",
      "sekretaris": "Sri Rahayu, S.E., M.Acc.",
      "kepala-bidang": "Heru Handoko, S.IP.",
      "kasubbid-pelayanan": "Budi Santoso, S.STP.",
      "kasubbid-pendataan": "Siti Aminah, S.Kom.",
      "kasubbid-penetapan": "Roni Wijaya, S.H.",
      "operator": "Agus Setiawan",
      "administrator": "Super Admin BPKAD",
    };
    setName(defaultNames[selectedRole] || "");
  }, [selectedRole]);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(selectedRole, name || "Pengguna BPKAD");
    navigate("/admin");
  };

  const handleGoogleSignIn = () => {
    login(selectedRole, name || "Pengguna BPKAD (Google)");
    navigate("/admin");
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-foreground/80 hover:text-foreground bg-surface/80 backdrop-blur-md px-3 py-2 rounded-xl border border-hairline shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Beranda
        </Link>
      </div>

      <SignInPage
        title={
          <div className="flex items-center gap-3">
            <JogjaLogo size="lg" />
            <span className="font-semibold text-2xl text-foreground tracking-tight">
              Masuk Portal P4D
            </span>
          </div>
        }
        description="Akses dashboard evaluasi dan statistik pajak daerah Daerah Istimewa Yogyakarta."
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={() => alert("Silakan hubungi Administrator BPKAD untuk reset kata sandi.")}
        onCreateAccount={() => alert("Pendaftaran akun baru diproses melalui Subbid Pendataan BPKAD.")}
      >
        {/* Role Selector & Demo Notice embedded in Sign In Form */}
        <div className="bg-vibrant-grey-bg/50 border border-hairline p-4 rounded-2xl mb-2 text-left space-y-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-xs font-bold font-display uppercase tracking-wider">
              Mode Otoritas Sandbox
            </span>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">
              Pilih Peran Stakeholder (Role Login):
            </label>
            <SelectApp
              id="login-role-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
              options={ROLES.map((r) => ({
                value: r.id,
                label: r.label,
              }))}
            />
          </div>
        </div>
      </SignInPage>
    </div>
  );
}
