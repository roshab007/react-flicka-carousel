import { useEffect, useRef, useState } from "react";

interface Props {
  imagesLength: number;
  defaultAutoPlay?: boolean;
}

const useCarousel = ({ imagesLength, defaultAutoPlay }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(defaultAutoPlay ?? false);
  const wheelTimeoutRef = useRef<number | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelThreshold = 50;
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragThreshold = 100; // Minimum drag distance to trigger slide change

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesLength);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imagesLength) % imagesLength
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Handle drag start
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    setAutoplay(false);
    // Get the starting X position from the event
    const clientX =
      "touches" in event
        ? event.touches[0].clientX
        : "clientX" in event
        ? event.clientX
        : 0;

    dragStartX.current = clientX;
  };

  // Handle drag end
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const { offset, velocity } = info;

    // Determine direction based on drag distance or velocity
    const dragDistance = offset.x;
    const dragVelocity = velocity.x;

    // If the drag distance is significant or the velocity is high enough
    if (
      Math.abs(dragDistance) > dragThreshold ||
      Math.abs(dragVelocity) > 0.5
    ) {
      if (dragDistance > 0 || dragVelocity > 0.5) {
        // Dragged right, go to previous slide
        handlePrevious();
      } else {
        // Dragged left, go to next slide
        handleNext();
      }
    }

    // Restart autoplay after a delay if it was enabled
    setTimeout(() => {
      if (defaultAutoPlay) {
        setAutoplay(true);
      }
    }, 3000);
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  // Handle wheel events (trackpad two-finger swipe)
  const handleWheel = (e: React.WheelEvent) => {
    setAutoplay(false);

    // Accumulate horizontal scroll (deltaX) for trackpad gestures
    wheelAccumulatorRef.current += e.deltaX;

    // Clear any existing timeout
    if (wheelTimeoutRef.current !== null) {
      clearTimeout(wheelTimeoutRef.current);
    }

    // Set a timeout to process the wheel event after a short delay
    wheelTimeoutRef.current = window.setTimeout(() => {
      const accumulatedDelta = wheelAccumulatorRef.current;

      if (Math.abs(accumulatedDelta) > wheelThreshold) {
        if (accumulatedDelta > 0) {
          // Swiped left (positive deltaX), go to next slide
          handleNext();
        } else {
          // Swiped right (negative deltaX), go to previous slide
          handlePrevious();
        }
      }

      // Reset the accumulator
      wheelAccumulatorRef.current = 0;

      // Restart autoplay after a delay
      setTimeout(() => {
        if (defaultAutoPlay) {
          setAutoplay(true);
        }
      }, 3000);
    }, 50);
  };

  return {
    currentIndex,
    direction,
    handleNext,
    handlePrevious,
    handleDotClick,
    handleWheel,
    handleDragStart,
    handleDragEnd,
    dragConstraintsRef,
  };
};

export default useCarousel;
