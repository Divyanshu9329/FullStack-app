import { useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/admin/contacts");
      const data = res.data || [];
      setContacts(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Derived stats
  const stats = useMemo(() => {
    const total = contacts.length;
    const today = contacts.filter(c => {
      if (!c.createdAt) return false;
      const d = new Date(c.createdAt);
      const now = new Date();
      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }).length;

    const cities = new Set(
      contacts
        .map(c => c.city)
        .filter(Boolean)
        .map(c => c.toLowerCase())
    ).size;

    return { total, today, cities };
  }, [contacts]);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFiltered(contacts);
      return;
    }
    setFiltered(
      contacts.filter(c =>
        [c.fullName, c.email, c.mobile, c.city]
          .filter(Boolean)
          .some(v => v.toLowerCase().includes(q))
      )
    );
  }, [search, contacts]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobile) return;
    try {
      await axiosClient.post("/admin/contacts", formData);
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
      fetchContacts();
    } catch (err) {
      console.error("Failed to add contact", err);
    }
  };

  const formatDate = iso => {
    if (!iso) return "-";
    const d = new Date(iso);
    return (
      d.toLocaleDateString() +
      " • " +
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="space-y-10">
      {/* HERO / HEADER */}
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Contacts pipeline
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-gray-900">
            Inbox for <span className="text-indigo-600">Contact requests</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
            Every submission from your public contact form lands here. 
            Quickly scan and respond to potential leads without digging through emails.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 min-w-[260px]">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase tracking-wide text-gray-500">
              Total Contacts
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase tracking-wide text-gray-500">
              Today
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats.today}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase tracking-wide text-gray-500">
              Unique Cities
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {stats.cities}
            </p>
          </div>
        </div>
      </section>

      {/* ADD CONTACT + SEARCH */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
        {/* Add contact form card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Add contact manually
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Useful for adding offline leads or testing your pipeline.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-gray-600">
                Full name
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={e =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-gray-600">
                Mobile
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={e =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Mumbai"
                value={formData.city}
                onChange={e =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2 flex justify-end mt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2 text-sm
                           font-semibold text-white shadow-md hover:bg-indigo-700 active:scale-95 transition"
              >
                Add contact
                <span className="text-lg leading-none">＋</span>
              </button>
            </div>
          </form>
        </div>

        {/* Search / filter card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Filter contacts
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Search by name, email, mobile number or city.
          </p>

          <div className="mt-4 flex items-center gap-2">
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
                placeholder="Search contacts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-indigo-600">
              {filtered.length}
            </span>{" "}
            of {contacts.length} contacts
          </p>
        </div>
      </section>

      {/* CONTACTS TABLE */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Contacts list
          </h2>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading contacts...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500">
            No contacts found. Once users fill the contact form, their details
            will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Mobile</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">Submitted at</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr
                    key={c._id}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-2xl"
                  >
                    <td className="px-4 py-3 rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                          {(c.fullName || "U")[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {c.fullName || "-"}
                          </div>
                          {c.email && (
                            <div className="text-[11px] text-gray-500">
                              {c.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{c.email || "-"}</td>
                    <td className="px-4 py-3">{c.mobile || "-"}</td>
                    <td className="px-4 py-3">{c.city || "-"}</td>
                    <td className="px-4 py-3 rounded-r-2xl text-gray-500 text-xs">
                      {formatDate(c.createdAt)}
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
