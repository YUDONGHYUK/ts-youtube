import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader/SearchHeader';

function App() {
  return (
    <>
      <SearchHeader />
      <Outlet />
    </>
  );
}

export default App;
