import { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const HeaderInput: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
      }}
      className="w-full bg-white  p-3 my-4 rounded-full shadow-md flex justify-between "
    >
      <input
        type="text"
        placeholder="Enter a Task"
        className="w-3/4 p-1 font-semibold text-lg outline-none rounded-full"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button className="rounded-full  h-[45px]  w-[45px] bg-blue-500 hover:animate-pulse text-white shadow-lg">
        Go
      </button>
    </form>
  );
};

export default HeaderInput;
