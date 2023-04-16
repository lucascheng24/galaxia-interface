import { Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";
import { useAuth } from "../auth/UserProfileContext";

const Home = () => {

  const { userProfile } = useAuth();

  return (
    <div>
      <Card>
        <Card.Body>
          <Image src={logo} className="logo" alt="Logo" style={{ float: "left", height: 100, marginTop: "200px", marginLeft: "20px" }} />
          {
            !!!userProfile?.username && 
            <Link to="/LoginInterface" >
              <Button className="login-button common-cursor-pointer" aria-label="Login button" style={{ float: "left", marginLeft: "-40px", marginTop: "400px", padding: "10px", paddingRight:"60px", paddingLeft:"60px", borderRadius:"10px", borderWidth:"1px" }}>
                Click here to login
              </Button>
            </Link>
          }

          {
            userProfile?.username && 
            <div>
              <Card.Text>Success Login</Card.Text>
            </div>
          }
          
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
