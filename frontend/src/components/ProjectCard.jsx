export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="group w-72 h-96 mx-auto perspective-[1000px] cursor-pointer">

      {/* Flip Wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-500 
        transform-3d group-hover:transform-[rotateY(180deg)]"
      >

        {/* ================= FRONT SIDE ================= */}
        <div
          className="absolute w-full h-full backface-hidden 
          bg-white rounded-lg shadow p-4 text-sm border border-gray-200"
        >
          <img
            src={project.imageUrl}
            alt={project.name}
            className="rounded-md max-h-44 w-full object-cover"
          />

          <p className="text-gray-900 text-xl font-semibold mt-3 ml-1">
            {project.name}
          </p>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div
          className="absolute w-full h-full backface-hidden 
          bg-white text-gray-900 rounded-lg shadow p-4 text-sm
          transform-[rotateY(180deg)] flex flex-col justify-between"
        >
          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            {project.description}
          </p>

          {/* Buttons */}
          <div className="flex justify-between mt-2">
            <button
              className="bg-indigo-600 px-5 py-2 rounded text-white font-medium"
              onClick={() => onEdit(project)}
            >
              Edit
            </button>

            <button
              className="bg-red-600 px-5 py-2 rounded text-white font-medium"
              onClick={() => onDelete(project._id)}
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
