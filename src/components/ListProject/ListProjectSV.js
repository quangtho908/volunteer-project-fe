// import React from 'react'
// import Header from '../../Shared/Header/Header'
// import Footer from '../../Shared/Footer/Footer'
// import SubHeader from '../../Shared/SubHeader'
// import SearchSidebar from './SearchSidebar'
import ProjectContent from './ProjectContent'
import React, { useState } from 'react';
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



const ListProjectSV = () => {

    return (
        <div>
            <Header />
            <SubHeader title='Doctors' subtitle='Lorem ipsum dolor sit amet.' />
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">

                        <ProjectSidebar />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {/* {content} */}
                            <div className='text-center mt-5 mb-5'>
                                {/* <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={meta?.total}
                                    pageSize={size}
                                /> */}
                                <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
                                    <div className='d-flex p-3 justify-content-between'>
                                        <div className='d-flex gap-3'>
                                            <div className='doc-img-fluid d-flex align-items-center'>
                                                {/* { data?.img && <img src={data?.img} className="" alt="User Image" />} */}
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s" className="" alt="User Image" />
                                            </div>
                                            <div className="doc-info">
                                                <h5 className='mb-0'><Link to={`/detail/studentList/1`}>Mùa Hè Xanh: Hành động cho môi trường</Link></h5>
                                                <p className='m-0 form-text'>Hành động cho môi trường" thúc đẩy mọi người tham gia vào các hoạt động bảo vệ môi trường để tạo ra một mùa hè và một tương lai bền vững hơn.</p>
                                                {/* <p className="doc-department m-0"><img src={showImg} className="img-fluid" alt="Speciality" />Urology</p> */}


                                                <div className="clinic-details mt-2">
                                                    <p className="form-text text-secondary"><FaLocationArrow /> Ba Tri, Bến Tre</p>
                                                    <p className="form-text text-secondary"><FaClock />Thời gian diễn ra: 26/06/2023 – 10/07/2024</p>
                                                    <p className="form-text text-secondary">Đăng ký trước: 16/06/2023</p>
                                                    {/* <ul className="clinic-gallery mt-3">
                                <li>
                                    <FcLike />
                                </li>
                                <li>
                                    <FcLike />
                                </li>
                                <li>
                                    <FcLike />
                                </li>
                                <li>
                                    <FcLike />
                                </li>
                            </ul> */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="doc-info-right me-3">
                                            <div className="clini-infos">
                                                <ul>
                                                    <li><FaRegThumbsUp />  97%</li>
                                                    <li><FaComment /> 4 Feedback</li>
                                                    {/* <li>Thời gian đăng ký trước 17/06/2023 </li> */}
                                                    {/* <li><FaDollarSign />  (Per Hour)</li> */}
                                                </ul>
                                            </div>
                                            <div className="clinic-booking">
                                                <div className='clinic-booking-button'>
                                                    <Link to={'/campaignDetail/1'} className="pro-btn" >   chi tiết   </Link>
                                                </div>
                                                <div className='clinic-booking-button mt-2'>
                                                    <Link to={`/booking/1`} className="apt-btn">Đăng Ký</Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListProjectSV