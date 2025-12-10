// src/components/About.jsx
export default function About() {
  return (
    <section className="max-w-5xl mx-auto py-10 md:py-12 px-3">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900">
        About your <span className="text-indigo-600">projects workspace</span>
      </h2>

      <p className="text-sm sm:text-base text-slate-500 text-center mt-2 max-w-xl mx-auto">
        A focused place to organize every project your team is working on —
        clean overview, quick editing, and a layout that mirrors what users see
        on the live site.
      </p>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
        <img
          className="max-w-sm w-full rounded-2xl h-auto shadow-lg"
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=900&auto=format&fit=crop"
          alt="Dashboard preview"
        />

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-700">
                Fast updates, no friction
              </h3>
              <p className="text-sm text-slate-500">
                Change content in seconds and see it reflected across your
                website without touching the code.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-700">
                Clean and consistent design
              </h3>
              <p className="text-sm text-slate-500">
                Card-based layout that keeps every project readable, structured,
                and aligned with your brand.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-700">
                Built for future reuse
              </h3>
              <p className="text-sm text-slate-500">
                The same data powers both your admin panel and the public
                landing page, so you maintain everything in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
