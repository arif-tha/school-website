import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder Image Variables
const parentCornerHeroImage = "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop";
const parentMessageImage = "https://images.unsplash.com/photo-1591500732359-646c8a58bfc5?q=80&w=2070&auto=format&fit=crop";
const guidelinesImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop";
const learningSupportImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop";
const partnershipImage = "https://images.unsplash.com/photo-1577891721396-22742161b69a?q=80&w=2073&auto=format&fit=crop";

const parentGuidelines = [
  { icon: "📅", title: "Regular Attendance", desc: "Ensure your ward attends school regularly. Consistent attendance is the foundation of academic success." },
  { icon: "👔", title: "Uniform Compliance", desc: "Support school identity by ensuring your ward comes in neat, tidy, and complete school uniform daily." },
  { icon: "📝", title: "Homework Monitoring", desc: "Check school diaries and ensure homework is completed. Your supervision reinforces classroom learning." },
  { icon: "📱", title: "School Communication", desc: "Keep your contact information updated and stay involved through the parent portal and school messages." },
  { icon: "🛡️", title: "Student Discipline", desc: "Partner with us to instill moral values and respect for school property and peers." },
  { icon: "🌐", title: "Digital Responsibility", desc: "Monitor screen time and ensure technology is used as a productive tool for education and growth." },
];

const supportLearning = [
  { title: "Creating Study Habits", desc: "Establish a dedicated, quiet study area and a consistent daily routine for reading and revision.", icon: "📚" },
  { title: "Reading Culture", desc: "Encourage reading beyond textbooks. Discuss stories and news to broaden their intellectual horizons.", icon: "🖋️" },
  { title: "Time Management", desc: "Help them balance academics with co-curricular activities, ensuring adequate rest and play.", icon: "⏳" },
  { title: "Positive Encouragement", desc: "Celebrate small wins. A positive attitude at home leads to high confidence at school.", icon: "✨" },
  { title: "Academic Motivation", desc: "Connect school lessons to real-world applications to keep their curiosity alive and thriving.", icon: "🚀" },
];

