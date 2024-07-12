import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import log from '../../images/doc/info.svg';
import register from '../../images/doc/register.svg';
import SignIn from './SignIn';
import './SignInForm.css';

const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    const { type } = useParams(); // Lấy type từ URL

    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <Link to="/">
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignIn type={type} />
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        {/* Các nội dung khác nếu cần */}
                    </div>
                    <img src={log} alt="info" className="pImg" />
                </div>
                {/* Các panel khác nếu cần */}
            </div>
            <div className="marquee-container">
                <div className="marquee-content">
                    {type === 'admin' && <p className="marquee-text">Chào mừng Lãnh đạo địa phương, xin vui lòng đăng nhập để bắt đầu hành trình quản lý chiến dịch tình nguyện.</p>}
                    {type === 'school' && <p className="marquee-text">Kính chào Nhà trường, xin vui lòng đăng nhập để điều phối và quản lý các chiến dịch tình nguyện!</p>}
                    {type === 'student' && <p className="marquee-text">Chào mừng các bạn Sinh viên, xin vui lòng đăng nhập để tham gia và trải nghiệm những chiến dịch tình nguyện đầy thú vị.</p>}
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
