import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './Screens/Home';


function App() {
  // localStorage.clear();
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
