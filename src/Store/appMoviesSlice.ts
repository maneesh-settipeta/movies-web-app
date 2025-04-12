import { createSlice } from "@reduxjs/toolkit"

interface ApplMovieTypes {
    moviesData: object[]
    selectedDate: string
    selectedMovieId: number | null,
    showID: number | null,
    selectedSeats: []
}

const initialState: ApplMovieTypes = {
    moviesData: [],
    selectedDate: "",
    selectedMovieId: null,
    showID: null,
    selectedSeats: []
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
        },
        setSelectedMovieId: (state, action) => {
            localStorage.setItem('movieId', action.payload);
            state.selectedMovieId = action.payload;
        },
        setShowID: (state, action) => {
            localStorage.setItem('showId', action.payload);
            state.showID = action.payload;
        },
        setSelectedSeats: (state, action) => {
            state.selectedSeats = action.payload;
        }
    }
});

export const { setMoviesData, setSelectedDate, setSelectedMovieId, setShowID, setSelectedSeats } = appMoviesSlice.actions;
export default appMoviesSlice.reducer;