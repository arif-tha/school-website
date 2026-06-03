import React from "react";

const TIMING_DATA = [
  {
    classes: "Nursery, LKG",
    girls: { start: "07:45 AM", end: "10:45 AM" },
    boys: { start: "11:30 AM", end: "02:30 PM" },
  },
  {
    classes: "UKG",
    girls: { start: "07:45 AM", end: "11:15 AM" },
    boys: { start: "11:45 AM", end: "03:15 PM" },
  },
  {
    classes: "I – II",
    girls: { start: "07:15 AM", end: "11:15 AM" },
    boys: { start: "11:45 AM", end: "03:45 PM" },
  },
  {
    classes: "III – IV",
    girls: { start: "07:15 AM", end: "11:45 AM" },
    boys: { start: "12:15 PM", end: "04:45 PM" },
  },
  {
    classes: "V – XII",
    girls: { start: "07:15 AM", end: "11:50 AM" },
    boys: { start: "12:15 PM", end: "04:50 PM" },
  },
];

export default function Timings() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        #timings-section {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #f0f2f5 100%);
        }

        .timings-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1e3a8a;
          font-weight: 600;
        }

        .timings-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.15;
          color: #0c0b0e;
        }

        .timings-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          line-height: 1.85;
          color: rgba(12, 11, 14, 0.65);
          font-weight: 300;
        }

        .timings-divider {
          background: linear-gradient(to right, #1e3a8a, rgba(30, 58, 138, 0.2));
          height: 2px;
        }

        .timings-table {
          border-collapse: collapse;
          width: 100%;
        }

        .timings-table thead {
          background: linear-gradient(135deg, #0c1929 0%, #1a2e5c 100%);
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .timings-table th {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          padding: 1.25rem;
          text-align: center;
          letter-spacing: 0.05em;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .timings-table th:first-child {
          text-align: left;
        }

        .timings-table tbody tr {
          border-bottom: 1px solid rgba(30, 58, 138, 0.08);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .timings-table tbody tr:hover {
          background-color: rgba(30, 58, 138, 0.04);
        }

        .timings-table td {
          font-family: 'DM Sans', sans-serif;
          padding: 1.25rem;
          text-align: center;
          font-size: 0.9rem;
          color: #0c0b0e;
        }

        .timings-table td:first-child {
          text-align: left;
          font-weight: 500;
          color: #1e3a8a;
          letter-spacing: 0.03em;
        }

        .timings-table td.girls-session {
          background: rgba(59, 130, 246, 0.04);
          color: #1e40af;
        }

        .timings-table td.boys-session {
          background: rgba(168, 85, 247, 0.04);
          color: #6d28d9;
        }

        .session-time {
          font-weight: 600;
          font-size: 0.95rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .session-range {
          font-size: 0.8rem;
          opacity: 0.75;
          font-weight: 400;
        }

        .timings-note {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(12, 11, 14, 0.6);
          font-style: italic;
          text-align: center;
          padding: 1.5rem;
          background: rgba(30, 58, 138, 0.05);
          border-left: 3px solid #1e3a8a;
          border-radius: 0.5rem;
        }

        @media (max-width: 768px) {
          .timings-table {
            font-size: 0.85rem;
          }

          .timings-table th,
          .timings-table td {
            padding: 1rem 0.75rem;
          }

          .session-time {
            font-size: 0.9rem;
          }

          .session-range {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 640px) {
          .timings-table {
            display: block;
            border: none;
          }

          .timings-table thead {
            display: none;
          }

          .timings-table tbody,
          .timings-table tr,
          .timings-table td {
            display: block;
            width: 100%;
          }

          .timings-table tbody tr {
            border: 1px solid rgba(30, 58, 138, 0.15);
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          }

          .timings-table td {
            padding: 0.75rem;
            text-align: right;
            position: relative;
            padding-left: 40%;
            border: none;
          }

          .timings-table td:first-child {
            text-align: left;
            padding-left: 1rem;
            padding-right: 1rem;
            font-size: 1rem;
            background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, transparent 100%);
            border-bottom: 1px solid rgba(30, 58, 138, 0.1);
          }

          .timings-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-weight: 600;
            color: #1e3a8a;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
          }

          .timings-table td.girls-session {
            background: rgba(59, 130, 246, 0.08);
          }

          .timings-table td.boys-session {
            background: rgba(168, 85, 247, 0.08);
          }
        }
      `}</style>

      <section id="timings-section" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
        {/* Background decorative elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 50%, rgba(30, 58, 138, 0.04) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 85% 20%, rgba(30, 58, 138, 0.03) 0%, transparent 60%)`,
          }}
        />

        {/* Corner ornaments */}
        <div
          className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "1px solid rgba(30, 58, 138, 0.2)",
            borderLeft: "1px solid rgba(30, 58, 138, 0.2)",
          }}
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none"
          style={{
            borderBottom: "1px solid rgba(30, 58, 138, 0.2)",
            borderRight: "1px solid rgba(30, 58, 138, 0.2)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            {/* Label */}
            <div className="timings-label mb-4 flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
              SCHOOL TIMINGS
              <div className="w-8 h-px" style={{ background: "#1e3a8a" }} />
            </div>

            {/* Heading */}
            <h2 className="timings-heading mb-6">Session Timings</h2>

            {/* Divider */}
            <div className="timings-divider w-16 mb-6" />

            {/* Description */}
            <p className="timings-description max-w-2xl">
              The school operates in separate morning and afternoon sessions for girls and boys respectively.
            </p>
          </div>

          {/* Table wrapper with shadow */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
            <table className="timings-table">
              <thead>
                <tr>
                  <th>Classes</th>
                  <th>
                    <span style={{ color: "#3b82f6" }}>👧 Girls - Morning</span>
                  </th>
                  <th>
                    <span style={{ color: "#a855f7" }}>👦 Boys - Afternoon</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {TIMING_DATA.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.classes}</td>
                    <td className="girls-session" data-label="Girls Morning">
                      <span className="session-time">{item.girls.start}</span>
                      <span className="session-range">to {item.girls.end}</span>
                    </td>
                    <td className="boys-session" data-label="Boys Afternoon">
                      <span className="session-time">{item.boys.start}</span>
                      <span className="session-range">to {item.boys.end}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional note */}
          <div className="timings-note">
            📅 Saturday & Sunday are weekly holidays.
          </div>
        </div>
      </section>
    </>
  );
}
