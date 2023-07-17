import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Headers from './Components/Header';
import GlobalStyle from './GlobalStyle';
import Routing from './Routing';

const App = () => {

  return (
    <BrowserRouter>
      <GlobalStyle className="App">
        <Headers />
        <br />
        <Routing />
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
