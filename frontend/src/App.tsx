import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-on-background">
          <Routes>
            <Route path="/" element={<div className="p-8"><h1 className="text-display text-primary">Graphodo</h1><p className="text-body-lg mt-4">Master Your Time, Visualize Your Growth</p></div>} />
            {/* We will add more routes here soon */}
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
