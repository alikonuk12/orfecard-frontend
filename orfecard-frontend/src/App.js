import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MODE } from './store/reducers/viewReducer';
import { Header, Footer } from './layout';
import { Spinner } from './components';

const AdminPanel = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/AdminPanel')), 1500)));
const ForgotPassword = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/ForgotPassword')), 1500)));
const ResetPassword = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/ResetPassword')), 1500)));
const Homepage = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Homepage')), 1500)));
const Login = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Login')), 1500)));
const UserPanel = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/UserPanel')), 1500)));
const Purchase = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Purchase')), 1500)));
const Cart = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Cart')), 1500)));
const Profile = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Profile')), 1500)));

const App = () => {
  const dispatch = useDispatch();

  const ConditionalRouter = ({ component: Component, protectedRouter }) => {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    return (
      <Suspense fallback={<Spinner />}>
        {protectedRouter ?
          (email && role) ?
            <Component /> :
            <Navigate to='/login' replace /> :
          <Component />
        }
      </Suspense>
    );
  }

  useEffect(() => {
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
        <Route path='/sepetim' element={<ConditionalRouter component={Cart} />} />
        <Route path='/profile/:profileId' element={<ConditionalRouter component={Profile} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
