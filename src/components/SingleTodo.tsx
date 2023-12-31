import React, { useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { FaUndoAlt } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleDone: (id: number, action: string) => void;
}

const SingleTodo: React.FC<Props> = ({
  index,
  todo,
  todos,
  setTodos,
  handleDone,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`flex justify-between items-center bg-amber-400 p-4 rounded-sm transition hover:shadow-lg hover:scale-105 ${
            snapshot.isDragging ? 'shadow-2xl' : ''
          }`}
          onSubmit={e => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={e => setEditTodo(e.target.value)}
              className='flex-1 p-1 border-none text-xl'
              autoFocus
            />
          ) : todo.isDone ? (
            <s className='flex-1 p-1 border-none text-xl'>{todo.todo}</s>
          ) : (
            <span className='flex-1 p-1 border-none text-xl'>{todo.todo}</span>
          )}

          <div className='flex'>
            <span
              className='ml-3 cursor-pointer'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className='ml-3 cursor-pointer'
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </span>
            {todo.isDone ? (
              <span
                className='ml-3 cursor-pointer'
                onClick={() => handleDone(todo.id, 'undo')}
              >
                <FaUndoAlt />
              </span>
            ) : (
              <span
                className='ml-3 cursor-pointer'
                onClick={() => handleDone(todo.id, 'done')}
              >
                <MdDone />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
