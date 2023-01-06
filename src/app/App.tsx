import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { Web3Provider } from 'src/context/web3';
import MainLayout from 'src/components/MainLayout';
import ToastifyContainer from 'src/components/Toast';
import ScrollToTop from 'src/components/ScrollToTop';
import Routes from 'src/routes';
// font
import '@fontsource/roboto';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <BrowserRouter>
          <MainLayout>
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </MainLayout>
        </BrowserRouter>
      </Web3Provider>
      <ToastifyContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
