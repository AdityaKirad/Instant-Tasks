import Button from "./button";
import * as Separator from "@radix-ui/react-separator";
import { Link } from "@tanstack/react-router";
import { Calendar, Check, MoreVertical, Star, Trash2, X } from "lucide-react";
import { memo } from "react";
import { cn, sortTodos } from "src/lib/utils";
import { type TodoType, type TodosRecord, useTodosActions, useModalActions, useLayout, useSort } from "src/store";

type TodosSectionProps = {
  todos: TodosRecord;
  title: string;
};

export default function TodosSection({ title, todos }: TodosSectionProps) {
  return (
    <div className="p-2">
      <Header title={title} totalTodos={todos.length} />
      <Grid todos={todos} />
    </div>
  );
}

const Header = memo(({ title, totalTodos }: { title: string; totalTodos: number }) => {
  return (
    <h2 className="text-xl font-bold text-white">
      {title} ({totalTodos})
    </h2>
  );
});

Header.displayName = "Header";

function Grid({ todos }: { todos: TodosRecord }) {
  const layout = useLayout();
  const sort = useSort();
  const sortedTodos = sortTodos(todos, sort);
  return (
    <div
      className={cn("mt-2 grid gap-2", {
        "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3": layout === "grid",
      })}>
      {sortedTodos.map((todo) => (
        <Card todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

const Card = memo(({ todo }: { todo: TodoType }) => {
  const { id, name, description, directory, date, important, completed } = todo;
  return (
    <div className="flex flex-col">
      <Button className="ml-auto mr-4 w-fit rounded-b-none" asChild>
        <Link to="/directory/$directory" params={{ directory }}>
          {directory}
        </Link>
      </Button>
      <div className="flex min-h-48 flex-col rounded bg-gray-800 p-2">
        <div className="flex h-full flex-col">
          <h3 className="text-white">{name}</h3>
          <p>{description}</p>
          <span className="mb-0 mt-auto inline-flex items-center gap-2">
            <Calendar /> {date}
          </span>
        </div>
        <Separator.Root className="my-2 h-px bg-gray-900" />
        <div className="flex items-center justify-between">
          <CompleteButton completed={completed} id={id} />
          <ImportantButton important={important} id={id} />
          <DeleteButton id={id} />
          <EditButton id={id} />
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

function CompleteButton({ completed, id }: { completed: boolean; id: string }) {
  const { toggleCompleted } = useTodosActions();
  return (
    <Button
      className="transition-[padding] duration-300 max-md:rounded-full max-md:p-2"
      onClick={() => toggleCompleted(id)}>
      <span className="max-md:sr-only">{completed ? "Completed" : "Incomplete"}</span>
      {completed ? <Check className="md:hidden" /> : <X className="md:hidden" />}
    </Button>
  );
}

function ImportantButton({ id, important }: { id: string; important: boolean }) {
  const { toggleImportant } = useTodosActions();
  return (
    <Button type="button" variant="icon" onClick={() => toggleImportant(id)}>
      <Star className={cn({ "fill-white": important })} />
      <span className="sr-only">{important ? "Mark as Important" : "Unmark as Important"}</span>
    </Button>
  );
}

function DeleteButton({ id }: { id: string }) {
  const { deleteTodo } = useTodosActions();
  return (
    <Button type="button" variant="icon" onClick={() => deleteTodo(id)}>
      <Trash2 />
    </Button>
  );
}

function EditButton({ id }: { id: string }) {
  const { taskModalSet } = useModalActions();
  return (
    <Button type="button" variant="icon" onClick={() => taskModalSet({ open: true, action: "edit", taskId: id })}>
      <MoreVertical />
    </Button>
  );
}
