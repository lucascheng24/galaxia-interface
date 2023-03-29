import React, { useReducer } from 'react';
import { Grid, Input } from '@mui/material';
import { Card, Button, Image } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import './LoginInterface.css';
import logo from "../../assets/logo2.png";


interface stateInterface {
  page: string,
  page_mode: 'default' | 'login' | 'register',

}

const initialState: stateInterface = {
  page: 'Login Interface',
  page_mode: 'default'
}

const enum actionType {
  CHANGE_PAGE,
  CHANGE_PAGE_MODE,
}

type actionClass = {
  type: actionType.CHANGE_PAGE,
  value: string //  page
} | {
  type: actionType.CHANGE_PAGE_MODE,
  value: 'default' | 'login' | 'register' //  page_mode
}

const reducer = (state = initialState, action: actionClass) => {
  switch (action.type) {
    case actionType.CHANGE_PAGE:
      return state;
    case actionType.CHANGE_PAGE_MODE:
      return {
        ...state,
        page_mode: action.value
      }
    default:
      return state;
  }
};




const LoginInterface = (props: any) => {


  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <Container>
      <div className="leftOverlay">
        <Image src={logo} className="logo" alt="Logo"/>
        <Button className='buttonLogin'>Login</Button>
        <Button className='buttonRegister'>Register</Button>
      </div>
    </Container>

    /* <Container>
       <Row>
         <Col sm={2}>
           <div className='common-PlainText'>
             {
              // <in>
              // <Input> 
             } 
           </div>
         </Col>

         <Col sm={6}>
           <div className='common-PlainText'>col 2</div>
         </Col>

         <Col sm={4}>
           <div className='common-PlainText'>col 3</div>
         </Col>
       </Row>

     </Container>
     <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

       <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
       <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

       <div className="d-flex justify-content-between mx-3 mb-4">
         <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
         <a href="!#">Forgot password?</a>
       </div>

       <MDBBtn className="mb-4">Sign in</MDBBtn>

       <div className="text-center">
         <p>Not a member? <a href="#!">Register</a></p>
         <p>or sign up with:</p>

         <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
             <MDBIcon fab icon='facebook-f' size="sm"/>
           </MDBBtn>

           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
             <MDBIcon fab icon='twitter' size="sm"/>
           </MDBBtn>

           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
             <MDBIcon fab icon='google' size="sm"/>
           </MDBBtn>

           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
             <MDBIcon fab icon='github' size="sm"/>
           </MDBBtn>

         </div>
       </div>

     </MDBContainer>*/

    
  );
}

export default LoginInterface;