import React, { useState } from 'react';
import { useStore } from '../store';
import { Tool } from '../types';
import { Loader2 } from 'lucide-react';

export const AdminPanel = () => {
  const isAdmin = useStore((state) => state.isAdmin);
  const categories = useStore((state) => state.categories);
  const addTool = useStore((state) => state.addTool);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTool, setNewTool] = useState<Partial<Tool>>({
    pricing: 'Free',
  });

  if (!isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTool.name && newTool.description && newTool.category && newTool.url) {
      setIsSubmitting(true);
      try {
        await addTool({
          id: Date.now().toString(),
          name: newTool.name,
          description: newTool.description,
          category: newTool.category,
          url: newTool.url,
          featured: newTool.featured || false,
          verified: newTool.verified || false,
          pricing: newTool.pricing || 'Free',
        });
        setNewTool({ pricing: 'Free' });
      } catch (error) {
        console.error('Error adding tool:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg rounded-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add New Tool</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tool Name</label>
          <input
            type="text"
            value={newTool.name || ''}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-gray-50 hover:bg-white"
            placeholder="Enter tool name"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={newTool.description || ''}
            onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-gray-50 hover:bg-white min-h-[100px]"
            placeholder="Enter tool description"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tool URL</label>
          <input
            type="url"
            value={newTool.url || ''}
            onChange={(e) => setNewTool({ ...newTool, url: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-gray-50 hover:bg-white"
            placeholder="https://example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={newTool.category || ''}
              onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-gray-50 hover:bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pricing</label>
            <select
              value={newTool.pricing}
              onChange={(e) => setNewTool({ ...newTool, pricing: e.target.value as Tool['pricing'] })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-gray-50 hover:bg-white"
            >
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
              <option value="Free Trial">Free Trial</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newTool.featured || false}
                onChange={(e) => setNewTool({ ...newTool, featured: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newTool.verified || false}
                onChange={(e) => setNewTool({ ...newTool, verified: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Verified</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-lg transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Adding Tool...
            </>
          ) : (
            'Add Tool'
          )}
        </button>
      </form>
    </div>
  );
};