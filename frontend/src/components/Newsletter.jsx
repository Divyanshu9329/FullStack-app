import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      // axiosClient baseURL = http://localhost:5000/api
      const res = await axiosClient.post("/subscribers", { email });

      setStatus({
        type: "success",
        message: res.data?.message || "Subscribed successfully",
      });
      setEmail("");
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
    <section className="px-6 sm:px-10 lg:px-24 max-w-6xl mx-auto w-full py-16 mt-16 rounded-3xl 
                       bg-linear-to-b from-[#EEF2FF] via-white to-[#EEF2FF]">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Subscribe to our <span className="text-indigo-600">newsletter</span>
        </h2>

        <p className="text-base text-slate-500 max-w-lg mt-2">
          Stay updated with product improvements and upcoming features.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center mt-10 border border-indigo-200 
                   focus-within:ring-2 focus-within:ring-indigo-500 rounded-full
                   h-14 max-w-xl mx-auto w-full bg-white shadow-md"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="bg-transparent outline-none rounded-full px-5 h-full flex-1 text-sm text-gray-700 placeholder:text-gray-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white rounded-full h-11 mr-1 px-8 text-sm font-medium flex items-center justify-center 
                     hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status.message && (
        <p
          className={`text-sm mt-4 text-center ${
            status.type === "error" ? "text-red-500" : "text-indigo-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </section>
  );
}
