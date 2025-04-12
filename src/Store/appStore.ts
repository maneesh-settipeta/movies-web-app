import { configureStore } from "@reduxjs/toolkit";
import appLoginSlice from "./appLoginSlice";
import rootReducer from "./appMoviesSlice"
import appPaymentSlice from './appPaymentSlice';

const appStore = configureStore({
    reducer: {
        appLogin: appLoginSlice,
        appMovie: rootReducer,
        appPayment: appPaymentSlice
    }
});

export default appStore;