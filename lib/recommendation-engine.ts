// AI-powered recommendation engine for gear bundles
import { type GearItem, getAllGear } from "./gear-data"

// Define complementary relationships between gear
const complementaryGear: Record<string, string[]> = {
  // Cameras need lenses, batteries, storage
  cameras: ["lenses", "accessories", "grip"],

  // Lenses often pair with cameras and filters
  lenses: ["cameras", "accessories", "grip"],

  // Lighting pairs with grip equipment
  lighting: ["grip", "accessories"],

  // Audio often needs windshields, mounts
  audio: ["accessories", "grip"],

  // Drones need batteries, monitors
  drones: ["accessories"],

  // Grip supports cameras and lighting
  grip: ["cameras", "lighting"],

  // Accessories complement everything
  accessories: ["cameras", "lenses", "lighting", "audio", "drones"],
}

// Specific item recommendations based on keywords
const itemKeywordRecommendations: Record<string, string[]> = {
  // Cameras → recommend lenses, stabilizers, monitors
  camera: ["lens", "gimbal", "monitor", "battery", "tripod"],

  // Lenses → recommend camera bodies, filters
  lens: ["camera", "filter", "hood"],

  // Gimbal → recommend cameras, monitors
  gimbal: ["camera", "monitor", "battery"],

  // Lights → recommend stands, modifiers
  light: ["stand", "softbox", "diffuser", "battery"],

  // Audio → recommend windshields, cables, recorders
  mic: ["wind", "cable", "recorder", "boom"],

  // Drones → recommend batteries, landing pad, monitor
  drone: ["battery", "monitor", "landing pad"],
}

export function getRecommendedGear(currentItem: GearItem, limit = 6): GearItem[] {
  const allGear = getAllGear()
  const scoredGear: Array<{ item: GearItem; score: number }> = []

  allGear.forEach((item) => {
    if (item.id === currentItem.id) return

    let score = 0

    // 1. Same category gets a base score
    if (item.category === currentItem.category) {
      score += 2
    }

    // 2. Complementary category bonus
    const complementaryCategories = complementaryGear[currentItem.category] || []
    if (complementaryCategories.includes(item.category)) {
      score += 5
    }

    // 3. Keyword matching in names
    const currentNameLower = currentItem.name.toLowerCase()
    const itemNameLower = item.name.toLowerCase()

    Object.entries(itemKeywordRecommendations).forEach(([keyword, recommendedKeywords]) => {
      if (currentNameLower.includes(keyword)) {
        recommendedKeywords.forEach((recKeyword) => {
          if (itemNameLower.includes(recKeyword)) {
            score += 3
          }
        })
      }
    })

    // 4. Similar price range (within 50%)
    const priceDiff = Math.abs(item.pricePerDay - currentItem.pricePerDay)
    const avgPrice = (item.pricePerDay + currentItem.pricePerDay) / 2
    if (priceDiff / avgPrice < 0.5) {
      score += 1
    }

    // 5. Featured items get slight boost
    if (item.featured) {
      score += 1
    }

    // 6. Available items get preference
    if (item.available) {
      score += 2
    }

    if (score > 0) {
      scoredGear.push({ item, score })
    }
  })

  // Sort by score descending and return top N
  return scoredGear
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((sg) => sg.item)
}

export function getBundleRecommendations(category: string): GearItem[] {
  const allGear = getAllGear()

  // Get popular items from the target category
  const categoryGear = allGear
    .filter((item) => item.category === category && item.available)
    .sort((a, b) => {
      // Prioritize featured and availability
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
    .slice(0, 3)

  // Add complementary items
  const complementaryCategories = complementaryGear[category] || []
  const complementaryItems = allGear
    .filter((item) => complementaryCategories.includes(item.category) && item.available && item.featured)
    .slice(0, 3)

  return [...categoryGear, ...complementaryItems].slice(0, 6)
}

// Get frequently rented together (mock implementation - would use real data in production)
export function getFrequentlyRentedTogether(currentItem: GearItem): GearItem[] {
  // This would typically query a database of rental history
  // For now, use the recommendation engine
  return getRecommendedGear(currentItem, 4)
}
