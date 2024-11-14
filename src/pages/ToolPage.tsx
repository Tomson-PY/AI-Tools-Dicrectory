import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, CheckCircle, Share2, Bookmark } from 'lucide-react';
import { useStore } from '../store';
import { FaviconImage } from '../components/FaviconImage';

export const ToolPage = () => {
  const { id } = useParams();
  const tools = useStore((state) => state.tools);
  const categories = useStore((state) => state.categories);
  
  const tool = tools.find(t => t.id === id);
  
  if (!tool) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tool not found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center justify-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to tools list</span>
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === tool.category);

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to tools list</span>
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
          {tool.featured && (
            <div className="absolute top-4 right-4">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex items-start space-x-6 -mt-16">
            <FaviconImage url={tool.url} name={tool.name} size="lg" />

            <div className="flex-1 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                  {tool.verified && (
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                {category && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {category.name}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm ${
                  tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
                  tool.pricing === 'Freemium' ? 'bg-blue-100 text-blue-700' :
                  tool.pricing === 'Paid' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {tool.pricing}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">{tool.description}</p>
          </div>

          <div className="mt-8">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};