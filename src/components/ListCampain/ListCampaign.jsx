import React from 'react'
import SubHeader from '../Shared/SubHeader'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'
import img from '../../images/features/baby.png'
import { useNavigate } from 'react-router-dom'
import doctorBg from '../../images/img/doctors-bg.jpg';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const ListCampaign = () => {
    const weArePleaseStyle = {
        backgroundColor: "antiquewhite",
        height: "60vh",
        background: `url(${doctorBg}) no-repeat`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        padding: "10px",
        position: "relative",
        marginTop: 200,
        marginBottom: 100
    }
    const navigate = useNavigate();

    const handleServiceClick = (campaignId) => {
        navigate(`/campaigns/${campaignId}`);
    };
    return (
        <>
            <Header />
            <SubHeader title="Campaign" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />

            <div className="container">
                <div className="row justify-content-center">

                    {
                        Array(6).fill(null).map((_item, id) => (
                    <div className='col-10 align-selft-center  text-center mt-5'  key={id + 6} onClick={() => handleServiceClick(id + 6)}>
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
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s"
                                            className="" alt="User Image" />
                                    </div>
                                    <div className="doc-info  d-flex flex-column align-items-center justify-content-center">
                                        <h5 className='mb-0'><Link to={`/detail/studentList/1`}>Mùa Hè Xanh:
                                            Hành động cho môi trường</Link></h5>

                                        {/* <p className="doc-department m-0"><img src={showImg} className="img-fluid" alt="Speciality" />Urology</p> */}
                                        <div className="clinic-details mt-2">
                                            <p className="form-text text-secondary"><FaLocationArrow /> Ba Tri,
                                                Bến Tre</p>
                                            <p className="form-text text-secondary">Duyệt trước:
                                                16/06/2023</p>
                                            <span className="tag bg-secondary text-white p-1 rounded">Đã duyệt</span>
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
                                    <div className="clinic-booking d-flex flex-column justify-content-center align-items-center h-100">
                                        <div className='clinic-booking-button mb-2 w-100'>
                                            <Link to={'/campaigns/'+id+6} className="btn btn-primary btn-block">Chi tiết</Link>
                                        </div>
                                        <div className='clinic-booking-button mb-2 w-100 mt-10 mb-10'>
                                            <Link to={``} className="btn btn-success btn-block">Duyệt</Link>
                                        </div>
                                        <div className='clinic-booking-button w-100'>
                                            <Link to={``} className="btn btn-danger btn-block">Từ chối</Link>
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

export default ListCampaign