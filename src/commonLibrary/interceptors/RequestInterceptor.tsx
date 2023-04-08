import axios from "axios";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const RequestInterceptor: FC<Props> = ({ children }) => {
    
    axios.interceptors.request.use( req => {
        //  do something here
        
        //Access-Control-Allow-Origin
        req.headers['Access-Control-Allow-Origin'] =  '*'

        return req;
    }, (error) => {
        // handle request error
        
        console.log("request error: ", JSON.stringify(error));
        
        return error
    });

    return <>{children}</>;
}