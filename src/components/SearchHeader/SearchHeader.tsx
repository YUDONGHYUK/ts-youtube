import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsYoutube, BsSearch } from 'react-icons/bs';

export default function SearchHeader() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`videos/${text}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    keyword ? setText(keyword) : setText('');
  }, [keyword]);

  return (
    <header className='w-full flex py-4 px-8 mb-4 text-2xl '>
      <Link to='/' className='flex items-center'>
        <BsYoutube className='text-3xl text-brand' />
        <h1 className='font-bold ml-2'>Youtube</h1>
      </Link>
      <form className='w-full flex justify-center' onSubmit={handleSubmit}>
        <input
          className=' w-4/12 py-2 px-4 border-solid border border-gray-700 rounded-tl-3xl rounded-bl-3xl bg-zinc-900 text-lg outline-none focus:border-blue-500'
          type='text'
          placeholder='검색'
          value={text}
          onChange={handleChange}
        />
        <button className='bg-zinc-800 px-6 rounded-tr-3xl rounded-br-3xl'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
