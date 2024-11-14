import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Tool } from '../types';
import { categories } from '../data/categories';
import { getFavicon } from '../utils/favicon';

interface StoreState {
  categories: Category[];
  tools: Tool[];
  selectedCategory: string | null;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  addTool: (tool: Omit<Tool, 'id' | 'favicon'>) => Promise<void>;
  updateTool: (id: string, tool: Partial<Tool>) => void;
  deleteTool: (id: string) => void;
  reorderTools: (categoryId: string, tools: Tool[]) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      categories: categories.map(category => ({ ...category, tools: [] })),
      tools: [],
      selectedCategory: null,
      isAdmin: false,
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      addTool: async (tool) => {
        const id = Date.now().toString();
        const favicon = getFavicon(tool.url);
        
        const newTool: Tool = {
          id,
          ...tool,
          favicon,
        };

        set((state) => ({
          tools: [...state.tools, newTool],
        }));
      },
      updateTool: (id, updatedTool) =>
        set((state) => ({
          tools: state.tools.map((tool) =>
            tool.id === id ? { ...tool, ...updatedTool } : tool
          ),
        })),
      deleteTool: (id) =>
        set((state) => ({
          tools: state.tools.filter((tool) => tool.id !== id),
        })),
      reorderTools: (categoryId, tools) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId ? { ...category, tools } : category
          ),
        })),
    }),
    {
      name: 'ai-tools-storage',
      partialize: (state) => ({
        tools: state.tools,
        isAdmin: state.isAdmin,
      }),
    }
  )
);