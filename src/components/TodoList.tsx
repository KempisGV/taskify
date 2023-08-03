import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleDone: (id: number, action: string) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  handleDone,
}) => {
  return (
    <div className='flex flex-col items-center flex-wrap my-4 w-11/12 md:flex-row md:items-start md:justify-between'>
      <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col w-[95%] md:w-[47.5%] gap-4 p-4 rounded-md bg-[rgb(50,195,205)] mb-4 ${
              snapshot.isDraggingOver ? 'bg-[rgb(0,221,236)]' : ''
            }`}
          >
            <span className='text-white text-[30px]'>Active tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                handleDone={handleDone}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col w-[95%] md:w-[47.5%] gap-4 p-4 rounded-md bg-[rgb(235,103,80)] ${
              snapshot.isDraggingOver ? 'bg-[rgb(255,38,0)]' : ''
            }`}
          >
            <span className='text-white text-[30px]'>Completed tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                handleDone={handleDone}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
    // <div className='flex justify-evenly flex-wrap py-4 gap-4 w-11/12'>
    //
    // </div>
  );
};

export default TodoList;
