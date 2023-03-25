import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import App from '../App'


const PlantSimulationPage = () => {
    return(
        <Card>
            <CardHeader>
                <Button onClick={App}>Back</Button>
            </CardHeader>
            <Card.Body>
                {/* add the MainScene.js here */}

            </Card.Body>
            
        </Card>
    );
}

export default PlantSimulationPage;