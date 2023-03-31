import { createContext, FC, ReactNode, useState, useContext } from "react";
import { Role } from "../commonLibrary/userClass";


export interface userProfile {
    username?: string
    emailAddress?: string
    role?: Role
    token?: string
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
    const [userProfile, setUserProfile] = useState<userProfile | null>(null);

    return (
        <AuthContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// const AuthContext = createContext({
//     username: undefined,
//     emailAddress: undefined,
//     role: undefined,
//     token: undefined,
// });

// // @ts-ignore
// export const AuthContextProvider = ({children}) => {
//     const [authContext, setAuthContext] = useState(AuthContext);

//     const passingValue = {
//         authContext,
//         setAuthContext
//     }
  
//     return (
//       <AuthContext.Provider value={passingValue} >
//         {children}
//       </AuthContext.Provider>
//     );
// };
  
// export default AuthContext;
