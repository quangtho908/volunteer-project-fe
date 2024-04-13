import React, {useEffect, useState} from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import {Navigate, useParams} from 'react-router-dom';
import {Button} from 'antd';

const CampaignDetails = () => {
    const {id} = useParams();
    const [campaign, setCampaign] = useState(null);
    // sort by status
    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`https://project-software-z6dy.onrender.com/strategies?id=${id}`);
                const data = await response.json();
                setCampaign(data.data);
            } catch (error) {
                console.error('Error fetching campaign:', error);
            }
        };

        fetchCampaign().then(r => console.log(r));
    }, [id]);

    const token = JSON.parse(localStorage.getItem('token'));

    const handleApprove = async () => {
        try {
            // Send request to update campaign status to 'approved'
            const response = await fetch(`https://project-software-z6dy.onrender.com/strategy/accept/${id}`, {
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
    const role = JSON.parse(localStorage.getItem('role'));
    if ((role !== 1)) {
        return <Navigate to="/login"/>; // hoặc trang bạn muốn chuyển hướng khi không có token
    }
    return (
        <>
            <Header/>
            <SubHeader title="about us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing."/>
            <div className="container" style={{marginBottom: 100, marginTop: 100}}>
                <div className="row p-5">
                    <div className="col-lg-6">
                        {campaign && (
                            <div className="campaign-details">
                                <div className="campaign-header">
                                    <div className='section-title text-center'>
                                        <h2 className='text-uppercase'>{campaign.name}</h2>
                                    </div>
                                    <p className="campaign-description">{campaign.description}</p>
                                </div>
                                <div className="campaign-info">
                                    <div className="info-item">
                                        <span className="info-label">Địa điểm:</span>
                                        <span className="info-value">{campaign.place}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Thời gian:</span>
                                        <span
                                            className="info-value">{new Date(campaign.startAt).toLocaleDateString()} - {new Date(campaign.endAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Số lượng sinh viên cần: 20/25</span>
                                        <span className="info-value">{}</span>
                                    </div>
                                    <div>
                                        {campaign.status === 0 ? (
                                                <Button type="primary" className="mr-10"
                                                        onClick={handleApprove}>Duyệt</Button>
                                            ) :
                                            <span
                                                className={`tag p-1 rounded bg-success text-white`}>Đã duyệt</span>

                                        }</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-6">
                        {campaign && (
                            <img
                                src={'https://th.bing.com/th/id/OIP.J_vAP0PSzrYKIYJ78es-mgHaFO?rs=1&pid=ImgDetMain'}
                                alt={campaign.name}
                                className="img-fluid rounded shadow"
                                style={{width: '100%', height: '100%'}}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default CampaignDetails;

