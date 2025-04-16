import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface Props {
  onClick: () => void;
  variant: "left" | "right";
  arrowClassName?: string;
  arrowStyle?: React.CSSProperties;
}

const ArrowButton: React.FC<Props> = ({
  onClick,
  variant,
  arrowClassName,
  arrowStyle,
}) => {
  return (
    <button
      className={clsx(
        "arrow",
        variant === "left" ? "left" : "right",
        arrowClassName
      )}
      style={arrowStyle}
      onClick={onClick}
    >
      {variant === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};

export default ArrowButton;
