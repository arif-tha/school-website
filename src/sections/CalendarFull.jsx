import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const calendarData = [
  {
    month: "April",
    year: "2026",
    tag: "New Beginnings",
    activities: [
      { date: "02 Apr", title: "New Academic Session (XI & XII) Begins", type: "academic" },
      { date: "05 Apr", title: "Orientation Programme for Parents", type: "event" },
      { date: "14 Apr", title: "Ambedkar Jayanti", type: "holiday" },
      { date: "15 Apr", title: "Bengali New Year (Poila Baisakh)", type: "holiday" }
    ]
  },
  {
    month: "May",
    year: "2026",
    tag: "Summer Period",
    activities: [
      { date: "01 May", title: "May Day Celebration", type: "event" },
      { date: "08 May", title: "Rabindra Jayanti", type: "holiday" },
      { date: "15 May", title: "Summer Recess Commences", type: "holiday" },
      { date: "25 May", title: "Internal Assessment Submissions", type: "academic" }
    ]
  },
  {
    month: "June",
    year: "2026",
    tag: "Reopening",
    activities: [
      { date: "12 Jun", title: "School Reopens after Summer Recess", type: "academic" },
      { date: "21 Jun", title: "International Yoga Day", type: "event" },
      { date: "28 Jun", title: "First Periodic Test Commences", type: "exam" }
    ]
  },
  {
    month: "July",
    year: "2026",
    tag: "Academic Growth",
    activities: [
      { date: "10 Jul", title: "Inter-House Debate Competition", type: "event" },
      { date: "15 Jul", title: "First Periodic Test Results", type: "exam" },
      { date: "25 Jul", title: "Founder's Day Celebration", type: "event" }
    ]
  },
  {
    month: "August",
    year: "2026",
    tag: "Patriotism",
    activities: [
      { date: "15 Aug", title: "Independence Day Celebration", type: "event" },
      { date: "19 Aug", title: "Raksha Bandhan", type: "holiday" },
      { date: "26 Aug", title: "Janmashtami", type: "holiday" },
      { date: "30 Aug", title: "Inter-School Science Fair", type: "event" }
    ]
  },
  {
    month: "September",
    year: "2026",
    tag: "Mid-Term",
    activities: [
      { date: "05 Sep", title: "Teacher's Day Celebration", type: "event" },
      { date: "15 Sep", title: "Half-Yearly Examination Commences", type: "exam" },
      { date: "30 Sep", title: "Half-Yearly Examination Concludes", type: "exam" }
    ]
  },
  {
    month: "October",
    year: "2026",
    tag: "Festivities",
    activities: [
      { date: "02 Oct", title: "Gandhi Jayanti", type: "holiday" },
      { date: "10 Oct", title: "Durga Puja & Autumn Recess Begins", type: "holiday" },
      { date: "25 Oct", title: "School Reopens after Puja Break", type: "academic" },
      { date: "31 Oct", title: "Diwali & Kali Puja", type: "holiday" }
    ]
  },
  {
    month: "November",
    year: "2026",
    tag: "Participation",
    activities: [
      { date: "14 Nov", title: "Children's Day & Sports Meet", type: "event" },
      { date: "15 Nov", title: "Guru Nanak Jayanti", type: "holiday" },
      { date: "22 Nov", title: "Second Periodic Test Commences", type: "exam" }
    ]
  },
  {
    month: "December",
    year: "2026",
    tag: "Winter Joy",
    activities: [
      { date: "10 Dec", title: "Annual Prize Distribution", type: "event" },
      { date: "23 Dec", title: "Winter Recess Begins", type: "holiday" },
      { date: "25 Dec", title: "Christmas Day", type: "holiday" }
    ]
  },
  {
    month: "January",
    year: "2027",
    tag: "Resolution",
    activities: [
      { date: "01 Jan", title: "New Year's Day", type: "holiday" },
      { date: "02 Jan", title: "School Reopens (Nursery - X)", type: "academic" },
      { date: "12 Jan", title: "Vivekananda Jayanti", type: "holiday" },
      { date: "23 Jan", title: "Netaji's Birthday", type: "holiday" },
      { date: "26 Jan", title: "Republic Day Celebration", type: "event" }
    ]
  },
  {
    month: "February",
    year: "2027",
    tag: "Preparation",
    activities: [
      { date: "01 Feb", title: "Saraswati Puja", type: "holiday" },
      { date: "15 Feb", title: "Pre-Board Examinations (X & XII)", type: "exam" },
      { date: "25 Feb", title: "Annual Sports Final Day", type: "event" }
    ]
  },
  {
    month: "March",
    year: "2027",
    tag: "Assessment",
    activities: [
      { date: "05 Mar", title: "Annual Examination Commences", type: "exam" },
      { date: "10 Mar", title: "Maha Shivratri", type: "holiday" },
      { date: "20 Mar", title: "Annual Examination Concludes", type: "exam" },
      { date: "28 Mar", title: "Holi/Dol Yatra", type: "holiday" },
      { date: "31 Mar", title: "Declaration of Results", type: "academic" }
    ]
  }
];

