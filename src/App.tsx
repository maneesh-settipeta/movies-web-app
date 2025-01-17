import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import appStore from './Store/appStore';
import MovieShows from './components/MovieShows';
function App() {

  const routing = createBrowserRouter([
    {
      path: '/', element: <Home />, children: [
        {
          path: '/movieName', element: <MovieShows />
        }
      ],
    },

  ])

  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={routing}></RouterProvider>
      </Provider>

    </>
  )
}

export default App
