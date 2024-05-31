import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accessToken } from 'mapbox-gl';


export const fetchNeighbourhoods = createAsyncThunk('listings/fetchNeighbourhoods', async (accessToken) => {
    const response = await fetch('https://localhost:7049/Neighbourhoods', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return await response.json();
});


export const fetchListings = createAsyncThunk('listings/fetchListings', async (accessToken) => {
    const response = await fetch('https://localhost:7049/Listings/geoinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});

export const fetchListingsByNeighbourhood = createAsyncThunk('listings/fetchListingsByNeighbourhood', async (neighbourhood, accessToken) => {
    const response = await fetch(`https://localhost:7049/Listings/${neighbourhood}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});

export const fetchListingsByFilters = createAsyncThunk('listings/filters', async (filters, accessToken) => {
    const { neighbourhood, review, maxPrice, minPrice } = filters;
    const neighbourhoodParam = neighbourhood ? `neighbourhood=${neighbourhood}` : '';
    const reviewParam = review ? `&reviewScore=${review}` : '';
    const maxPriceParam = maxPrice ? `&maxPrice=${maxPrice}` : '';
    const minPriceParam = minPrice ? `&minPrice=${minPrice}` : '';
    const url = `https://localhost:7049/Listings/filter?${neighbourhoodParam}${reviewParam}${minPriceParam}${maxPriceParam}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});

export const fetchListingDetails = createAsyncThunk('listings/details', async (listingId, accessToken) => {
    const response = await fetch(`https://localhost:7049/Listings/${listingId}/details`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});

export const fetchSortedListings = createAsyncThunk('listings/sorted', async (sortType, accessToken) => {
    const response = await fetch(`https://localhost:7049/Stats?sortType=${sortType}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});


//  ---------------------------------------------------- STATS ----------------------------------------------------
export const fetchAverageNightsPerMonth = createAsyncThunk('listings/averageNightsPerMonth', async (accessToken) => {
    const response = await fetch(`https://localhost:7049/Listings/stats/average-nights-per-month`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});

export const fetchTotalRevenue = createAsyncThunk(
    'listings/fetchTotalRevenue',
    async ({ neighbourhood, accessToken }) => {
        const response = await fetch(`https://localhost:7049/Listings/stats/revenue-per-neighbourhood-per-month?neighbourhood=${neighbourhood}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.json();
    }
);

export const fetchAverageRating = createAsyncThunk('listings/averageRating', async (accessToken) => {
    const response = await fetch(`https://localhost:7049/Listings/stats/average-rating-per-neighbourhood`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
});


export const listingsSlice = createSlice({
    name: 'listings',
    initialState: {
        allListingsGeoLocation: [],
        filteredListings: [],
        neighbourhoods: [],
        selectedFilters: {
            selectedNeighbourhood: null,
            selectedReview: null,
            maxPrice: null,
            minPrice: null
        },
        listingDetails: null,
        sortedListings: [],
        accessToken: null,
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
        setPriceFilter: (state, action) => {
            state.selectedFilters.minPrice = action.payload.minPrice;
            state.selectedFilters.maxPrice = action.payload.maxPrice;
        },
        resetFilters: (state, action) => {
            state.selectedFilters.selectedNeighbourhood = null;
            state.selectedFilters.selectedReview = null;
            state.selectedFilters.maxPrice = null;
            state.selectedFilters.minPrice = null;
            state.filteredListings = []
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
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
                if (action.payload.length === 0) {
                    state.filteredListings = [];
                    return;
                }
                const filteredIds = action.payload;
                state.filteredListings = state.allListingsGeoLocation.filter(listing => filteredIds.includes(listing.id));
            })
            .addCase(fetchListingsByFilters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchNeighbourhoods.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchNeighbourhoods.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.neighbourhoods = action.payload;
            })
            .addCase(fetchNeighbourhoods.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});


export const { setAllListingsGeoLocation, setSelectedNeighbourhood, setSelectedReview, resetFilters, setPriceFilter, setAccessToken } = listingsSlice.actions;
export default listingsSlice.reducer;
