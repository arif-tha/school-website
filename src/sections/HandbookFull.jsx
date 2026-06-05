import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder Image Variables
const handbookOverviewImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop";
const uniformImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop";
const disciplineImage = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop";
const housesImage = "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=2069&auto=format&fit=crop";
const calendarImage = "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop";
const girlsEducationImage = "https://images.unsplash.com/photo-1544717297-fa936f014e7a?q=80&w=1974&auto=format&fit=crop";

const handbookSections = [
  {
    id: "overview",
    tag: "Guidelines",
    icon: "📖",
    title: "Student Handbook Overview",
    image: handbookOverviewImage,
    content: (
      <div className="space-y-4">
        <p>The Student Handbook is designed to foster a structured environment where excellence can thrive. It covers essential aspects of school life including discipline, uniform standards, conduct expectations, student responsibilities, and our institutional House system.</p>
        <p>Our goal is to ensure every student understands their role within the school community and maintains the high standards of integrity and discipline that The Crescent School is known for.</p>
      </div>
    )
  },
  {
    id: "uniform",
    tag: "Dress Code",
    icon: "👔",
    title: "Uniform Guidelines",
    image: uniformImage,
    content: (
      <div className="space-y-10">
        <div>
          <h4 className="text-amber-400/80 font-bold mb-4 uppercase tracking-widest text-xs">Classes Nursery to X</h4>
          <div className="space-y-4 text-white/70">
            <p><strong>Boys:</strong> White half/full sleeved bush shirt with the school logo embossed on the breast pocket, peacock blue shorts or trousers with loops around the waist region, blue school belt, blue school neck-tie, white socks and black leather shoes.</p>
            <p><strong>Girls:</strong> White half-sleeved front open shirt, peacock blue tunic with school logo embossed on the left pocket, blue school necktie, white socks and black leather shoes. Girls aged 11 years and above may wear white salwar, peacock blue jumper, white dupatta, white socks and black leather shoes. The girls using hijab, will have to put on white hijabs with peacock blue borders on them, as supplied by the school.</p>
            <p><strong>Winter:</strong> During winter, sweater or blazer of navy-blue colour should be used by the boys and the girls.</p>
          </div>
        </div>
        <div>
          <h4 className="text-amber-400/80 font-bold mb-4 uppercase tracking-widest text-xs">Classes XI & XII</h4>
          <div className="space-y-4 text-white/70">
            <p><strong>Boys:</strong> Blue pin striped half sleeved bush shirt with the school logo embossed on the breast pocket, navy blue trousers with loops around the waist region, school belt, navy blue and peacock blue striped neck-tie, white socks and black leather shoes.</p>
            <p><strong>Girls:</strong> Blue pin striped half sleeved jumper with the school logo embossed on the left region, navy blue dupatta, navy blue salwar, white socks and black leather shoes. The girls using hijabs must put on white hijabs with peacock blue borders on them, as supplied by the school.</p>
            <p><strong>Winter:</strong> During winter, sweater or blazer of navy-blue colour should be used by the boys and the girls.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "discipline",
    tag: "Conduct",
    icon: "⚖️",
    title: "Discipline Rules",
    image: disciplineImage,
    content: (
      <div className="space-y-6">
        <p className="text-white/80 italic mb-4">Pupils belonging to the junior age groups are required to be handled with considerable patience and tact. In The Crescent School, friendly advice and admonition coupled with firmness, take the place of corporal punishment.</p>
        <ul className="space-y-4 text-white/60">
          <li><strong>a)</strong> Special emphasis is laid on inculcating a high degree of discipline amongst the pupils. Any kind of disobedience or behaviour of objectionable nature may result in the removal of the pupil from the school.</li>
          <li><strong>b)</strong> Strict action is initiated against offenders found to damage or destroy deliberately any school property including library books.</li>
          <li><strong>c)</strong> Use of unfair means in any examination results in the annulment of the entire term result of the offender. Any pupil caught rendering unfair assistance to the others is equally liable for punishment.</li>
          <li><strong>d)</strong> All the pupils are expected to always maintain friendly attitude towards all the classmates. Strict disciplinary action like suspension may be initiated against any pupil found fighting with the others and causing injury to them.</li>
          <li><strong>e)</strong> Parents/guardians are requested to ensure that their wards do not remain absent from the school for reasons other than sickness or any other unavoidable circumstances.</li>
          <li><strong>f)</strong> Parents/guardians should ensure that their wards do not come to school with hena or any other colour of dye applied on their hair. Strict disciplinary action will be initiated against the students who violate the rules.</li>
          <li><strong>g)</strong> Girls should come to school sporting hair having two braids, if not covered by hijab and boys should sport hair that is crew-cut. Students found to be breaking the rules will not be allowed to enter their classes and strict disciplinary action will be initiated against the students who violate the rules.</li>
          <li><strong>h)</strong> Students should not come to school with tattoo or mehndi applied on any part of their bodies. Students found to be breaking the rules will be pulled up, barred from entering their classes and subjected to disciplinary action that might be deemed necessary.</li>
          <li><strong>i)</strong> Students should come to school in proper and tidy school uniform only. Shoes should be polished properly and white canvas shoes for P.T. should be clean and sparkling white.</li>
          <li><strong>j)</strong> No student will be allowed to enter the school premises without proper school uniform either for their classes or for any other official purpose.</li>
        </ul>
      </div>
    )
  },
  {
    id: "houses",
    tag: "Competition",
    icon: "🏠",
    title: "School Houses",
    image: housesImage,
    content: (
      <div>
        <p className="mb-8">The students are grouped under four Houses for the convenience of organising intra-class first and then inter-house activities and competitions.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Einstein", color: "Red House", hex: "#ef4444" },
            { name: "Tagore", color: "Blue House", hex: "#3b82f6" },
            { name: "Leonardo", color: "Yellow House", hex: "#eab308" },
            { name: "Khayyam", color: "Green House", hex: "#22c55e" }
          ].map(house => (
            <div key={house.name} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: house.hex }} />
              <div>
                <h5 className="font-bold text-white">{house.name}</h5>
                <p className="text-xs text-white/50 uppercase tracking-tighter">{house.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "calendar",
    tag: "Schedule",
    icon: "📅",
    title: "Working Days & Holidays",
    image: calendarImage,
    content: (
      <div className="space-y-4">
        <p>The school operates in two sessions, Morning and Afternoon. Classes are usually not held on Saturdays, except for examinations or some extra-curricular activities, and Sundays.</p>
        <p>Apart from the usual short holidays, the school observes one long recess during summer and a short recess during winter.</p>
      </div>
    )
  },
  {
    id: "girls",
    tag: "Empowerment",
    icon: "✨",
    title: "Morning Session for Girls",
    image: girlsEducationImage,
    content: (
      <div className="space-y-4">
        <p>In the age of equality, every child, irrespective of gender, has got equal right to education. With that in view and to encourage conservative parents to send their daughters to school for education, The Crescent School had decided right at the inception to dedicate the morning session exclusively to the cause of the girls.</p>
        <p>We believe that it is important to create just the right kind of environment in the school for the girl-students to learn, open-up their thoughts and delve into the quest for knowledge, which in turn enables them to discover their latent talents and to excel in the field of education and co-curricular activities. It is often said that a virtuous lady is a blessing to the society. The Crescent School helps the girls of today take small strides before they mature into virtuous ladies and start taking giant leaps.</p>
      </div>
    )
  }
];

