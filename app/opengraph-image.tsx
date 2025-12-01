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
            "radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.15) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
                marginRight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                D
              </span>
            </div>
            <span
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#f9fafb",
              }}
            >
              Deralis Digital
            </span>
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Modern Web Development & Digital Transformation
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.5,
            }}
          >
            High-performance websites, custom web applications, and AI-powered
            tools that help businesses modernize and scale efficiently.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "40px",
              gap: "30px",
            }}
          >
            {["Next.js", "TypeScript", "Supabase", "AI Tools"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 20px",
                  borderRadius: "20px",
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  color: "#94a3b8",
                  fontSize: "16px",
                }}
              >
                {tech}
              </div>
            ))}
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
