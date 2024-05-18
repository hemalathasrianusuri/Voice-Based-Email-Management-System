import React from 'react';
//import Grid from 'your-chosen-grid-library'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import mailcomp1 from "../Components/assests/grayinbox.png";
//import mailcomp2 from "../Components/assests/star32.png";
import star from "../Components/assests/star.png";
import Container from "react-bootstrap/esm/Container";
//import Card from 'react-bootstrap/Card';// Replace with the actual import


function MyGrid() {
  return (
    <div style={{paddingTop:"15px", display:"flex"}}>
                        <Container> 
                        <Row className="row-cols-1 row-cols-md-auto g-0">
                            <Col className="px-0">
                                <Image src={mailcomp1} style={{width:"22px", height:"22px", color:"#646464",marginRight:"20px"}}/> 
                            </Col>
                            <Col lg={10} className="d-flex align-items-center">
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginLeft:"10px"}}> Primary</p>
                            </Col>
                        </Row>
                        <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                            <Col sm={2}> 
                                <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                            </Col>
                            <Col lg={10} className="d-flex align-items-center">
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginLeft:"32px"}}><span style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginRight:"31px"}}>Figma</span>   Your figma file is ready to design.. <span style={{color:"#646464",fontSize:"14px", fontWeight:"600", marginLeft:"10", marginRight:"20px"}}> -Here we go your first design is upto go get started </span>   06/01/2024</p>
                            </Col>
                        </Row>
                        <Row className="row-cols-1 row-cols-md-auto g-0" style={{ marginTop: "-15px" }}>
                            <Col sm={2}> 
                                <Image src={star} style={{width:"19px", height:"19px", color:"#B9B9B9"}}/> 
                            </Col>
                            <Col lg={10} className="d-flex align-items-center">
                                <p style={{color:"#B9B9B9",fontSize:"18px", fontWeight:"600", marginLeft:"32px"}}><span style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginRight:"15px"}}>ChatGpt </span>  Here is your recent search of tec.. <span style={{color:"#B9B9B9",fontSize:"14px", fontWeight:"600", marginLeft:"10", marginRight:"23px"}}> -Here we go your first design is upto go get started </span>Dec 29</p>
                            </Col>
                        </Row>
                        <Row className="row-cols-1 row-cols-md-auto g-0" style={{ marginTop: "-10px" }}>
                            <Col sm={2}> 
                                <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                            </Col>
                            <Col lg={10} className="d-flex align-items-center">
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginLeft:"32px"}}><span style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginRight:"24px"}}>Google</span> Your google account is recover.. <span style={{color:"#646464",fontSize:"14px", fontWeight:"600", marginLeft:"10", marginRight:"34px"}}> -Here we go your first design is upto go get started </span>Dec 25</p>
                            </Col>
                        </Row>
                        <Row className="row-cols-1 row-cols-md-auto g-0" style={{ marginTop: "-10px" }}>
                            <Col sm={2}> 
                                <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                            </Col>
                            <Col lg={10} className="d-flex align-items-center">
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginLeft:"32px"}}><span style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginRight:"16px"}}>Amazon</span> Your order has been shipped.. <span style={{color:"#646464",fontSize:"14px", fontWeight:"600", marginLeft:"10", marginRight:"49px"}}> -Here we go your first design is upto go get started </span>Dec 20</p>
                            </Col>
                        </Row>
                        <Row className="row-cols-1 row-cols-md-auto g-0" style={{ marginTop: "-10px" }}>
                            <Col sm={2}> 
                                <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                            </Col>
                            <Col lg={10} className="d-flex align-items-center">
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginLeft:"32px"}}><span style={{color:"#646464",fontSize:"18px", fontWeight:"600", marginRight:"25px"}}>Flipkart</span>Year end season sale ends today.. <span style={{color:"#646464",fontSize:"14px", fontWeight:"600", marginLeft:"10", marginRight:"23px"}}> -Here we go your first design is upto go get started </span>Dec 18</p>
                            </Col>
                        </Row>
                        </Container>
                    </div>

  );
  }

export default MyGrid;