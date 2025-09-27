import { useState } from 'react';
import { FaBook } from 'react-icons/fa6';
import Moon from './moon';

function Navbar({ sticky, itemRef }) {
  const [dark, setDark] = useState(() => {
    if (localStorage.getItem('mode') === 'true') {
      document.documentElement.classList.add('dark');
      return true;
    }
    return false;
  });

  const darkModeHandler = () => {
    setDark(!dark);
    localStorage.setItem('mode', !dark);
    document.documentElement.classList.toggle('dark');
  };

  const switchFont = font => {
    const body = document.body;
    body.classList.remove('font-sans', 'font-serif', 'font-mono');

    if (font === 'sans') {
      body.classList.add('font-sans');
      localStorage.setItem('font', 'font-sans');
    } else if (font === 'serif') {
      body.classList.add('font-serif');
      localStorage.setItem('font', 'font-serif');
    } else if (font === 'mono') {
      body.classList.add('font-mono');
      localStorage.setItem('font', 'font-mono');
    }
  };
  return (
    <div
      ref={itemRef}
      className="bg-white dark:bg-gray-900 dark:text-white h-20 flex items-center justify-between xl:px-48 lg:px-32 md:px-24 sm:px-16 px-10 [&[data-sticky=true]]:sticky top-0 [&[data-sticky=true]]:animate-[navanime_0.5s_ease-in-out] shadow-lg dark:shadow-slate-800"
      data-sticky={sticky}>
      <FaBook size={30} />
      <div className="flex gap-5">
        <select className="p-1 focus:outline-none text-lg bg-slate-200 dark:bg-slate-500 rounded-md" onChange={e => switchFont(e.target.value)}>
          <option value="sans">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="mono">Monospace</option>
        </select>
        <button className="flex items-center gap-[10px]" onClick={darkModeHandler}>
          <Moon dark={dark} className="w-[20px] h-[20px]" />
          <span className="text-[14px] md:text-[17px]">{dark ? 'Light' : 'Dark'} Mode</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
