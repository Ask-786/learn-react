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

  function handleClick(state: boolean, id: string) {
    const currentTodos = [...todos];
    const todo = currentTodos.find((el) => el.id === id);

    if (!todo) return;

    todo.completed = state;
    updateTodos(currentTodos);
  }

  function handleDelete(state: boolean, id: string) {
    if (!state && !confirm("This todo is not completed yet. are you sure??"))
      return;

    const currentTodos = [...todos];
    const index = currentTodos.findIndex((el) => el.id === id);
    if (index === -1) return;

    currentTodos.splice(index, 1);
    updateTodos(currentTodos);
  }

  function handleEdit(id: string) {
    const currentTodos = [...todos];
    const todo = currentTodos.find((el) => el.id === id);
    if (!todo) return;

    const label = prompt("Update todo: ", todo.label);
    if (!label) return;

    todo.label = label;

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

  const todosList = todos.map((el, i) => {
    return (
      <div
        key={el.id}
        className={
          i !== todos.length - 1 ? "border-b border-slate-500 p-2" : "p-2"
        }
      >
        <ListItem
          todo={el}
          onClick={handleClick}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    );
  });

  return (
    <div className="h-[100vh] w-full bg-slate-900 text-white flex flex-col items-center">
      <div className="flex flex-col gap-3 min-w-96 items-start max-h-full p-5">
        <Input onSubmit={handleAddTodo} />
        <div className="h-2"></div>
        <span className="mb-2 text-lg font-semibold text-white">Todos:</span>
        <ul className="max-w-md list-inside text-gray-400 h-full overflow-auto w-full">
          {Boolean(todos.length) && todosList}
          {Boolean(!todos.length) && "No todos in the list!!"}
        </ul>

        {Boolean(todos.filter((el) => el.completed).length) && (
          <a
            className="font-medium text-blue-500 hover:underline cursor-pointer"
            onClick={handleClear}
          >
            Clear completed?
          </a>
        )}
      </div>
    </div>
  );
}
