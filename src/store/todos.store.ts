import dayjs from "dayjs";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

const DATE_FORMAT = "MMMM D, YYYY";

type TodoType = {
  id: string;
  name: string;
  description: string;
  date: string;
  directory: string;
  important: boolean;
  completed: boolean;
};

type TodosRecord = TodoType[];

type TodosSlice = {
  todos: TodosRecord;
  taskInput: Omit<TodoType, "id">;
  taskActions: {
    taskInputSet: (action: Partial<Omit<TodoType, "id">>) => void;
    addTodo: () => void;
    editTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    toggleCompleted: (id: string) => void;
    toggleImportant: (id: string) => void;
  };
};

type DirectoriesSlice = {
  directories: string[];
  directoryInput: string;
  directoryActions: {
    directoryInputSet: (directory: string) => void;
    addDirectory: () => void;
    editDirectory: (oldDirectory: string) => void;
    deleteDirectory: (directory: string) => void;
  };
};

type Store = TodosSlice & DirectoriesSlice;

function createInitialTodo(taskNum: number): TodoType {
  const randomNum = Math.random();
  const startOfWeek = dayjs().startOf("week");
  const randomDay = Math.floor(randomNum * (dayjs().endOf("week").diff(startOfWeek, "day") + 1));

  return {
    id: crypto.randomUUID(),
    name: `Task ${taskNum}`,
    description: "This is description for this task.",
    directory: "Main",
    date: startOfWeek.add(randomDay, "day").format(DATE_FORMAT),
    completed: randomNum < 0.5,
    important: randomNum < 0.5,
  };
}

function validateDirectory(directory: string, directoryArray: string[]) {
  const trimmed = directory.trim();
  if (trimmed) {
    if (!directoryArray.includes(trimmed)) return trimmed;
    else throw new Error("Directory already exists");
  } else throw new Error("Directory name cannot be empty");
}

const initialTodos: TodosRecord = [createInitialTodo(1), createInitialTodo(2), createInitialTodo(3)];
const initialTaskState: Omit<TodoType, "id"> = {
  name: "",
  description: "",
  directory: "Main",
  date: dayjs().format(DATE_FORMAT),
  completed: false,
  important: false,
};

const createDirectoriesSlice: StateCreator<Store, [["zustand/persist", unknown]], [], DirectoriesSlice> = (set) => ({
  directories: ["Main"],

  directoryInput: "",

  directoryActions: {
    directoryInputSet(value) {
      set({ directoryInput: value });
    },

    addDirectory() {
      set((state) => {
        const newDirectory = validateDirectory(state.directoryInput, state.directories);
        return { directories: [...state.directories, newDirectory], directoryInput: "" };
      });
    },

    editDirectory(oldDirectory) {
      set((state) => {
        const newDirectory = validateDirectory(state.directoryInput, state.directories);
        return {
          directories: state.directories.map((directory) => (directory === oldDirectory ? newDirectory : directory)),
          todos: state.todos.map((task) =>
            task.directory === oldDirectory ? { ...task, directory: newDirectory } : task,
          ),
          directoryInput: "",
        };
      });
    },

    deleteDirectory(directoryName) {
      set((state) => ({
        directories: state.directories.filter((directory) => directory !== directoryName),
        todos: state.todos.filter((task) => task.directory !== directoryName),
      }));
    },
  },
});

const createTodosSlice: StateCreator<Store, [["zustand/persist", unknown]], [], TodosSlice> = (set) => ({
  todos: initialTodos,

  taskInput: initialTaskState,

  taskActions: {
    taskInputSet(action) {
      set((state) => ({ taskInput: { ...state.taskInput, ...action } }));
    },

    addTodo() {
      set((state) => ({
        todos: [...state.todos, { id: crypto.randomUUID(), ...state.taskInput }],
        taskInput: initialTaskState,
      }));
    },

    editTodo(id) {
      set((state) => ({
        todos: state.todos.map((task) => (task.id === id ? { id, ...state.taskInput } : task)),
        taskInput: initialTaskState,
      }));
    },

    toggleCompleted(id) {
      set((state) => ({
        todos: state.todos.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
      }));
    },

    toggleImportant(id) {
      set((state) => ({
        todos: state.todos.map((task) => (task.id === id ? { ...task, important: !task.important } : task)),
      }));
    },

    deleteTodo(id) {
      set((state) => ({ todos: state.todos.filter((task) => task.id !== id) }));
    },
  },
});

const useStore = create<Store>()(
  persist(
    (...state) => ({
      ...createTodosSlice(...state),
      ...createDirectoriesSlice(...state),
    }),
    { name: "instant-tasks", partialize: (state) => ({ todos: state.todos, directories: state.directories }) },
  ),
);

const useTodos = () => useStore((state) => state.todos);
const useDirectories = () => useStore((state) => state.directories);
const useTaskInput = (action: keyof Omit<TodoType, "id">) => useStore((state) => state.taskInput[action]);
const useDirectoryInput = () => useStore((state) => state.directoryInput);
const useTodosActions = () => useStore((state) => state.taskActions);
const useDirectoriesActions = () => useStore((state) => state.directoryActions);
const resetState = () => {
  useStore.setState({ todos: [], directories: ["Main"] });
  useStore.persist.clearStorage();
};

export {
  type TodoType,
  type TodosRecord,
  useTodos,
  useDirectories,
  useDirectoryInput,
  useTodosActions,
  useDirectoriesActions,
  useTaskInput,
  resetState,
  DATE_FORMAT,
  initialTaskState,
};
