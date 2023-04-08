import axios from "axios";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const ResponseInterceptor: FC<Props> = ({ children }) => {
    
    axios.interceptors.response.use( res => {
        //  do something here


        return res;
    }, (error) => {
        // handle request error
        
        console.log("response error: ", JSON.stringify(error));
        
        return error
    });

    return <>{children}</>;
}