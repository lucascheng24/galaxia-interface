import axios from "axios";
import { FC, ReactNode } from "react";
import { useAuth } from "../../auth/UserProfileContext";
import Cookies from "universal-cookie";
import { STORED_COOKIE_PATH } from "../cookieClass";

interface Props {
    children: ReactNode;
}

export const ResponseInterceptor: FC<Props> = ({ children }) => {

    const cookies = new Cookies();
    const { userProfile, setUserProfile } = useAuth();
    
    axios.interceptors.response.use( res => {
        //  do something here
        

        return res;
    }, (error) => {
        // handle request error
        
        
        console.log("response error: ", error);

        if (error.response.status === 401) {
            console.log('response status - 401: clear all session!!')
            cookies.remove(STORED_COOKIE_PATH.JWT);
            cookies.remove(STORED_COOKIE_PATH.User_Info);
            setUserProfile({});
        }
        
        return error
    });

    return <>{children}</>;
}