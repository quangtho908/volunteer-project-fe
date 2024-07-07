import SubHeader from '../Shared/SubHeader'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'
import {Navigate, useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom';
import {FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment} from "react-icons/fa";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import jwtDecode from 'jwt-decode';

const ListCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));
   

    const handleApprove = async (id) => {
        try {
            // Send request to update campaign status to 'approved'
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/strategy/accept/${id}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
            });

            const updatedCampaign = await response.json();
            if (response.ok) {
                window.location.href = '/list-campaign';
                alert(`Duyệt chiến dịch thành công`);
            }

        } catch (error) {
            console.error('Error updating campaign status:', error);
        }
    };

    const decodeToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.error(error);
        }
    }
    const decodedToken = decodeToken(token);
    // Access the user information from the decoded token
    const userId = decodedToken?.id;
    const getinfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/users?id=${userId}`, {
                method: 'GET', headers: {
                    'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            var univer = data.data.organization.id
            try {
                const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/strategies?university=${univer}`, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                const data = await response.json();
                data.data.sort((a, b) => a.status - b.status);
                setCampaigns(data.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    useEffect(() => {
        getinfo().then(r => console.log(r));

        return () => {
            // Cleanup logic (if needed)
        };
    }, []);

    const role = JSON.parse(localStorage.getItem('role'));
    if ((role !== 1)) {
        return <Navigate to="/login/school"/>; // hoặc trang bạn muốn chuyển hướng khi không có token
    }
    return (
        <>
            <Header/>
            <SubHeader title="Campaign" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing."/>

            <div className="container">
                <div className="row justify-content-center">
                    {campaigns.map(campaign => (
<div key={campaign.id} className='col-10 align-selft-center text-center mt-5'>
                            <div className="mb-4 rounded" style={{background: '#f3f3f3'}}>
                                <div className='d-flex p-3 justify-content-between'>
                                    <div className='doc-img-fluid d-flex align-items-center'>
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s"
                                            alt="User Image"/>
                                    </div>
                                    <div
                                        className="doc-info  d-flex flex-column align-items-center justify-content-center">
                                        <h5 className='mb-0'><Link
                                            to={`/campaigns/${campaign.id}`}>{campaign.name}</Link></h5>
                                        <div className="clinic-details mt-2">
                                            <p className="form-text text-secondary">
                                                <FaLocationArrow/> {campaign.place}</p>

                                            {campaign.status === 0 ? (
                                                <p className="form-text text-secondary">
                                                    Duyệt trước: {new Date(campaign.startAt).toLocaleString()}
                                                </p>
                                            ) : (
                                                <p className="form-text text-secondary">
                                                    Kết thúc: {new Date(campaign.endAt).toLocaleString()}
                                                </p>
                                            )
                                            }

                                            <span
                                                className={`tag p-1 rounded ${
                                                    campaign.status === 0
                                                        ? 'bg-warning text-white'
                                                        : campaign.status === 1
                                                            ? 'bg-success text-white'
                                                            : ''
                                                }`}
                                            >
      {campaign.status === 0
          ? 'Chờ duyệt'
          : campaign.status === 1
              ? 'Đã duyệt'
              : ''}
    </span>

                                        </div>
                                    </div>
                                    <div className="doc-info-right me-3">
                                        <div
className="clinic-booking d-flex flex-column justify-content-center align-items-center h-100">
                                            <div className='clinic-booking-button mb-2 w-100'>
                                                <Link to={`/campaigns/${campaign.id}`}
                                                      className="btn btn-primary btn-block">Chi tiết</Link>
                                            </div>


                                            {campaign.status === 0 && (
                                                <div className='clinic-booking-button mb-2 w-100 mt-10 mb-10'>
                                                    <Button
                                                        type="primary"
                                                        className="btn btn-success btn-block  w-100"
                                                        onClick={() => handleApprove(campaign.id)}>
                                                        Duyệt
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ListCampaign;