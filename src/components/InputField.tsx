import React, { useRef } from 'react';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='flex items-center relative w-11/12'
      onSubmit={e => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        className='w-full rounded-full py-4 px-7 text-[25px] border-none transition-200 shadow-inner focus:shadow-[0px_0px_10px_1000px_rgba(0,0,0,0.5)] focus:outline-none'
        type='input'
        placeholder='Enter a task'
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
      <button
        className='absolute w-[50px] h-[50px] m-[15px] rounded-full right-0 text-[15px] bg-[#2f74c0] text-white transition-all shadow hover:bg-[#388ae2] active:scale-50 active:shadow-sm'
        type='submit'
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
