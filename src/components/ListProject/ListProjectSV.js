// import React from 'react'
// import Header from '../../Shared/Header/Header'
// import Footer from '../../Shared/Footer/Footer'
// import SubHeader from '../../Shared/SubHeader'
// import SearchSidebar from './SearchSidebar'
import ProjectContent from './ProjectContent'
import React, { useState, useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import SearchSidebar from '../Doctor/SearchDoctor/SearchSidebar';
import SearchContent from '../Doctor/SearchDoctor/SearchContent';
import { useDebounced } from '../../utils/hooks/useDebounced';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { Empty } from 'antd';
import { Pagination } from 'antd';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import ProjectSidebar from './ProjectSidebar';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const ListProjectSV = () => {

    const [projects, setProjects] = useState([]);
    const { id } = useParams();
    const [filteredStrategy, setFilteredStrategy] = useState({});
    const [imageError, setImageError] = useState(false);
    localStorage.setItem("idUni", id);

    const token = JSON.parse(localStorage.getItem('token'));
    const handleGetList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/strategies?university=${id}&status=1`, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token
                },

            });

            const data = await response.json();

            // Handle the response data here
            if (response.ok) {
                console.log('ok')
                console.log(data.data)
                setProjects(data.data)
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

    useEffect(() => {
        handleGetList()
    }, [])

    return (
        <div>
            <Header />
            <SubHeader title='Danh sách chiến dịch' subtitle="Danh sach các chiến dịch cần duyệt" />
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
           
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-3">
                            <div className="md-3">
                                <h6 className="text-blue-700">Mùa hè xanh</h6>
                                <div className="card shadow border-0 mb-5">
                                    <img src="https://dainam.edu.vn/uploads/images/ckeqouwcp4qi5juiulff20230802101300_thump.jpg" alt="" className="img-fluid rounded-t-lg" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                                    <div className="p-2">
                                        <p className="mb-4">Mùa hè xanh 2023: Chiến dịch tình nguyện đầy nhiệt huyết của tuổi trẻ DNU tại mảnh đất Cao Bằng</p>
                                        <a href='https://dainam.edu.vn/vi/tin-tuc/mua-he-xanh-2023-chien-dich-tinh-nguyen-day-nhiet-huyet-cua-tuoi-tre-dnu-tai-manh-dat-cao-bang' className="btn btn-primary" target="_blank">Truy cập</a>
                                    </div>
                                </div>

                                <div className="card shadow border-0 mb-5">
                                    <img src="https://doanthanhnien.vn/Content/uploads/images/133382190131936031_356622827_670872445078522_7208570064784879038_n.jpg" alt="" className="img-fluid rounded-t-lg" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                                    <div className="p-2">
                                        <p className="mb-4">Mùa hè xanh - Nơi cống hiến tri thức trẻ, góp phần dựng xây quê hương, đất nước.</p>
                                        <a href='https://doanthanhnien.vn/tin-tuc/mua-he-xanh/mua-he-xanh---noi-cong-hien-tri-thuc-tre-gop-phan-dung-xay-que-huong-dat-nuoc' className="btn btn-primary" target="_blank">Truy cập</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {projects.map(project => (

                                < div className='text-center mb-5' key={project.id}>
                                    < div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
                                        <div className='d-flex p-3 justify-content-between align-items-center'>
                                            <div className='doc-img-fluid d-flex align-items-center'>
                                                {/* { project?.img && <img src={project?.img} className="" alt="User Image" />} */}
                                                <img
                                                    src={imageError || !project.image ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s' : project.image}
                                                    className=""
                                                    alt="User Image"
                                                    onError={() => setImageError(true)}
                                                />
                                            </div>
                                            <div className="doc-info">
                                                <h5 className='mb-0'><Link to={`/detail/studentList/1`}>{project.name}</Link></h5>
                                                <div className="clinic-details mt-2">
                                                    <p className="form-text text-secondary"><FaLocationArrow style={{ marginRight: 5 }} />{project.place}</p>
                                                    <p className="form-text text-secondary">    <FaClock style={{ marginRight: 5 }} />
                                                        {new Date(project.startAt).toLocaleDateString('vi-VN')} - {new Date(project.startAt).toLocaleDateString('vi-VN')}
                                                    </p>
                                                    <p className="form-text text-secondary">Đăng ký trước: {new Date(project.startAt).toLocaleDateString('vi-VN')}</p>
                                                </div>
                                            </div>
                                            <div className="doc-info-right me-3">
                                                <div className="clini-infos">
                                                    <ul>
                                                        <li><FaRegThumbsUp /> 97%</li>
                                                        <li><FaComment /> 4 Feedback</li>
                                                        {/* <li>Thời gian đăng ký trước 17/06/2023 </li> */}
                                                        {/* <li><FaDollarSign />  (Per Hour)</li> */}
                                                    </ul>
                                                </div>
                                                <div className="clinic-booking">
                                                    <div className='clinic-booking-button'>
                                                        <Link to={`/campaignDetail/${project.id}`} className="pro-btn"> chi tiết </Link>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>

                </div>
            </div >
            {/* <Footer /> */}
        </div >
    )
}

export default ListProjectSV