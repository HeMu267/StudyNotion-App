import { endpoints} from "../services/apis"
import { toast } from "react-hot-toast"
import { setToken,setRefreshToken } from "../slices/authSlice"
import { setUser } from "../slices/profileSlice";
import { apiConnector } from "../services/apiconnector";
const {
    REFRESH_TOKEN_API
}=endpoints

export function RefreshToken(refreshToken)
{
    return async (dispatch)=>{
        try{
            const res=await apiConnector(
                "POST",
                REFRESH_TOKEN_API,
                {
                  refreshToken
                }
                );
                console.log(res);
                if(!res.data.success)
                {
                  throw new Error(res.data.message);
                }
              toast.success("refresh token success");
              dispatch(setToken(res.data.token));
              dispatch(setRefreshToken(res.data.refreshToken));
              const userImage = res.data?.user?.image
                ? res.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstName} ${res.data.user.lastName}`
              dispatch(setUser({ ...res.data.user, image: userImage }));
              localStorage.setItem("token", JSON.stringify(res.data.token));
              localStorage.setItem("refreshToken",JSON.stringify(res.data.refreshToken));
              return res.data.token;
        }
        catch(err)
        {
            console.log(err);
            toast.error("refresh err");
        }
    }
}