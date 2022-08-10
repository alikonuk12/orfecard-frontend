import React, { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MODE } from './store/reducers/viewReducer';
import { Header, Footer } from './layout';
import { Spinner } from './components';
import { isuserloggedin } from './api/account';

const AdminPanel = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/AdminPanel')), 1500)));
const ForgotPassword = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/ForgotPassword')), 1500)));
const ResetPassword = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/ResetPassword')), 1500)));
const Homepage = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Homepage')), 1500)));
const Login = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Login')), 1500)));
const UserPanel = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/UserPanel')), 1500)));
const Purchase = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Purchase')), 1500)));

const App = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const ConditionalRouter = ({ component: Component, protectedRouter }) => {
    return (
      <Suspense fallback={<Spinner />}>
        {protectedRouter ?
          isUserLoggedIn ?
            <Component /> :
            <Navigate to='/login' /> :
          <Component />
        }
      </Suspense>
    );
  }

  const handleIsUserLoggedIn = async () => {
    const isUserLoggedIn = await isuserloggedin();
    setIsUserLoggedIn(isUserLoggedIn);
  }

  useEffect(() => {
    handleIsUserLoggedIn();
    dispatch(MODE({ size: window.innerWidth }));
    window.addEventListener('resize', () => dispatch(MODE({ size: window.innerWidth })));
    return () => window.removeEventListener('resize');
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ConditionalRouter component={Homepage} />} />
        <Route path='/login' element={<ConditionalRouter component={Login} />} />
        <Route path='/forgotpassword' element={<ConditionalRouter component={ForgotPassword} />} />
        <Route path='/resetpassword/:token' element={<ConditionalRouter component={ResetPassword} />} />
        <Route path='/userpanel' element={<ConditionalRouter component={UserPanel} protectedRouter />} />
        <Route path='/adminpanel' element={<ConditionalRouter component={AdminPanel} protectedRouter />}>
          <Route path=":sidetab" element={<ConditionalRouter component={AdminPanel} protectedRouter />} />
        </Route>
        <Route path='/satin-al' element={<ConditionalRouter component={Purchase} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
