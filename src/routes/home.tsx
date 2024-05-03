import TodosSection from "src/components/todos-section";
import { useTodos } from "src/store";

export default function Home() {
  const todos = useTodos();
  return <TodosSection title="All Tasks" todos={todos} />;
}
