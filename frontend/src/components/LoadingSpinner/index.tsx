import React from "react";
import "./styles.css";

interface iLoadingSpinner {
  size?: number;
}

const LoadingSpinner: React.FC<iLoadingSpinner> = ({ size = 8 }) => {
  return (
    <div
      style={{ width: `${size * 10}px`, height: `${size * 10}px` }}
      className="lds-ring"
    >
      <div
        style={{
          width: `${size * size}px`,
          height: `${size * size}px`,
          margin: `${size}px`,
          border: `${size}px solid var(--principal-color)`,
          borderColor:
            "var(--principal-color) transparent transparent transparent",
        }}
      ></div>
      <div
        style={{
          width: `${size * size}px`,
          height: `${size * size}px`,
          margin: `${size}px`,
          border: `${size}px solid var(--principal-color)`,
          borderColor:
            "var(--principal-color) transparent transparent transparent",
        }}
      ></div>
      <div
        style={{
          width: `${size * size}px`,
          height: `${size * size}px`,
          margin: `${size}px`,
          border: `${size}px solid var(--principal-color)`,
          borderColor:
            "var(--principal-color) transparent transparent transparent",
        }}
      ></div>
      <div
        style={{
          width: `${size * size}px`,
          height: `${size * size}px`,
          margin: `${size}px`,
          border: `${size}px solid var(--principal-color)`,
          borderColor:
            "var(--principal-color) transparent transparent transparent",
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
