import { GearItem } from "@/lib/gear-context";
import { GearCard } from "./gear-card";

export function RelatedGearList({ items }: { items: GearItem[] }) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
