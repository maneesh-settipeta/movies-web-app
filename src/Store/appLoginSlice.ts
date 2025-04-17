import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cityDetails {
    cityId: number,
    cityName: string
}

interface AppLoginTypes {
    isUserLoggedIn: boolean,
    city: cityDetails,
    isCityModalOpen: boolean | string,
    signInModalToggle: boolean,
    signUpModalToggle: boolean,
    userDetails: {
        userName: string,
        userEmail: string,
        userId: number | null
    }
}
const isCityNameThereInLS = localStorage.getItem('locationName');

const initialState: AppLoginTypes = {
    isUserLoggedIn: false,
    city: {
        cityId: 0,
        cityName: ''
    },
    isCityModalOpen: !isCityNameThereInLS && true,
    signInModalToggle: false,
    signUpModalToggle: false,
    userDetails: {
        userName: '',
        userEmail: '',
        userId: null
    }
}



const appLoginSlice = createSlice({
    name: "appLogin",
    initialState,
    reducers: {
        setModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isCityModalOpen = action.payload;
        },
        setSignModelOpen: (state, action) => {

            state.signInModalToggle = action.payload;
        },
        setSignUpModalOpen: (state, action) => {

            state.signUpModalToggle = action.payload
        },
        setUser: (state, action) => {
            state.userDetails = action.payload
        },

        setTheatresDetails: (state, action) => {

            state.city = action.payload
        }
    }
})

export const { setModalOpen, setSignModelOpen, setSignUpModalOpen, setTheatresDetails, setUser } = appLoginSlice.actions;
export default appLoginSlice.reducer;
