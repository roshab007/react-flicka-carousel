export const preloadImages = (images: string[]): Promise<string[]> => {
  const imagePromises = images.map((src) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => resolve(src);
      img.onerror = (error) =>
        reject(new Error(`Failed to load image: ${src}`));
    });
  });

  return Promise.all(imagePromises);
};
