import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import log from '../../images/doc/info.svg';
import register from '../../images/doc/register.svg';
import SignUp from './SignUp';
import './SignUpForm.css';

const SignUpForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <Link to="/">
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignUp />
                   
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        {/* <h3 className='text-white'>New here ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(true)}>Sign Up</button> */}
                    </div>
                    <img src={`${log}`} alt="" className="pImg" />
                </div>
                {/* 
                <div className="panel right-panel">
                    <div className="content">
                        <h3 className='text-white'>One of us ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(false)}>Sign In</button>
                    </div>
                    <img src={`${register}`} alt="" className="pImg" />
                </div> */}
            </div>
        </div>
    );
};

export default SignUpForm;