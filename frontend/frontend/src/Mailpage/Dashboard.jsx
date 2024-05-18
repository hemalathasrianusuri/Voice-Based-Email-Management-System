import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image1 from "../Components/assests/image3.png";
import { MailComp } from './MailComp';
//import List from "../Homepage/Listgroup";
//import Mailcomponents from './Mailcomponents';
// import Image from 'react-bootstrap/Image';
// import image1 from "../Components/assests/customize.png";




function DashAdmin() {
    return(
    <>
    <div className='bg-dark'>
        <Container >
        <Navbar className="" >
            <Navbar.Brand  style={{color: "white",fontWeight:"700"}}><img src={Image1}  alt='icon'></img> VBEMS</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {/* <div className='px-3'>
                    <Button variant="outline-light" href='/signup' className='px-4'>SignUp</Button>
                </div> */}
                <div className='px-3'>
                    <Button  variant="light" href='/' className='px-4' style={{color:"#0065C2", fontWeight:"600"}} >Logout</Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
        </Container>
    </div>
    {/* <List/> */}
    {/* <Mailcomponents/> */}
    <MailComp/>
    <Container fluid style={{backgroundColor:"black", color:"white"}}>
            <center><p style={{padding:"10px"}}>CopyRights reserved by VBEMS</p></center>
    </Container>
    </>
    )
}
export default DashAdmin;