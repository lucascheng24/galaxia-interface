import React from 'react';
// import logo from './';
import './App.css';
import './auth/LoginInterface'
import { Button, Card } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import LoginInterface from './auth/LoginInterface';
import PlantSimulationPage from './plantSimulation/PlantSimulationPage'
import Layout from './Layout';
import Home from './homePage/Home';
import cover_threeSolar from './picture/cover_threeSolar.png'


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
  };

  return (
    <div className="App" style={myStyle_backgroundImage}>
      <Card>
        <Card.Title className='App-Title'>GALAXIA</Card.Title>
        <Card.Title className='App-Title'>CONNECT</Card.Title>
        <Button className='login-button'>Click here to login</Button>
      </Card>

      {/* <Card.Text>GALAXIA</Card.Text>
      <Card.Text>CONNECT</Card.Text> */}
      {/* <header className="App-header"> */}
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<PlantSimulationPage/>} />
            </Route>
          </Routes>
        </BrowserRouter> */}

        {/* <Card>
          <Card.Header>
            <Button onClick={() => <PlantSimulationPage/>}>Plant Simulation</Button>
          </Card.Header>
          <Card.Body>
            Something here
            <LoginInterface/> 
          </Card.Body>
        </Card> */}
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
