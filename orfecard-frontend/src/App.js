import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { MODE } from './store/reducers/viewReducer';
import { Header, Footer } from './layout';
import { Homepage, Login, UserPanel } from './pages';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MODE({ size: window.innerWidth }));
    window.addEventListener('resize', () => dispatch(MODE({ size: window.innerWidth })));
    return () => window.removeEventListener('resize');
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userpanel' element={<UserPanel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
