import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SortByButton from './SortByButton/SortByButton';
import ScrollTo from "../../common/ScrollTo/ScrollTo";
import SearchCar from '../SearchCar/SearchCar';
import Loader from '../../common/Loader/Loader';

import cx from 'classnames';

import { updateUser } from 'store/slices/userSlice';

import styles from './Cars.module.scss';

function Cars() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const carsRef = useRef(null);

  const allUsersModel = useSelector(store => store.users.allUsersModel);
  const sortedCars = useSelector(store => store.cars.sortedCars);
  const activUser = useSelector(store => store.users.user);
  const searchLoading = useSelector(store => store.cars.searchLoading);

  const scrollToTopClick = () => {
    carsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setShowScrollTopButton(false);
  };

  const onScroll = (e) => {
    if (e.target.scrollTop >= 44 && !showScrollTopButton) {
      setShowScrollTopButton(true);
    }
    if (e.target.scrollTop <= 44 && showScrollTopButton) {
      setShowScrollTopButton(false);
    }
  };

  const hanleClickCar = (car, authorName) => {
    navigate('/car', { state: { id: car.id, author: authorName } });
  };

  return (
    <>
      <SearchCar />
      <SortByButton />
      {searchLoading ? <Loader /> : sortedCars.length ? (
        <div className={styles.carList} onScroll={onScroll} ref={carsRef}>
          {sortedCars.map((car) => {
            const user = allUsersModel.find((user) => user.id === car.authorId);

            return (
              <div
                className={cx(styles.carCard, {
                  [styles.activeAuthor]: activUser.id === car.authorId,
                })}
                key={car.id}
                onClick={() => hanleClickCar(car, user?.name)}
              >
                <div className={styles.date}>
                  <p>{car.creationDate}</p>
                </div>
                <figure>
                  <img
                    className={styles.image}
                    src={car.images[0]}
                    alt={car.model}
                  />
                  <figcaption className={styles.imageDescription}>
                    <p>{car.model}</p>
                    <p>${car.price}</p>
                  </figcaption>
                </figure>
                <div
                  className={styles.favorite}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    id={`fav-${car.id}`}
                    checked={activUser.favoriteIds.includes(car.id)}
                    onChange={() => dispatch(updateUser(car.id))}
                  />
                  <label htmlFor={`fav-${car.id}`}>Favorite</label>
                </div>
              </div>
            );
          })}
          <ScrollTo showButton={showScrollTopButton} scrollToTop={scrollToTopClick} />
        </div>
      ) : (
        <div className={styles.emptyList}>
          <p>There are no cars in the system yet</p>
        </div>
      )}
    </>
  );
}

export default Cars;
