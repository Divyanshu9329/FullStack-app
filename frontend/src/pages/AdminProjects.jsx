import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";


export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const fetchProjects = async () => {
    const res = await axiosClient.get("/admin/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const reset = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", imageUrl: "" });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.imageUrl) return;

    if (editingId) {
      await axiosClient.put(`/admin/projects/${editingId}`, formData);
    } else {
      await axiosClient.post("/admin/projects", formData);
    }
    reset();
    fetchProjects();
  };

  const handleEdit = project => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      description: project.description,
      imageUrl: project.imageUrl,
    });
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this project?")) return;
    await axiosClient.delete(`/admin/projects/${id}`);
    fetchProjects();
  };

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 pt-4">
        {/* Left text */}
        <div className="max-w-xl text-center lg:text-left">
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-indigo-500 text-indigo-600
                       text-xs sm:text-sm rounded-full px-4 pr-2 py-1.5 bg-white/60
                       hover:bg-indigo-50 transition"
          >
            <span>Manage and showcase your projects effortlessly.</span>
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
            Central dashboard for
            <span className="text-indigo-600"> all your projects</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Create, update and manage every project from a single place. 
            These records drive what your users see on the main website.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5
                         rounded-full text-sm font-medium shadow-md hover:bg-indigo-700 transition"
            >
              <span>View all projects</span>
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
            >
              Add first project
            </button>
          </div>
        </div>

        {/* Right: form */}
        <div className="w-full flex justify-center lg:justify-end">
          <ProjectForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            editing={!!editingId}
            onCancel={reset}
          />
        </div>
      </section>

      {/* PROJECT CARDS SECTION */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          All projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-sm text-gray-500">
            No projects added yet. Use the form above to create one.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS SECTION */}
      <Testimonials />

      {/* NEWSLETTER SECTION */}
      <Newsletter />

    </div>
  );
}
