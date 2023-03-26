import { Grid } from '@mui/material';

const LoginInterface = (props: any) => {



  const as = () => {
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    // send the request
    xhr.send()
  }

  const qw = () => {
    fetch('/myserver.endpoint', {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        context: 'ascsac'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'token': 'xxx'
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data

        
       })
       .catch((err) => {
          console.log(err.message);
       });
  }


  



  return (
    <Grid container className='common-PlainText'>
      <Grid item xs={8} className='common-border-01'>
        <div>xs=8</div>
      </Grid>
      <Grid item xs={4} className='common-border-01'>
        <div>xs=4</div>
      </Grid>
      <Grid item xs={4} className='common-border-01'>
        <div>xs=4</div>
      </Grid>
      <Grid item xs={8} className='common-border-01'>
        <div>xs=8</div>
      </Grid>
    </Grid>
    // <Container>
    //   <Row>
    //     <Col sm={2}>
    //       <div className='common-PlainText'>
    //         {/* <in>
    //         </Input> */}
    //       </div>
    //     </Col>

    //     <Col sm={6}>
    //       <div className='common-PlainText'>col 2</div>
    //     </Col>

    //     <Col sm={4}>
    //       <div className='common-PlainText'>col 3</div>
    //     </Col>
    //   </Row>

    // </Container>
    // <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    //   <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
    //   <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

    //   <div className="d-flex justify-content-between mx-3 mb-4">
    //     <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
    //     <a href="!#">Forgot password?</a>
    //   </div>

    //   <MDBBtn className="mb-4">Sign in</MDBBtn>

    //   <div className="text-center">
    //     <p>Not a member? <a href="#!">Register</a></p>
    //     <p>or sign up with:</p>

    //     <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
    //       <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //         <MDBIcon fab icon='facebook-f' size="sm"/>
    //       </MDBBtn>

    //       <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //         <MDBIcon fab icon='twitter' size="sm"/>
    //       </MDBBtn>

    //       <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //         <MDBIcon fab icon='google' size="sm"/>
    //       </MDBBtn>

    //       <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //         <MDBIcon fab icon='github' size="sm"/>
    //       </MDBBtn>

    //     </div>
    //   </div>

    // </MDBContainer>
  );
}

export default LoginInterface;