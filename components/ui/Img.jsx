import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

const Img = ({
  src,
  alt = "",
  width,
  height,
  className = "",
  outerClassName = "",
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden text-center max-w-full",
        "after:absolute after:w-[200%] after:h-0 after:top-1/2 after:left-1/2 after:bg-white/30 after:-translate-1/2 after:-rotate-45 z-[1] hover:after:h-[250%] hover:after:bg-transparent hover:after:transition-all hover:after:duration-[600ms] hover:after:ease-linear",
        outerClassName
      )}
    >
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        className={cn(className)}
      />
    </div>
  );
};

export default Img;
