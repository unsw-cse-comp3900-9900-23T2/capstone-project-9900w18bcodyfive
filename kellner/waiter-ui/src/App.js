import './App.css';
import { BrowserRouter } from 'react-router-dom/dist';
import Wrapper from './Wrapper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper/>
      </BrowserRouter>
    </div>
  );
}

export default App;
