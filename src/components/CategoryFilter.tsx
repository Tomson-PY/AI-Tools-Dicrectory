import React from 'react';
import { useStore } from '../store';

export const CategoryFilter = () => {
  const categories = useStore((state) => state.categories);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};