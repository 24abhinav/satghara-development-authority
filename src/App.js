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
  const isAdmin = window.location.pathname.includes('sdf-admin');
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
              <div className='social-media'>
                 <a title='SDF Facebook Page' href='https://www.facebook.com/profile.php?id=61554569855085&mibextid=ZbWKwL' target='_blank' >
                     <i className='fa fa-facebook facebook' />
                 </a>
              </div>
              <Suspense fallback={<p>loading</p>}>
                <div className='router-component'>
                  <Routing />
                </div>
              </Suspense>
              <Footer />
          </>
        )}
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
