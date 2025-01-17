import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AppLoginState {
    isUserLoggedIn:boolean,
    isCitySelected:string,
    isModalOpen:boolean,
}

const initialState :AppLoginState={
    isUserLoggedIn:false,
    isCitySelected:"",
    isModalOpen:false,
}

const appLoginSlice = createSlice({
    name:"appLogin",
    initialState,
    reducers:{
        setCity:(state,action:PayloadAction<string>)=>{
            state.isCitySelected= action.payload
            localStorage.setItem("location",action.payload);
        },
        setModalOpen:(state,action:PayloadAction<boolean>)=>{
            state.isModalOpen=action.payload;
        }
    }
})

export const {setCity , setModalOpen}= appLoginSlice.actions;
export default appLoginSlice.reducer;
