import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Headers from './Components/Header';
import GlobalStyle from './GlobalStyle';
import Routing from './Routing';
import { fetchMetaDetails } from './handlers';
import './App.css';
import Loader from './Components/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

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
              <Headers />
              <br />
              <Suspense fallback={<p>loading</p>}>
                <Routing />
              </Suspense>
          </>
        )}
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
