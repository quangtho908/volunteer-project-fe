import React, { useState, useEffect } from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/doctor 5.jpg'
import img from '../../images/logo.png'
import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/truncate';
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';


const CompaignDetail = () => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
    const { data: doctorData, isLoading: DoctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

    const blogData = data?.blogs;
    const doctors = doctorData?.doctors;

    const [imageError, setImageError] = useState(false);

    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const handleSignUpButtonClick = () => {
        setShowSignUpPopup(true);
    };

    const handleSignUpPopupClose = () => {
        setShowSignUpPopup(false);
    };

    const { register, handleSubmit, reset } = useForm({});
    const [detailCampaigns, setDetailCampaigns] = useState({});
    const [filteredStrategy, setFilteredStrategy] = useState({});

    const [fullName, setFullName] = useState('');
    const [mssv, setMssv] = useState('');
    const [email, setEmail] = useState('');
    const [skills, setSkills] = useState('');

    const { id } = useParams();

    const idUni = JSON.parse(localStorage.getItem('idUni'));

    const token = JSON.parse(localStorage.getItem('token'));

    const handleCompaignDetail = async () => {
        try {
            const response = await fetch(`https://project-software-z6dy.onrender.com/strategies/`, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                },

            });

            const data = await response.json();

            // Handle the response data here
            if (response.ok) {
                console.log('ok')
                console.log(data.data)
                setDetailCampaigns(data.data)
                setFilteredStrategy(data.data.find(strategy => strategy.id === parseInt(id)))


            } else {
                // Handle the error response here
                console.error(data?.message);

            }
        } catch (error) {
            // Handle any errors here
            console.error(error);

        }
    }

    const handleĐKCampaign = async () => {
        try {
            console.log(fullName, mssv, email, skills, filteredStrategy.id, idUni)
            const response = await fetch(`https://project-software-z6dy.onrender.com/applicant`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    // 'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    fullName: fullName,
                    mssv: mssv,
                    email: email,
                    skill: skills,
                    strategy: filteredStrategy.id,
                    university: idUni,
                }),

            });

            const data = await response.json();
            // Handle the response data here
            if (response.ok) {
                console.log('ok')
                console.log(data.data)
                if (data.message === "SUCCESSFULLY") {
                    console.log('Đăng ký thành công');
                    window.location.href = `/listProjectSV/${idUni}`
                    alert('Đăng ký thành công');
                } else {
                    console.error('Đăng ký không thành công:', data.message);
                    // Hiển thị thông báo lỗi cho người dùng (nếu cần)
                }

            } else {
                // Handle the error response here
                console.error(data?.message);

            }
        } catch (error) {
            // Handle any errors here
            console.error(error);

        }
    }

    useEffect(() => {
        handleCompaignDetail()
    }, [])

    let doctorContent = null;
    if (!DoctorIsLoading && doctorIsError) doctorContent = <div>Something Went Wrong !</div>
    if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0) doctorContent = <div><Empty /></div>
    if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0) doctorContent =
        <>
            {doctors && doctors.map((item, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
                    <div className="card shadow border-0 mb-5 mb-lg-0">
                        {item.img && <img src={item.img} class="img-fluid w-100" alt="" />}
                        <div className="p-2">
                            <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}><a>{item?.firstName + ' ' + item?.lastName}</a></h4>
                            <p>{item?.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    return (
        <>
            <Header />
            <SubHeader title="Chi Tiết" />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-6">
                        <img style={{width: '100%'}}
                            src={imageError || !filteredStrategy.image ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s' : filteredStrategy.image}
                            className=""
                            alt="User Image"
                            onError={() => setImageError(true)}
                        />                    </div>

                    <div className="col-lg-6">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>{filteredStrategy.name}</h2>
                        </div>
                        <div className='group-info' style={{ marginLeft: 35 }}>
                            <p className='mt-3'>Thời gian: Từ ngày {new Date(filteredStrategy.startAt).toLocaleDateString('vi-VN')} đến {new Date(filteredStrategy.startAt).toLocaleDateString('vi-VN')}
                            </p>
                            <p className='mt-3'>Địa điểm: {filteredStrategy.place}</p>
                            <p className='mt-3'>Mô tả: {filteredStrategy.description}</p>
                        </div>
                        <div className="text-center mt-4">
                            <button onClick={handleSignUpButtonClick} className="appointment-btn scrollto"><span className="d-none d-md-inline">Đăng ký tham gia</span></button>
                        </div>
                    </div>

                </div>
            </div>
            <Modal
                title="Đăng ký tham gia"
                visible={showSignUpPopup}
                onCancel={handleSignUpPopupClose}
                footer={null}
            >
                <div className="container" style={{ marginTop: 30, marginBottom: 10 }}>
                    <div className="">
                        <div className="">
                            <form className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Họ và Tên</label>
                                        <input onChange={(e) => setFullName(e.target.value)} type='text' className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Mã số sinh viên</label>
                                        <input onChange={(e) => setMssv(e.target.value)} type='text' className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group mb-2 card-label">
                                        <label>Email</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type='email' className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className='form-label'>Kỹ năng của bản thân</label>
                                        <textarea onChange={(e) => setSkills(e.target.value)} className="form-control mb-3" cols="30" rows="10" />
                                    </div>
                                </div>


                            </form>
                            <div className="text-center mt-3 mb-5">
                                <button onClick={() => handleĐKCampaign()} className="appointment-btn">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* <Footer /> */}
        </>
    )
}

export default CompaignDetail