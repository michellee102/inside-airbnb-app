import { configureStore } from '@reduxjs/toolkit'
import neighbourhoodReducer from './redux/slices/neighbourhoodSlice';
import listingsReducer from './redux/slices/listingsSlice';

const store = configureStore({
    reducer: {
        neighbourhood: neighbourhoodReducer,
        listings: listingsReducer
    },
})

export default store;