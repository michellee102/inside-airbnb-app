import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        chosenNeighbourhood: ''
    },
    reducers: {
        filterNeighbourhoods: (state, action) => {
            state.chosenNeighbourhood += 1
        }
    },
})


// Action creators are generated for each case reducer function
export const { filterNeighbourhoods } = filterSlice.actions

export default filterSlice.reducers