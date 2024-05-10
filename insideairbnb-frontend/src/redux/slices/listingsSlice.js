import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchListings = createAsyncThunk('listings/fetchListings', async () => {
    const response = await fetch('https://localhost:7049/Listings/geoinfo');
    return response.json();
});

export const fetchListingsByNeighbourhood = createAsyncThunk('listings/fetchListingsByNeighbourhood', async (neighbourhood) => {
    const response = await fetch(`https://localhost:7049/Listings/${neighbourhood}`);
    return response.json();
});


export const listingsSlice = createSlice({
    name: 'listings',
    initialState: {
        allListingsGeoLocation: [],
        filteredListings: [],
        selectedNeighbourhood: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setAllListingsGeoLocation: (state, action) => {
            state.allListingsGeoLocation.push(action.payload);
        },
        setSelectedNeighbourhood: (state, action) => {
            state.selectedNeighbourhood = action.payload;
            if (action.payload === null) {
                state.filteredListings = [];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListings.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allListingsGeoLocation = action.payload;
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchListingsByNeighbourhood.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchListingsByNeighbourhood.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.filteredListings = action.payload;
            })
            .addCase(fetchListingsByNeighbourhood.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});

// Action creators are generated for each case reducer function
export const { setAllListingsGeoLocation, setSelectedNeighbourhood } = listingsSlice.actions;

export default listingsSlice.reducer;
