import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import background_image from '../Components/assests/background.png';
import Container from "react-bootstrap/Container";
const Main = () =>{
    return(
        <>  
            <Card className="bg-dark text-white main mb-5">
            <Card.Img src={background_image} alt="Card image" />
                <Card.ImgOverlay>
                    <Container>
                    <Card.Text style={{"fontSize":"50px","fontWeight":"700",paddingTop:"7%"}}>
                    Voice Based Management <br/> System - A true innovation <br/> for Email management
                    </Card.Text>
                    <div  >
                        <Button variant="light" className='px-5' style={{color:'#0065C2',fontWeight:"700"}} href='/login'>Login</Button>{' '}
                    </div>
                    </Container>
                </Card.ImgOverlay>
            </Card>
        </>
    )
}

export default Main;
