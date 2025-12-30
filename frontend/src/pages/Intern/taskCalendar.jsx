import { useEffect, useState } from "react";
import API from "../../services/api";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function TaskCalendar() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    API.get("https://taskproject-backend-0sqw.onrender.com/tasks/my").then(res => setTasks(res.data));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

 
  const taskMap = {};
  tasks.forEach(task => {
    const key = new Date(task.deadline).toDateString();
    taskMap[key] = taskMap[key] || [];
    taskMap[key].push(task);
  });

  
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  
  const getDayBg = (dayTasks) => {
    if (!dayTasks || dayTasks.length === 0) return "";

    if (dayTasks.some(t => t.status === "Completed")) {
      return "bg-green-50";
    }

    if (dayTasks.some(t => new Date(t.deadline) < new Date())) {
      return "bg-red-50";
    }

    if (dayTasks.some(t => t.status === "In Progress")) {
      return "bg-yellow-50";
    }

    return "bg-red-50";
  };

  return (
    <div className="p-6 bg-gray-100 h-[calc(100vh-64px)] overflow-hidden">

      
      <div className="mb-6 bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Task Calendar
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1))}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MdChevronLeft size={22} />
          </button>

          <span className="font-semibold text-gray-700">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button
            onClick={() => setCurrentDate(new Date(year, month + 1))}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MdChevronRight size={22} />
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-7 bg-blue-600 text-white text-xs rounded-t-md">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
          <div key={d} className="p-2 text-center font-semibold">
            {d}
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-7 bg-white border rounded-b-md h-[calc(100%-120px)]">
        {cells.map((day, idx) => {
          const dateObj = day ? new Date(year, month, day) : null;
          const key = dateObj?.toDateString();
          const dayTasks = taskMap[key] || [];
          const isToday = key === new Date().toDateString();

          return (
            <div
              key={idx}
              className={`
                border p-1 text-xs overflow-hidden
                transition
                hover:bg-gray-200
                ${isToday ? "ring-2 ring-blue-400" : ""}
                ${getDayBg(dayTasks)}
              `}
            >
              {day && (
                <>
                  <div className="font-semibold text-right mb-1">
                    {day}
                  </div>

                  
                  <div className="space-y-1 max-h-[72px] overflow-y-auto">
                    {dayTasks.map(task => (
                      <div
                        key={task._id}
                        className={`px-1 py-[2px] rounded text-[10px] truncate
                          ${
                            task.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : new Date(task.deadline) < new Date()
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
