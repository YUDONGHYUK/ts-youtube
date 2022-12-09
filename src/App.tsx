import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchHeader from './components/SearchHeader/SearchHeader';
import Navbar from './components/Navbar/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <SearchHeader />
      <main className='flex h-full'>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default App;
