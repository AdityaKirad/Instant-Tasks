import Button from "./button";
import Input from "./input";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTodos, type TodosRecord } from "src/store";

export default function TaskSearch() {
  const todos = useTodos();
  const comboBoxRef = useRef<HTMLDivElement>(null);
  const [input, inputSet] = useState("");
  const [dropdown, dropdownSet] = useState(false);

  const filteredTodos = todos.filter((todo) => todo.name.toLowerCase().includes(input.toLowerCase())).slice(0, 3);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    inputSet(e.target.value);
    if (e.target.value.trim()) dropdownSet(true);
    else dropdownSet(false);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!comboBoxRef.current?.contains(e.target as Node)) dropdownSet(false);
    });
  }, []);

  return (
    <div className="relative col-span-3 row-start-2" ref={comboBoxRef}>
      <div className="flex items-center gap-2 rounded bg-gray-800 px-2">
        <Input
          className="bg-transparent outline-0"
          type="text"
          placeholder="Search Task"
          value={input}
          onChange={handleChange}
          onFocus={() => dropdownSet(true)}
        />
        <Search />
      </div>
      {dropdown && (
        <div className="absolute inset-x-0 z-10 flex translate-y-1 flex-col gap-1 rounded bg-gray-800 p-2">
          <SearchResults todos={filteredTodos} />
          <Button className="w-full justify-center">All Results for &quot;{input.toUpperCase()}&quot;</Button>
        </div>
      )}
    </div>
  );
}

function SearchResults({ todos }: { todos: TodosRecord }) {
  return todos.map((todo) => (
    <Link
      className="flex justify-between rounded p-2 transition-colors hover:bg-gray-700 hover:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white"
      to="/tasks/$taskId"
      params={{ taskId: todo.id }}
      key={todo.id}>
      <span>{todo.name}</span>
      <span>{todo.date}</span>
    </Link>
  ));
}
