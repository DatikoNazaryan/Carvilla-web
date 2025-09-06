import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Welcome from 'components/common/Welcome/Welcome';
import Login from 'components/features/Login/Login';
import ForgotPassword from 'components/features/Login/ForgotPassword/ForgotPassword';
import SignUp from 'components/features/SignUp/SignUp';
import NotFound from 'components/common/NotFound/NotFound';
import Cars from 'components/features/Cars/Cars';
import Feed from 'components/features/Feed/Feed';
import UpdateUserData from 'components/features/UpdateUserData/UpdateUserData';
import Car from 'components/features/Cars/Car/Car';

import { PublicRouterLayout } from 'RouterLayouts/PublicRouteLayout';
import { ProutectedRouterLayout } from 'RouterLayouts/ProtectedRouteLayout';

import { fetchAllUsersModelAsync } from 'store/slices/userSlice';
import { fetchAllCardsModelAsync } from 'store/slices/carSlice';

import styles from './App.module.scss';
  import { ToastContainer } from 'react-toastify';


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllUsersModelAsync());
    dispatch(fetchAllCardsModelAsync());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <BrowserRouter>
      <Routes>
          <Route element={<PublicRouterLayout />}>
            <Route index element={<Welcome/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/forgotPassword" element={<ForgotPassword/>} />
          </Route>
          <Route element={<ProutectedRouterLayout />}>
            <Route path="/feed" element={<Feed />} />
            
            <Route path="/profile" element={<Feed />}>
                <Route path=":userId" element={<Cars />} />
            </Route>
          </Route>  
          <Route path="/car" element={<Car />} />
          <Route path='/updateProfile' element={<UpdateUserData />} />     
          <Route path="*" element={<NotFound />} />        
        </Routes>
      </BrowserRouter>

      <ToastContainer style={{zIndex:9999}}/>
    </div>
  );
}

export default App;
