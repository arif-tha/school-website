import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../sections/Footer';
import { ACTIVITIES } from '../data/activities';

export default function ActivitiesPage() {
  const [searchParams] = useSearchParams();
  const selectedSlug = searchParams.get('activity');
  const activity = ACTIVITIES.find((item) => item.slug === selectedSlug) || ACTIVITIES[0];
  const isFallback = !selectedSlug || !ACTIVITIES.some((item) => item.slug === selectedSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSlug]);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32" />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/#activities"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#1D395E] transition-transform hover:-translate-x-1"
            >
              <span aria-hidden="true">←</span>
              Back to Activities
            </Link>

            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#1D395E]">
                  {isFallback ? 'Featured Activity' : 'Beyond Academics'}
                </p>
                <div className="mb-5 text-5xl" aria-hidden="true">{activity.icon}</div>
                <h1 className="max-w-2xl font-['Playfair_Display'] text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
                  {activity.title}
                </h1>
                <div className="mt-7 h-1 w-20 rounded-full bg-[#1D395E]" />
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                  {activity.details}
                </p>

                <div className="mt-10 border-t border-slate-200 pt-7">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900">At a glance</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                    {activity.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                        <span className="mt-1 text-[#1D395E]" aria-hidden="true">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-[#1D395E]/10 blur-2xl" aria-hidden="true" />
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="relative aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
