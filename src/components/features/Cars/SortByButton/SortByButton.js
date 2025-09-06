import { useDispatch, useSelector } from 'react-redux';

import { setSortBy, setIsFavorite } from 'store/slices/carSlice';

import cx from 'classnames';

import styles from './SortByButton.module.scss';

function SortByButton() {
    const dispatch = useDispatch();
    const sortBy = useSelector(store => store.cars.sortBy);
    const isFavorite = useSelector(store => store.cars.isFavorite);

    return(
        <div className={styles.sortByButtonsBlock}>
            <div>
                <button 
                    className={cx(styles.btn, styles.leftBtn, {
                        [styles.activBtn]: isFavorite === "all",
                      })}
                    onClick={() => dispatch(setIsFavorite("all"))}
                    type='button'
                >
                        All
                </button>
                <button 
                    className={cx(styles.btn, styles.rightBtn, {
                        [styles.activBtn]: isFavorite === "favorite",
                      })}
                    onClick={() => dispatch(setIsFavorite("favorite"))}
                    type='button'
                >
                        Favorites
                </button>
            </div>
            <div>
                <button 
                    className={cx(styles.btn, styles.leftBtn, {
                        [styles.activBtn]: sortBy === "asc",
                      })}
                   onClick={() => dispatch(setSortBy("asc"))}
                    type='button'
                >
                        From new to old
                </button>
                <button 
                     className={cx(styles.btn, styles.rightBtn, {
                        [styles.activBtn]: sortBy === "desc",
                      })}
                    onClick={() => dispatch(setSortBy("desc"))}
                    type='button'
                >
                        From old to new
                </button>
            </div>
        </div>
    );
}

export default SortByButton;