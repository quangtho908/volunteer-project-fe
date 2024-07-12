import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import { useResetPasswordMutation, useUserLoginMutation } from '../../redux/api/authApi';
import './SignInForm.css';

const SignIn = ({ handleResponse, type }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [infoError, setInfoError] = useState('');
    const [show, setShow] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userLogin, { isError, isLoading, isSuccess, error }] = useUserLoginMutation();
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetPassword, { isError: resetIsError, isSuccess: resetIsSuccess, error: resetError, isLoading: resetIsLoading }] = useResetPasswordMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    setTimeout(() => {
        setShow(false);
    }, 10000);

    const onSubmit = async (event) => {
        userLogin({ ...event })
    }

    const onHandleForgotPassword = async (e) => {
        e.preventDefault();
        resetPassword({ email: forgotEmail })
        setForgotEmail("");
        setShowForgotPassword(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token);
        if (decodedToken) {
            loginSuccess(decodedToken.role, decodedToken.id, decodedToken.universityId);
        }

        if (isError) {
            message.error(error?.data?.message);
            setInfoError(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Logged in');
            navigate('/');
        }
    }, [isError, error, isSuccess, navigate]);

    const decodeToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            return null;
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const loginSuccess = (userRole, userId, universityId) => {
        if (userRole === 0 && type === "admin") {
            navigate('/listProjectAdmin');
        } else if (userRole === 1 && type === "school") {
            navigate('/list-campaign');
        } else if (userRole === 2 && type === "student") {
            navigate(`/listProjectSV/${universityId}`);
        }
        // Add more conditions as needed
    }

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/auth/login`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log("DATA", data.data); // Log ra dữ liệu chi tiết của data.data

            if (response.ok) {
                localStorage.setItem("token", JSON.stringify(data.data.token));
                const token = data?.data?.token;
                // Decode the token here
                const decodedToken = decodeToken(token);
                // Access the user information from the decoded token
                const userId = decodedToken?.id;
                const userRole = decodedToken?.role;
                const universityId = decodedToken?.university;
                // Do something with the user information
                console.log("Decoded Token:", decodedToken);
                console.log("User ID:", userId);
                localStorage.setItem("userId", JSON.stringify(userId));

                console.log("User Role:", userRole);
                localStorage.setItem("email", JSON.stringify(email));

                console.log("University ID:", universityId);
                localStorage.setItem("role", JSON.stringify(userRole));

                loginSuccess(userRole, userId, universityId);

            } else {
                // Handle the error response here
                console.error(data?.message);

            }
        } catch (error) {
            // Handle any errors here
            console.error(error);

        }
    }

    return (
        <>
            {
                showForgotPassword
                    ?
                    <form className="sign-in-form" onSubmit={onHandleForgotPassword} >
                        {/* Nội dung form Forgot Password */}
                    </form>
                    :
                    <>
                        <form className="sign-in-form" >
                            <h2 className="title">Đăng nhập</h2>
                            <div className="input-field">
                                <span className="fIcon"><FaEnvelope /></span>
                                <input onChange={handleEmailChange} placeholder="Enter Your Email" type="email" />
                            </div>
                            {errors.email && <span className="text-danger">This field is required</span>}
                            <div className="input-field">
                                <span className="fIcon"><FaLock /></span>
                                <input onChange={handlePasswordChange} type="password" placeholder="Enter Your Password" />
                            </div>
                            {errors.password && <span className="text-danger">This field is required</span>}
                            {infoError && <p className="text-danger">{infoError}</p>}
                        </form>
                        <div className="form-footer" >
                            <button className="iBtn" value="Đăng nhập" onClick={() => handleLogin(email, password)}>
                                {isLoading ? <Spinner animation="border" variant="info" /> : "Đăng nhập"}
                            </button>
                            {!['admin', 'school'].includes(type) && (
                                <div className='d-flex'>
                                    <p style={{ marginRight: 5 }}>Chưa có tài khoản</p>
                                    <a href="/signup">Đăng ký</a>
                                </div>
                            )}
                        </div>
                    </>
            }
        </>
    );
};

export default SignIn;
