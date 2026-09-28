import * as React from "react";
import { AccordionApp, AccordionItemData } from "@/packages/design-system";
import { Layers } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

const singleItems: AccordionItemData[] = [
  { id: "acc-1", title: "Apa itu NOP?", subtitle: "Pertanyaan Umum", content: "Nomor Objek Pajak (NOP) adalah nomor identitas unik setiap objek pajak PBB-P2 di wilayah BPKAD Kota Yogyakarta." },
  { id: "acc-2", title: "Bagaimana cara membayar pajak?", subtitle: "Panduan Pembayaran", content: "Pembayaran dapat dilakukan melalui bank mitra, e-channel, atau loket layanan pajak daerah." },
  { id: "acc-3", title: "Layanan Nonaktif", subtitle: "Sedang dalam perbaikan", content: "Fitur ini sedang tidak tersedia.", disabled: true },
];

export function AccordionDisplayModule() {
  return (
    <ModuleCard
      id="uikit-accordion-module"
      icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
      title="AccordionApp"
      description="Panel lipat single expand & multiple expand dengan header title/subtitle, ikon chevron/plus-minus, dan area konten."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="accordion-showcase-single"
          title="Single Expand (Chevron Icon)"
          description="Hanya satu panel yang bisa terbuka dalam satu waktu"
          align="start"
          code={`<AccordionApp id="accordion" items={items} type="single" iconStyle="chevron" variant="bordered" defaultExpandedIds={["acc-1"]} />`}
        >
          <AccordionApp id="accordion-single" items={singleItems} type="single" iconStyle="chevron" variant="bordered" defaultExpandedIds={["acc-1"]} />
        </ShowcaseCard>

        <ShowcaseCard
          id="accordion-showcase-multiple"
          title="Multiple Expand (Plus-Minus Icon)"
          description="Beberapa panel dapat terbuka bersamaan, varian separated"
          align="start"
          code={`<AccordionApp id="accordion" items={items} type="multiple" iconStyle="plusMinus" variant="separated" defaultExpandedIds={["acc-1", "acc-2"]} />`}
        >
          <AccordionApp id="accordion-multiple" items={singleItems} type="multiple" iconStyle="plusMinus" variant="separated" defaultExpandedIds={["acc-1", "acc-2"]} />
        </ShowcaseCard>

      </ShowcaseGrid>

      <ShowcaseGroup
        id="accordion-group-variant"
        title="Variant"
        description="default: garis pemisah tipis · vibrant: aksen ungu · bordered · separated"
        cols={2}
      >
        <ShowcaseCard
          id="accordion-showcase-variant-default"
          title="Variant default"
          description="Garis pemisah tipis antar panel"
          align="start"
          code={`<AccordionApp id="accordion" items={items} type="single" variant="default" />`}
        >
          <AccordionApp id="accordion-showcase-variant-default-demo" items={singleItems.slice(0, 2)} type="single" variant="default" />
        </ShowcaseCard>

        <ShowcaseCard
          id="accordion-showcase-variant-vibrant"
          title="Variant vibrant"
          description="Aksen ungu pada panel yang terbuka"
          align="start"
          code={`<AccordionApp id="accordion" items={items} type="single" variant="vibrant" />`}
        >
          <AccordionApp id="accordion-showcase-variant-vibrant-demo" items={singleItems.slice(0, 2)} type="single" variant="vibrant" defaultExpandedIds={["acc-1"]} />
        </ShowcaseCard>
      </ShowcaseGroup>
    </ModuleCard>
  );
}
