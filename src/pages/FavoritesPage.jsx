import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeGrid from '../components/makanan/RecipeGrid'; // We can reuse the RecipeGrid component

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Resep Favorit Anda
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Berikut adalah kumpulan resep makanan dan minuman yang telah Anda tandai sebagai favorit.
        </p>
        {favorites.length > 0 ? (
          <RecipeGrid recipes={favorites} />
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">Anda belum memiliki resep favorit.</p>
          </div>
        )}
      </main>
    </div>
  );
}
