import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStatus({ type: "", message: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobile) return;

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      // Public contact API – ensure backend has POST /api/contact
      const res = await axiosClient.post("/contact", formData);

      setStatus({
        type: "success",
        message: res.data?.message || "Thanks! We’ll get back to you shortly.",
      });
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Let’s talk about your <span className="text-indigo-600">project</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl">
          Share a few details and our team will reach out with ideas, timelines
          and next steps.
        </p>

        <div className="mt-8 grid gap-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800">Fast response</p>
            <p className="text-gray-500 text-xs">
              Most inquiries are answered within one business day.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Tailored proposals</p>
            <p className="text-gray-500 text-xs">
              We look at your goals and suggest only what actually makes sense.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-7">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contact form
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-medium text-gray-600">
              Full name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                Mobile
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">
              City (optional)
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Mumbai"
            />
          </div>

          <button
            disabled={loading}
            className="mt-2 w-full rounded-full bg-indigo-600 text-white text-sm font-semibold py-2.5
                       shadow-md hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit inquiry"}
          </button>

          {status.message && (
            <p
              className={`text-xs mt-2 ${
                status.type === "error" ? "text-red-500" : "text-indigo-600"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
