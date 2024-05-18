import React, {useState} from 'react';
import './Signup.css';
import axios from 'axios';

import user_icon from '../Components/assests/person.png';
import email_icon from '../Components/assests/mail.png';
import password_icon from '../Components/assests/password.png';

const Signup = () => {

   
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
  

    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
   
    const handleSubmit = () => { 
        axios.post('http://127.0.0.1:8000/api/register/', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Success:', response.data);
                window.location.href = '/Dashbaord';
            })
            .catch(error => {
                console.log('Error:', error);
            })
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
               <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" name="username" value={formData.name} onChange={handleChange} placeholder="Name"/>
                </div>

                <div className="input">
                    <img src={email_icon} name alt="" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
                </div>
            </div>
        
            <div className="submit-container">
                <div className='submit' onClick={()=> handleSubmit()}>Sign Up</div>
                <div className='submit gray' href='/login' >Login</div>  
            </div>
        </div>
    )
}

export default Signup;
