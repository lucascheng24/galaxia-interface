import { Card, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo3.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Card>
        <Card.Body>
          <Image src={logo} className="logo" alt="Logo" style={{ float: "left", height: 100, marginTop: "200px", marginLeft: "20px" }} />
          <Link to="/LoginInterface" >
            <Button className="login-button common-cursor-pointer" aria-label="Login button" style={{ float: "left", marginLeft: "-40px", marginTop: "400px", padding: "10px", paddingRight:"60px", paddingLeft:"60px", borderRadius:"10px", borderWidth:"1px" }}>
              Click here to login
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
