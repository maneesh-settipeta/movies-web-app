import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage';
import appStore from './Store/appStore';
import MovieShows from './components/MovieShows';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TheatreSeating from './components/TheatreSeating';
import { Navigate } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import Summary from './components/Summary';
import BookingConfirmed from './components/BookingConfirmed';

function App() {
  const routing = createBrowserRouter([
    {
      path: '/', element: <Navigate to='/home' />
    },
    {
      path: '/home', element: <MainPage />,
      children: [
        {
          path: '', element: <MoviesList />
        },
        {
          path: 'movie/:movieId/city/:cityId', element: <MovieShows />,
        },
        {
          path: 'movie/:movieId/city/:cityId/theatre/:theaterId', element: <TheatreSeating />
        },
      ],
    },
    {
      path: '/summary/movie/:movieId/city/:cityId/theatre/:theaterId', element: <Summary />
    },
    {
      path: '/movie/city/theatre/booked', element: <BookingConfirmed />
    }
  ])
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
          <RouterProvider router={routing}></RouterProvider>
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
