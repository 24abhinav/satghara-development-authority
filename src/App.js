import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Headers from './Components/Header';
import GlobalStyle from './GlobalStyle';
import Routing from './Routing';
import { fetchMetaDetails } from './handlers';
import './App.css';
import Loader from './Components/Loader';
import Footer from './Components/Footer';

const App = () => {
  const isAdmin = window.location.pathname.includes('sdaAdmin');
  const [loading, setLoading] = useState(!isAdmin);

  const initialData = async () => {
    await fetchMetaDetails();
    setLoading(false);
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle className="App">
        {loading ? <Loader /> : (
          <>
              <Headers isAdmin={isAdmin} />
              <br />
              <Suspense fallback={<p>loading</p>}>
                <Routing />
              </Suspense>
              <Footer />
          </>
        )}
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
