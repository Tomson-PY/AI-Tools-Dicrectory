import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, CheckCircle, RefreshCw, Save, Edit2, X } from 'lucide-react';
import { Tool } from '../types';
import { useStore } from '../store';
import { FaviconImage } from './FaviconImage';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const isAdmin = useStore((state) => state.isAdmin);
  const deleteTool = useStore((state) => state.deleteTool);
  const updateTool = useStore((state) => state.updateTool);
  const categories = useStore((state) => state.categories);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editedTool, setEditedTool] = useState(tool);

  const handleRefreshFavicon = () => {
    setIsRefreshing(true);
    updateTool(tool.id, { ...tool, faviconRefreshKey: Date.now() });
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleSave = () => {
    updateTool(tool.id, editedTool);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
            <FaviconImage url={editedTool.url} name={editedTool.name} />
            <button
              onClick={handleRefreshFavicon}
              disabled={isRefreshing}
              className={`mt-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center space-x-2 disabled:opacity-50 transition-colors duration-200 ${isRefreshing ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 transition-transform duration-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Icon'}</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={editedTool.name}
              onChange={(e) => setEditedTool({ ...editedTool, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editedTool.description}
              onChange={(e) => setEditedTool({ ...editedTool, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="url"
              value={editedTool.url}
              onChange={(e) => setEditedTool({ ...editedTool, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={editedTool.category}
                onChange={(e) => setEditedTool({ ...editedTool, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
              <select
                value={editedTool.pricing}
                onChange={(e) => setEditedTool({ ...editedTool, pricing: e.target.value as Tool['pricing'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
                <option value="Free Trial">Free Trial</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editedTool.featured}
                onChange={(e) => setEditedTool({ ...editedTool, featured: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editedTool.verified}
                onChange={(e) => setEditedTool({ ...editedTool, verified: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Verified</span>
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {tool.featured && (
        <div className="absolute -top-2 -right-2">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <FaviconImage url={tool.url} name={tool.name} />

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Link to={`/tool/${tool.id}`} className="text-lg font-semibold hover:text-blue-600">
              {tool.name}
            </Link>
            {tool.verified && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
          </div>
          
          <p className="text-gray-600 mt-1">{tool.description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
                tool.pricing === 'Freemium' ? 'bg-blue-100 text-blue-700' :
                tool.pricing === 'Paid' ? 'bg-purple-100 text-purple-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {tool.pricing}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                to={`/tool/${tool.id}`}
                className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-800"
              >
                <span>Details</span>
              </Link>
              <span className="text-gray-300">|</span>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
              >
                <span>Visit</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTool(tool.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};