import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const authenticateUser = createAsyncThunk('listings/authentication', async (token) => {
    const response = await fetch('https://localhost:7049/Listings/authentication', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
});





const initialState = {
    // Define your initial state here
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Define your actions and their corresponding reducers here
    },
});

export const { actions } = authSlice;
export default authSlice.reducer;