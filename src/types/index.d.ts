import { Dayjs } from "dayjs";

interface Todo {
    id: number;
    directory: string;
    title: string;
    date: Dayjs | null;
    description: string;
    important: boolean;
    completed: boolean;
}

interface TodosProps {
    todos : Todo[];
    directories: string[];
    addDirectory: (directoryName: string) => void;
    editDirectory: (oldName: string, newName: string) => void;
    deleteDirectory: (directoryName: string) => void;
    addTodo: (todo: Todo) => void;
    editTodo: (id: number, todo: Todo) => void;
    deleteTodo: (id: number) => void;
    deleteAllData: () => void;
    toggleImportant: (id: number) => void;
    toggleCompleted: (id: number) => void;
}

interface NavigationDrawerAndPopupProps {
    open: boolean;
    onClose: () => void;
}

interface PathNames {
    [key: string]: string;
}