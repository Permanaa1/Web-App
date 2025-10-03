// src/components/common/DetailModal.jsx
import React from 'react';

export default function DetailModal({ open, onClose, item }) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 p-6 z-10 overflow-auto max-h-[90vh]">
        <header className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold">{item.name}</h3>
            {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">✕</button>
        </header>

        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full max-h-64 object-cover rounded mb-4"
          />
        )}

        {item.ingredients && item.ingredients.length > 0 && (
          <section className="mb-4">
            <h4 className="font-semibold">Bahan</h4>
            <ul className="list-disc ml-5 mt-2">
              {item.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </section>
        )}

        {item.steps && item.steps.length > 0 && (
          <section>
            <h4 className="font-semibold">Langkah</h4>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              {item.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
