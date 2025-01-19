import { createSlice } from "@reduxjs/toolkit"

interface ApplMovieTypes {
    moviesData: object[]
    selectedDate: string
}

const initialState: ApplMovieTypes = {
    moviesData: [],
    selectedDate: ""
}

const appMoviesSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        setMoviesData: (state, action) => {
            state.moviesData = [action.payload]
        },
        setSelectedDate: (state, action) => {

            state.selectedDate = action.payload
        }
    }
})

export const { setMoviesData, setSelectedDate } = appMoviesSlice.actions;
export default appMoviesSlice.reducer