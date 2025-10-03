import { useState } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import HeroSection from '../components/home/HeroSection';
import FeaturedMakananSection from '../components/home/FeaturedMakananSection';
import FeaturedMinumanSection from '../components/home/FeaturedMinumanSection';
import Select from 'react-select';

export default function HomePage() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const allMakanan = Object.values(ResepMakanan.resep);
  const allMinuman = Object.values(ResepMinuman.resep);

  const allIngredients = [...new Set([...allMakanan.flatMap(recipe => recipe.ingredients), ...allMinuman.flatMap(recipe => recipe.ingredients)])].map(ingredient => ({ value: ingredient, label: ingredient }));

  const featuredMakanan = (selectedIngredients.length > 0
    ? allMakanan.filter(recipe => selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient.value)))
    : allMakanan).slice(0, 3);

  const featuredMinuman = (selectedIngredients.length > 0
    ? allMinuman.filter(recipe => selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient.value)))
    : allMinuman).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <HeroSection />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        <div className="mb-8">
          <Select
            isMulti
            options={allIngredients}
            value={selectedIngredients}
            onChange={setSelectedIngredients}
            placeholder="Filter berdasarkan bahan..."
          />
        </div>
        <FeaturedMakananSection featuredMakanan={featuredMakanan} />
        <FeaturedMinumanSection featuredMinuman={featuredMinuman} />
      </main>
    </div>
  );
}