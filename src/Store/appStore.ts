import { configureStore } from "@reduxjs/toolkit";
import appLoginSlice from "./appLoginSlice";

const appStore= configureStore({
    reducer:{
        appLogin:appLoginSlice,
    }
});
export default appStore;