export default function HandbookFull() {
  const rowsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const text = row.querySelector(".handbook-text");
      const image = row.querySelector(".handbook-image-wrap");

      gsap.fromTo(text,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        { 
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 75%", once: true }
        }
      );

      gsap.fromTo(image,
        { opacity: 0, scale: 0.9, x: i % 2 === 0 ? 60 : -60 },
        { 
          opacity: 1, scale: 1, x: 0, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 75%", once: true }
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
        .handbook-full-page {
          background: #03092E;
          color: white;
          overflow-x: hidden;
        }
        .display-font { font-family: 'Cormorant Garamond', serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        
        .premium-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .gold-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C9A84C;
          border-left: 2px solid #C9A84C;
          padding-left: 1rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .handbook-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #f5efe0;
        }

        .handbook-text-content {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
          max-width: 600px;
        }

        .image-shadow-overlay {
          background: linear-gradient(to top, rgba(3, 9, 46, 0.8) 0%, transparent 40%);
        }
      `}</style>

      <section className="handbook-full-page relative min-h-screen">
        
        {/* Page Header */}
        <div className="pt-24 pb-20 px-6 text-center">
          <h1 className="display-font text-5xl md:text-7xl lg:text-9xl font-light text-white mb-6">
            Student <em className="text-amber-300/90 italic font-light">Handbook</em>
          </h1>
          <p className="text-amber-400/40 text-xs tracking-[0.5em] uppercase">The Crescent School Guidelines</p>
          <div className="w-24 h-[1px] bg-amber-400/30 mx-auto mt-8" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
          {handbookSections.map((sec, i) => (
            <div
              key={sec.id}
              ref={el => rowsRef.current[i] = el}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32 lg:mb-48 ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className="handbook-text flex-1">
                <span className="gold-tag">{sec.tag}</span>
                <div className="text-4xl mb-6 opacity-80">{sec.icon}</div>
                <h2 className="handbook-title display-font font-bold">
                   {sec.title}
                </h2>
                <div className="handbook-text-content body-font">
                   {sec.content}
                </div>
              </div>

              {/* Image Side */}
              <div className="handbook-image-wrap flex-1 w-full lg:w-1/2">
                <div className="relative group overflow-hidden rounded-[3rem] premium-glass aspect-[4/5] lg:aspect-[3/4]">
                   <img 
                      src={sec.image} 
                      alt={sec.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 image-shadow-overlay" />
                   <div className="absolute inset-6 border border-white/10 rounded-[2rem] pointer-events-none transition-all duration-500 group-hover:border-amber-400/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
