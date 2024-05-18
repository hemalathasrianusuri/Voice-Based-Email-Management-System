import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Content_image from "../Components/assests/Rectangle 10.png";

function AutoLayoutExample() {
  return (
    <Container className='mb-5'>
      <Row>
        <Col><h1 style={{color:"#646464",fontWeight:"700",fontSize:"32px"}} className='mb-3'>Email management through <br/>Voice!</h1><p style={{color:"#646464",fontWeight:"400",fontSize:"16px"}}>Voice or speaker recognition is the ability of a machine or program to receive and interpret dictation or to understand and perform spoken commands. Voice recognition has gained prominence and use with the rise of artificial intelligence (AI) and intelligent assistants, such as Amazon's Alexa and Apple's Siri.<br/>
Voice recognition systems let consumers interact with technology simply by speaking to it, enabling hands-free requests, reminders and other simple tasks.</p></Col>
        <Col><center><img src={Content_image} alt="" /></center></Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;