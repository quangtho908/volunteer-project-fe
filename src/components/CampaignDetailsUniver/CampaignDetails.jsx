import React, { useEffect, useState } from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`https://project-software-z6dy.onrender.com/strategies`);
                const data = await response.json();
                setCampaign(data.data);
                setCampaign(data.data.find(strategy => strategy.id === parseInt(id)))
                console.log(data.data)
            } catch (error) {
                console.error('Error fetching campaign:', error);
            }
        };

        fetchCampaign();
    }, [id]);

    
    const handleApprove = async () => {
        try {
            // Send request to update campaign status to 'approved'
            const response = await fetch(`https://project-software-z6dy.onrender.com/strategy/accept/${id}`, {
                method: 'PUT',
                headers: {
                    'accept' :'*/*',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJxdWFuZ3RobzIzMDYyMDAyQGdtYWlsLmNvbSIsInJvbGUiOjAsInRpbWUiOjE3MTI5MDc3MTA3MzksImlhdCI6MTcxMjkwNzcxMH0.JPXpdRhTw0kAyUACg7gFXaXVToTru9tVYoRAcviKgsA',
                    'Content-Type': 'application/json'
                },
            });
    
            // Assuming the server responds with the updated campaign data
            const updatedCampaign = await response.json();
    
            // Update the campaign state with the updated data
            setCampaign(updatedCampaign);
            console.log(updatedCampaign);
    
        } catch (error) {
            console.error('Error updating campaign status:', error);
        }
    };
    
    

    return (
        <>
            <Header />
            <SubHeader title="about us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
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
                                        <span className="info-value">{new Date(campaign.startAt).toLocaleDateString()} - {new Date(campaign.endAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Số lượng sinh viên cần:</span>
                                        <span className="info-value">{}</span>
                                    </div>
                                    <div>
                                        <Button type="primary" className="mr-10" onClick={handleApprove}>Duyệt</Button>
                                        <Button type="danger" style={{ backgroundColor: 'lightgray' }}>Từ chối</Button>
                                    </div>
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
                                style={{ width: '100%', height: '100%' }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CampaignDetails;
