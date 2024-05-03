import Avatar from "./avatar";
import Button from "./button";
import { DeleteDataModal } from "./modal";
import * as RadixProgress from "@radix-ui/react-progress";
import * as Separator from "@radix-ui/react-separator";
import dayjs from "dayjs";
import { forwardRef, useState } from "react";
import { cn } from "src/lib/utils";
import { DATE_FORMAT, useTodos, type TodosRecord } from "src/store";

const Taskbar = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("fixed inset-y-0 right-0 flex flex-col gap-4 bg-gray-800 p-2 xl:w-1/5", className)}
      {...props}>
      <div className="flex items-center justify-center gap-2">
        Hi, User
        <Avatar />
      </div>

      <ProgressContainer />

      <Separator.Root className="h-px bg-gray-700" />
      <ul>
        <List />
      </ul>
      <DeleteData />
      <div className="rounded border-2 border-gray-900 py-8 text-center">Made by Aditya Kirad</div>
    </div>
  );
});

Taskbar.displayName = "Taskbar";
function ProgressContainer() {
  const todos = useTodos();
  const todayTodos = todos.filter((todo) => todo.date === dayjs().format(DATE_FORMAT));
  return (
    <div>
      <Progress type="All" todos={todos} />
      {todayTodos.length ? <Progress type="Today's" todos={todayTodos} /> : null}
    </div>
  );
}

function Progress({ type, todos }: { type: "All" | "Today's"; todos: TodosRecord }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const percentage = completed > 0 ? (completed / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between">
        <span>{type} tasks</span>
        <span>
          {completed}/{total}
        </span>
      </div>
      <RadixProgress.Root
        className="relative h-2 overflow-hidden rounded-full bg-gray-900"
        style={{ transform: "translateZ(0)" }}
        value={percentage}>
        <RadixProgress.Indicator
          className="h-full bg-blue-500 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </RadixProgress.Root>
    </div>
  );
}

function List() {
  const todos = useTodos().filter((todo) => todo.date === dayjs().format(DATE_FORMAT));
  return todos.length ? todos.map((todo) => <li key={todo.id}>{todo.name}</li>) : <li>No tasks today</li>;
}

function DeleteData() {
  const [deleteData, deleteDataSet] = useState(false);
  return (
    <>
      <Button className="mt-auto !bg-transparent text-inherit hover:text-white" onClick={() => deleteDataSet(true)}>
        Delete All Data
      </Button>
      <DeleteDataModal open={deleteData} onOpenChange={deleteDataSet} />
    </>
  );
}

export default Taskbar;
