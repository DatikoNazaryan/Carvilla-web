import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';

import useDebounce from './debounce';

import { setSearchedCarsModel, setSearchLoading } from 'store/slices/carSlice';

import styles from './SearchCar.module.scss';

function SearchCar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceVal, setDebounceVal] = useState("");
  const debounceValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    setDebounceVal(searchTerm);
    dispatch(setSearchedCarsModel(debounceVal));
  }, [debounceValue, debounceVal]);

  return (
    <div className={styles.search}>
        <input
          placeholder='Search...'
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => (dispatch(setSearchLoading(true)), setSearchTerm(e.target.value))}
        />
    </div>
  );
}

export default SearchCar;
