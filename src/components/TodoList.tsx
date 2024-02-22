import React from "react";
import { Todo } from "../model";
import { SingleTodo } from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
      <Droppable droppableId="progress">
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDraggingOver && `bg-yellow-100`
            } bg-white p-4 h-fit rounded-sm border-t-8 `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1 className="text-center text-xl pb-4">Active Task</h1>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="completed">
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDraggingOver && `bg-red-100`
            } bg-white p-4 h-fit rounded-sm border-t-8 `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1 className="text-center text-xl pb-4">Completed Task</h1>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
