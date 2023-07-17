import './App.css';
import Headers from './Components/Header';
import GlobalStyle from './GlobalStyle';
import Home from './Components/Home';

const App = () => {

  return (
    <GlobalStyle className="App">
      <Headers />
      <br />
      <Home />
    </GlobalStyle>
  );
}

export default App;
