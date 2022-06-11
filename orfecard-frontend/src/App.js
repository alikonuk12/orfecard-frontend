import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { MODE } from './store/reducers/viewReducer';
import { Header } from './layout';
import { Homepage } from './pages';

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
        <Route path="/" element={<Homepage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
