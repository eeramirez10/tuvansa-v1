import './App.css';

import React from 'react'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from "react-router-dom";


import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';


const App = () => {

  return (

    <AuthProvider>
      <ToastContainer />

      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>

  );
}

export default App;
