import {  Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import ProfileHeader from 'components/layouts/AuthLayout/ProfileHeader/ProfileHeader';
import Slider from 'components/common/Slider/Slider';
import Popup from 'components/common/Popup/Popup';
import Loader from 'components/common/Loader/Loader';
import { FaPhoneAlt } from "react-icons/fa";

import { deleteCar } from 'store/slices/carSlice';

import styles from './Car.module.scss';

const UpdateCar = lazy(() => import('components/features/Cars/UpdateCar/UpdateCar'));

function Car () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const activUser = useSelector(store => store.users.user); 
    const location = useLocation();
    const { id, author } = location.state || {};
    const allCarsModel = useSelector(store => store.cars.allCarsModel);
    const car = allCarsModel?.find(item => item.id === id);
    const loader = useSelector(store => store.cars.loading);

    const toggleDeletePopupVisibility = (ev) => {
      if(ev) {
        ev.preventDefault();
      }
  
      setIsPopupVisible(prevState => !prevState);
    };

    const handleDeleteBtn = (id) => {
       const confirmDelete = window.confirm("Do you really want to delete your car data?");

      if (confirmDelete) {
        dispatch(deleteCar(id));
        navigate("/feed")
      }
    };

     return(
         <>
           <ProfileHeader/>
           {loader ? <Loader /> :
            <div className={styles.container}>
            <div className={styles.car}>
              <Slider images={car?.images} />
                <div className={styles.carData}>
                  <div className={styles.carDataAuther}>
                  <span className={styles.carPrice}>{car?.price} $</span>
                <div className={styles.ownerCard}>
                  <div className={styles.info}>
                    <p className={styles.name}>{author}</p>
                    <a href={`tel:${car?.phoneNumber}`} className={styles.phone}>
                      <FaPhoneAlt className={styles.icon} />
                      {car?.phoneNumber}
                    </a>
                  </div>
                </div>
                {activUser.id === car?.authorId && (
                    <div className={styles.actionButtons}>
                       <button onClick={toggleDeletePopupVisibility} className={`${styles.btn} ${styles.edit}`}>Edit</button>
                       <button onClick={() => handleDeleteBtn(car.id)} className={`${styles.btn} ${styles.delete}`}>Delete</button>
                    </div>
                  )}
                </div>
                <div className={styles.carContact}>
                  <p className={styles.carDescription}>{car?.description}</p>
              </div>
                </div>
            </div>
           </div>
          }          
           {isPopupVisible &&
                  <Popup className={styles.deletePopup} onClose={toggleDeletePopupVisibility}>
                    <Suspense fallback={<p>Content is loading...</p>}>
                      <UpdateCar 
                        car={car}
                        cancel={toggleDeletePopupVisibility}
                      />                      
                    </Suspense>
                  </Popup>
           }           
         </>
     );
}

export default Car;