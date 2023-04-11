import { createContext, FC, ReactNode, useState, useContext, useEffect } from "react";
import { Role } from "../commonLibrary/userClass";
import { JwtPayload } from "../commonLibrary/httpStandard";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { STORED_COOKIE_PATH } from "../commonLibrary/cookieClass";

export interface userProfile {
    username?: string
    hashPw?: string
    emailAddress?: string
    role?: Role
    token?: string
    jwtPayload?: JwtPayload
}

interface AuthContextType {
    userProfile: userProfile | null;
    setUserProfile: React.Dispatch<React.SetStateAction<userProfile | null>>;
}

type CProps = {
    children: React.ReactNode;
  };

const AuthContext = createContext<AuthContextType>({
    userProfile: null,
    setUserProfile: () => null
});

export const AuthContextProvider: FC<CProps> = ({ children }) => {

    const cookies = new Cookies();
    const [userProfile, setUserProfile] = useState<userProfile | null>(null);

    useEffect(() => {
        //  run whenever userProfile is updated
        console.log("UPDATE - userProfile:", userProfile)

        if (userProfile?.username && userProfile?.hashPw) {
            // set the cookie

            const userInfo = {
                username: userProfile?.username,
                hashPw: userProfile?.hashPw
            }

            cookies.set(STORED_COOKIE_PATH.User_Info, JSON.stringify(userInfo), 
                { path: '/', secure: true, sameSite :true}
            );
        }

        if (userProfile?.token) {
            // set the cookie

            cookies.set(STORED_COOKIE_PATH.JWT, userProfile?.token, 
                { path: '/', secure: true, sameSite :true}
            );
        }

        if (userProfile?.token === undefined) {
            cookies.remove(STORED_COOKIE_PATH.JWT);
            cookies.remove(STORED_COOKIE_PATH.User_Info);
        }

    }, [userProfile])


    useEffect(() => {
        //  update item from cookie if any
        //  In general, only trun this after user refresh the page. Try to restore all global state from cookie
        const userInfoStr = cookies.get(STORED_COOKIE_PATH.User_Info)
        const jwtToken = cookies.get(STORED_COOKIE_PATH.JWT)

        console.log('get from cookie: ', userInfoStr)
        console.log('jwtToken get from cookie: ', jwtToken)

        if (userInfoStr && jwtToken) {
            //  cookie exist, restore user info
            const userInfo = userInfoStr
            const jwt_payload : JwtPayload = jwt_decode(jwtToken) 


            setUserProfile({
                ...userProfile,
                username: jwt_payload.sub,
                hashPw: userInfo.hashPw,
                token: jwtToken,
                jwtPayload: jwt_payload
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
