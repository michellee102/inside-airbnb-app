import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const fetchListings = createAsyncThunk('listings/fetchListings', async () => {
    const response = await fetch('https://localhost:7049/Listings/geoinfo');
    return response.json();
});

export const fetchListingsByNeighbourhood = createAsyncThunk('listings/fetchListingsByNeighbourhood', async (neighbourhood) => {
    const response = await fetch(`https://localhost:7049/Listings/${neighbourhood}`);
    return response.json();
});

export const fetchListingsByFilters = createAsyncThunk('listings/filters', async (filters) => {
    const { neighbourhood, review } = filters;
    const neighbourhoodParam = neighbourhood ? `neighbourhood=${neighbourhood}` : '';
    const reviewParam = review ? `&reviewScore=${review}` : '';
    const url = `https://localhost:7049/Listings/filter?${neighbourhoodParam}${reviewParam}`;
    const response = await fetch(url);
    return response.json();
});

export const fetchListingDetails = createAsyncThunk('listings/details', async (listingId) => {
    const response = await fetch(`https://localhost:7049/Listings/${listingId}/details`);
    return response.json();
});

export const fetchSortedListings = createAsyncThunk('listings/sorted', async (sortType) => {
    const response = await fetch(`https://localhost:7049/Stats?sortType=${sortType}`);
    return response.json();
});


export const listingsSlice = createSlice({
    name: 'listings',
    initialState: {
        allListingsGeoLocation: [],
        filteredListings: [],
        selectedFilters: {
            selectedNeighbourhood: null,
            selectedReview: null,
        },
        listingDetails: null,
        sortedListings: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setAllListingsGeoLocation: (state, action) => {
            state.allListingsGeoLocation.push(action.payload);
        },
        setSelectedNeighbourhood: (state, action) => {
            state.selectedFilters.selectedNeighbourhood = action.payload;
        },
        setSelectedReview: (state, action) => {
            state.selectedFilters.selectedReview = action.payload;
        },
        resetFilters: (state, action) => {
            state.selectedFilters.selectedNeighbourhood = null;
            state.selectedFilters.selectedReview = null;
            state.filteredListings = []
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
            })

            .addCase(fetchListingDetails.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchListingDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listingDetails = action.payload;
            })
            .addCase(fetchListingDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchSortedListings.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSortedListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sortedListings = action.payload;
            })
            .addCase(fetchSortedListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(fetchListingsByFilters.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchListingsByFilters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                const filteredIds = action.payload;
                state.filteredListings = state.allListingsGeoLocation.filter(listing => filteredIds.includes(listing.id));
            })
            .addCase(fetchListingsByFilters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});


export const { setAllListingsGeoLocation, setSelectedNeighbourhood, setSelectedReview, resetFilters } = listingsSlice.actions;
export default listingsSlice.reducer;
