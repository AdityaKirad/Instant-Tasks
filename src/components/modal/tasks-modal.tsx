import Button from "../button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../dialog";
import Input from "../input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../select";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { Check, CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import {
  DATE_FORMAT,
  useTaskInput,
  useTodosActions,
  useDirectories,
  type TodoType,
  useTaskModal,
  useModalActions,
  initialTaskState,
  useTodos,
} from "src/store";

type FormInputProps = {
  name: keyof Pick<TodoType, "name" | "description">;
  placeholder: string;
  required?: boolean;
};

type FormCheckboxProps = {
  name: keyof Pick<TodoType, "important" | "completed">;
  title: string;
};

export default function TaskModal() {
  const { action, open, taskId } = useTaskModal();
  const todos = useTodos();
  const { taskModalSet } = useModalActions();
  const { addTodo, editTodo, taskInputSet } = useTodosActions();

  const handleClose = () => taskModalSet({ action, taskId, open: false });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (action === "add") addTodo();
      else editTodo(taskId);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  }

  useEffect(() => {
    if (action === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...props } = todos.find((item) => item.id === taskId)!;
      taskInputSet(props);
    } else taskInputSet(initialTaskState);
  }, [action, taskId, taskInputSet, todos]);
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>{action === "add" ? "Add New" : "Edit"} Task</DialogTitle>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput name="name" placeholder="Task title here" required />
          <FormDateInput />
          <FormDirectoriesInput />
          <FormInput name="description" placeholder="Task description here" />
          <FormCheckBox name="important" title="Mark as Important" />
          <FormCheckBox name="completed" title="Mark as Completed" />
          <div className="flex justify-end gap-2">
            <Button type="submit">{action === "add" ? "Create" : "Edit"}</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormInput(props: FormInputProps) {
  const { name, placeholder, required } = props;
  const input = useTaskInput(name);
  const { taskInputSet } = useTodosActions();
  return (
    <Label.Root>
      {name.charAt(0).toUpperCase() + name.slice(1)}
      <Input
        className="mt-1"
        type="text"
        placeholder={placeholder}
        value={input as string}
        onChange={(e) => taskInputSet({ [name]: e.target.value })}
        required={required}
      />
    </Label.Root>
  );
}

function FormCheckBox(props: FormCheckboxProps) {
  const input = useTaskInput(props.name);
  const { taskInputSet } = useTodosActions();
  return (
    <Label.Root className="inline-flex items-center gap-2">
      <Checkbox.Root
        className="flex size-6 appearance-none items-center justify-center rounded bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        checked={input as boolean}
        onCheckedChange={(e) => taskInputSet({ [props.name]: e })}>
        <Checkbox.Indicator>
          <Check className="text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {props.title}
    </Label.Root>
  );
}

function FormDateInput() {
  const input = useTaskInput("date");
  const { taskInputSet } = useTodosActions();

  function formattedDate(date?: Date) {
    return dayjs(date).format(DATE_FORMAT);
  }
  return (
    <Label.Root>
      Date
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button className="mt-1 w-full !bg-gray-800 p-2">
            <CalendarIcon />
            <span>{input ? input : "Pick a Date"}</span>
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="bg-gray-900 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <DayPicker
              className="text- rounded border p-3 text-white shadow-md"
              classNames={{
                months: "flex max-sm:flex-col max-sm:space-y-4 sm:space-x-4",
                caption: "relative flex justify-center pt-1 items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "absolute flex justify-center items-center p-2 rounded outline-none opacity-50 transition-[colors,opacity] hover:bg-gray-700 hover:opacity-100 focus-visible:bg-gray-700 focus-visible:opacity-100",
                nav_button_previous: " left-1",
                nav_button_next: "right-1",
                table: "mt-4",
                tbody: "mt-1",
                head_row: "flex",
                head_cell: "rounded-md w-8 text-sm",
                row: "flex w-full mt-2",
                cell: "p-0",
                day: "size-8 text-sm rounded aria-selected:bg-gray-700 [&.day-outside]:aria-selected:bg-accent/50",
                day_outside:
                  "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_hidden: "invisible",
              }}
              mode="single"
              selected={dayjs(input as string, "MMMM D, YYYY").toDate()}
              onSelect={(e) => taskInputSet({ date: formattedDate(e) })}
              showOutsideDays
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </Label.Root>
  );
}

function FormDirectoriesInput() {
  const directories = useDirectories();
  const taskInput = useTaskInput("directory");
  const { taskInputSet } = useTodosActions();
  return (
    <Label.Root>
      Directory
      <Select value={taskInput as string} onValueChange={(e) => taskInputSet({ directory: e })}>
        <SelectTrigger className="mt-1 w-full" title="Select directory" placeholder="Select a directory" />
        <SelectContent>
          {directories.map((directory, index) => (
            <SelectItem key={`directory ${index + 1}`} value={directory}>
              {directory}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label.Root>
  );
}
