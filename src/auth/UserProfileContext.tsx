import { createContext, FC, ReactNode, useState, useContext, useEffect } from "react";
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

    useEffect(() => {
        console.log("UPDATE - userProfile:", userProfile)
    }, [userProfile])

    return (
        <AuthContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
