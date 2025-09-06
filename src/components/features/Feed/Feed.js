import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Cars from '../Cars/Cars';

import { setSortedCars } from 'store/slices/carSlice';
import { sortData } from 'helpers/sortData';

function Feed () { 
  const dispatch = useDispatch();
  const searchedCarsList = useSelector(store => store.cars.searchedCarsModel);
  const activUser = useSelector(store => store.users.user);
  const sortBy = useSelector(store => store.cars.sortBy);
  const isFavorite = useSelector(store => store.cars.isFavorite);
  const { userId } = useParams();
 
     useEffect(() => {
         sortCars(sortBy);
     }, [sortBy, searchedCarsList, isFavorite, userId]);
 
     const sortCars = (sort) => {
        if(isFavorite === "all") {
            dispatch(setSortedCars(+userId ?
                sortData(searchedCarsList.filter((car) => (car.authorId === +userId)), sort) :
                sortData(searchedCarsList, sort)));
        } else if (isFavorite === "favorite") {
            dispatch(setSortedCars(+userId ?
                sortData(searchedCarsList.filter((car) => (car.authorId === +userId)).filter((car) => activUser.favoriteIds.includes(car.id)), sort) :
                sortData(searchedCarsList.filter((car) => activUser.favoriteIds.includes(car.id)), sort)));
        }
    }; 

    return (
      <Cars />
    );
}

export default Feed;