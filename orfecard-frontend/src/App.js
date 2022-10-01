import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CookieConsent from 'react-cookie-consent';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { MODE } from './store/reducers/viewReducer';
import { Header, Footer } from './layout';
import { Spinner } from './components';

const ForgotPassword = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/ForgotPassword')), 1500)));
const ResetPassword = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/ResetPassword')), 1500)));
const Homepage = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Homepage')), 1500)));
const Login = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Login')), 1500)));
const UserPanel = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/UserPanel')), 1500)));
const Purchase = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Purchase')), 1500)));
const Cart = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Cart')), 1500)));
const Profile = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Profile')), 1500)));
const Signup = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Signup')), 1500)));
const NfcCompatiblePhones = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/NfcCompatiblePhones')), 1500)));
const Settings = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Settings')), 1500)));
const AydınlatmaMetni = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/AydınlatmaMetni')), 1500)));
const UyelikSozlesmesi = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/UyelikSozlesmesi')), 1500)));
const KVKK = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/KVKK')), 1500)));
const SSS = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/SSS')), 1500)));
const Contact = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Contact')), 1500)));
const CookiePolicy = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/CookiePolicy')), 1500)));
const About = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/About')), 1500)));
const TeslimatVeIadeKosullari = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/TeslimatVeIadeKosullari')), 1500)));
const MesafeliSatisSozlesmesi = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/MesafeliSatisSozlesmesi')), 1500)));
const Payment = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./pages/Payment')), 1500)));

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
      <NotificationContainer />
      <Routes>
        <Route path='/' element={<ConditionalRouter component={Homepage} />} />
        <Route path='/login' element={<ConditionalRouter component={Login} />} />
        <Route path='/forgotpassword' element={<ConditionalRouter component={ForgotPassword} />} />
        <Route path='/resetpassword/:token' element={<ConditionalRouter component={ResetPassword} />} />
        <Route path='/userpanel'>
          <Route index element={<ConditionalRouter component={UserPanel} protectedRouter />} />
          <Route path='settings' element={<ConditionalRouter component={Settings} protectedRouter />} />
        </Route>
        <Route path='/satin-al' element={<ConditionalRouter component={Purchase} />} />
        <Route path='/sepetim' element={<ConditionalRouter component={Cart} />} />
        <Route path='/profile/:profileId' element={<ConditionalRouter component={Profile} />} />
        <Route path='/kayit-ol' element={<ConditionalRouter component={Signup} />} />
        <Route path='/nfc-uyumlu-telefonlar' element={<ConditionalRouter component={NfcCompatiblePhones} />} />
        <Route path='/aydinlatma-metni' element={<ConditionalRouter component={AydınlatmaMetni} />} />
        <Route path='/uyelik-sozlesmesi' element={<ConditionalRouter component={UyelikSozlesmesi} />} />
        <Route path='/kvkk' element={<ConditionalRouter component={KVKK} />} />
        <Route path='/sikca-sorulan-sorular' element={<ConditionalRouter component={SSS} />} />
        <Route path='/iletisim' element={<ConditionalRouter component={Contact} />} />
        <Route path='/cerez-politikasi' element={<ConditionalRouter component={CookiePolicy} />} />
        <Route path='/hakkimizda' element={<ConditionalRouter component={About} />} />
        <Route path='/teslimat-ve-iade-kosullari' element={<ConditionalRouter component={TeslimatVeIadeKosullari} />} />
        <Route path='/mesafeli-satis-sozlesmesi' element={<ConditionalRouter component={MesafeliSatisSozlesmesi} />} />
        <Route path='/odeme-yap' element={<ConditionalRouter component={Payment} />} />
      </Routes>
      <Footer />
      <CookieConsent buttonText='OKUDUM ONAYLIYORUM' >
        <div style={{ fontSize: '12px'}}>Alışveriş deneyiminizi iyileştirmek ve hizmetlerimizi daha iyi hale getirmek için yasal düzenlemelere uygun çerezler (cookies) kullanıyoruz. Web sitemizi ziyaret etmeye ve alışveriş yapmaya devam etmeniz durumunda, çerez kullanmaya devam edeceğiz. Çerez tercihlerinizi düzenlemek veya çerez politikamız hakkında detaylı bilgi almak için <Link style={{ color: '#FFFFFF' }} to='/cerez-politikasi'>buraya tıklayınız</Link></div>
      </CookieConsent>
    </BrowserRouter>
  );
}

export default App;
