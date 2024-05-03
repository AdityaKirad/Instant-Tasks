import { useParams, useSearch } from "@tanstack/react-router";
import TodosSection from "src/components/todos-section";
import { useTodos } from "src/store";

export function Tasks() {
  const { query } = useSearch({ from: "/tasks" });
  const todos = useTodos();
  const filteredTodos = todos.filter((todo) => todo.name.includes(query.trim()));
  return <TodosSection title={`Results for "${query}"`} todos={filteredTodos} />;
}

export function DynamicTasks() {
  const { taskId } = useParams({ from: "/tasks/$taskId" });
  const todos = useTodos();
  const filteredTodos = todos.filter((todo) => todo.id === taskId);

  return <TodosSection title="All Directories Tasks" todos={filteredTodos} />;
}
