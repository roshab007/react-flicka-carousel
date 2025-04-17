import { useEffect, useState } from "react";
import { preloadImages } from "../utils/utils";

export const useImagePreloader = (images: string[]) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadImages = () => {
      preloadImages(images)
        .then(() => setIsLoading(false))
        .catch((e) => {
          console.error("Failed to preload images", e);
          setIsLoading(false);
        });
    };

    loadImages();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadImages();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [images]);

  return isLoading;
};
