import { configureStore } from "@reduxjs/toolkit";
import appLoginSlice from "./appLoginSlice";
import appMoviesSlice from "./appMoviesSlice"

const appStore= configureStore({
    reducer:{
        appLogin:appLoginSlice,
        appMovie:appMoviesSlice
    }
});
export default appStore;