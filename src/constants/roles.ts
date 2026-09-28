export const ROLES = [
  { id: "kepala-bpkad", label: "Kepala BPKAD" },
  { id: "sekretaris", label: "Sekretaris" },
  { id: "kepala-bidang", label: "Kepala Bidang" },
  { id: "kasubbid-pelayanan", label: "Kasubbid Pelayanan" },
  { id: "kasubbid-pendataan", label: "Kasubbid Pendataan" },
  { id: "kasubbid-penetapan", label: "Kasubbid Penetapan" },
  { id: "operator", label: "Operator" },
  { id: "administrator", label: "Administrator" },
] as const;

export type Role = (typeof ROLES)[number]["id"];
