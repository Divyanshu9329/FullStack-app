export default function ProjectForm({
  formData,
  setFormData,
  onSubmit,
  editing,
  onCancel,
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-7 sm:px-8 sm:py-9 w-full max-w-md">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
        {editing ? "Update project details" : "Add a new project"}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-6">
        Fill in the project information.
      </p>

      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Project Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Project name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Marketing Automation Suite"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-sm text-gray-900
                       focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Short description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe what this project does and why it matters."
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-sm text-gray-900
                       focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Image URL
          </label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={e =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="https://example.com/project-cover.jpg"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-sm text-gray-900
                       focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
          />
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            className="w-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500
                       text-white text-sm font-semibold py-2.5 shadow-md hover:shadow-lg
                       hover:from-indigo-600 hover:to-violet-600 transition"
          >
            {editing ? "Save changes" : "Create project"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full rounded-full border border-gray-300 bg-white
                         text-sm font-medium text-gray-700 py-2.5 hover:bg-gray-50 transition"
            >
              Cancel editing
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
