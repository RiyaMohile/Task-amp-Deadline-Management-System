import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [interns, setInterns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    project: "",
    assignedTo: "",
  });

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "hidden";
    return () => (document.body.style.overflow = "hidden");
  }, [showModal]);

  const fetchData = async () => {
    const t = await API.get("/tasks");
    const p = await API.get("/projects");
    const u = await API.get("/users?role=intern");
    setTasks(t.data);
    setProjects(p.data);
    setInterns(u.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Low",
      deadline: "",
      project: "",
      assignedTo: "",
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.deadline || !form.project || !form.assignedTo) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      await API.put(`/tasks/${editId}`, form);
    } else {
      await API.post("/tasks", form);
    }

    resetForm();
    setShowModal(false);
    fetchData();
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline.slice(0, 10),
      project: task.project._id,
      assignedTo: task.assignedTo._id,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete task?")) {
      await API.delete(`/tasks/${id}`);
      fetchData();
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden px-8 py-6">

      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow mb-6">
        <h1 className="text-xl font-bold">
          Tasks ({tasks.length})
        </h1>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Create Task
        </button>
      </div>


      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-lg mb-1">
                  {task.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {task.project.name}
                  </span>

                  <span
                    className={`px-2 py-1 rounded font-semibold
                      ${task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {task.priority}
                  </span>

                  <span className="px-2 py-1 rounded bg-purple-100 text-purple-700">
                    {task.assignedTo.name}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-3">
                  Deadline:{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-[480px] p-7"
          >
            <h2 className="text-xl font-bold mb-5 cursor-pointer">
              {editId ? "Edit Task" : "Create New Task"}
            </h2>

            <div className="space-y-4">
              <input
                className="border p-3 w-full rounded"
                placeholder="Task Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                className="border p-3 w-full rounded resize-none"
                placeholder="Task Description"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="border p-3 rounded"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                />

                <select
                  className="border p-3 rounded"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <select
                className="border p-3 w-full rounded"
                value={form.project}
                onChange={(e) =>
                  setForm({ ...form, project: e.target.value })
                }
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                className="border p-3 w-full rounded"
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({ ...form, assignedTo: e.target.value })
                }
              >
                <option value="">Assign Intern</option>
                {interns.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name} ({i.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className={`px-5 py-2 rounded text-white cursor-pointer
                  ${
                    editId
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                  }`}
              >
                {editId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
