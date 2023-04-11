import { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UserProfileContext";
import { Grid } from "@mui/material";
import { Container, Button } from "react-bootstrap";
import { LoginRequest, logout_request } from "../auth/loginInterface/LoginApi";
import { InformationBox } from "../commonLibrary/InformationBox";
import Cookies from "universal-cookie";
import { STORED_COOKIE_PATH } from "../commonLibrary/cookieClass";

//  define state object
interface stateInterface {
  page: string;
}

//  define initial state
const initialState: stateInterface = {
  page: "Basic",
};

//  define action type
const enum actionType {
  CHANGE_PAGE,
}

//  define action class
type actionClass = {
  type: actionType.CHANGE_PAGE;
  value: string; //  page
};

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
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useAuth();

  const request_LogoutAccount = () => {
    //  call api '/logout'

    console.log('trigger logout')
    const username = userProfile?.username;
    const password = userProfile?.token;

    if (username && password) {
      console.log('trigger logout - hv uName, pw')
      var requestBody: LoginRequest = {
        username: username,
        password: password,
        rememberMe: false,
      };
      //  send api
      logout_request().then((response) => {
        if (response.status === 200) {
          //  clear all the things
          cookies.remove(STORED_COOKIE_PATH.JWT);
          cookies.remove(STORED_COOKIE_PATH.User_Info);

          setTimeout(() => {
            setUserProfile({});
          }, 1000)
          
        }
      }).catch(error => {
        console.log('BasicOperationLayer > logout error', error)
      });
    } else {
      console.log("logout error: miss element");
    }
  };

  const removeJWT = () => {
    cookies.remove(STORED_COOKIE_PATH.JWT);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <div>{children}</div>
        </Grid>
        <Grid item xs={4} className="basicLayer">
          <Grid container>
            {userProfile?.username && (
              <div>
                <Grid item xs={12} style={{ marginTop: "1rem" }}>
                  <InformationBox
                    text={`Welcome ${userProfile?.username ?? `User`}`}
                  />
                </Grid>
                <Grid item xs={12} className="">
                    <Button
                      className="buttonLogOut"
                      onClick={() => request_LogoutAccount()}
                    > Logout</Button>

                    {/* <Button
                      className="buttonLogOut"
                      onClick={() => removeJWT()}
                    > remove jwt</Button> */}
                </Grid>
              </div>
            )}
          </Grid>
          <div className="full-height" onClick={() => navigate('/')} />
        </Grid>
      </Grid>
    </>
  );
};

export default BasicOperationLayer;
