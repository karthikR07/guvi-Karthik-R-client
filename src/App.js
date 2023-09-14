import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignupPage from './components/SignUpPage';
import LoginPage from './components/Loginpage';
import ProfilePage from './components/Profilepage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignupPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/profile' element={<ProfilePage />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
