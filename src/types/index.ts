export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  favicon?: string;
  featured?: boolean;
  verified?: boolean;
  pricing?: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  faviconRefreshKey?: number;
}