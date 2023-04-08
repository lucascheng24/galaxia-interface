import { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UserProfileContext";
import { Grid } from "@mui/material";
import { Container, Button } from "react-bootstrap";
import { LoginRequest, logout_request } from "../auth/loginInterface/LoginApi";
import { InformationBox } from "../commonLibrary/InformationBox";

//  define state object
interface stateInterface {
    page: string,

}
  
//  define initial state
const initialState: stateInterface = {
    page: 'Basic',
}
  
//  define action type
const enum actionType {
    CHANGE_PAGE,
}
  
//  define action class
type actionClass = {
    type: actionType.CHANGE_PAGE,
    value: string //  page
}
  
//  reducer to handle state by different actions
const reducer = (state = initialState, action: actionClass) => {
    switch (action.type) {
        case actionType.CHANGE_PAGE:
            return state;
        default:
            return state;
    }
};

interface Props {
    children: ReactNode;
}


export const BasicOperationLayer: FC<Props> = ({ children }) => {
    
    const navigate = useNavigate();
    const { userProfile, setUserProfile } = useAuth();


    const request_LogoutAccount = () => {
        //  call api '/logout'
    
        const username = userProfile?.username;
        const password = userProfile?.token;
    
        if (username && password) {
          var requestBody: LoginRequest = {
            username: username, 
            password: password, 
            rememberMe: false
          }
          //  send api
          logout_request(requestBody)
        } else {
          console.log('logout error: miss element')
        }
    }
      

    return <>
        <Grid container>
            <Grid item xs={8} >
                <div>{children}</div>
            </Grid>
            <Grid item xs={4} className="basicLayer">
                <Grid container>
                    { 
                    userProfile?.username &&
                        <div>
                            <Grid item xs={12} style={{marginTop: '1rem'}}>
                                <InformationBox text={`Welcome ${userProfile?.username??`User`}`}/>
                            </Grid>
                            <Grid item xs={12} className="">
                                <Button className='buttonLogOut' 
                                    onClick={() => request_LogoutAccount}
                                >Logout</Button>
                            </Grid>

                        </div>
                        
                    }
                    
                    
                </Grid>
                <div className="full-height" onClick={() => navigate(-1)} />
            </Grid>
        </Grid>
    </>;
}

export default BasicOperationLayer;