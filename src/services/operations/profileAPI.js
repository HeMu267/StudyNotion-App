import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
import { RefreshToken } from "../../utils/refreshToken"


const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function getUserEnrolledCourses(token,refreshToken) {
return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        let result = [];
    try {
        console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
        const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
            Authorization: `Bearer ${token}`,
        }
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
        // console.log(
        //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
        //   response
        // )
        console.log(response);
        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        result = response.data.data;
        toast.dismiss(toastId);
        return result;
    } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    if(error.response.data.message==='token expired')
        {
          try{
            const newToken=await dispatch(RefreshToken(refreshToken));
            const resultagain=dispatch(getUserEnrolledCourses(newToken,refreshToken));
            toast.dismiss(toastId);
            return resultagain;
          }catch(err)
          {
            console.log(err);
            toast.error("refresh err");
          }
    }
    else{
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
        }
    }
    toast.dismiss(toastId);
    }
}