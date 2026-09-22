import { useEffect } from 'react';
import Footer from '../sections/Footer';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      <div className="pt-32 px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <div className="flex justify-center mb-6">
            <span className="section-label">Get in Touch</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-['Playfair_Display'] font-bold text-5xl md:text-6xl lg:text-7xl text-center mb-6 leading-tight">
            Contact <span className="text-gradient">The Crescent School</span>
          </h1>
          
          {/* Subheading */}
          <p className="font-['Inter'] text-center text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-20">
            Have questions about admissions, academics, or school life? We're here to help. Reach out to us through any of the channels below.
          </p>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {/* Address Card */}
            <div className="premium-card p-8 md:p-10 group hover:border-[#1D395E]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                  <span className="text-xl">📍</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">Address</h3>
                  <a
                    href="https://www.google.com/maps/place/The+Crescent+School/data=!4m2!3m1!1s0x3a0276c6ff7418a9%3A0x8afd46037ff59fa7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer font-['Inter'] text-base text-slate-600 leading-relaxed transition-colors hover:text-[#1D395E] hover:underline"
                  >
                    41/1/3 & 41/2/1<br/>
                    Rai Charan Ghosh Lane<br/>
                    Kolkata – 700039<br/>
                    West Bengal, India
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="premium-card p-8 md:p-10 group hover:border-[#1D395E]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                  <span className="text-xl">📞</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">Phone</h3>
                  <p className="font-['Inter'] text-base text-slate-600 leading-relaxed">
                    Admissions: <a href="tel:+913323431562" className="cursor-pointer transition-colors hover:text-[#1D395E] hover:underline">+(033) 2343 1562</a><br/>
                    <span className="text-sm text-slate-500">Available Monday–Saturday</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="premium-card p-8 md:p-10 group hover:border-[#1D395E]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                  <span className="text-xl">✉️</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">Email</h3>
                  <p className="font-['Inter'] text-base text-slate-600 leading-relaxed">
                    <a href="mailto:admissions@crescentschool.edu" className="cursor-pointer transition-colors hover:text-[#1D395E] hover:underline">admissions@crescentschool.edu</a><br/>
                    <span className="text-sm text-slate-500">We respond within 24 hours</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="premium-card p-8 md:p-10 group hover:border-[#1D395E]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1D395E]/10 flex items-center justify-center group-hover:bg-[#1D395E]/20 transition-colors">
                  <span className="text-xl">🕐</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-slate-900 mb-3">School Hours</h3>
                  <p className="font-['Inter'] text-base text-slate-600 leading-relaxed">
                    Monday–Saturday<br/>
                    8:00 AM – 3:00 PM<br/>
                    <span className="text-sm text-slate-500">Closed on Sundays & Public Holidays</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Location */}
          <div className="mb-24">
            <h2 className="font-['Playfair_Display'] font-bold text-3xl md:text-4xl text-slate-900 mb-8">Find Us</h2>
            <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-[#1D395E]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.2776933515524!2d88.37735387507644!3d22.53126807952122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276c6ff7418a9%3A0x8afd46037ff59fa7!2sThe%20Crescent%20School!5e0!3m2!1sen!2sin!4v1790104883021!5m2!1sen!2sin"
                title="The Crescent School location"
                className="block aspect-video w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-24"></div>

          {/* Office Info */}
          <div className="bg-gradient-to-br from-slate-50 to-[#1D395E]/10 rounded-3xl p-12 md:p-16 premium-card border-0">
            <h2 className="font-['Playfair_Display'] font-bold text-3xl md:text-4xl text-slate-900 mb-8">Office Information</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="font-['Cormorant_Garamond'] font-bold text-lg text-slate-900 mb-4">Admissions Enquiries</h4>
                <p className="font-['Inter'] text-slate-600 leading-relaxed mb-6">
                  For any questions regarding admissions, eligibility, or our academic programs, please feel free to contact our admissions office. We welcome inquiries from parents and students.
                </p>
              </div>
              <div>
                <h4 className="font-['Cormorant_Garamond'] font-bold text-lg text-slate-900 mb-4">Campus Visits</h4>
                <p className="font-['Inter'] text-slate-600 leading-relaxed mb-6">
                  We encourage prospective parents to visit our campus. Personalized guided tours can be arranged. Please call our office to schedule your visit at a convenient time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
