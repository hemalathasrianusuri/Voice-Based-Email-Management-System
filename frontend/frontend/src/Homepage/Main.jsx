import React from 'react';
import './Main.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from "./Card.jsx";
import Image1 from "../Components/assests/home-icon.png";
import Content from './Content.jsx';
import Features from './Features.jsx';
import Team from './Team.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useQuery } from 'react-query'; 
import { useNavigate } from 'react-router-dom';


const Main = () =>{
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        if (!initialFetchDone) {
            axios.post('http://127.0.0.1:8000/api/handle_speech_input/')
                .then(response => {
                    console.log(response.data);
                    const pageToRedirect = response.data.page_to_open;
                    if (pageToRedirect) {
                        // Redirect to the page determined from the backend
                        navigate(pageToRedirect);
                    }
                    setInitialFetchDone(true);
                })
                .catch(error => {
                    console.error('Error calling text_to_speech function:', error);
                });
        }
    }, [initialFetchDone, navigate]);

    return(
        <>  
        <Container>
            <Navbar className="" >
                <Navbar.Brand  style={{color: "#0065C2",fontWeight:"700"}}><img src={Image1} style={{"padding":"5px"}} alt='icon'></img> VBEMS</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end " >
                    {/* <div className='px-3'>
                <Button variant="outline-primary" href='/signup' className='px-4'>SignUp</Button>
                </div> */}
                <div className='px-3'>
                    <Button  variant="outline-primary" href='/login' className='px-4' >Login</Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </Container>
        <Card/>
        <Content/>
        <Features/>
        <Team/>
        <Container fluid style={{backgroundColor:"black", color:"white"}}>
            <center><p style={{padding:"10px"}}>CopyRights reserved by VBEMS</p></center>
        </Container>
        
      </>
    )
}

export default Main;



