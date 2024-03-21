interface Props {
  label: string;
  completed: boolean;
  onClick?: (state: boolean, index: number) => void;
  onDelete?: (state: boolean, index: number) => void;
  index: number;
}

export default function ListItem({
  label,
  completed,
  onClick,
  index,
  onDelete,
}: Props) {
  function handleOnDelete() {
    if (onDelete) {
      onDelete(completed, index);
    }
  }

  function handleOnClicked() {
    if (onClick) {
      onClick(!completed, index);
    }
  }

  return (
    <li
      className="flex justify-between items-center gap-2 select-none"
      title={label}
    >
      <div
        className="flex items-center cursor-pointer w-full max-w-[92%]"
        onClick={handleOnClicked}
      >
        <svg
          className={`w-3.5 h-3.5 me-2 ${completed ? "text-green-500 dark:text-green-400" : "text-gray-500 dark:text-gray-400"} flex-shrink-0`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>
      </div>
      <div
        onClick={handleOnDelete}
        className="p-1 flex items-center justify-center cursor-pointer"
      >
        <svg
          className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </div>
    </li>
  );
}
