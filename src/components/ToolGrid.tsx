import React from 'react';
import { ToolCard } from './ToolCard';
import { useStore } from '../store';

export const ToolGrid = () => {
  const tools = useStore((state) => state.tools);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const categories = useStore((state) => state.categories);

  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category === selectedCategory)
    : tools;

  const selectedCategoryName = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)?.name
    : null;

  return (
    <div className="space-y-8">
      {selectedCategoryName && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg" />
          <div className="relative bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {selectedCategoryName}
            </h2>
            <p className="text-gray-600 mt-2">
              Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
        {filteredTools.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedCategory 
                ? 'No tools found in this category yet.'
                : 'No tools found. Start by adding some tools!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};