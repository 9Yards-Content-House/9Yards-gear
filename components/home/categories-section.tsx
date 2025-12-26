import { getAllCategoriesAsync, getGearByCategoryAsync } from "@/lib/gear-data"
import { CategoryCarousel } from "./category-carousel"

export async function CategoriesSection() {
  const categories = await getAllCategoriesAsync()
  
  // Get item counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const items = await getGearByCategoryAsync(category.id)
      return { ...category, itemCount: items.length }
    })
  )

  return <CategoryCarousel categories={categoriesWithCounts} />
}
