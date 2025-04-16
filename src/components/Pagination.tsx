import clsx from "clsx";
import React from "react";

interface Props {
  images: string[];
  onClick: (index: number) => void;
  currentIndex: number;
  paginationContainerClassName?: string;
  paginationContainerStyle?: React.CSSProperties;
  dotClassName?: string;
  dotStyle?: React.CSSProperties;
  activeDotClassName?: string;
  activeDotStyle?: React.CSSProperties;
  inActiveDotClassName?: string;
  inActiveDotStyle?: React.CSSProperties;
}

const Pagination: React.FC<Props> = ({
  images,
  onClick,
  currentIndex,
  paginationContainerClassName,
  paginationContainerStyle,
  dotClassName,
  dotStyle,
  activeDotClassName,
  activeDotStyle,
  inActiveDotClassName,
  inActiveDotStyle,
}) => {
  return (
    <div
      className={clsx("paginationContainer", paginationContainerClassName)}
      style={paginationContainerStyle}
    >
      {images.map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <button
            key={index}
            onClick={() => onClick(index)}
            className={clsx(
              "dot",
              dotClassName,
              isActive ? "activeDot" : "inactiveDot",
              isActive ? activeDotClassName : inActiveDotClassName
            )}
            style={{
              ...dotStyle,
              ...(isActive ? activeDotStyle : inActiveDotStyle),
            }}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