const testimonials = [
  {
    name: "Mrs. Shamina Khan",
    role: "Parent of Class VIII Student",
    text: "The school's focus on moral values along with academics is what makes it unique. My child has become more disciplined and responsible.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
  },
  {
    name: "Mr. Arif Mohammed",
    role: "Parent of Class X Student",
    text: "The Smart Classrooms and multimedia-based teaching make learning fun. I can see a significant improvement in my daughter's interest in Science.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    name: "Mrs. Sabina Parveen",
    role: "Parent of Class V Student",
    text: "The House system is excellent for building team spirit. My son loves representing Leonardo House in sports competitions.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  }
];

export default function ParentCornerFull() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionsRef.current.forEach((sec, i) => {
      if (!sec) return;
      gsap.fromTo(sec, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 80%" }
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
        .parent-corner-page {
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
        }

        .gold-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C9A84C;
          display: block;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          line-height: 1.1;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .magazine-img {
          width: 100%;
          height: auto;
          border-radius: 3.5rem;
          transition: transform 1s cubic-bezier(0,0,0.1,1);
        }
        .magazine-img:hover {
          transform: scale(1.05);
        }

        .guideline-card {
          padding: 2.5rem;
          border-radius: 2.5rem;
          transition: all 0.4s ease;
        }
        .guideline-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-10px);
        }

        .testimonial-card {
          border-radius: 2.5rem;
          padding: 3rem;
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 2rem;
          left: 2rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem;
          color: rgba(201,168,76,0.1);
          line-height: 1;
        }
      `}</style>

      <section className="parent-corner-page">
        {/* SECTION 1: Overview */}
        <div ref={el => sectionsRef.current[0] = el} className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
           <div className="flex-1">
             <span className="gold-label">Supportive Community</span>
             <h1 className="section-title display-font">
                Parent <em className="text-amber-300 italic font-light">Corner</em>
             </h1>
             <div className="space-y-6 text-white/60 body-font text-lg leading-relaxed max-w-xl">
               <p>Education is a collaborative journey between the school, the student, and the parents. At The Crescent School, we value this partnership as the heartbeat of our institutional growth.</p>
               <p>Our Parent Corner is a dedicated resource center designed to align our shared mission of nurturing compassionate, disciplined, and intellectually curious young minds.</p>
             </div>
           </div>
           <div className="flex-1 w-full">
              <div className="relative overflow-hidden rounded-[4rem] group">
                <img src={parentCornerHeroImage} alt="Parent Corner Overview" className="magazine-img group-hover:scale-110 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none" />
              </div>
           </div>
        </div>

        {/* SECTION 2: Message for Parents */}
        <div ref={el => sectionsRef.current[1] = el} className="py-24 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="flex-1">
               <span className="gold-label">Administration Message</span>
               <h2 className="section-title display-font">Building <em className="text-amber-300 italic font-light">Partnerships</em></h2>
               <div className="space-y-6 text-white/50 body-font italic text-xl border-l-2 border-amber-400/30 pl-8">
                 "We believe that every child’s success is anchored by the stability and motivation they find at home. When school values are mirrored in the household, children develop a profound sense of purpose. We invite our parents to walk this path with us, participating actively in their ward's academic and emotional evolution."
               </div>
               <p className="mt-8 text-amber-400 font-bold uppercase tracking-widest text-xs">— The School Administration</p>
             </div>
             <div className="flex-1 w-full lg:w-1/2">
                <div className="relative rounded-[4rem] overflow-hidden premium-glass p-4 group">
                  <img src={parentMessageImage} alt="School Message" className="rounded-[3rem] w-full group-hover:grayscale-0 grayscale-[40%] transition-all duration-700" />
                </div>
             </div>
          </div>
        </div>

        {/* SECTION 3: Parent Guidelines */}
        <div ref={el => sectionsRef.current[2] = el} className="py-32 px-6 lg:px-12 max-w-7xl mx-auto text-center">
           <span className="gold-label mx-auto">Collaboration Standards</span>
           <h2 className="section-title display-font mb-20">Parent <em className="text-amber-300 italic font-light">Guidelines</em></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {parentGuidelines.map((g, i) => (
               <div key={i} className="guideline-card premium-glass text-left">
                  <div className="text-4xl mb-8">{g.icon}</div>
                  <h3 className="display-font text-2xl text-white mb-4">{g.title}</h3>
                  <p className="body-font text-sm text-white/40 leading-relaxed">{g.desc}</p>
               </div>
             ))}
           </div>
        </div>

        {/* SECTION 4: How Parents Can Support Learning */}
        <div ref={el => sectionsRef.current[3] = el} className="py-24 px-6 lg:px-12 bg-white/[0.02]">
           <div className="max-w-7xl mx-auto">
             <div className="text-center mb-24">
                <span className="gold-label mx-auto">Home Learning</span>
                <h2 className="section-title display-font">Supporting <em className="text-amber-300 italic font-light">Academic Growth</em></h2>
             </div>
             <div className="space-y-24">
               {supportLearning.map((item, i) => (
                 <div key={i} className={`flex flex-col lg:flex-row items-center gap-20 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                       <span className="text-6xl mb-8 block opacity-40">{item.icon}</span>
                       <h3 className="display-font text-3xl md:text-4xl text-white mb-6 leading-tight">{item.title}</h3>
                       <p className="body-font text-lg text-white/50 max-w-md leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex-1 w-full lg:w-1/2">
                       <div className="aspect-video lg:aspect-square bg-white/5 rounded-[4rem] group overflow-hidden premium-glass p-2">
                          <img src={learningSupportImage} alt={item.title} className="w-full h-full object-cover rounded-[3.5rem] opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
                       </div>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* SECTION 5: School & Parent Partnership */}
        <div ref={el => sectionsRef.current[4] = el} className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 order-2 lg:order-1">
                 <img src={partnershipImage} alt="Partnership" className="magazine-img rounded-[4rem]" />
              </div>
              <div className="flex-1 order-1 lg:order-2">
                 <span className="gold-label">Collective Progress</span>
                 <h2 className="section-title display-font">The <em className="text-amber-300 italic font-light">Partnership</em> Model</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                   {[
                     { l: "Parent Teacher Meetings", d: "Scheduled termly interactions to discuss academic and behavioral progress." },
                     { l: "Academic Reviews", d: "Deep dive sessions to analyze performance data and set future goals." },
                     { l: "School Events", d: "Invitations to sports, cultural, and award galas to celebrate achievements." },
                     { l: "Collaborative Growth", d: "Workshops and feedback sessions to refine the student experience." }
                   ].map((item, idx) => (
                     <div key={idx} className="space-y-2 border-l border-amber-400/20 pl-6">
                       <h4 className="body-font font-bold text-amber-500/80 text-sm uppercase tracking-widest">{item.l}</h4>
                       <p className="body-font text-white/40 text-sm line-height-relaxed">{item.d}</p>
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        </div>

        {/* SECTION 6: Upgraded Testimonials */}
        <div ref={el => sectionsRef.current[5] = el} className="py-32 px-6 lg:px-12 bg-white/5">
           <div className="max-w-7xl mx-auto text-center">
              <span className="gold-label mx-auto">Voices of Trust</span>
              <h2 className="section-title display-font mb-24">Parent <em className="text-amber-300 italic font-light">Testimonials</em></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {testimonials.map((t, i) => (
                  <div key={i} className="testimonial-card premium-glass text-left">
                     <p className="body-font text-lg text-white/70 italic leading-relaxed mb-10 relative z-10">"{t.text}"</p>
                     <div className="flex items-center gap-4 mt-auto">
                        <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover grayscale opacity-80" />
                        <div>
                           <h4 className="display-font text-xl text-white font-bold">{t.name}</h4>
                           <p className="text-amber-400/60 text-[10px] uppercase font-bold tracking-widest">{t.role}</p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

      </section>
    </>
  );
}
