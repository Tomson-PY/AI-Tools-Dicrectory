// Using URLBox API for reliable screenshots
export const getThumbnail = (url: string): string => {
  // Clean the URL
  const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
  const encodedUrl = encodeURIComponent(cleanUrl);
  
  // Using URLBox API with a specific configuration for thumbnails
  return `https://api.urlbox.io/v1/FLMG5BM3XeqMqbw8/png?url=${encodedUrl}&width=1200&height=630&format=png&quality=80&thumb_width=600&thumb_height=315&force=true`;
};