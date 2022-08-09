import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { MODE } from './store/reducers/viewReducer';
import { Header, Footer } from './layout';
import {
  AdminPanel,
  ForgotPassword,
  ResetPassword,
  Homepage,
  Login,
  UserPanel,
  Purchase
} from './pages';

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
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
        <Route path='/userpanel' element={<UserPanel />} />
        <Route path='/adminpanel' element={<AdminPanel />}>
          <Route path=":sidetab" element={<AdminPanel />} />
        </Route>
        <Route path='/satin-al' element={<Purchase />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
