import React,{Component} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import './MailComp.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/esm/Button';

import mailcomp1 from "../Components/assests/grayinbox.png";
import mailcomp2 from "../Components/assests/star32.png";
import mailcomp3 from "../Components/assests/snooze32.png";
import star from "../Components/assests/star.png";
import ystar from "../Components/assests/ystar24.png";
import Container from "react-bootstrap/esm/Container";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
//import grid from "./Grid";
import{ useState } from 'react';
import axios from 'axios';

function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return dateObject.toLocaleDateString('en-US',options);
}

export class MailComp extends Component{
    state={
        img: star,
        sender: "Figma",
        msg:"Your figma file is ready to design..",
        submsg:"-Here we go your first design is upto go get started",
        date:"06/01/2024",
        isLoading: false,
        recipient:'',
        subject:'',
        message_text:''
    }
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'compose', // Default to 'compose' tab
            emails: [],
            sentEmails: [],
            snoozedEmails: [],
            draftEmails: []
        };
    }

    handleTabClick = (tabName) => {
        this.setState({ currentTab: tabName });
    };

    // handleSendClick = () => {
    //     this.setState({ isLoading: true });

    //     // Replace '/your-api-endpoint' with the actual endpoint of your backend API
    //     axios.post('http://127.0.0.1:8000/api/SendEmail/')
    //     .then(response => {
    //         console.log('API response:', response.data);
    //         // Optionally handle success response
    //         this.setState({ isLoading: false });
    //     })
    //     .catch(error => {
    //         console.error('API error:', error);
    //         // Optionally handle error
    //         this.setState({ isLoading: false });
    //     });
    // };

    handleSendClick2 = () => {
        this.setState({ isLoading: true });

        // Replace '/your-api-endpoint' with the actual endpoint of your backend API
        axios.get('http://127.0.0.1:8000/api/GiveData/')
        .then(response => {
            console.log('API response:', response.data);
            // Optionally handle success response
            this.setState({
               recipient:response.data.reciever,
               subject:response.data.subject,
               message_text:response.data.message,
              });
        })
        .catch(error => {
            console.error('API error:', error);
            // Optionally handle error
            this.setState({ isLoading: false });
        });
    };
    componentDidMount() {
        this.fetchEmails();
        this.fetchSentEmails();
        this.fetchStarredEmails();
        this.fetchSnoozedEmails();
        this.fetchDraftEmails();
        if (this.state.currentTab == 'inbox') {
            this.fetchReadEmails();
        }
    }

    fetchReadEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/read_emails/');
            const fetchedReadEmails = response.data || [];
            // Update state with fetched read emails
            this.setState({ emails: fetchedReadEmails });
        } catch (error) {
            console.error('Error fetching read emails:', error);
        }
    };

    fetchEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fetch_emails/');
            // this.setState({ emails: response.data });
            // this.setState({ emails: fetchedEmails });
            // console.log('Response:', response.data);
            const fetchedEmails = response.data || []; // Ensure fetchedEmails is an array even if response.data is undefined
            // console.log('Setting emails state:', fetchedEmails);
            this.setState({ emails: fetchedEmails });
        } catch (error) {
            console.error('Error fetching emails:', error);
            //this.setState({ emails: [] });
        }
    };

    fetchSentEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fetch_sent_emails/');
            // console.log('Response:', response.data);
            const fetchedSentEmails = response.data || []; // Ensure fetchedSentEmails is an array even if response.data is undefined
            // console.log('Setting sent emails state:', fetchedSentEmails);
            this.setState({ sentEmails: fetchedSentEmails });
        } catch (error) {
            console.error('Error fetching sent emails:', error);
        }
    };

    fetchStarredEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fetch_starred_emails/');
            const fetchedStarredEmails = response.data || [];
            this.setState({ starredEmails: fetchedStarredEmails }); // Update state with fetched starred emails
        } catch (error) {
            console.error('Error fetching starred emails:', error);
        }
    };

    fetchSnoozedEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fetch_snoozed_emails/');
            const fetchedSnoozedEmails = response.data || [];
            this.setState({ snoozedEmails: fetchedSnoozedEmails }); // Update state with fetched snoozed emails
        } catch (error) {
            console.error('Error fetching snoozed emails:', error);
        }
    };

    fetchDraftEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fetch_draft_emails/');
            const fetchedDraftEmails = response.data || [];
            this.setState({ draftEmails: fetchedDraftEmails }); // Update state with fetched draft emails
        } catch (error) {
            console.error('Error fetching draft emails:', error);
        }
    };
    render(){
        const { currentTab } = this.state;
        const isLoading = this.state.isLoading;  // Define isLoading here
        const { recipient } = this.state;
        const {subject } = this.state;
        const { message_text } = this.state;

        let tabContent;
        switch (currentTab) {
            case 'inbox':
                tabContent = (
                    <div style={{ paddingTop: "15px", display: "flex" }}>
                        <Container>
                            {this.state.emails.map((email, index) => (
                                <div key={index} className="email-item">
                                    <div className="d-flex align-items-center justify-content-between g-0 mb-1">
                                        <Col className="px-2" >
                                            <Image src={email.starred ? star : ystar} style={{ width: "19px", height: "19px", color: "#646464" }} />
                                        </Col>
                                        <Col lg={4}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.sender}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.subject}</p>
                                            <p style={{ color: "#646464", fontSize: "17px", fontWeight: "499" }}>{email.snippet}</p>
                                        </Col>
                                        <Col lg={1}>
                                            <p style={{ color: "#646464", fontSize: "16px", fontWeight: "600" }}>{formatDate(email.date)}</p>
                                        </Col>
                                    </div>
                                    {index !== this.state.emails.length - 1 && <hr className="horizontal-line" />} {/* Render the <hr> except for the last email */}
                                </div>
                            ))}
                        </Container>
                    </div>
                );
                break;
            case 'starred': // Add case for starred tab
                tabContent = (
                    <div style={{ paddingTop: "15px", display: "flex" }}>
                        <Container>
                            {this.state.starredEmails.map((email, index) => ( // Map over starredEmails
                                <div key={index} className="email-item">
                                    <div className="d-flex align-items-center justify-content-between g-0 mb-1">
                                        <Col className="px-2">
                                            <Image src={email.starred ? star : ystar} style={{ width: "19px", height: "19px", color: "#646464" }} />
                                        </Col>
                                        <Col lg={4}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.sender}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.subject}</p>
                                            <p style={{ color: "#646464", fontSize: "17px", fontWeight: "499" }}>{email.snippet}</p>
                                        </Col>
                                        <Col lg={1}>
                                            <p style={{ color: "#646464", fontSize: "16px", fontWeight: "600" }}>{formatDate(email.date)}</p>
                                        </Col>
                                    </div>
                                    {index !== this.state.starredEmails.length - 1 && <hr className="horizontal-line" />}
                                </div>
                            ))}
                        </Container>
                    </div>
                );
                break;

            case 'snoozed': // Add case for snoozed tab
                tabContent = (
                    <div style={{ paddingTop: "15px", display: "flex" }}>
                        <Container>
                            {this.state.snoozedEmails.map((email, index) => (
                                <div key={index} className="email-item">
                                    <div className="d-flex align-items-center justify-content-between g-0 mb-1">
                                        <Col className="px-2">
                                            <Image src={email.starred ? star : ystar} style={{ width: "19px", height: "19px", color: "#646464" }} />
                                        </Col>
                                        <Col lg={4}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.sender}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.subject}</p>
                                            <p style={{ color: "#646464", fontSize: "17px", fontWeight: "499" }}>{email.snippet}</p>
                                        </Col>
                                        <Col lg={1}>
                                            <p style={{ color: "#646464", fontSize: "16px", fontWeight: "600" }}>{formatDate(email.date)}</p>
                                        </Col>
                                    </div>
                                    {index !== this.state.snoozedEmails.length - 1 && <hr className="horizontal-line" />}
                                </div>
                            ))}
                        </Container>
                    </div>
                );
                break;

            case 'sent':
                tabContent = (
                    <div style={{ paddingTop: "15px", display: "flex" }}>
                        <Container>
                            {this.state.sentEmails.map((sentEmail, index) => (
                                <div key={index} className="email-item">
                                    <div className="d-flex align-items-center justify-content-between g-0 mb-1">
                                        <Col className="px-2" >
                                            <Image src={sentEmail.starred ? star : ystar} style={{ width: "19px", height: "19px", color: "#646464" }} />
                                        </Col>
                                        <Col lg={4}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{sentEmail.recipient}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{sentEmail.subject}</p>
                                            <p style={{ color: "#646464", fontSize: "17px", fontWeight: "499" }}>{sentEmail.snippet}</p>
                                        </Col>
                                        <Col lg={1}>
                                            <p style={{ color: "#646464", fontSize: "16px", fontWeight: "600" }}>{formatDate(sentEmail.date)}</p>
                                        </Col>
                                    </div>
                                    {index !== this.state.sentEmails.length - 1 && <hr className="horizontal-line" />} {/* Render the <hr> except for the last email */}
                                </div>
                            ))}
                        </Container>
                    </div>
                );
                break;
            case 'drafts': // Add case for draft tab
                tabContent = (
                    <div style={{ paddingTop: "15px", display: "flex" }}>
                        <Container>
                            {this.state.draftEmails.map((email, index) => (
                                <div key={index} className="email-item">
                                    <div className="d-flex align-items-center justify-content-between g-0 mb-1">
                                        <Col className="px-2">
                                            {/* Assuming a draft icon */}
                                            {/* <Image src={draftIcon} style={{ width: "19px", height: "19px", color: "#646464" }} /> */}
                                            <Image src={email.starred ? star : ystar} style={{ width: "19px", height: "19px", color: "#646464" }} />
                                        </Col>
                                        <Col lg={4}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.sender}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>{email.subject}</p>
                                            <p style={{ color: "#646464", fontSize: "17px", fontWeight: "499" }}>{email.snippet}</p>
                                        </Col>
                                        <Col lg={1}>
                                            <p style={{ color: "#646464", fontSize: "16px", fontWeight: "600" }}>{formatDate(email.date)}</p>
                                        </Col>
                                    </div>
                                    {index !== this.state.draftEmails.length - 1 && <hr className="horizontal-line" />}
                                </div>
                            ))}
                        </Container>
                    </div>
                );
                break;

            case 'important':
                tabContent = (
                    <div>
                        
                    </div>
                );
                break;

            case 'allmail':
                tabContent = (
                    <div style={{paddingTop:"15px", display:"flex"}}>
                    <Container> 
                    <Row className="row-cols-1 row-cols-md-auto g-0">
                        <Col className="px-3">
                            <Image src={mailcomp1} style={{width:"22px", height:"22px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1} className="d-flex align-items-center">
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>All Mail</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Figma</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px", marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Your figma file is ready to design..</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Here we go your first design is upto go get started </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> 06/01/2024</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Iconscout</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Desifn assests for Canva,Figma..</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-customizable assests for your... </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> 06/01/2024</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>SBCollect</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Transaction alert from State Bank..</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Dear VASA GANGA KOTI NAGA MANI Thank you for.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> Jan 27</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>CBC-MIB</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>New India Samachar</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Having trouble reading this email? view it in your mobi.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 8</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>CDPC</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Fwd:Cognizent Associate Recruit..</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Hi all please find the forwarded email and go through.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 20</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>MyGov</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>National Youth Festival - 2024</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Having trouble reading this email? view it in your.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 13</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Overleaf</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Welcome to Overleaf..</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Hi, thanks for signing up to Overleaf.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> Jan 27</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Semrush</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>January product updates</p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Rank on Bing AI, discover social contents insights.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 10</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>QuillBot</p>
                        </Col>
                        <Col lg={4}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Don't miss quillbot university's.. </p>
                            </div>    
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Only a few slots are still available.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 10</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Youtube</p>
                        </Col>
                        <Col lg={9}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{background:"lightgray", width:"50px",height:"20px",alignItems:"center",borderRadius:"5px",marginTop:"-12px",marginRight:"5px"}}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-3px" }}>inbox</div>
                                </div>
                                <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Annual remainder about YouTube's Terms of Service,Community guidelines and..</p>
                            </div> 
                            
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 7</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Xplore</p>
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Aptroid assessment scheduled on 8-Jan@2:30 PM </p>
                        </Col>
                        <Col lg={4}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Hi candidate Greetings Aptroid written test.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}>Jan 5</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={2}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Hacker Rank Team</p>
                        </Col>
                        <Col lg={5}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>We challenge you to solve Power - Mod Power in P..</p>
                        </Col>
                        <Col lg={3}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Hi N181164 VASA GANGA KOTI..</p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> 12/31/2023</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={2}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>CSE Office RGUKTN</p>
                        </Col>
                        <Col lg={3.5}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>E4-Tentative time table</p>
                        </Col>
                        <Col lg={4.5}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Dear students, As per the directions i am here by sending.. </p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> 12/21/2023</p>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 row-cols-md-auto g-0 mb-1">
                        <Col className="px-3" > 
                            <Image src={star} style={{width:"19px", height:"19px", color:"#646464"}}/> 
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>Kaggle</p>
                        </Col>
                        <Col lg={6}>
                            <p style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>December 2023 Spotlight: New models on kaggle to check out</p>
                        </Col>
                        <Col lg={2}>
                            <p style={{color:"#646464",fontSize:"17px", fontWeight:"499"}}>-Hi VGANGA..</p>
                        </Col>
                        <Col lg={1}>
                            <p style={{color:"#646464",fontSize:"16px", fontWeight:"600"}}> 12/31/2023</p>
                        </Col>
                    </Row>
                    </Container>
                </div>
                    
                );
                break;

            case 'spam':
                tabContent = (
                    <div>
                        
                    </div>
                );
                break;

            case 'bin':
                tabContent = (
                    <div>
                        
                    </div>
                );
                break;

            case 'categories':
                tabContent = (
                    <div>
                        
                    </div>
                );
                break;
            case 'getstarted':
                tabContent = (
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="mt-3" style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>New Message</Form.Label>
                                <Form.Control type="email"value={recipient}  name="recipient" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Subject"  name="subject" value={subject}  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={10} placeholder="message_text" value={message_text}  />
                            </Form.Group>
                            <Row style={{ paddingTop: "5%" }}>
                            <Col lg={10}></Col>
                            <Col lg={2}>
                                <Button
                                    className='px-5 '
                                    style={{ color: 'white', fontWeight: "600", background: "#0065C2", padding: "10px" }}
                                    // onClick={this.handleSendClick}
                                    // Disable button when loading
                                >
                                Send
                                </Button>
                            </Col>
                        </Row>
                        </Form>

                        
                    </div>
                );
                break;
                  
            // case 'getstarted':
            //     tabContent = (
            //         <div>
            //             <Form>
            //                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            //                     <Form.Label className="mt-3" style={{ color: "#646464", fontSize: "18px", fontWeight: "600" }}>New Message</Form.Label>
            //                     <Form.Control type="email" placeholder="name@example.com" />
            //                 </Form.Group>
            //                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            //                     <Form.Control type="text" placeholder="Subject" onChange={(e) => this.setState({ subject: e.target.value })} />
            //                 </Form.Group>
            //                 <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            //                     <Form.Control as="textarea" rows={10} placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} />
            //                 </Form.Group>
            //             </Form>

            //             <Row style={{ paddingTop: "5%" }}>
            //                 <Col lg={10}></Col>
            //                 <Col lg={2}>
            //                     <Button
            //                         className='px-5 '
            //                         style={{ color: 'white', fontWeight: "600", background: "#0065C2", padding: "10px" }}
            //                         onClick={this.handleSendClick}
            //                         disabled={isLoading} // Disable button when loading
            //                     >
            //                         {isLoading ? 'Sending...' : 'Send'}
            //                     </Button>
            //                 </Col>
            //             </Row>
            //         </div>
            //     );
            //     break;
            
                // tabContent = (
                //     <div>
                //         <Form>
                //          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                //             <Form.Label className="mt-3" style={{color:"#646464",fontSize:"18px", fontWeight:"600"}}>New Message</Form.Label>
                //             <Form.Control type="email" placeholder="name@example.com" />
                //          </Form.Group>
                //          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                //             <Form.Control type="text" placeholder="Subject" />
                //          </Form.Group>
                //         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                //             <Form.Control as="textarea" rows={10} placeholder="Description" />
                //         </Form.Group>
                //         </Form>

                //        <Row style={{paddingTop:"5%"}}>
                //         <Col lg={10}>
                //          </Col>
                //         <Col lg={2}>
                //          <Button className='px-5 ' style={{color:'white',fontWeight:"600", background:"#0065C2", padding:"10px"}} >Send </Button>
                //         </Col>
                //        </Row>  
                //     </div>

                // );
                // break;
            // Add cases for other tabs as needed
            default:
                tabContent = (
                    <div>
                    <center style={{paddingTop:"50px"}} ><div style={{width:"90px",height:"90px", borderRadius:"50%",backgroundColor:"#0065C2", color:"white",padding:"30px"}}><Image src={image1} style={{width:"22px", height:"22px"}} /></div>
                    <p  style={{fontSize:"36px", color:"#646464",fontWeight:"650", paddingTop:"10px"}}>Compose</p>
                    <p style={{fontSize:"23px", color:"#646464",fontWeight:"400", paddingLeft:"50px", paddingRight:"50px", paddingTop:"10px"}}> Voice or speaker recognition is the ability of a machine or program to receive and interpret dictation or to understand and perform spoken commands. Voice recognition has gained prominence and use with the rise of artificial intelligence AI and intelligent assistants, such as Amazon's Alexa and Apple's Siri. <br/> Voice recognition systems let consumers interact with technology simply by speaking to it, enabling hands-free requests, reminders and other simple tasks. </p>
                    <div style={{paddingTop:"40px"}}>
                    <Button className='px-5' style={{color:'white', fontWeight:"600", background:"#0065C2", padding:"10px"}} onClick={() => {
    this.handleTabClick('getstarted');
    this.handleSendClick2();
}}>Get Started</Button>

                    </div>
                    </center>
                </div> 
            );
    }
        //             <div>
        //                 <center style={{paddingTop:"50px"}} ><div style={{width:"90px",height:"90px", borderRadius:"50%",backgroundColor:"#0065C2", color:"white",padding:"30px"}}><Image src={image1} style={{width:"22px", height:"22px"}} /></div>
        //                 <p  style={{fontSize:"36px", color:"#646464",fontWeight:"650", paddingTop:"10px"}}>Compose</p>
        //                 <p style={{fontSize:"23px", color:"#646464",fontWeight:"400", paddingLeft:"50px", paddingRight:"50px", paddingTop:"10px"}}> Voice or speaker recognition is the ability of a machine or program to receive and interpret dictation or to understand and perform spoken commands. Voice recognition has gained prominence and use with the rise of artificial intelligence AI and intelligent assistants, such as Amazon's Alexa and Apple's Siri. <br/> Voice recognition systems let consumers interact with technology simply by speaking to it, enabling hands-free requests, reminders and other simple tasks. </p>
        //                 <div style={{paddingTop:"40px"}}>
        //                     <Button  className='px-5' style={{color:'white',fontWeight:"600", background:"#0065C2", padding:"10px"}} onClick={() => this.handleTabClick('getstarted')}> Get Started</Button>
        //                 </div>
        //                 </center>
        //             </div> 
        //         );
        // }

        return(
            // <div >
            <Row>
            <Col lg={2}>
              <ListGroup className="list-group">
                  <ListGroup.Item onClick={() => this.handleTabClick('compose')} style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image1} style={{padding:"10px", paddingLeft:"20px"}}></img> Compose</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('inbox')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image2} style={{padding:"10px", paddingLeft:"20px"}}></img>Inbox</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('starred')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image3}style={{padding:"10px", paddingLeft:"20px"}}></img>Starred</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('snoozed')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image4}style={{padding:"10px", paddingLeft:"20px"}}></img>Snoozed</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('sent')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image5}style={{padding:"10px", paddingLeft:"20px"}}></img>Sent</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('drafts')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image6}style={{padding:"10px", paddingLeft:"20px"}}></img>Drafts</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('important')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image7}style={{padding:"10px", paddingLeft:"20px"}}></img>Important</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('allmail')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image8}style={{padding:"10px", paddingLeft:"20px"}}></img>All Mail</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('spam')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image9}style={{padding:"10px", paddingLeft:"20px"}}></img>Spam</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('bin')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image10}style={{padding:"10px", paddingLeft:"20px"}}></img>Bin</ListGroup.Item>
                  <ListGroup.Item onClick={() => this.handleTabClick('categories')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image11}style={{padding:"10px", paddingLeft:"20px"}}></img>Categories</ListGroup.Item> 
                  {/* <ListGroup.Item  onClick={() => this.handleTabClick('compose')} style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image1} className="px-3"style={{padding:"0px"}} alt=" compose "></img>Compose</ListGroup.Item>
                  <ListGroup.Item  onClick={() => this.handleTabClick('inbox')}style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image2} className="px-4" style={{padding:"0px"}} alt="Inbox "></img>Inbox</ListGroup.Item>
                  <button onClick={() => this.handleTabClick('starred')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image3} style={{padding:"10px"}} alt="Starred "></img> Starred</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('snoozed')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image4} style={{padding:"10px"}} alt="Snoozed"></img> Snoozed</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('sent')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image5} style={{padding:"10px"}}alt="Sent "></img> Sent</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('drafts')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image6} style={{padding:"10px"}} alt="Drafts "></img> Drafts</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('important')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image7} style={{padding:"10px"}} alt="Important "></img>Important</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('allmail')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image8} style={{padding:"10px"}} alt="All mail"></img> All Mail</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('spam')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image9} style={{padding:"10px"}} alt="Spma "></img> Spam</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('bin')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image10} style={{padding:"10px"}} alt="Bin "></img> Bin</ListGroup.Item></button>
                  <button onClick={() => this.handleTabClick('categories')}><ListGroup.Item style={{background:" #0065C2",color:"white",fontSize:"20px"}}><img src={image11} style={{padding:"10px"}} alt="Categories "></img> Categories</ListGroup.Item></button>  */}
              </ListGroup>
            </Col>
            <Col >
              {tabContent}
            </Col>

            </Row>
            // </div>
        )
    }
}