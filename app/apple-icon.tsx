import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          borderRadius: "32px",
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="ddGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          {/* Inner D (smaller, front) */}
          <path
            d="M15 15 L15 55 L35 55 C50 55 55 45 55 35 C55 25 50 15 35 15 L15 15 Z M25 25 L35 25 C42 25 45 30 45 35 C45 40 42 45 35 45 L25 45 L25 25 Z"
            fill="url(#ddGradient)"
          />
          {/* Outer D (larger, back) */}
          <path
            d="M35 30 L35 85 L60 85 C82 85 90 70 90 57 C90 44 82 30 60 30 L35 30 Z M47 42 L60 42 C72 42 78 50 78 57 C78 64 72 73 60 73 L47 73 L47 42 Z"
            fill="url(#ddGradient)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
