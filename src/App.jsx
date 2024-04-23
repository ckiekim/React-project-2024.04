import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/common/Header';
import Aside from './components/common/Aside';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Aside />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
