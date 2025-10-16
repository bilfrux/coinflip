import React from "react";

interface CoinProps {
  isFlipping: boolean;
  result?: "Heads" | "Tails" | null;
}

export const Coin3D: React.FC<CoinProps> = ({ isFlipping, result }) => {
  return (
    <div className="perspective w-40 h-40 relative">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipping
            ? "rotateY(1800deg) rotateX(360deg)"
            : result === "Heads"
              ? "rotateY(0deg)"
              : result === "Tails"
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
          transition: isFlipping ? "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "transform 0.6s ease-out",
        }}
      >
        {/* Front Face - Heads */}
        <div
          className="absolute w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-2xl flex items-center justify-center text-6xl border-4 border-yellow-200 flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <div className="text-5xl mb-2">👑</div>
          <div className="text-sm font-bold text-yellow-900">HEADS</div>
        </div>

        {/* Back Face - Tails */}
        <div
          className="absolute w-full h-full rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 shadow-2xl flex items-center justify-center text-6xl border-4 border-purple-300 flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-5xl mb-2">🌙</div>
          <div className="text-sm font-bold text-purple-900">TAILS</div>
        </div>
      </div>
    </div>
  );
};
