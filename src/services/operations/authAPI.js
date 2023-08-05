import { toast } from "react-hot-toast"
import {setLoading,setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"
import {apiConnector} from '../apiconnector'
import {endpoints} from '../apis'
import {resetCart} from '../../slices/cartSlice'
const {
    LOGIN_API,
    SIGNUP_API
}=endpoints
export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastID=toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const res=await apiConnector("POST",LOGIN_API,{
                email,password
            })
            console.log("LOGIN response",res);
            if(!res.data.success)
            {
                throw new Error(res.data.message);
            }
            toast.success("Login Successful");
            dispatch(setToken(res.data.token));
            const userImage = res.data?.user?.image
              ? res.data.user.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstName} ${res.data.user.lastName}`
            dispatch(setUser({ ...res.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/dashboard/profile")
        }
        catch(err)
        {
            console.log("LOGIN API ERROR............", err)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastID);
    }
}
export function logout(navigate){
    return (dispatch)=>{
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("User logged out succesfully");
        navigate("/");
    }
    
}