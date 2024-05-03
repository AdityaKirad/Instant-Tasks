import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { DATE_FORMAT, TodosRecord } from "src/store";
import { twMerge } from "tailwind-merge";

const sortFunctions = {
  earlier: "Earlier first",
  later: "Later first",
  incomplete: "Incomplete first",
  important: "Important first",
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function sortTodos(todos: TodosRecord, sortFunction: string) {
  switch (sortFunction) {
    case sortFunctions.earlier:
      return [...todos].sort((a, b) => dayjs(a.date, DATE_FORMAT).diff(dayjs(b.date, DATE_FORMAT)));
    case sortFunctions.later:
      return [...todos].sort((a, b) => dayjs(b.date, DATE_FORMAT).diff(dayjs(a.date, DATE_FORMAT)));
    case sortFunctions.important:
      return [...todos].sort((a, b) => Number(b.important) - Number(a.important));
    case sortFunctions.incomplete:
      return [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
    default:
      return todos;
  }
}

export { cn, sortFunctions, sortTodos };
