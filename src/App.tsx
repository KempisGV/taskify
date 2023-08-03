import React, { useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e?.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  const handleDone = (id: number, action: string) => {
    switch (action) {
      case 'done': {
        console.log('TODOS', todos);
        console.log('ACTION', action);
        const foundTodo = todos.find(todo => todo.id === id);
        if (foundTodo) {
          if (foundTodo.isDone === false) {
            // Establecer el estado isDone en true
            foundTodo.isDone = true;
            // Mover la tarea al arreglo de tareas completadas
            setCompletedTodos([...completedTodos, foundTodo]);
            // Remover la tarea del arreglo de todos
            setTodos(todos.filter(todo => todo.id !== id));
          }
        }
        break;
      }
      case 'undo': {
        console.log('COMPLETED TODOS', todos);
        console.log('ACTION', action);
        const foundTodo = completedTodos.find(todo => todo.id === id);
        if (foundTodo) {
          if (foundTodo.isDone === true) {
            // Establecer el estado isDone en false
            foundTodo.isDone = false;

            // Remover la tarea del arreglo de completedTodos
            setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
            // Mover la tarea al arreglo de tareas por hacer
            setTodos([...todos, foundTodo]);
          }
        }
        break;
      }
      default:
        console.log('Unsuported action');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log(result);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    const active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      handleDone(Number(draggableId), 'done');
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      handleDone(Number(draggableId), 'undo');
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex flex-col items-center w-screen min-h-screen  bg-[#2f74c0]'>
        <span className='uppercase text-[40px] my-[30px] max-[800px]:my-[15px] max-[800px]:text-[35px] text-white z-10'>
          Taskify
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          handleDone={handleDone}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
