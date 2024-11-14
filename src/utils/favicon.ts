export const getFavicon = (url: string): string => {
  // Clean and parse the URL
  const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
  const urlObj = new URL(cleanUrl);
  const domain = urlObj.hostname;
  
  // Return Google's favicon service URL directly - most reliable option
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};