import LandingNavbar from "../components/LandingNavbar";
import PublicProjectsSection from "../components/PublicProjectsSection";
import About from "../components/About";        // same About used in admin
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";
import Newsletter from "../components/Newsletter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF]">
      <LandingNavbar />

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16 space-y-16">
        <section
          id="hero"
          className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
        >
          {/* Left text */}
          <div className="max-w-xl text-center lg:text-left">
            <button
              type="button"
              className="inline-flex items-center gap-2 border border-indigo-500 text-indigo-600
                         text-xs sm:text-sm rounded-full px-4 pr-2 py-1.5 bg-white/70
                         hover:bg-indigo-50 transition"
            >
              <span>Preferred choice of brands across industries.</span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600">
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              Preferred choice of leaders in
              <span className="text-indigo-600"> every industry</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              We design and deliver experiences that help brands stand out —
              powered by a modern admin dashboard that keeps everything in sync.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5
                           rounded-full text-sm font-medium shadow-md hover:bg-indigo-700 transition"
                onClick={() => {
                  const el = document.querySelector("#projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>View our work</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600
                           px-6 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-100 transition"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start a project
              </button>
            </div>
          </div>

          {/* Right side – we keep it simple: light card */}
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-7 sm:px-8 sm:py-9">
              <h3 className="text-xl font-semibold text-gray-900">
                A single source of truth
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Projects, clients, contact requests and newsletter subscribers —
                all managed from one clean interface.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-gray-700">
                <li>• Update portfolio content without touching code.</li>
                <li>• Sync testimonials and case studies in seconds.</li>
                <li>• Capture leads and subscribers in one place.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Projects */}
      <PublicProjectsSection />

      {/* About section (reused) */}
      <About />

      {/* Testimonials */}
      <section id="clients">
        <Testimonials />
      </section>

      {/* Contact */}
      <ContactSection />

      {/* Newsletter */}
      <section id="newsletter">
        <Newsletter />
      </section>
    </div>
  );
}
