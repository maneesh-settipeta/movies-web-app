import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    summaryData: {},
    summaryMovieInfo: {},
    paymentType: '',
    isPaymentModalOpen: false,
    bookedInfo: {}
}

const appPaymentSlice = createSlice({
    name: "appPayment",
    initialState,
    reducers: {
        setSummary: (state, action) => {
            state.summaryData = action.payload;
        },
        setSummaryMovieInfo: (state, action) => {
            state.summaryMovieInfo = action.payload;
        },
        setPaymentMethod: (state, action) => {
            state.paymentType = action.payload
        },
        setPaymentModalToggle: (state, action) => {
            state.isPaymentModalOpen = action.payload;
        },
        setBookingInfo: (state, action) => {
            state.bookedInfo = action.payload
        }
    }
});

console.log(initialState.isPaymentModalOpen, "isPaymentModalOpen");



export const { setSummary, setSummaryMovieInfo, setPaymentMethod, setPaymentModalToggle, setBookingInfo } = appPaymentSlice.actions;
export default appPaymentSlice.reducer;