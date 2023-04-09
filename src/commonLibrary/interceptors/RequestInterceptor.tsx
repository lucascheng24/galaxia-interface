import axios from "axios";
import { FC, ReactNode } from "react";
import { useAuth } from "../../auth/UserProfileContext";
import { useJwt } from "react-jwt";

interface Props {
    children: ReactNode;
}

export const RequestInterceptor: FC<Props> = ({ children }) => {
    
    const { userProfile, setUserProfile } = useAuth();
    const { decodedToken, isExpired, reEvaluateToken } = useJwt(userProfile?.token??``);
    
    axios.interceptors.request.use( req => {
        //  do something here
        
        //Access-Control-Allow-Origin
        // req.headers['Access-Control-Allow-Origin'] = '*';
        req.headers['Access-Control-Allow-Credentials'] = 'true';
        // req.headers['Origin'] = 'http://localhost:3000' // add the Origin header here

        if (userProfile?.token) {
            req.headers['Authorization'] = userProfile?.token;
        }


        return req;
    }, (error) => {
        // handle request error
        
        console.log("request error: ", JSON.stringify(error));
        
        return error
    });

    return <>{children}</>;
}