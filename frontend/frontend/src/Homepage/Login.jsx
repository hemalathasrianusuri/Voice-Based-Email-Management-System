import React, { useEffect } from 'react';
import axios from 'axios';

const Signup = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [authenticateResponse, loginResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/login/'),
                    axios.get('http://127.0.0.1:8000/api/authenticate/')
                    
                ]);

                console.log('Login Response:', loginResponse.data);
                console.log('Authenticate Response:', authenticateResponse.data);
                window.location.href = '/Dashbaord';

                // Assuming you want to redirect after fetching data
                 // Redirect to Dashboard after fetching data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Optionally, you can clean up any resources here if needed
        return () => {
            // Cleanup logic
        };
    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Redirecting....</div>
            </div>
        </div>
    );
};

export default Signup;
// import React, {useState} from 'react';
// import './Signup.css';

// import user_icon from '../Components/assests/person.png';
// import email_icon from '../Components/assests/mail.png';
// import password_icon from '../Components/assests/password.png';

// const Login = () => {

//     const [action,setAction] = useState("Sign Up");

//     return (
//         <div className='container1'>
//             <div className="header">
//                 <div className="text">{action}</div>
//                 <div className="underline"></div>
//             </div>
//             <div className="inputs">
//                 {action==="Login"?<div></div>: <div className="input">
//                     <img src={user_icon} alt="" />
//                     <input type="text"  placeholder="Name"/>
//                 </div>}
//                 <div className="input">
//                     <img src={email_icon} alt="" />
//                     <input type="email" placeholder="Email"/>
//                 </div>
//                 <div className="input">
//                     <img src={password_icon} alt="" />
//                     <input type="password" placeholder="Password"/>
//                 </div>
//             </div>
//             {action==="Sign Up"?<div></div>:  <div className="forgot-password"> Forgot password <span>Click here!</span></div>}
           
//             {/* <div className="submit-container">
//                 <div className="submit gray"  >Sign Up</div>
//                 <div className="submit" >Login</div>  
//             </div> */}
//             <center>
//             <div className="submit-container">
//                 <div className={action==="Login"?"submit gray":"submit"}  onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
//                 <div className={action==="Sign Up"?"submit gray":"submit"}  onClick={()=>{setAction("Login")}}>Login</div>  
//             </div>
//             </center>
//         </div>
//     )
// }

// export default Login;
// import React from 'react';
// import { useEffect } from 'react';
// import './Signup.css';
// import axios from 'axios';


// // import user_icon from '../Components/assests/person.png';
// // // import email_icon from '../Components/assests/mail.png';
// // import password_icon from '../Components/assests/password.png';

// const Signup = () => {
//     // const [formData2, setFormData2] = useState({
//     //     username: '',
//     //     password: '',
//     // });

//     console.log(formData2)
//     const handleSubmit2 =() => {
//         axios.get('http://127.0.0.1:8000/api/authenticate/', formData2 , {
//             headers:{
//                 'Content-Type' : 'application/json'
//             }
//         })
//         .then(response => {
//             console.log('Success:', response.data);
//             window.location.href = '/Dashbaord';
//         })
//         .catch(error => {
//             console.log('Error:', error);
//         });
//     }

//     // const handleChange2 = (e) => {
//     //     const { name, value } = e.target;
//     //     setFormData2(prevState => ({
//     //         ...prevState,
//     //         [name]: value
//     //     }));
//     // };

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/login/')
//         .then(response => {
//             console.log('Success:', response.data);
//             // const { username, password } = response.data; // Assuming your backend returns username and password
//             // setFormData2({ username:username, password:password });
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     }, []);
//     return (
//         <div className='container'>
//             <div className="header">
//                 <div className="text">Redirecting....</div>
//             </div>
//         </div> 
//     )
// }

// export default Signup;
