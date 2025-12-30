import { useEffect, useState } from "react";
import API from "../../services/api";
import Dashboard from "./dashboard";

export default function InternDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks/my").then(res => setTasks(res.data));
  }, []);

  return (
    <>
      <Dashboard tasks={tasks} />
    </>
  );
}
