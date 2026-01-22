import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Notfound from './components/Notfound/Notfound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import About from './components/About/About';
import UserContextprovider from './Contaxt/UserContext';
import ProtecredRoute from './components/protecredRoute/protecredRoute';
import PostsContextProvider from './components/Register/PostsContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './components/PostDetails/PostDetails';
import ProfileContextProvider from './Contaxt/ProfileConttext';
import toast, { Toaster } from 'react-hot-toast';

const query = new QueryClient()

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtecredRoute><Home /></ProtecredRoute> },
      { path: 'profile/:id', element: <ProtecredRoute><Profile /></ProtecredRoute> },
      { path: 'about', element: <ProtecredRoute><About /></ProtecredRoute> },

      { path: 'postdetails/:id', element: <ProtecredRoute><PostDetails /></ProtecredRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
]);



function App() {


  return (
    <>






      <UserContextprovider>

        <PostsContextProvider>

          <QueryClientProvider client={query}>

            <ProfileContextProvider>

              <RouterProvider router={router} > </RouterProvider>
              <Toaster />

            </ProfileContextProvider>

            <ReactQueryDevtools />

          </QueryClientProvider>

        </PostsContextProvider>

      </UserContextprovider>






    </>

  )
}

export default App
