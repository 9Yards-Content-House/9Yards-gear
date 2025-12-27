
import gearData from "@/data/gear.json";
import categoriesData from "@/data/categories.json";
import { GearItem, GearCategory } from "./airtable"; // Reuse types

// Helper to simulate async behavior if needed by interface
// In a static build, reading JSON is instant.

export async function getAllGear(): Promise<GearItem[]> {
  return gearData as unknown as GearItem[];
}

export async function getGearById(id: string): Promise<GearItem | undefined> {
  const item = (gearData as unknown as GearItem[]).find((g) => g.id === id);
  return item;
}

export async function getGearByCategory(categoryId: string): Promise<GearItem[]> {
  const items = (gearData as unknown as GearItem[]).filter((g) => g.category === categoryId);
  return items;
}

export async function getFeaturedGear(): Promise<GearItem[]> {
  const items = (gearData as unknown as GearItem[]).filter((g) => g.featured);
  return items;
}

export async function getAvailableGear(): Promise<GearItem[]> {
  const items = (gearData as unknown as GearItem[]).filter((g) => g.available);
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllCategories(): Promise<GearCategory[]> {
  return categoriesData as unknown as GearCategory[];
}

export async function getCategoryById(id: string): Promise<GearCategory | undefined> {
  const cat = (categoriesData as unknown as GearCategory[]).find((c) => c.id === id);
  return cat;
}

export async function getRelatedGear(currentId: string, category: string, limit = 4): Promise<GearItem[]> {
  const items = (gearData as unknown as GearItem[])
    .filter((change) => change.id !== currentId && change.category === category)
    .slice(0, limit);
  return items;
}

export async function searchGear(query: string): Promise<GearItem[]> {
  const lowerQuery = query.toLowerCase();
  const items = (gearData as unknown as GearItem[]).filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
  return items;
}

// Analytics placeholders (read-only from static file)
export async function getTopRentedGear() { return []; }
export async function getRevenueByGear() { return []; }
export async function updateGearBookedDates() { return false; }
export async function updateGearAvailability() { return false; }
export async function updateGearRentalStats() { return false; }
