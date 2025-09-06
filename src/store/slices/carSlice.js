import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import fakeFetch from 'helpers/client';

const initialState = {
    allCarsModel: [],
    loading: true,
    searchLoading: false,
    errore: null,
    sortBy: "asc",
    isFavorite: "all",
    sortedCars: [],
    searchedCarsModel: []
};


export const fetchAllCardsModelAsync = createAsyncThunk(
    'allCarsModel/fetchAllCarsModel',
    async (params, { rejectWithValue }) => {
        try{
            return await fakeFetch("allCarsModel");
        } catch(error) {
            return rejectWithValue(error);
        }
    }
);

const carSlice = createSlice({
    name: 'allCarsModel',
    initialState,
    reducers: {
        setSearchLoading: (state, action) => {
        state.searchLoading = action.payload;
      },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },

        setIsFavorite(state, action) {
            state.isFavorite = action.payload;
        },

        setSortedCars(state, action) {
            state.sortedCars = action.payload;
        },
        updateCar(state, action) {            
            const updatedCarsList = state.allCarsModel.map(item => {
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updateValues,
                        images: [...action.payload.images],
                    };
                } 
                return item;
            });
            state.allCarsModel = updatedCarsList;
            localStorage.setItem('allCarsModel', JSON.stringify(updatedCarsList));
        },
        deleteCar(state, action) {
            const newCarsList = state.allCarsModel.filter(car => car.id !== action.payload);
            state.allCarsModel = newCarsList;
            localStorage.setItem('allCarsModel', JSON.stringify(newCarsList));
        },
        carAutherDelete(state, action) {
            const newCarsDataList = state.allCarsModel.filter(item => item.authorId !== action.payload);
            localStorage.setItem('allCarsModel', JSON.stringify(newCarsDataList));
            state.allCarsModel = newCarsDataList;
        },
        setSearchedCarsModel(state, action) {
         const newSearchedCarsList = state.allCarsModel.filter(item => (item.model.toLowerCase().includes(action.payload.toLowerCase())));
         state.searchedCarsModel = newSearchedCarsList;
      }
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchAllCardsModelAsync.pending, (state) => {
              state.error = null;
              state.loading = true;
           })
           .addCase(fetchAllCardsModelAsync.fulfilled, (state, action) => {
              state.error = null;
              state.loading = false;
              state.allCarsModel = action.payload;
              state.searchedCarsModel = action.payload;
           })
           .addCase(fetchAllCardsModelAsync.rejected, (state, action) => {
              state.error = action.payload;
              state.loading = false;
           })
    }
});

export const { setSearchLoading, setSearchedCarsModel, carAutherDelete, setSortBy, setSortedCars, setIsFavorite, updateCar, deleteCar } = carSlice.actions;

export default carSlice.reducer;