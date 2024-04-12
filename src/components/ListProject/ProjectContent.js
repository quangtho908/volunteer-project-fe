import React from 'react';
import { Link } from 'react-router-dom';
import showImg from '../../images/specialities/specialities-01.png'
import StarRatings from 'react-star-ratings';
import { Tag } from 'antd';
import './index.css';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import { truncate } from '../../utils/truncate';
import { FaClock } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const ProjectContent = ({strategiesItem }) => {


    // const services = data?.services?.split(',')
    return (
        <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
            <div className='d-flex p-3 justify-content-between align-items-center'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        {/* { data?.img && <img src={data?.img} className="" alt="User Image" />} */}
                        <img src={strategiesItem.image} className="" alt="User Image" />
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'><Link to={`/detail/studentList/1`}>{strategiesItem.name}</Link></h5>
                        <p className='m-0 form-text'>{strategiesItem.description}</p>
                        {/* <p className="doc-department m-0"><img src={showImg} className="img-fluid" alt="Speciality" />Urology</p> */}


                        <div className="clinic-details mt-2">
                            <p className="form-text text-secondary"><FaLocationArrow style={{marginRight: 5}}/> {strategiesItem.place}</p>
                            <p className="form-text text-secondary"><FaClock style={{marginRight: 5}}/>Thời gian diễn ra: {strategiesItem.startAt.slice(0,10)} – {strategiesItem.endAt.slice(0,10)}</p>
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
                        <div className='clinic-booking-button' style={{marginRight: 10}}>
                            <Link to={`/detail/studentList/${strategiesItem.id}`} className="pro-btn" >   chi tiết   </Link>
                        </div>
                        <div  className='clinic-booking-button mt-2'>
                            <Link to={`/booking/1`} className="apt-btn">Xóa</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default ProjectContent