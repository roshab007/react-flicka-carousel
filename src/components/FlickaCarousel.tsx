import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import useCarousel from "../hooks/useCarousel";
import { preloadImages } from "../utils/utils";
import ArrowButton from "./ArrowButton";
import Pagination from "./Pagination";

interface Props {
  images: string[];
  autoPlay?: boolean;
  hideArrowButtons?: boolean;
  hidePagination?: boolean;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  carouselContainerClassName?: string;
  carouselContainerStyle?: React.CSSProperties;
  carouselItemClassName?: string;
  carouselItemStyle?: React.CSSProperties;
  imageClassName?: string;
  carouselImageStyle?: React.CSSProperties;
  arrowClassName?: string;
  arrowStyle?: React.CSSProperties;
  paginationContainerClassName?: string;
  paginationContainerStyle?: React.CSSProperties;
  dotClassName?: string;
  dotStyle?: React.CSSProperties;
  activeDotClassName?: string;
  activeDotStyle?: React.CSSProperties;
  inActiveDotClassName?: string;
  inActiveDotStyle?: React.CSSProperties;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    scale: 0.9,
  }),
  center: {
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    scale: 0.9,
    transition: {
      duration: 0.5,
    },
  }),
};

const FlickaCarousel: React.FC<Props> = ({
  images,
  autoPlay,
  hideArrowButtons,
  hidePagination,
  containerClassName,
  containerStyle,
  carouselContainerClassName,
  carouselContainerStyle,
  carouselItemClassName,
  carouselItemStyle,
  imageClassName,
  carouselImageStyle,
  arrowClassName,
  arrowStyle,
  paginationContainerClassName,
  paginationContainerStyle,
  dotClassName,
  dotStyle,
  activeDotClassName,
  activeDotStyle,
  inActiveDotClassName,
  inActiveDotStyle,
}) => {
  const {
    currentIndex,
    direction,
    handleDotClick,
    handleNext,
    handlePrevious,
    handleWheel,
  } = useCarousel({
    imagesLength: images.length,
    defaultAutoPlay: autoPlay,
  });

  useEffect(() => {
    preloadImages(images).catch((e) => {
      console.error("failed to preload images", e);
    });
  }, [images]);

  return (
    <div
      className={clsx("container", containerClassName)}
      style={containerStyle}
    >
      <div
        className={clsx("carouselContainer", carouselContainerClassName)}
        style={carouselContainerStyle}
        onWheel={handleWheel}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={carouselItemStyle}
            className={clsx("carouselItem", carouselItemClassName)}
          >
            <motion.div
              style={{ width: "100%", height: "100%" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img
                src={images[currentIndex]}
                className={clsx("image", imageClassName)}
                style={carouselImageStyle}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {!hideArrowButtons && (
          <>
            <ArrowButton
              variant="left"
              onClick={handlePrevious}
              arrowClassName={arrowClassName}
              arrowStyle={arrowStyle}
            />
            <ArrowButton
              variant="right"
              onClick={handleNext}
              arrowClassName={arrowClassName}
              arrowStyle={arrowStyle}
            />
          </>
        )}

        {!hidePagination && (
          <Pagination
            currentIndex={currentIndex}
            images={images}
            onClick={handleDotClick}
            paginationContainerClassName={paginationContainerClassName}
            paginationContainerStyle={paginationContainerStyle}
            dotClassName={dotClassName}
            dotStyle={dotStyle}
            activeDotClassName={activeDotClassName}
            activeDotStyle={activeDotStyle}
            inActiveDotClassName={inActiveDotClassName}
            inActiveDotStyle={inActiveDotStyle}
          />
        )}
      </div>
    </div>
  );
};

export default FlickaCarousel;
