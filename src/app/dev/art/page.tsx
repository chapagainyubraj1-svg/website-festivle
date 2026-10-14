import { DashainScene } from "@/components/art/scenes/DashainScene";

export const metadata = { robots: { index: false } };

export default function ArtPreview() {
  return (
    <div className="space-y-8 p-6">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <DashainScene className="h-full w-full" />
      </div>
    </div>
  );
}
