import { getTasks } from "./_services/tasks";

import TaskCard from "./components/TaskCard";

export default async function Home() {
  const tasks = await getTasks();
  let initialPos = -300;
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
      {tasks.map((task) => {
        initialPos = initialPos - 600;
        return <TaskCard key={task._id} task={task} initialPos={initialPos} />;
      })}
    </div>
  );
}

