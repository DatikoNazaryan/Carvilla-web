import { useState, Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileHeader from './ProfileHeader/ProfileHeader';
import UsersName from './UsersName/UsersName';
import Popup from 'components/common/Popup/Popup';
import Loader from 'components/common/Loader/Loader';
import { FiPlus } from 'react-icons/fi';

import cx from 'classnames';

import styles from './AuthLayout.module.scss';


const CarData = lazy(() => import('components/features/CarData/CarData'));

function AuthLayout () {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const loadingCars = useSelector(store => store.cars.loading);
    const loadingUsers = useSelector(store => store.users.loading);
    const searchLoading = useSelector(store => store.cars.searchLoading);

    if(loadingUsers) return (<Loader />);

    const togglePopupVisibility = (ev) => {
      if(ev) {
        ev.preventDefault();
      }
  
      setIsPopupVisible(prevState => !prevState);
    };
    
    return (
        <>
           <ProfileHeader />
           <div className={styles.content}>
           <UsersName />
           <div className={styles.carsBlock}>
              <div className={styles.openPopup}>
                <button
                onClick={togglePopupVisibility}
              className={cx(styles.styleButton, styles.buttonHoverEffect)}
            >
              <span className={styles.buttonDecor}></span>
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>
                  <FiPlus size={24} />
                </span>
                <span className={styles.buttonText}>
                  Add car
                </span>
              </span>
            </button>
              </div>
              {loadingCars ? <Loader /> : <Outlet />}
           </div>
           </div>
           {
             isPopupVisible && (
             <Popup onClose={togglePopupVisibility}>
              <Suspense fallback={<p>Content is loading...</p>}>
                <CarData cancel={togglePopupVisibility} /> 
               </Suspense>
            </Popup>
              )
            }
        </>
    );
}

export default AuthLayout;