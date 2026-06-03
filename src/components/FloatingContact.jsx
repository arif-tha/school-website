import React, { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  useEffect(() => {
    if (!popupDismissed) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [popupDismissed]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const handleChatNow = () => {
    window.open('https://wa.me/919999999999', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
      <div className="flex flex-col items-end gap-4">
        {/* Popup Card */}
        {showPopup && (
          <div className="mb-4 animate-fade-in-up">
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-5 shadow-2xl border border-white/40 max-w-xs">
              <button
                onClick={handleClosePopup}
                className="absolute -top-3 -right-3 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-lg hover:bg-slate-800 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                aria-label="Close popup"
              >
                ×
              </button>

              <div className="pr-6">
                <h3 className="font-['Playfair_Display'] font-bold text-base md:text-lg text-slate-900 mb-1">
                  Admissions Open 2026
                </h3>
                <p className="font-['Inter'] text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">
                  Need help with admission? Contact us.
                </p>
                <button
                  onClick={handleChatNow}
                  className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white font-['Inter'] font-semibold text-sm py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-green-500/40 active:scale-95 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Container */}
        <div className="flex flex-col gap-4">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            aria-label="Contact us on WhatsApp"
          >
            <div className="absolute inset-0 bg-green-500/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.644 0-3.259.656-4.442 1.84-1.184 1.183-1.839 2.798-1.839 4.441 0 3.654 2.786 6.638 6.281 6.638 1.644 0 3.259-.656 4.442-1.839 1.184-1.184 1.839-2.799 1.839-4.442 0-3.654-2.786-6.638-6.281-6.638Zm0-2c2.314 0 4.501.928 6.143 2.568 1.643 1.641 2.571 3.827 2.571 6.07 0 2.314-.928 4.501-2.568 6.143-1.641 1.643-3.827 2.571-6.07 2.571-4.449 0-8.143-3.582-8.143-8v-.002c0-2.314.928-4.501 2.568-6.143C8.571.928 10.757 0 13.001 0Z" />
              </svg>
            </div>
            <div className="hidden md:block absolute bottom-full right-0 mb-3 px-3 py-2 bg-slate-900 text-white text-xs font-['Inter'] font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              WhatsApp Us
            </div>
          </a>

          {/* Call Button */}
          <a
            href="tel:+919999999999"
            className="relative group"
            aria-label="Call us"
          >
            <div className="absolute inset-0 bg-blue-500/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </div>
            <div className="hidden md:block absolute bottom-full right-0 mb-3 px-3 py-2 bg-slate-900 text-white text-xs font-['Inter'] font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Call Now
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
