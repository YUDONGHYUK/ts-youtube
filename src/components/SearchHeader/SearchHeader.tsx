import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useDarkMode } from '../../context/DarkModeContext';

export default function SearchHeader() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`videos/${text}`, { state: null });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    keyword ? setText(keyword) : setText('');
  }, [keyword]);

  return (
    <header className='w-full flex py-4 px-8 mb-4 text-2xl '>
      <Link to='/' state={null} className='flex items-center'>
        <BsYoutube className='text-3xl text-brand' />
        <h1 className='font-bold ml-2'>Youtube</h1>
      </Link>
      <form className='w-full flex justify-center' onSubmit={handleSubmit}>
        <input
          className={`w-4/12 py-2 px-4 border-solid border border-gray-300 dark:border-gray-700 rounded-tl-3xl rounded-bl-3xl bg-zinc-100 dark:bg-zinc-900 text-lg outline-none focus:border-blue-500 focus:dark:border-blue-500`}
          type='text'
          placeholder='검색'
          value={text}
          onChange={handleChange}
        />
        <button className='bg-zinc-100 px-6 border-solid border border-l-0 border-gray-300 dark:border-gray-700 rounded-tr-3xl rounded-br-3xl dark:bg-zinc-800'>
          <BsSearch />
        </button>
      </form>
      <button onClick={toggleDarkMode}>
        {!darkMode ? (
          <HiMoon className='text-orange-400 hover:opacity-70 transition-colors ease-out' />
        ) : (
          <HiSun className='text-orange-400 hover:opacity-90 transition-colors ease-out' />
        )}
      </button>
    </header>
  );
}
