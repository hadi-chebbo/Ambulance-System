import React from "react";
import ercicon from "../../assets/erc-icon.png";

interface LoaderProps {
  size?: number;
  label?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  label = "",
  className = "",
}) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Spinning ERC Icon */}
      <img
        src={ercicon}
        alt="Loading"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          animation: "erc-spin 1.2s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes erc-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {label && (
        <span
          style={{
            fontSize: "13px",
            color: "#DC2626",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Loader;