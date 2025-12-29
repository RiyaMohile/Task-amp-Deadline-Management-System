import TaskStatusChart from "../../components/taskStatusChart";
import {
  MdChecklist,
  MdPendingActions,
  MdTrendingUp,
  MdDoneAll,
  MdErrorOutline,
} from "react-icons/md";

export default function Dashboard({ tasks = [] }) {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const overdue = tasks.filter(
    t => new Date(t.deadline) < new Date() && t.status !== "Completed"
  ).length;

  
  const today = new Date();
  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);

  const upcomingTasks = tasks
    .filter(t => {
      const due = new Date(t.deadline);
      return due >= today && due <= next7Days && t.status !== "Completed";
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="space-y-10">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Tasks" value={total} icon={<MdChecklist />} gradient="from-blue-500 to-blue-600" />
        <StatCard title="Pending" value={pending} icon={<MdPendingActions />} gradient="from-yellow-400 to-yellow-500" />
        <StatCard title="In Progress" value={inProgress} icon={<MdTrendingUp />} gradient="from-purple-500 to-purple-600" />
        <StatCard title="Completed" value={completed} icon={<MdDoneAll />} gradient="from-green-500 to-green-600" />
        <StatCard title="Overdue" value={overdue} icon={<MdErrorOutline />} gradient="from-red-500 to-red-600" />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-1">
          <h2 className="font-semibold text-lg mb-4 text-center">
            Task Status Overview
          </h2>
          <TaskStatusChart tasks={tasks} />
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Deadlines (Next 7 Days)
          </h2>

          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500">
              🎉 No upcoming deadlines. You’re all clear!
            </p>
          ) : (
            <ul className="space-y-4">
              {upcomingTasks.map(task => {
                const dueDate = new Date(task.deadline);
                const isToday =
                  dueDate.toDateString() === new Date().toDateString();

                return (
                  <li
                    key={task._id}
                    className="flex justify-between items-center border rounded-lg p-4 hover:shadow transition"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-600">
                        Project: {task.project?.name || "—"}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full
                        ${isToday
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"}`}
                    >
                      {isToday
                        ? "Due Today"
                        : dueDate.toLocaleDateString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


function StatCard({ title, value, icon, gradient }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} text-white p-5 rounded-xl shadow flex items-center justify-between`}
    >
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-4xl opacity-80">{icon}</div>
    </div>
  );
}
