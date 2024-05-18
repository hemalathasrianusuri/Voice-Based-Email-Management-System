import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pic1 from '../Components/assests/image1.png';
import Pic2 from '../Components/assests/image2.png';
import Pic3 from '../Components/assests/image3.png';

function AutoLayoutExample() {
  return (
    <Container className='mb-5'>
      <center className='mb-5'><h1 style={{"fontSize":"32px","fontWeight":"500"}}>Features</h1></center>
      <Row className='mb-5'>
        <Col>
        <Card style={{ width: '19rem' , backgroundColor:"#0065C2"}}>
      <center><Card.Img variant="top" src={Pic1} style={{padding:"20px", width:"120px",height:"120px", marginTop:"20px"}} /></center>
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <center><Card.Text className='px-3 text-white' style={{fontSize:"20px",paddingBottom:"40px"}}>
        Send emails with secured interface that maintains high security
        </Card.Text></center>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </Col>
    <Col>
    <Card style={{ width: '19rem' , backgroundColor:"#0065C2"}}>
      <center><Card.Img variant="top" src={Pic2} style={{padding:"20px", width:"120px",height:"120px", marginTop:"20px"}} /></center>
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <center><Card.Text className='px-3 text-white' style={{fontSize:"20px",paddingBottom:"40px"}}>
        Collaborate with teams and friends with wide communication 
        </Card.Text></center>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </Col>
    <Col><Card style={{ width: '19rem' , backgroundColor:"#0065C2"}}>
      <center><Card.Img variant="top" src={Pic3} style={{padding:"20px", width:"120px",height:"120px", marginTop:"20px"}} /></center>
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <center><Card.Text className='px-3 text-white' style={{fontSize:"20px",paddingBottom:"40px"}}>
        Voice based management system is very helpful even for the blind 
        </Card.Text></center>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;