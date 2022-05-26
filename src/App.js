import './App.css';

import React from 'react'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';


const App = () => {

  return (

    <AuthProvider>
      <ToastContainer />
      <AppRouter />
    </AuthProvider>

  );
}

export default App;
