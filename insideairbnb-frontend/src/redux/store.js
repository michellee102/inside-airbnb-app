import { configureStore } from '@reduxjs/toolkit'
import listingsReducer from './slices/listingsSlice';
import neighbourhoodReducer from './slices/neighbourhoodSlice';

const store = configureStore({
    reducer: {
        listings: listingsReducer,
        neighbourhoods: neighbourhoodReducer,
    },
})

export default store;