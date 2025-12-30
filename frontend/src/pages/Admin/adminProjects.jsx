import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "hidden";
    return () => (document.body.style.overflow = "hidden");
  }, [showModal]);

  const fetchProjects = async () => {
    const res = await API.get("https://taskproject-backend-0sqw.onrender.com/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Project name required");

    if (editId) {
      await API.put(`https://taskproject-backend-0sqw.onrender.com/projects/${editId}`, { name, description });
    } else {
      await API.post("https://taskproject-backend-0sqw.onrender.com/projects", { name, description });
    }

    resetForm();
    setShowModal(false);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setName(project.name);
    setDescription(project.description);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete project?")) {
      await API.delete(`https://taskproject-backend-0sqw.onrender.com/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden px-8 py-6">

      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Projects ({projects.length})
        </h1>

        <button onClick={() => {
          resetForm(); 
          setShowModal(true);
          }}className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Create Project
        </button>
      </div>

      {/* 🧱 PROJECT GRID (ONLY THIS SCROLLS) */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
                <h2 className="font-semibold text-lg">{p.name}</h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {p.description}
                </p>

                <p className="text-xs text-gray-400 mb-4">
                  Created: {new Date(p.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-4 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-4 py-1 rounded" >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-[420px] p-7">
            <h2 className="text-xl font-bold mb-5">
              {editId ? "Edit Project" : "Create New Project"}
            </h2>

            <div className="space-y-4">
              <input
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="border p-3 w-full rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
                Cancel
              </button>

              <button onClick={handleSubmit} className={`px-5 py-2 rounded text-white ${editId ? "bg-yellow-500" : "bg-blue-600"}`}>
                {editId ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
