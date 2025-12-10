import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
            fill="#6366F1"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    try {
      // public clients API: GET /api/clients
      const res = await axiosClient.get("/clients");
      setClients(res.data || []);
    } catch (err) {
      console.error("Failed to load clients for testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const visibleClients = clients.slice(0, 3); // show first 3

  return (
    <section className="mt-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900">
        What our <span className="text-indigo-600">clients say</span>
      </h2>
      <p className="text-sm sm:text-base text-slate-500 text-center mt-2 max-w-xl mx-auto">
        Testimonials powered directly from your Clients collection — update once
        in the admin panel, and it reflects everywhere.
      </p>

      {loading ? (
        <p className="text-center mt-6 text-gray-500 text-sm">Loading testimonials…</p>
      ) : visibleClients.length === 0 ? (
        <p className="text-center mt-6 text-gray-500 text-sm">
          No clients found. Add some clients in the admin panel to see testimonials here.
        </p>
      ) : (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {visibleClients.map(client => (
            <div
              key={client._id}
              className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
            >
              <div className="flex items-center gap-4 px-5 py-4 bg-indigo-500/10">
                {client.imageUrl ? (
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={client.imageUrl}
                    alt={client.name}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-semibold text-indigo-700">
                    {client.name?.[0] || "C"}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {client.name}
                  </h3>
                  <p className="text-gray-800/80">
                    {client.designation || "Client"}
                  </p>
                </div>
              </div>

              <div className="p-5 pb-7">
                <StarRow />
                <p className="text-gray-500 mt-5">
                  {client.description ||
                    "This client hasn’t added a testimonial description yet."}
                </p>
              </div>

              <span className="text-indigo-500 underline px-5 cursor-pointer">
                Read more
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
