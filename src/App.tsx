import { useState } from "react";
import HeaderInput from "./components/HeaderInput";
import { Todo } from "./model";
import { TodoList } from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SignedOut, SignedIn, SignOutButton, SignInButton } from "@clerk/clerk-react";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "progress") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "progress") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
  };

  return (
    <div>
      <SignedOut>
        <SignInButton />
        <p>
          This content is public. Only signed out users can see the SignInButton
          above this text.
        </p>
      </SignedOut>
      <SignedIn>
        <SignOutButton signOutCallback={() => redirect("/")} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="bg-blue-500  min-h-screen w-full">
            <div className="w-full max-w-6xl mx-auto p-4 ">
              <h1 className="text-3xl font-semibold  text-white text-center uppercase ">
                Taskify
              </h1>
              <div>
                <HeaderInput
                  todo={todo}
                  setTodo={setTodo}
                  handleAdd={handleAdd}
                />
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                />
              </div>
            </div>
          </div>
        </DragDropContext>
      </SignedIn>
    </div>
  );
};

export default App;
