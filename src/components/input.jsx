function Input({ setWord }) {
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setWord(e.target.value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Enter your word"
      className="border-2 h-10 p-2 shadow-md border-slate-200 dark:bg-slate-500 rounded-xl w-full focus:outline-none"
      onKeyDown={handleKeyDown}
    />
  );
}

export default Input;
