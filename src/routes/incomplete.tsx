import TodosSection from "src/components/todos-section";
import { useTodos } from "src/store";

export default function Incomplete() {
  const todos = useTodos();
  const inCompleteTasks = todos.filter((todo) => !todo.completed);
  return <TodosSection title="Incomplete Tasks" todos={inCompleteTasks} />;
}
