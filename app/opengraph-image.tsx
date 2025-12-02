import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Deralis Digital - Modern Web Development";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.08) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* DD Logo Icon */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 100 100"
            fill="none"
            style={{ marginBottom: "30px" }}
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

          {/* DERALIS Text */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "400",
              color: "#f9fafb",
              letterSpacing: "12px",
              marginBottom: "8px",
            }}
          >
            DERALIS
          </div>

          {/* DIGITAL Text */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "300",
              color: "#f9fafb",
              letterSpacing: "16px",
            }}
          >
            DIGITAL
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          deralis.digital
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
