import { useReducer } from 'react';
import { Grid, TextField } from '@mui/material';
import { Button, Image } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import './LoginInterface.css';
import '../../commonLibrary/Common.css';
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from 'react-router-dom';
import { LOGININTERFACE_PAGEMODE_TYPE } from './LoginInterfaceType';


//  define state object
interface stateInterface {
  page: string,
  page_mode: LOGININTERFACE_PAGEMODE_TYPE,
  loginInput: {
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

}

//  define action type
const enum actionType {
  CHANGE_PAGE,
  CHANGE_PAGE_MODE,
  ONCHANGE_LOGININPUT,
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
}

//  reducer to handle state by different actions
const reducer = (state = initialState, action: actionClass) => {
  switch (action.type) {
    case actionType.CHANGE_PAGE:
      return state;
    case actionType.CHANGE_PAGE_MODE:
      return {
        ...state,
        page_mode: action.value
      }
    case actionType.ONCHANGE_LOGININPUT:
      return {
        ...state,
        loginInput: {
          ...state.loginInput,
          [action.key]: action.value
        }
      }
    default:
      return state;
  }
};




const LoginInterface = (props: any) => {

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <Container>
      <Grid item xs={4} className="leftOverlay">
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
            <Grid>
              Sign In
            </Grid>
            <Grid className='standard-small-font font-black'>
              sign in and start connect with friends
            </Grid>
            <Grid>
              <TextField 
                id="outlined-basic" 
                label="Email address" 
                variant="outlined" 
                value={state.loginInput.emailAddress}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'emailAddress', value: e.target.value})}
              />
              <TextField  
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                type={'password'}
                value={state.loginInput.password}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'password', value: e.target.value})}
              />
            </Grid>
            <Grid className='standard-small-font font-black'>
              <div>email address: {state.loginInput.emailAddress} </div>
              <div>password: {state.loginInput.password} </div>
            </Grid>
            <Grid font-black>
              <Button className='buttonLogin-2' style={{'marginLeft': '4rem'}}
                onClick={() => dispatch({type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.login})}
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
            <Grid>
              Register
            </Grid>
            <Grid className='standard-small-font font-black'>
              sign in and start connect with friends
            </Grid>
            <Grid>
              <TextField 
                id="outlined-basic" 
                label="Email address" 
                variant="outlined" 
                value={state.loginInput.emailAddress}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'emailAddress', value: e.target.value})}
              />
              <TextField  
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                type={'password'}
                value={state.loginInput.password}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'password', value: e.target.value})}
              />
              <TextField  
                id="outlined-basic" 
                label="Re-Password" 
                variant="outlined"
                type={'password'}
                value={state.loginInput.rePassword}
                onChange = {(e) => dispatch({ type: actionType.ONCHANGE_LOGININPUT, key: 'rePassword', value: e.target.value})}
              />
            </Grid>
            <Grid className='standard-small-font font-black'>
              <div>email address: {state.loginInput.emailAddress} </div>
              <div>password: {state.loginInput.password} </div>
              <div>re-password: {state.loginInput.rePassword} </div>
            </Grid>
            <Grid font-black>
              <Button className='buttonLogin-2' style={{'marginLeft': '4rem'}}
                onClick={() => dispatch({type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.login})}
              >Register</Button>

              {/* <Link className='standard-small-font' to={''}
                onClick={() => dispatch({ type: actionType.CHANGE_PAGE_MODE, value: LOGININTERFACE_PAGEMODE_TYPE.register })}
              >Register</Link> */}
            </Grid>
          </div>
        }
        
      </Grid>
      <Grid item xs={8}><div style={{height: '100vh'}} onClick={() => navigate(-1)}></div></Grid>
    </Container>    
  );
}

export default LoginInterface;