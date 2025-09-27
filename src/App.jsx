import { useEffect, useRef, useState } from 'react';
import Navbar from './components/navbar';
import Input from './components/input';
import { useQuery } from 'react-query';
import Meaning from './components/meaning';

function App() {
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [word, setWord] = useState('');
  const getFacts = async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return res.json();
  };

  const { data, error, isLoading } = useQuery(['meaning', word], getFacts, { enabled: !!word });

  const handleScroll = () => {
    if (navRef.current) {
      setIsSticky(containerRef.current.scrollTop > navRef.current.getBoundingClientRect().bottom);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const body = document.body;

    const font = localStorage.getItem('font');
    if (font) {
      body.classList.remove('font-sans', 'font-serif', 'font-mono');
      body.classList.add(font);
    }
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="h-dvh overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar itemRef={navRef} sticky={isSticky} />
      <div className="lg:w-[60%] md:w-[80%] sm:w-[90%] px-5 mx-auto mt-10">
        <Input word={word} setWord={setWord} />
      </div>
      <div className="lg:w-[60%] md:w-[80%] sm:w-[90%] px-5 mx-auto py-10">
        <Meaning data={data} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
