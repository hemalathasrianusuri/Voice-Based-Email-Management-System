import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import image1 from "../Components/assests/customize.png";
import image2 from "../Components/assests/inbox.png";
import image3 from "../Components/assests/starred.png";
import image4 from "../Components/assests/snoozed.png";
import image5 from "../Components/assests/sent.png";
import image6 from "../Components/assests/drafts.png";
import image7 from "../Components/assests/important.png";
import image8 from "../Components/assests/all mails.png";
import image9 from "../Components/assests/spam.png";
import image10 from "../Components/assests/bin.png";
import image11 from '../Components/assests/categories.png';
import Button from 'react-bootstrap/Button';

function DefaultExample() {
  return (
   
        <Row>
            <Col lg={2}>
              <ListGroup>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image1} style={{padding:"10px", paddingLeft:"20px"}}></img> Compose</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image2} style={{padding:"10px", paddingLeft:"20px"}}></img>Inbox</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image3}style={{padding:"10px", paddingLeft:"20px"}}></img>Starred</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image4}style={{padding:"10px", paddingLeft:"20px"}}></img>Snoozed</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image5}style={{padding:"10px", paddingLeft:"20px"}}></img>Sent</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image6}style={{padding:"10px", paddingLeft:"20px"}}></img>Drafts</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image7}style={{padding:"10px", paddingLeft:"20px"}}></img>Important</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image8}style={{padding:"10px", paddingLeft:"20px"}}></img>All Mail</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image9}style={{padding:"10px", paddingLeft:"20px"}}></img>Spam</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image10}style={{padding:"10px", paddingLeft:"20px"}}></img>Bin</ListGroup.Item>
                  <ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image11}style={{padding:"10px", paddingLeft:"20px"}}></img>Categories</ListGroup.Item> 
              </ListGroup>
            </Col>
            <Col>
              {/* <img src={image1} style={{width:"300px",height:"300px"}} roundedCircle /> */}
              <center style={{paddingTop:"50px"}} ><div style={{width:"90px",height:"90px", borderRadius:"50%",backgroundColor:"#0065C2", color:"white",padding:"30px"}}><Image src={image1} style={{width:"22px", height:"22px"}} /></div>
              <p  style={{fontSize:"36px", color:"#646464",fontWeight:"650", paddingTop:"10px"}}>Compose</p>
              <p style={{fontSize:"23px", color:"#646464",fontWeight:"400", paddingLeft:"50px", paddingRight:"50px", paddingTop:"10px"}}> Voice or speaker recognition is the ability of a machine or program to receive and interpret dictation or to understand and perform spoken commands. Voice recognition has gained prominence and use with the rise of artificial intelligence AI and intelligent assistants, such as Amazon's Alexa and Apple's Siri. <br/> Voice recognition systems let consumers interact with technology simply by speaking to it, enabling hands-free requests, reminders and other simple tasks. </p>
              <div style={{paddingTop:"40px"}}>
                <Button  className='px-5' style={{color:'white',fontWeight:"600", background:"#0065C2", padding:"10px"}} href='/login'> Get Started</Button>
              </div>
              </center>
            </Col>
        </Row>
   
  );
}

export default DefaultExample;