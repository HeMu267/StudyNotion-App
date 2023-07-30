import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState={
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems:(state,action)=>
        {
            state.totalItems=action.payload;
        },
        addToCart:(state,action)=>{
            state.totalItems+=1;
            state.cart.push(action.payload);
            toast.success("item added successfully");
        },
        removeFromCart:(state,action)=>{
            const newCart=state.cart.filter((item)=>item._id!==action.payload._id);
            state.cart=newCart;
            state.totalItems-=1;
            toast.success("item removed from cart");
        },
        resetCart:(state)=>{
            state.cart.length=0;
            state.totalItems=0;
            toast.success("cart is reset");
        }
        
    }
})
export const {setTotalItems,addToCart,removeFromCart,resetCart}=cartSlice.actions
export default cartSlice.reducer;