import { useState, useEffect, useMemo } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

const RECIPES_PER_PAGE = 3;

export default function MakananPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

 
  const allMakanan = useMemo(() => Object.values(ResepMakanan.resep), []);

  useEffect(() => {
    
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allMakanan);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allMakanan.filter(recipe => 
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRecipes(filtered);
      }
    };

    
    filter();
  }, [searchQuery, allMakanan]);

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * RECIPES_PER_PAGE, currentPage * RECIPES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        <RecipeGrid recipes={paginatedRecipes} />

        <div className="flex justify-center items-center space-x-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
