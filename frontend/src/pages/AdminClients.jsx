import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function ClientAdmin() {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    imageUrl: "",
    isActive: true
  });

  const fetchClients = async () => {
    try {
      const res = await axiosClient.get("/admin/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "",
      description: "",
      imageUrl: "",
      isActive: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation || !formData.description || !formData.imageUrl)
      return;

    try {
      if (editingId) {
        await axiosClient.put(`/admin/clients/${editingId}`, formData);
      } else {
        await axiosClient.post("/admin/clients", formData);
      }
      resetForm();
      fetchClients();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (client) => {
    setEditingId(client._id);
    setFormData({
      name: client.name,
      designation: client.designation,
      description: client.description,
      imageUrl: client.imageUrl,
      isActive: client.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axiosClient.delete(`/admin/clients/${id}`);
    fetchClients();
  };

  return (
    <div className="space-y-12">
      
      {/* HEADER */}
      <section className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Manage <span className="text-indigo-600">Clients</span>
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Add testimonials & client data to display across your landing pages.
        </p>
      </section>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-3xl mx-auto">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">
          {editingId ? "Edit Client" : "Add New Client"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Client Name</label>
            <input
              type="text"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600">Designation</label>
            <input
              type="text"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              placeholder="CEO at Company"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Client Feedback</label>
            <textarea
              rows="3"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Their feedback and testimonial..."
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-600">Image URL</label>
            <input
              type="text"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://..."
            />
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Active client (visible publicly)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                className="px-6 py-2 text-gray-600 rounded-full border hover:bg-gray-200 transition text-sm"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm"
            >
              {editingId ? "Update" : "Add Client"}
            </button>
          </div>
        </form>
      </div>

      {/* CLIENT CARDS */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Client Testimonials
        </h3>

        {clients.length === 0 ? (
          <p className="text-gray-500 text-sm">No clients added yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center gap-4 px-4 py-3 bg-indigo-50">
                  <img
                    src={c.imageUrl}
                    alt="client"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{c.name}</h4>
                    <p className="text-xs text-gray-500">{c.designation}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{c.description}</p>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <button
                    className="text-indigo-600 text-sm hover:underline"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
