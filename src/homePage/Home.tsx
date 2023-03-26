import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    // return <h1><div style={{'color':'#FFFFFF'}}>Home</div></h1>;

    const navigate = useNavigate();

    return (
    <div>
      <Card>
        <Card.Title className='App-Title'>GALAXIA</Card.Title>
        <Card.Title className='App-Title'>CONNECT</Card.Title>
          <Link to='/LoginInterface'>
           <Button className='login-button common-cursor-pointer'>Click here to login</Button>
          </Link>
      </Card>
    </div>);

  };
  
  export default Home;