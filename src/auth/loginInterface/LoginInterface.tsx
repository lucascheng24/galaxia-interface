import { useContext, useReducer } from 'react';
import { Grid, TextField } from '@mui/material';
import { Button, Image } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import './LoginInterface.css';
import '../../commonLibrary/Common.css';
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from 'react-router-dom';
import { LOGININTERFACE_PAGEMODE_TYPE } from './LoginInterfaceType';
import login_request, { LoginRequest, RegisterRequest, register_request } from './LoginApi';
import { Role } from '../../commonLibrary/userClass';
import { useAuth } from '../UserProfileContext';


//  define state object
interface stateInterface {
  page: string,
  page_mode: LOGININTERFACE_PAGEMODE_TYPE,
  loginInput: {
    username?: string
    emailAddress?: string,
    password?: string,
    rePassword?: string
  },

  inputErrorMessage: {
    username?: string
    emailAddress?: string,
    password?: string,
    rePassword?: string
  }

}

//  define initial state
const initialState: stateInterface = {
  page: 'Login Interface',
  page_mode: LOGININTERFACE_PAGEMODE_TYPE.default,
  loginInput: {},
  inputErrorMessage: {},
}

//  define action type
const enum actionType {
  CHANGE_PAGE,
  CHANGE_PAGE_MODE,
  ONCHANGE_LOGININPUT,
  UPDATE_LOGININPUT_ERROR_MESSAGE,
}

//  define action class
type actionClass = {
  type: actionType.CHANGE_PAGE,
  value: string //  page
} | {
  type: actionType.CHANGE_PAGE_MODE,
  value: LOGININTERFACE_PAGEMODE_TYPE //  page_mode
} | {
  type: actionType.ONCHANGE_LOGININPUT,
  key: keyof stateInterface['loginInput'] ,
  value?: string
} | {
  type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE,
  key: keyof stateInterface['inputErrorMessage'] ,
  value?: string
}

//  reducer to handle state by different actions
const reducer = (state = initialState, action: actionClass) => {
  switch (action.type) {
    case actionType.CHANGE_PAGE:
      return state;
    case actionType.CHANGE_PAGE_MODE:
      return {
        ...state,
        page_mode: action.value,
        loginInput: {},  //  initial the input whenever change page mode
        inputErrorMessage: {}
      }
    case actionType.ONCHANGE_LOGININPUT:
      return {
        ...state,
        loginInput: {
          ...state.loginInput,
          [action.key]: action.value
        }
      }
    case actionType.UPDATE_LOGININPUT_ERROR_MESSAGE:
      return {
        ...state,
        inputErrorMessage: {
          ...state.inputErrorMessage,
          [action.key]: action.value
        }
      }
    default:
      return state;
  }
};




