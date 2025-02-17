import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import Home from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