export default function CalendarFull() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      
      const card = item.querySelector(".calendar-card");
      const dot = item.querySelector(".timeline-dot");

      gsap.fromTo(dot, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
          scrollTrigger: { trigger: item, start: "top 85%" }
        }
      );

      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 },
        { 
          opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .calendar-page {
          background: #03092E;
          color: white;
          overflow-x: hidden;
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent);
          transform: translateX(-50%);
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 2rem;
          width: 12px;
          height: 12px;
          background: #C9A84C;
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 15px rgba(201,168,76,0.5);
          z-index: 10;
        }

        .calendar-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 2rem;
          padding: 2.5rem;
          transition: all 0.4s ease;
          position: relative;
        }
        .calendar-card:hover {
          border-color: rgba(201,168,76,0.2);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-5px);
        }

        .activity-type {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .type-academic { background: rgba(56, 189, 248, 0.1); color: #38BDF8; }
        .type-holiday { background: rgba(52, 211, 153, 0.1); color: #34D399; }
        .type-exam { background: rgba(251, 113, 133, 0.1); color: #FB7185; }
        .type-event { background: rgba(167, 139, 250, 0.1); color: #A78BFA; }

        @media (max-width: 1024px) {
          .timeline-line { left: 20px; }
          .timeline-dot { left: 20px; }
          .timeline-row { padding-left: 50px !important; padding-right: 0 !important; }
          .calendar-card { width: 100% !important; margin-left: 0 !important; }
        }
      `}</style>

      <section className="calendar-page relative min-h-screen pt-24 pb-32">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24">
          <span className="text-amber-400 text-xs tracking-[0.4em] uppercase font-bold mb-4 block">Institutional Planner</span>
          <h1 className="display-font text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6">
            Academic <em className="text-amber-300/90 italic font-light">Calendar</em>
          </h1>
          <div className="w-24 h-[1px] bg-amber-400/30 mx-auto mt-8" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="timeline-line hidden lg:block" />

          <div className="space-y-16 lg:space-y-0">
            {calendarData.map((month, i) => (
              <div
                key={month.month}
                ref={el => itemsRef.current[i] = el}
                className={`timeline-row relative lg:flex items-start ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                } lg:mb-24`}
              >
                <div className="timeline-dot hidden lg:block" />

                <div className={`calendar-card w-full lg:w-[45%] ${
                  i % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                }`}>
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <span className="text-amber-400/60 uppercase tracking-widest text-[10px] font-bold block mb-1">{month.tag}</span>
                        <h2 className="display-font text-4xl font-bold text-white leading-none">
                           {month.month} <span className="text-white/20 font-light">{month.year}</span>
                        </h2>
                     </div>
                     <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-xs font-light">
                        {String(i + 1).padStart(2, '0')}
                     </div>
                  </div>

                  <div className="space-y-5">
                    {month.activities.map((act, idx) => (
                      <div key={idx} className="group/item flex gap-4 p-4 rounded-xl border border-white/0 hover:border-white/5 hover:bg-white/[0.01] transition-all">
                        <div className="flex flex-col items-center">
                           <span className="text-amber-400 font-bold text-sm leading-none">{act.date.split(' ')[0]}</span>
                           <span className="text-[10px] text-white/30 uppercase mt-1">{act.date.split(' ')[1]}</span>
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                             <span className={`activity-type type-${act.type}`}>{act.type}</span>
                           </div>
                           <p className="text-white/80 text-sm font-light leading-relaxed group-hover/item:text-white transition-colors">
                              {act.title}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
