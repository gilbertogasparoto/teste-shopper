import React from "react";

export const CheckIcon = ({
  width = "20px",
  height = "20px",
  fill = "black",
}: React.SVGProps<SVGAElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    preserveAspectRatio="none"
  >
    <path
      fill={fill}
      d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
    />
  </svg>
);
