import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";
import { useTodos } from "@/utils/store/Task.store";
import { Todo } from '@/types/index'

export function useFilterdTodos() {
    const router = useRouter();
    const currentPath = router.asPath;
    const { id, name, search } = router.query;
    const today = dayjs().format('DD-MM-YYYY');
    const { todos } = useTodos();

    const filterFunction = useMemo(() => {
        switch(currentPath) {
        case '/':
            return () => true;
        case '/today':
            return (todo: Todo) => dayjs(todo.date).format('DD-MM-YYYY') === today;
        case '/completed':
            return (todo: Todo) => todo.completed;
        case '/uncomplete':
            return (todo: Todo) => !todo.completed;
        case '/important':
            return (todo: Todo) => todo.important;
        case `/task/${id}`:
            return (todo: Todo) => todo.id === parseInt(decodeURIComponent(id as string));
        case `/dir/${name}`:
            return (todo: Todo) => todo.directory.toLowerCase() === decodeURIComponent(name as string)
        case `/results?search=${search}`:
            return (todo: Todo) => todo.title.toLowerCase().includes(decodeURIComponent(search as string).toLowerCase())
        default:
            return () => true;
        }
    },[currentPath, today, id, name, search])

    const filterdTodos = useMemo(() => {
        if(!todos) return [];
        return todos.filter(filterFunction);
    },[todos, filterFunction])

    return { filterdTodos }
}