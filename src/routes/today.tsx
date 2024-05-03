import dayjs from "dayjs";
import TodosSection from "src/components/todos-section";
import { DATE_FORMAT, useTodos } from "src/store";

export default function Today() {
  const todos = useTodos();
  const todayTasks = todos.filter((todo) => todo.date === dayjs().format(DATE_FORMAT));
  return <TodosSection title="Today's Tasks" todos={todayTasks} />;
}
