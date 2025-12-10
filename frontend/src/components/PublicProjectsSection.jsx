import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function PublicProjectCard({ project }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition">
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PublicProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/projects");
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Our <span className="text-indigo-600">projects</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
            A curated selection of work handled by our team – powered directly
            from your admin panel.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading projects…</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-gray-500">
          No projects available yet. Add some from the admin panel.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <PublicProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
