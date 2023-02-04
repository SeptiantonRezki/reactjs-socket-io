import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage';
import { useState } from 'react';
import User from './modals/userModal';
import CurrentUserContext from './store/userStore';
import PrivateRoutePage from './Pages/PrivateRoutePage';


function App() {
  const [getCurrentUser, setCurrentUser] = useState<User | null>(null);


  return (
    <CurrentUserContext.Provider value={{ currentUser: getCurrentUser, dispatch: setCurrentUser }}>
      <Routes>

        <Route path='/' element={
          <PrivateRoutePage>
            <HomePage />
          </PrivateRoutePage>
        } />
        <Route path='/home' element={
          <PrivateRoutePage>
            <HomePage />
          </PrivateRoutePage>
        } />
        <Route path='/login' element={
          <LoginPage />
        }
        />
        <Route path='/*' element={
          <PrivateRoutePage>
            <HomePage />
          </PrivateRoutePage>
        } />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
