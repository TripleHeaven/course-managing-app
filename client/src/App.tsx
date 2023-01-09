import './App.scss';
import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { history } from './utils';
import { Root } from './features/Routes';
import { AppGlobalContainer } from './features/AppGlobalContainer';
import cookie from 'js-cookie';
import { COOKIES } from './constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [jwtToken, setJwtToken] = useState(cookie.get(COOKIES.JWT_TOKEN));

  return (
    <AppGlobalContainer.Provider initialState={{ jwtToken, setJwtToken }}>
      <Router history={history}>
        <>
          <Root />
          <ToastContainer />
        </>
      </Router>
    </AppGlobalContainer.Provider>
  );
}

export default App;
