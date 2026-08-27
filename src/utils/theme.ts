export const getCategoryBadgeClass = (category: string): string => {
  const colorMap: Record<string, string> = {
    // Meals
    breakfast: 'bg-secondary-ocean/10 text-secondary-ocean border-secondary-ocean/20',
    lunch: 'bg-secondary-ocean/10 text-secondary-ocean border-secondary-ocean/20',
    dinner: 'bg-secondary-ocean/10 text-secondary-ocean border-secondary-ocean/20',
    snack: 'bg-secondary-ocean/10 text-secondary-ocean border-secondary-ocean/20',

    // Diets
    vegan: 'bg-primary-green/10 text-primary-green border-primary-green/20',
    vegetarian: 'bg-primary-green/10 text-primary-green border-primary-green/20',
    'low-carb': 'bg-primary-green/10 text-primary-green border-primary-green/20',

    // Fitness/Goals
    'high-protein': 'bg-secondary-rust/10 text-secondary-rust border-secondary-rust/20',
    bulking: 'bg-secondary-rust/10 text-secondary-rust border-secondary-rust/20',
    cutting: 'bg-secondary-rust/10 text-secondary-rust border-secondary-rust/20',

    // Misc/Logistics
    quick: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    'meal-prep-friendly': 'bg-secondary-berry/10 text-secondary-berry border-secondary-berry/20',
    'one-pot': 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
  }

  return colorMap[category] || 'bg-gray-50 text-gray-700 border-gray-200'
}
