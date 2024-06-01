import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchNeighbourhoods = createAsyncThunk('neighbourhoods/fetchNeighbourhoods', async (accessToken) => {
    const response = await fetch('https://localhost:7049/Neighbourhoods', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return await response.json();
});

export const neighbourhoodsSlice = createSlice({
    name: 'neighbourhoods',
    initialState: {
        neighbourhoods: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export default neighbourhoodsSlice.reducer;
