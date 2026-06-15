import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FloatingContact() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotice, setShowNotice] = useState(true);

  const handleViewNotice = () => {
    navigate("/notices");
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* NOTICE CARD */}
      {isHomePage && showNotice && (
        <div
          style={{
            position: "fixed",
            top: "110px",
            right: "24px",
            zIndex: 9998,
            width: "300px",
            maxWidth: "calc(100vw - 40px)",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: "18px",
              padding: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              border: "1px solid rgba(226,232,240,0.8)",
              position: "relative",
            }}
          >
            {/* CLOSE */}
            <button
              onClick={() => setShowNotice(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                background: "#f1f5f9",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "700",
                color: "#334155",
              }}
            >
              ×
            </button>

            <h3
              style={{
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "1",
                color: "#1e40af",
                marginBottom: "14px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              NOTICE
            </h3>

            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: "#475569",
                marginBottom: "18px",
              }}
            >
              Latest notices, examination updates, holiday announcements,
              admission information and important school updates.
            </p>

            <button
              onClick={handleViewNotice}
              style={{
                width: "100%",
                border: "none",
                cursor: "pointer",
                padding: "12px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg,#2563eb 0%, #4f46e5 100%)",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              View Notices →
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTONS */}
      <div
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* WHATSAPP */}
        <a
          href="https://wa.me/(033) 2343 1562"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#22c55e 0%,#16a34a 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(34,197,94,.35)",
          }}
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.89-.79-1.48-1.76-1.65-2.06-.17-.29-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.71 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
          </svg>
        </a>

        {/* CALL */}
        <a
          href="tel:+(033) 2343 1562"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(37,99,235,.35)",
          }}
        >
          <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
        </a>
      </div>
    </>
  );
}