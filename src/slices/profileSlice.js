import { createSlice } from "@reduxjs/toolkit";
import Instrutor from '../assets/Images/Instructor.png'
const initialState={
    // user:{
    //     firstName:"Himanshu",
    //     lastName:"Negi",
    //     email:"himanshunegi267@gmail.com",
    //     accountType:"Student",
    //     image:"https://res.cloudinary.com/dms0i7w80/image/upload/v1685549420/UploadedImages/r5pl2hn9xanxpc1ueuix.jpg"
    // }
    user:null
}
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>
        {
            state.user=action.payload
        }
    }
})
export const {setUser}=profileSlice.actions
export default profileSlice.reducer;