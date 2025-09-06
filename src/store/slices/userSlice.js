import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import fakeFetch from 'helpers/client';

const initialState = {
    allUsersModel: [],
    user: JSON.parse(localStorage.getItem('user')),
    loading: true,
    errore: null,
};

export const fetchAllUsersModelAsync = createAsyncThunk(
    'allUsersModel/fetchAllUsersModel',
    async (params, { rejectWithValue }) => {
        try{
            return await fakeFetch("allUsersModel");
        } catch(error) {
            return rejectWithValue(error);
        }
    }
);


const userSlice = createSlice({
    name: 'allUsersModel',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        forgotPassword(state,action) {
           const updatedUsersList = state.allUsersModel.map(item => {
                if (item.email === action.payload.email) 
                    return {
                      ...item,
                      password: action.payload.password,
                };

                return item;
            });
            state.allUsersModel = updatedUsersList;
            localStorage.setItem('allUsersModel', JSON.stringify(updatedUsersList));
        },
        updateUser (state, action) {
            const updatedUser = {...state.user, favoriteIds: state.user.favoriteIds.includes(action.payload) ? state.user.favoriteIds.filter(item => item !== action.payload) : [...state.user.favoriteIds, action.payload] };
            const updatedUsersList = state.allUsersModel.map(item => {
                if (item.id === updatedUser.id) return updatedUser;

                return item;
            });
            state.user = updatedUser;
            state.allUsersModel = updatedUsersList;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            localStorage.setItem('allUsersModel', JSON.stringify(updatedUsersList));
        },
        updateUsersList(state, action) {
            const newUsersList = state.allUsersModel.map(item => {
                if(item.id === action.payload.id){
                    return {
                       ...item,
                       password: action.payload.password
                    };
                }

                return item;
            });
            
            state.allUsersModel = newUsersList;
            localStorage.setItem('allUsersModel', JSON.stringify(newUsersList));
        },
        deleteUsersData(state, action) {
            const newUsersDataList = state.allUsersModel.filter(item => item.id !== action.payload);
            localStorage.setItem('allUsersModel', JSON.stringify(newUsersDataList));
            state.allUsersModel = newUsersDataList;
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchAllUsersModelAsync.pending, (state) => {
              state.error = null;
              state.loading = true;
           })
           .addCase(fetchAllUsersModelAsync.fulfilled, (state, action) => {
              state.error = null;
              state.loading = false;
              state.allUsersModel = action.payload;
           })
           .addCase(fetchAllUsersModelAsync.rejected, (state, action) => {
              state.error = action.payload;
              state.loading = false;
           })
    }
});

export const { updateUsersList, setUser, updateUser, deleteUsersData, forgotPassword } = userSlice.actions;

export default userSlice.reducer;