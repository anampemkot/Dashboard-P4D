import * as React from "react";
import { CustomScrollbarApp } from "@/packages/design-system";
import { ScrollText } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

const longList = Array.from({ length: 10 }, (_, i) => `Item Daftar Objek Pajak #${i + 1}`);
const wideContent = Array.from({ length: 12 }, (_, i) => `Kolom-${i + 1}`);

function ScrollList() {
  return (
    <div className="flex flex-col gap-2 p-3">
      {longList.map((item) => (
        <div key={item} className="rounded-lg bg-surface-soft/60 px-3 py-2 text-xs text-ink-secondary">{item}</div>
      ))}
    </div>
  );
}

export function CustomScrollbarDisplayModule() {
  return (
    <ModuleCard
      id="uikit-custom-scrollbar-module"
      icon={<ScrollText className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CustomScrollbarApp"
      description="Kustomisasi bilah scrollbar vertical & horizontal dengan warna track transparan, thumb berwarna & rounded, serta efek hover thumb menjadi lebih tebal/gelap."
    >
      <ShowcaseGroup
        id="custom-scrollbar-group-thickness"
        title="Thickness"
        description="thin · default · thick — semua vertical, variant disamakan purple agar hanya ketebalan yang berbeda"
        cols={3}
      >
        <ShowcaseCard
          id="scrollbar-showcase-thickness-thin"
          title="Thickness thin"
          description="Bilah paling ramping — untuk daftar padat di panel sempit"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="220px" variant="purple" thickness="thin" orientation="vertical">\n  {items}\n</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-thickness-thin-demo" maxHeight="220px" variant="purple" thickness="thin" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="scrollbar-showcase-thickness-default"
          title="Thickness default"
          description="Ketebalan standar katalog"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="220px" variant="purple" thickness="default" orientation="vertical">\n  {items}\n</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-thickness-default-demo" maxHeight="220px" variant="purple" thickness="default" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="scrollbar-showcase-thickness-thick"
          title="Thickness thick"
          description="Bilah paling tebal — thumb menggelap saat hover"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="220px" variant="purple" thickness="thick" orientation="vertical">\n  {items}\n</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-thickness-thick-demo" maxHeight="220px" variant="purple" thickness="thick" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="custom-scrollbar-group-variant"
        title="Variant"
        description="purple · subtle · dark · yellow · blue — semua thickness default"
        cols={3}
      >
        <ShowcaseCard
          id="scrollbar-showcase-variant-purple"
          title="Variant purple"
          description="Warna thumb brand — default katalog"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="200px" variant="purple" orientation="vertical">{items}</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-variant-purple-demo" maxHeight="200px" variant="purple" thickness="default" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="scrollbar-showcase-variant-subtle"
          title="Variant subtle"
          description="Thumb netral samar — untuk panel yang tidak boleh menarik perhatian"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="200px" variant="subtle" orientation="vertical">{items}</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-variant-subtle-demo" maxHeight="200px" variant="subtle" thickness="default" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="scrollbar-showcase-variant-dark"
          title="Variant dark"
          description="Thumb gelap — kontras tinggi di atas surface terang"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="200px" variant="dark" orientation="vertical">{items}</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-variant-dark-demo" maxHeight="200px" variant="dark" thickness="default" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="scrollbar-showcase-variant-yellow"
          title="Variant yellow"
          description="Aksen kuning — dipakai pada konten bertanda peringatan"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="200px" variant="yellow" orientation="vertical">{items}</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-variant-yellow-demo" maxHeight="200px" variant="yellow" thickness="default" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="scrollbar-showcase-variant-blue"
          title="Variant blue"
          description="Aksen biru — dipakai pada konten informatif"
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxHeight="200px" variant="blue" orientation="vertical">{items}</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-variant-blue-demo" maxHeight="200px" variant="blue" thickness="default" orientation="vertical">
            <ScrollList />
          </CustomScrollbarApp>
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="scrollbar-showcase-horizontal"
          title="Horizontal Scrollbar"
          description='orientation="horizontal" — konten lebar seperti tabel ringkas'
          align="start"
          code={`<CustomScrollbarApp id="scrollbar" maxWidth="100%" orientation="horizontal" variant="yellow" thickness="default">\n  {items}\n</CustomScrollbarApp>`}
        >
          <CustomScrollbarApp id="scrollbar-showcase-horizontal-demo" maxWidth="100%" orientation="horizontal" variant="yellow" thickness="default">
            <div className="flex gap-3 p-3">
              {wideContent.map((item) => <div key={item} className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg bg-surface-soft/60 text-xs font-semibold text-ink-secondary">{item}</div>)}
            </div>
          </CustomScrollbarApp>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
