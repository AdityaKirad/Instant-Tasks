import TodosSection from "src/components/todos-section";
import { useTodos } from "src/store";

export default function Important() {
  const todos = useTodos();
  const importantTasks = todos.filter((todo) => todo.important);
  return <TodosSection title="Important Tasks" todos={importantTasks} />;
}
