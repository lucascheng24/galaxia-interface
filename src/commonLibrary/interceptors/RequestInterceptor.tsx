import axios from "axios";
import { FC, ReactNode } from "react";
import { useAuth } from "../../auth/UserProfileContext";
import { useJwt } from "react-jwt";
import { JwtPayload } from "jwt-decode";
import login_request, { LoginRequest } from "../../auth/loginInterface/LoginApi";
import jwt_decode from "jwt-decode";


interface Props {
    children: ReactNode;
}

export const RequestInterceptor: FC<Props> = ({ children }) => {
    
    const { userProfile, setUserProfile } = useAuth();
    const { decodedToken, isExpired, reEvaluateToken } = useJwt(userProfile?.token??``);


    const refreshToken = () => {

        const username = userProfile?.username;
        const hashPw = userProfile?.hashPw;

        if (username && hashPw) {
            var requestBody: LoginRequest = {
                username: username, 
                password: hashPw, 
                rememberMe: false
            }
    
            //  send api
            login_request(requestBody).then(response => {
                // console.log("login_request-res: ", response);
                const hasAuthorization = response.headers['authorization']!! ?? false;
    
                if (response.status === 200 && hasAuthorization) {
                const authToken = response.headers['authorization']?? undefined
                const jwtToken = JSON.stringify(authToken).replace(`Bearer `, ``)
                const jwt_payload : JwtPayload = jwt_decode(jwtToken) 
                
                console.log('jwtToken: ', jwtToken)
                console.log("jwt_decode: ", jwt_payload)
    
                setUserProfile({
                    ...userProfile,
                    username: jwt_payload.sub,
                    token: authToken,
                    jwtPayload: jwt_payload
                });

                if (jwt_payload.exp)
                    console.log('token refreshed - expDate: ', new Date(jwt_payload.exp*1000))
                } else {
                    console.log('http status ', response.status)
                    console.log('http response', response)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }



    
    axios.interceptors.request.use( req => {
        //  do something here
        
        //Access-Control-Allow-Origin
        // req.headers['Access-Control-Allow-Origin'] = '*';
        req.headers['Access-Control-Allow-Credentials'] = 'true';
        // req.headers['Origin'] = 'http://localhost:3000' // add the Origin header here

        const expTimestamp = userProfile?.jwtPayload?.exp;  // Unix timestamp in seconds

        if (expTimestamp) {
            if (expTimestamp < Date.now()) {
                // token has expired
                //  refresh token
                refreshToken()
            } else {
                // token is still valid

            }
        }
        

        if (userProfile?.token) {
            req.headers['Authorization'] = `Bearer ` + userProfile?.token;
        }


        return req;
    }, (error) => {
        // handle request error
        
        console.log("request error: ", JSON.stringify(error));
        
        return error
    });

    return <>{children}</>;
}


