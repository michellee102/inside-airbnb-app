import { createSlice } from '@reduxjs/toolkit'

export const neighbourhoodSlice = createSlice({
    name: 'filter',
    initialState: {
        selectedNeighbourhood: null,
    },
    reducers: {
        setSelectedNeighbourhood: (state, action) => {
            state.selectedNeighbourhood = action.payload;
        }
    },
})


// Action creators are generated for each case reducer function
export const { setSelectedNeighbourhood } = neighbourhoodSlice.actions

export default neighbourhoodSlice.reducer