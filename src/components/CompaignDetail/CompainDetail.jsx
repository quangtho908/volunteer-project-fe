import React, { useState, useEffect } from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, Modal, message } from 'antd';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const CompaignDetail = () => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
    const { data: doctorData, isLoading: DoctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

    const blogData = data?.blogs;
    const doctors = doctorData?.doctors;

    const [imageError, setImageError] = useState(false);
    const [hasJoinedCampaign, setHasJoinedCampaign] = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);

    const { register, handleSubmit, reset } = useForm({});
    const [detailCampaigns, setDetailCampaigns] = useState({});
    const [filteredStrategy, setFilteredStrategy] = useState({});
    const [fullName, setFullName] = useState('');
    const [mssv, setMssv] = useState('');
    const [skills, setSkills] = useState('');

    const { id } = useParams();
    const idUni = JSON.parse(localStorage.getItem('idUni'));
    const token = JSON.parse(localStorage.getItem('token'));

    const handleCompaignDetail = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/strategies/`, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setDetailCampaigns(data.data);
                setFilteredStrategy(data.data.find(strategy => strategy.id === parseInt(id)));
            } else {
                console.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleĐKCampaign = async () => {
        try {
            const localEmail = JSON.parse(localStorage.getItem('email'));

            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/applicant`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: fullName,
                    mssv: mssv,
                    email: localEmail,
                    skill: skills,
                    strategy: filteredStrategy.id,
                    university: idUni,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === "SUCCESSFULLY") {
                    setHasJoinedCampaign(true);
                    message.success('Đăng ký thành công');
                } else {
                    console.error('Đăng ký không thành công:', data.message);
                }
            } else {
                console.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfUserJoinedCampaign = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/applicant/strategies`, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                },
            });

            const data = await response.json();

            if (response.ok) {
                const joinedCampaign = data.find(campaign => campaign.s_id === filteredStrategy.id);
                // const acceptedCampaign = data.find(campaign => campaign.as_status === 1);

                if (joinedCampaign) {
                    setHasJoinedCampaign(true);
                    message.warning('Bạn đã đăng ký tham gia chiến dịch này rồi!');
                    if (data.find(campaign => campaign.as_status === 1)) {
                        message.warning('Bạn đã được duyệt!');
                    } else {
                        message.warning('Bạn đang chờ được duyệt!');
                    }
                }
            } else {
                console.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleCompaignDetail();
        if (filteredStrategy.id) {
            checkIfUserJoinedCampaign();
        }
    }, [filteredStrategy.id]);

    let doctorContent = null;
    if (!DoctorIsLoading && doctorIsError) doctorContent = <div>Something Went Wrong !</div>;
    if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0) doctorContent = <div><Empty /></div>;
    if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0) doctorContent =
        <>
            {doctors && doctors.map((item, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
                    <div className="card shadow border-0 mb-5 mb-lg-0">
                        {item.img && <img src={item.img} className="img-fluid w-100" alt="" />}
                        <div className="p-2">
                            <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}>{item?.firstName + ' ' + item?.lastName}</h4>
                            <p>{item?.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>;

    return (
        <>
            <Header />
            <SubHeader title="Chi Tiết" />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-6">
                        <img style={{ width: '100%' }}
                            src={imageError || !filteredStrategy.image ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s' : filteredStrategy.image}
                            className=""
                            alt="Campaign Image"
                            onError={() => setImageError(true)}
                        />
                    </div>

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
                        {!hasJoinedCampaign && (
                            <div className="text-center mt-4">
                                <button onClick={() => setShowSignUpPopup(true)} className="appointment-btn scrollto"><span className="d-none d-md-inline">Đăng ký tham gia</span></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                title="Đăng ký tham gia"
                visible={!hasJoinedCampaign && showSignUpPopup}
                onCancel={() => setShowSignUpPopup(false)}
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
                                    <div className="form-group">
                                        <label className='form-label'>Kỹ năng của bản thân</label>
                                        <textarea onChange={(e) => setSkills(e.target.value)} className="form-control mb-3" cols="30" rows="10" />
                                    </div>
                                </div>
                            </form>
                            <div className="col-md-12 text-right">
                                <button onClick={handleSubmit(handleĐKCampaign)} className="appointment-btn scrollto" type="submit">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {doctorContent}
        </>
    );
}

export default CompaignDetail;
