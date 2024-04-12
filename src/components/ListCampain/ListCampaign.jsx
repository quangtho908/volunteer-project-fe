import SubHeader from '../Shared/SubHeader'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import axios from 'axios';
 import React, { useEffect, useState } from 'react';

const ListCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllCampaigns = async () => {
            try {
                const response = await fetch('https://project-software-z6dy.onrender.com/strategies', {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJxdWFuZ3RobzIzMDYyMDAyQGdtYWlsLmNvbSIsInJvbGUiOjAsInRpbWUiOjE3MTI4ODc4ODE1MTEsImlhdCI6MTcxMjg4Nzg4MX0.LC8YPbX1i_Zi4HSMoZ3pgpoq5iA8RtgxF9B8_lIEKnI'
                    }
                });
                const data = await response.json();
                setCampaigns(data.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        getAllCampaigns();

        return () => {
            // Cleanup logic (if needed)
        };
    }, []);

    const handleCampaignClick = (campaignId) => {
        navigate(`/campaigns/${campaignId}`);
    };
    return (
        <>
            <Header />
            <SubHeader title="Campaign" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />

            <div className="container">
                <div className="row justify-content-center">
                    {campaigns.map(campaign => (
                        <div key={campaign.id} className='col-10 align-selft-center text-center mt-5'>
                            <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
                                <div className='d-flex p-3 justify-content-between'>
                                    <div className='d-flex gap-3'>
                                        <div className='doc-img-fluid d-flex align-items-center'>
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s"
                                                alt="User Image" />
                                        </div>
                                        <div className="doc-info  d-flex flex-column align-items-center justify-content-center">
                                            <h5 className='mb-0'><Link to={`/campaigns/${campaign.id}`}>{campaign.name}</Link></h5>
                                            <div className="clinic-details mt-2">
                                                <p className="form-text text-secondary"><FaLocationArrow /> {campaign.place}</p>
                                                <p className="form-text text-secondary">Duyệt trước: {new Date(campaign.endAt).toLocaleString()}</p>
                                                <span className="tag bg-secondary text-white p-1 rounded">Đã duyệt</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="doc-info-right me-3">
                                        <div className="clinic-booking d-flex flex-column justify-content-center align-items-center h-100">
                                            <div className='clinic-booking-button mb-2 w-100'>
                                                <Link to={`/campaigns/${campaign.id}`} className="btn btn-primary btn-block">Chi tiết</Link>
                                            </div>
                                            <div className='clinic-booking-button mb-2 w-100 mt-10 mb-10'>
                                                <Link to={`/booking/${campaign.id}`} className="btn btn-success btn-block">Duyệt</Link>
                                            </div>
                                            <div className='clinic-booking-button w-100'>
                                                <Link to={`/booking/${campaign.id}`} className="btn btn-danger btn-block">Từ chối</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ListCampaign;
