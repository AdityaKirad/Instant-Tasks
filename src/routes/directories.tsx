import { useParams } from "@tanstack/react-router";
import TodosSection from "src/components/todos-section";
import { useTodos } from "src/store";

export function Directories() {
  const todos = useTodos();
  return <TodosSection title="All Directories Tasks" todos={todos} />;
}

export function DynamicDirectories() {
  const { directory } = useParams({ from: "/directory/$directory" });
  const todos = useTodos();
  const directoryTodos = todos.filter((todo) => todo.directory === directory);
  return <TodosSection title={`${directory} directory tasks`} todos={directoryTodos} />;
}
