import React from 'react';
// import logo from './';
import './App.css';
import './auth/loginInterface/LoginInterface'
import { Button, Card, Container } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import LoginInterface from './auth/loginInterface/LoginInterface';
import PlanetSimulationPage from './plantSimulation/PlanetSimulationPage'
import Layout from './Layout';
import Home from './homePage/Home';
import cover_threeSolar from './picture/cover_threeSolar.png'
import { AuthContextProvider, useAuth } from './auth/UserProfileContext';
import { ResponseInterceptor } from './commonLibrary/interceptors/ResponseInterceptor';
import { RequestInterceptor } from './commonLibrary/interceptors/RequestInterceptor';
import { LoginRequest, logout_request } from './auth/loginInterface/LoginApi';
import { Grid } from '@mui/material';
import BasicOperationLayer from './basicOperationLayer/BasicOperationLayer';


const App = () => {

  const myStyle_backgroundImage = {
    backgroundImage: `url(${cover_threeSolar})`,
    backgroundPosition: 'center',
    height:'100vh',
    width: '100vw',
    // marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: '#FFFFFF'
  };

  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useAuth();
  

  return (
    <div className="App" style={myStyle_backgroundImage}>
      <AuthContextProvider>
        <RequestInterceptor>
          <ResponseInterceptor>
            <BasicOperationLayer>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/LoginInterface" element={<LoginInterface />} />
                {/* <Route path="/test" element={<Test />}></Route> */}
                {/* <Route index element={<div className='App-Title'>這是首頁</div>}></Route> */}
                {/* <Route path="*" element={<NotFound />}></Route> */}
              </Routes>

            </BasicOperationLayer>
            
          </ResponseInterceptor>
        </RequestInterceptor>
      </AuthContextProvider>
    </div>
  );
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}

//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Layout />}>
//               <Route index element={<Home />} />
//               <Route path="blogs" element={<PlantSimulationPage/>} />
//               {/* <Route path="contact" element={} />
//               <Route path="*" element={} /> */}
//             </Route>
//           </Routes>
//         </BrowserRouter>
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         {/* <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//       </header>
//       <Card>
//         <Card.Header>
//           <Button onClick={() => <PlantSimulationPage/>}>Plant Simulation</Button>
//         </Card.Header>
//         <Card.Body>
//           <LoginInterface/> 
          
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

export default App;
