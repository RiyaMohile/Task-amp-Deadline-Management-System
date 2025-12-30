import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  MdSchedule,
  MdFlag,
  MdCheckCircle,
  MdPendingActions,
} from "react-icons/md";


const getCardStyle = (task) => {
  const today = new Date().toDateString();
  const deadline = new Date(task.deadline).toDateString();

  
  if (task.status === "Completed") {
    return {
      border: "border-green-400",
      bg: "bg-green-50",
      strip: "bg-green-500",
    };
  }

  
  if (new Date(task.deadline) < new Date()) {
    return {
      border: "border-red-400",
      bg: "bg-red-50",
      strip: "bg-red-500",
    };
  }

  
  if (deadline === today) {
    return {
      border: "border-yellow-400",
      bg: "bg-yellow-50",
      strip: "bg-yellow-400",
    };
  }

 
  return {
    border: "border-gray-200",
    bg: "bg-white",
    strip: "bg-gray-300",
  };
};

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("https://taskproject-backend-0sqw.onrender.com/tasks/my").then((res) => setTasks(res.data));
  }, []);

  
  const updateStatus = async (id, status) => {
    await API.put(`https://taskproject-backend-0sqw.onrender.com/tasks/${id}/status`, { status });
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status } : t))
    );
  };

  return (
    <div className="p-6">

      
      <div className="mb-6 bg-white text-black p-5 rounded-xl shadow">
        <h1 className="text-2xl font-bold">My Tasks</h1>
      </div>

      
      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks assigned yet.</p>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
          const style = getCardStyle(task);

          return (
            <div
              key={task._id}
              className={`
                relative rounded-xl p-5 border shadow-sm
                cursor-pointer
                ${style.border} ${style.bg}
              `}
            >
              
              <span
                className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${style.strip}`}
              />

              
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-semibold text-lg text-gray-800">
                  {task.title}
                </h2>

                
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                    ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {task.status === "Completed" ? (
                    <span className="flex items-center gap-1">
                      <MdCheckCircle /> Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <MdPendingActions /> {task.status}
                    </span>
                  )}
                </span>
              </div>

              
              <p
                className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-3
                  ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {task.project?.name || "No Project"}
              </p>

              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {task.description}
              </p>

              
              <div className="text-sm space-y-1 mb-4">
                <p className="flex items-center gap-2 text-gray-600">
                  <MdFlag className="text-purple-600" />
                  <span className="font-medium">Priority:</span> {task.priority}
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <MdSchedule className="text-blue-600" />
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>

              
              <div className="flex justify-end">
                <select
                  className="border rounded px-3 py-1 text-sm bg-white"
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
