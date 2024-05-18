import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Pic1 from '../Components/assests/background.png';
//import Pic2 from '../Components/assests/image2.png';
//import Pic3 from '../Components/assests/image3.png';


function AutoLayoutExample() {
  return (
    <Container className='mb-5'>
        <center className='mb-5'><h1 style={{"fontSize":"32px","fontWeight":"500"}}>Team</h1></center>
      <Row className='mb-5'>
        <Col><Image src={Pic1} style={{width:"300px",height:"300px"}} roundedCircle /></Col>
        <Col><Image src={Pic1}   style={{width:"300px",height:"300px"}}roundedCircle /></Col>
        <Col><Image src={Pic1}  style={{width:"300px",height:"300px"}} roundedCircle /></Col>
      </Row>
      <Row className='mb-5'>
        <Col><center style={{paddingLeft:"150px"}}><Image src={Pic1} style={{width:"300px",height:"300px"}} roundedCircle /></center></Col>
        <Col><center style={{paddingRight:"250px"}}><Image src={Pic1} style={{width:"300px",height:"300px"}} roundedCircle /></center></Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;