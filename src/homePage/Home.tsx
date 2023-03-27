import { Card, Button, Image  } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    // return <h1><div style={{'color':'#FFFFFF'}}>Home</div></h1>;

    const navigate = useNavigate();

    return (
    <body>
    <div>
      <Card>
        <img src="../assets/logo3.png" alt="Logo" style={{ float: "left" }} />
        <Link to='/LoginInterface'>
          <Button className='login-button common-cursor-pointer'>Click here to login</Button>
        </Link>
      </Card>
    </div>
    </body>
    );
 
  };
  
  export default Home;