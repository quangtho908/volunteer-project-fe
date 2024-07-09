import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaUser, FaSchool } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './SignInForm.css'; // Import the CSS file

const SignUp = () => {
    const [infoError, setInfoError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [universityId, setUniversityId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        handleGetListUniversities();
    }, []); 

    const handleGetListUniversities = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/universities`, {
                method: 'GET'
            });

            const data = await response.json();
        
            if (response.ok) {
                setUniversities(data.data);
            } else {
                console.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/auth/signup`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: data.fullName,
                    universityId: data.universityId,
                    email: data.email,
                    password: data.password,
                }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                localStorage.setItem("token", JSON.stringify(result.data.token));
                const userRole = result?.data?.role; // Assuming role is directly accessible in response
                localStorage.setItem("role", JSON.stringify(userRole));
    
                message.success('Successfully signed up');
                navigate('/');
            } else {
                if (result?.statusCode === 400 && result?.message === 'User is already') {
                    setInfoError('Email đã tồn tại trong hệ thống');
                } else {
                    console.error(result?.message);
                    setInfoError('Email đã tồn tại trong hệ thống');
                }
            }
        } catch (error) {
            console.error(error);
            setInfoError('Failed to sign up');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleUniversityChange = (e) => {
        const selectedUniversityId = e.target.value;
        setUniversityId(selectedUniversityId);
        console.log("Selected University ID:", selectedUniversityId);
    };

    return (
        <>
            <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Đăng ký</h2>
                <div className="input-field">
                    <span className="fIcon"><FaUser /></span>
                    <input 
                        onChange={(e) => setFullName(e.target.value)} 
                        placeholder="Enter Your Name" 
                        type="text" 
                        {...register("fullName", { required: true })}
                    />
                </div>
                {errors.fullName && <span className="text-danger">This field is required</span>}
                <div className="input-field">
                    <span className="fIcon"><FaSchool /></span>
                    <select 
                        onChange={handleUniversityChange} 
                        {...register("universityId", { required: true })}
                        className={`form-select ${errors.universityId ? 'is-invalid' : ''}`}
                    >
                        <option value="">Chọn trường</option>
                        {universities.map((university) => (
                            <option key={university.id} value={university.id}>{university.name}</option>
                        ))}
                    </select>
                </div>
                {errors.universityId && <span className="text-danger">This field is required</span>}
                <div className="input-field">
                    <span className="fIcon"><FaEnvelope /></span>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter Your Email" 
                        type="email" 
                        {...register("email", { required: true })}
                    />
                </div>
                {errors.email && <span className="text-danger">This field is required</span>}
                <div className="input-field">
                    <span className="fIcon"><FaLock /></span>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Enter Your Password" 
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.password && <span className="text-danger">This field is required</span>}
                {infoError && <p className="text-danger">{infoError}</p>}
                <button className="iBtn" type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" variant="info" /> : "Đăng ký"}
                </button>
            </form>
            <div className="form-footer">
                <p>Đã có tài khoản</p>
                <a href="/login/student">Đăng nhập</a>
            </div>
        </>
    );
};

export default SignUp;
