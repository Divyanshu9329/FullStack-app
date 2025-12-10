import { useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminSubscribers() {
  const [subs, setSubs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSubs = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/admin/subscribers");
      const data = res.data || [];
      setSubs(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  // stats
  const stats = useMemo(() => {
    const total = subs.length;
    const today = subs.filter(s => {
      if (!s.createdAt) return false;
      const d = new Date(s.createdAt);
      const now = new Date();
      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }).length;
    return { total, today };
  }, [subs]);

  // search filter
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFiltered(subs);
      return;
    }
    setFiltered(
      subs.filter(s => s.email?.toLowerCase().includes(q))
    );
  }, [search, subs]);

  const formatDate = iso => {
    if (!iso) return "-";
    const d = new Date(iso);
    return (
      d.toLocaleDateString() +
      " • " +
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const handleDelete = async id => {
    if (!window.confirm("Remove this subscriber?")) return;
    try {
      await axiosClient.delete(`/admin/subscribers/${id}`);
      fetchSubs();
    } catch (err) {
      console.error("Failed to delete subscriber", err);
    }
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Newsletter audience
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-gray-900">
            Newsletter <span className="text-indigo-600">Subscribers</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
            All users who subscribed through the newsletter form. Use this list
            to export emails for campaigns or analysis.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 min-w-[220px]">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase tracking-wide text-gray-500">
              Total Subscribers
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase tracking-wide text-gray-500">
              Joined Today
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats.today}
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-indigo-600">
            {filtered.length}
          </span>{" "}
          of {subs.length} subscribers
        </div>
        <div className="flex items-center gap-2 w-full sm:w-80">
          <div className="flex-1 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
              />
            </svg>
            <input
              type="text"
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              placeholder="Search by email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Subscribers list
          </h2>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading subscribers...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500">
            No subscribers yet. Once users subscribe through the newsletter form,
            they will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Joined at</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr
                    key={s._id}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-2xl"
                  >
                    <td className="px-4 py-3 rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                          {(s.email || "U")[0].toUpperCase()}
                        </div>
                        <div className="font-medium text-gray-900">
                          {s.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(s.createdAt)}
                    </td>
                    <td className="px-4 py-3 rounded-r-2xl text-right">
                      <button
                        className="text-red-500 text-xs font-semibold hover:underline"
                        onClick={() => handleDelete(s._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
