import { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import Loading from './loading';
import { NoWords, NotFound } from './status';

function Meaning({ data, isLoading }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const meaning = data?.[0];
  const phonetics = meaning?.phonetics?.find(phonetic => phonetic.audio?.length > 0 && phonetic?.text?.length > 0);

  useEffect(() => {
    if (phonetics?.audio) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(phonetics.audio);
      audioRef.current.onended = () => setPlaying(false);
    } else {
      audioRef.current = null;
    }
  }, [phonetics?.audio]);

  const playSound = useCallback(() => {
    if (!audioRef.current) return;

    if (!playing) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [playing]);

  if (isLoading) return <Loading />;
  console.log(data)

  if (data?.title === 'No Definitions Found') return <NotFound error={data} />;

  if (!meaning) return <NoWords />;

  return (
    <div className="mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold dark:text-white">{meaning?.word}</div>
          <div className="text-lg font-bold text-perfume-dark dark:text-perfume">{phonetics?.text}</div>
        </div>
        <button onClick={playSound} className="bg-perfume h-10 w-10 flex place-items-center justify-center rounded-full text-perfume-dark dark:text-perfume dark:bg-perfume-dark">
          {playing ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      {console.log(meaning)}
      {meaning?.meanings?.map(i => (
        <Meanings key={i?.partOfSpeech} data={i} />
      ))}
    </div>
  );
}

function Meanings({ data }) {
  return (
    <>
      <div className="mt-10 text-lg text-slate-500 dark:text-white w-full flex items-center justify-center gap-3">
        {data?.partOfSpeech}
        <div className="border-t-2 border-perfume w-full" />
      </div>
      <div className="mt-5 flex flex-col gap-5">
        {data?.definitions?.length > 0 && (
          <>
            <div className="text-lg font-bold text-slate-500 dark:text-slate-200">Meaning</div>
            <ul className="list-disc list-inside px-5 marker:text-perfume-dark dark:marker:text-perfume">
              {data?.definitions?.map(i => (
                <li className='dark:text-white' key={i}>{i.definition}</li>
              ))}
            </ul>
          </>
        )}
        {data?.synonyms?.length > 0 && (
          <div className="flex gap-5 flex-col">
            <div className="text-lg font-bold text-slate-500 dark:text-slate-200">Synonyms</div>
            <div className="flex flex-wrap gap-3">
              {data?.synonyms?.map(i => (
                <div key={i} className="text-perfume-dark dark:text-perfume px-3 py-1 rounded-md font-semibold">
                  {i}
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.antonyms?.length > 0 && (
          <div className="flex gap-5 flex-col">
            <div className="text-lg font-bold text-slate-500">Antonyms</div>
            <div className="flex flex-wrap gap-3">
              {data?.antonyms?.map(i => (
                <div key={i} className="text-perfume-dark dark: px-3 py-1 rounded-md font-semibold">
                  {i}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Meaning;