const LoginInterface = (props: any) => {

  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useAuth();

  // console.log('userProfile?.username: ', userProfile?.username)

  const [state, dispatch] = useReducer(reducer, initialState);


  const request_LoginAccount = async () => {
    //  call api '/login'

    const username = state.loginInput.username?.trim();
    const password = state.loginInput.password?.trim();


    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'username', value: undefined})
    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'password', value: undefined})

    if (username && password) {

      var requestBody: LoginRequest = {
        username: username, 
        password: password, 
        rememberMe: false
      }
      //  send api
      login_request(requestBody).then(response => {
        // console.log("login_request-res: ", response);
        const hasAuthorization = response.headers['authorization']!! ?? false;

        if (response.status === 200 && hasAuthorization) {
          const authToken = response.headers['authorization']?? undefined

          setUserProfile({
            ...userProfile,
            username: username,
            token: authToken
          });

        } else {
          console.log('http status ', response.status)
          console.log('http response', response)
        }
      }).catch(error => {
        console.log(error)
      })

    } else {
      if (!username) {
        dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'username', value: 'Please enter username'})
      }
      if (!password) {
        dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'password', value: 'Please enter password'})
      }
    }
  }



  const request_RegisterAccount = () => {
    //  call api '/sign-up'

    const username = state.loginInput.username?.trim();
    const emailAddress = state.loginInput.emailAddress?.trim();
    const password = state.loginInput.password?.trim();
    const rePassword = state.loginInput.rePassword?.trim();

    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'username', value: undefined})
    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'emailAddress', value: undefined})
    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'password', value: undefined})
    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'rePassword', value: undefined})

    if ((username && password && emailAddress) && (password === rePassword)) {

      var requestBody: RegisterRequest = {
        userName: username, 
        password: password, 
        role: Role.USER,
        fullName: emailAddress
      }
      //  send api
      register_request(requestBody)

    } else {
      if (!username) {
        dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'username', value: 'Please enter user name'})
      }
      if (!emailAddress) {
        dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'emailAddress', value: 'Please enter email address'})
      }
      if (!password) {
        dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'password', value: 'Please enter password'})
      }
      if (password !== rePassword) {
        dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'rePassword', value: 'Please enter password same as previous one'})
      }
    }
  }


  const onChange_RePassword = (rePassword: string) => {
    dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'rePassword', value: rePassword})
    dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'rePassword', value: undefined})


    const password = state.loginInput.password;

    if (password !== rePassword) {
      dispatch({ type: actionType.UPDATE_LOGININPUT_ERROR_MESSAGE, key: 'rePassword', value: 'Please enter password same as previous one'})
    }
  } 


  return (
    <Container>
      <Grid item xs={12} className="leftOverlay">
        {/* default UI */}
        { state.page_mode === LOGININTERFACE_PAGEMODE_TYPE.default &&
          <div>
            <Image src={logo} className="logo" alt="Logo"/>
            <Button className='buttonLogin' 
              onClick={() => dispatch({type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.login})}
            >Login</Button>

            <Button className='buttonRegister'
              onClick={() => dispatch({type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.register})}
            >Register</Button>

          </div>
        }

        {/* login UI  */}
        { state.page_mode === LOGININTERFACE_PAGEMODE_TYPE.login &&
          <div>
            <Image src={logo} className="logo-2" alt="Logo"/>
            <Grid className='TitleText-1'>
              Sign In
            </Grid>
            <Grid className='TitleText-2'>
              sign in and start connect with friends
            </Grid>
            <Grid>
              <TextField 
                className='inputField'
                id="outlined-basic-login-email" 
                label="User Name" 
                size='small'
                margin='normal'
                error={state.inputErrorMessage.username ? true : false}
                helperText={state.inputErrorMessage.username??``}
                value={state.loginInput.username}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'username', value: e.target.value})}
                sx={{
                  backgroundColor: '#0A2478',
                  color: '#FFFFFF',
                  borderWidth: '0',
                  borderRadius:'0.5rem',
                  width: '280px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                    fontSize: '0.9rem',
                  },
                }}
                inputProps={{
                  sx: {
                    color: 'white',
                    paddingLeft: '15px',
                    fontSize: '0.9rem',
                  },
                }}
                variant='filled'
              />
              <TextField  
                className='inputField'
                id="outlined-basic-login-pw" 
                label="Password" 
                type={'password'}
                size='small'
                error={state.inputErrorMessage.password ? true : false}
                helperText={state.inputErrorMessage.password??``}
                value={state.loginInput.password}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'password', value: e.target.value})}
                sx={{
                  backgroundColor: '#0A2478',
                  color: '#FFFFFF',
                  borderWidth: '0',
                  borderRadius:'0.5rem',
                  width: '280px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                    fontSize: '0.9rem',
                  },
                }}
                inputProps={{
                  sx: {
                    color: 'white',
                    paddingLeft: '15px',
                    fontSize: '0.9rem',
                  },
                }}
                variant='filled'
              />
            </Grid>
            <Grid className='standard-small-font font-black' hidden>
              <div>email address: {state.loginInput.emailAddress} </div>
              <div>password: {state.loginInput.password} </div>
            </Grid>
            <Grid font-black>
              <Button className='buttonLogin-2'
                onClick={() => request_LoginAccount()}
              >Login</Button>

              <Link className='standard-small-font' to={''}
                onClick={() => dispatch({ type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.register })}
              >Register</Link>
            </Grid>
          </div>
        }



        {/* register UI  */}
        { state.page_mode === LOGININTERFACE_PAGEMODE_TYPE.register &&
          <div>
            <Image src={logo} className="logo-2" alt="Logo"/>
            <Grid className='TitleText-1'>
              Register
            </Grid>
            <Grid className='TitleText-2'>
              sign in and start connect with friends
            </Grid>
            <Grid>
              <TextField 
                id="outlined-basic-login-email" 
                label="User Name" 
                variant="filled" 
                size='small'
                margin='normal'
                error={state.inputErrorMessage.username ? true : false}
                helperText={state.inputErrorMessage.username??``}
                value={state.loginInput.username}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'username', value: e.target.value})}
                sx={{
                  backgroundColor: '#0A2478',
                  color: '#FFFFFF',
                  borderWidth: '0',
                  borderRadius:'0.5rem',
                  width: '280px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                    fontSize: '0.9rem',
                  },
                }}
                inputProps={{
                  sx: {
                    color: 'white',
                    paddingLeft: '15px',
                    fontSize: '0.9rem',
                  },
                }}
              />
              <TextField 
                id="outlined-basic-register-email" 
                label="Email address" 
                variant="filled" 
                size='small'
                error={state.inputErrorMessage.emailAddress ? true : false}
                helperText={state.inputErrorMessage.emailAddress??``}
                value={state.loginInput.emailAddress}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'emailAddress', value: e.target.value})}
                sx={{
                  backgroundColor: '#0A2478',
                  color: '#FFFFFF',
                  borderWidth: '0',
                  borderRadius:'0.5rem',
                  width: '280px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                    fontSize: '0.9rem',
                  },
                }}
                inputProps={{
                  sx: {
                    color: 'white',
                    paddingLeft: '15px',
                    fontSize: '0.9rem',
                  },
                }}
              />
              <TextField  
                id="outlined-basic-register-pw" 
                label="Password" 
                variant="filled"
                type={'password'}
                size='small'
                margin='normal'
                error={state.inputErrorMessage.password ? true : false}
                helperText={state.inputErrorMessage.password??``}
                value={state.loginInput.password}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'password', value: e.target.value})}
                sx={{
                  backgroundColor: '#0A2478',
                  color: '#FFFFFF',
                  borderWidth: '0',
                  borderRadius:'0.5rem',
                  width: '280px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                    fontSize: '0.9rem',
                  },
                }}
                inputProps={{
                  sx: {
                    color: 'white',
                    paddingLeft: '15px',
                    fontSize: '0.9rem',
                  },
                }}
              />
              <TextField  
                id="outlined-basic-register-repw" 
                label="Re-Password" 
                variant="filled"
                type={'password'}
                size='small'
                error={state.inputErrorMessage.rePassword ? true : false}
                helperText={state.inputErrorMessage.rePassword??``}
                value={state.loginInput.rePassword}
                onChange = {(e) => onChange_RePassword(e.target.value)}
                sx={{
                  backgroundColor: '#0A2478',
                  color: '#FFFFFF',
                  borderWidth: '0',
                  borderRadius:'0.5rem',
                  width: '280px',
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                    fontSize: '0.9rem',
                  },
                }}
                inputProps={{
                  sx: {
                    color: 'white',
                    paddingLeft: '15px',
                    fontSize: '0.9rem',
                  },
                }}
              />
            </Grid>
            <Grid className='standard-small-font font-black' hidden>
              <div>email address: {state.loginInput.emailAddress} </div>
              <div>password: {state.loginInput.password} </div>
              <div>re-password: {state.loginInput.rePassword} </div>
            </Grid>
            <Grid font-black>
              <Button className='buttonLogin-2'
                onClick={() => request_RegisterAccount()}
              >Register</Button>

              {/* <Link className='standard-small-font' to={''}
                onClick={() => dispatch({ type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.register })}
              >Register</Link> */}
            </Grid>
          </div>
        }
        
      </Grid>
      <Grid item xs={0}><div style={{height: '100vh'}} onClick={() => navigate(-1)}></div></Grid>
    </Container>    
  );
}

export default LoginInterface;