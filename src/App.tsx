import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeContextProvider } from './context/YoutubeProvider';
import SearchHeader from './components/SearchHeader/SearchHeader';
import Navbar from './components/Navbar/Navbar';
import { DarkModeContextProvider } from './context/DarkModeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <DarkModeContextProvider>
        <SearchHeader />
      </DarkModeContextProvider>
      <main className='flex h-full'>
        <Navbar />
        <YoutubeContextProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </YoutubeContextProvider>
      </main>
    </>
  );
}

export default App;
