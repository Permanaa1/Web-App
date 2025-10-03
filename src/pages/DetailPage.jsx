// src/pages/DetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import { useFavorites } from '../context/FavoritesContext';
import { Star } from 'lucide-react';

export default function DetailPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  console.log('DetailPage rendered with type:', type, 'and id:', id);

  // helper: cari item berdasarkan id (id bisa number atau string)
  const findItemById = (dataObj, idToFind) => {
    const arr = Object.values(dataObj?.resep || {});
    return arr.find((it) => String(it.id) === String(idToFind));
  };

  let item = null;
  if (type === 'makanan') {
    item = findItemById(ResepMakanan, id);
  } else if (type === 'minuman') {
    item = findItemById(ResepMinuman, id);
  }

  console.log('Found item:', item);

  const handleFavoriteClick = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-semibold mb-3">Resep tidak ditemukan</h2>
          <p className="text-gray-600 mb-6">Mungkin resep sudah dihapus atau URL salah.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded">Kembali</button>
            <a href="/" className="px-4 py-2 border rounded">Beranda</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600 mb-4">← Kembali</button>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {item.image_url && (
            <img src={item.image_url} alt={item.name || item.title} className="w-full h-64 object-cover" />
          )}

          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold mb-2">{item.name || item.title}</h1>
              <button onClick={handleFavoriteClick} className="p-2 rounded-full hover:bg-gray-200">
                <Star className={`w-6 h-6 ${isFavorite(item.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>
            {item.short && <p className="text-gray-600 mb-4">{item.short}</p>}

            {/* Info ringkas */}
            <div className="flex gap-4 mb-6 text-sm text-gray-600">
              <div><strong>{Array.isArray(item.ingredients) ? item.ingredients.length : '-'}</strong> bahan</div>
              <div><strong>{Array.isArray(item.steps) ? item.steps.length : '-'}</strong> langkah</div>
            </div>

            {/* Bahan */}
            {item.ingredients && item.ingredients.length > 0 && (
              <section className="mb-6">
                <h3 className="font-semibold mb-2">Bahan</h3>
                <ul className="list-disc ml-6 space-y-1">
                  {item.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                </ul>
              </section>
            )}

            {/* Langkah */}
            {item.steps && item.steps.length > 0 && (
              <section>
                <h3 className="font-semibold mb-2">Langkah</h3>
                <ol className="list-decimal ml-6 space-y-2">
                  {item.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                </ol>
              </section>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
