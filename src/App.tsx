import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import ListItem from "./components/ListItem";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todos, updateTodos] = useState<
    {
      label: string;
      completed: boolean;
      id: string;
    }[]
  >([]);

  function handleClick(state: boolean, index: number) {
    const currentTodos = [...todos];
    currentTodos[index].completed = state;
    updateTodos(currentTodos);
  }

  function handleAddTodo(label: string) {
    const currentTodos = [...todos];
    currentTodos.push({ label, completed: false, id: uuidv4() });
    updateTodos(currentTodos);
  }

  function handleClear() {
    const currentTodos = [...todos];
    const confirmation = confirm("Are you sure??");
    if (!confirmation) return;
    updateTodos(currentTodos.filter((el) => !el.completed));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") ?? "[]");
    updateTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="h-[100vh] w-full bg-slate-900 text-white flex flex-col items-center">
      <div className="flex flex-col gap-3 min-w-96 items-start max-h-full p-5">
        <Input onSubmit={handleAddTodo} />
        <div className="h-2"></div>
        <span className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Todos:
        </span>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 h-full overflow-auto w-full">
          {todos.length
            ? todos.map((el, i) => {
                return (
                  <ListItem
                    key={el.id}
                    completed={el.completed}
                    label={el.label}
                    onClick={handleClick}
                    index={i}
                  />
                );
              })
            : "No todos in the list!!"}
        </ul>

        {Boolean(todos.length) && (
          <a
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
            onClick={handleClear}
          >
            Clear completed?
          </a>
        )}
      </div>
    </div>
  );
}
