import TodosSection from "src/components/todos-section";
import { useTodos } from "src/store";

export default function Completed() {
  const todos = useTodos();
  const completedTasks = todos.filter((todo) => todo.completed);
  return <TodosSection title="Completed Tasks" todos={completedTasks} />;
}
