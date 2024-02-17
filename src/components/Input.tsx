import { FormEvent, useRef } from "react";

interface Props {
  onSubmit: (value: string) => void;
}

export default function Input({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmission(event: FormEvent) {
    event.preventDefault();
    if (!inputRef.current?.value) return;
    onSubmit(inputRef.current?.value ?? "");
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmission} className="max-w-md mx-auto w-full">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Enter Todo
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id="default-search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter todo"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
