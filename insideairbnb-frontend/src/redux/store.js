import { configureStore } from '@reduxjs/toolkit'
import listingsReducer from './slices/listingsSlice';

const store = configureStore({
    reducer: {
        listings: listingsReducer
    },
})

export default store;