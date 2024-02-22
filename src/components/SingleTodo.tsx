import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDone } from "react-icons/md";
import { Todo } from "../model";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

export const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(todo.id);
          }}
          className={`bg-white w-full cursor-pointer ${
            todo.isDone ? `border-t-teal-400` : `border-t-yellow-400`
          } min-h-16 border-t-8 p-2 rounded-sm my-4 shadow-md hover:shadow-lg transition-all flex items-center justify-between`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="border-l-4 border-l-green-700 w-3/4 outline-none p-1  "
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="text-wrap w-3/4 ">{todo.todo}</s>
          ) : (
            <p className="text-wrap w-3/4 ">{todo.todo}</p>
          )}
          <div className="flex gap-1 text-lg ">
            <CiEdit
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            />
            <MdDelete onClick={() => handleDelete(todo.id)} />
            <MdDone onClick={() => handleDone(todo.id)} />
          </div>
        </form>
      )}
    </Draggable>
  );
};
