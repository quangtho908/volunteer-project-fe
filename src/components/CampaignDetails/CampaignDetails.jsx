import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/doctor 5.jpg'
import img from '../../images/logo.png'
import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, message } from 'antd';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/truncate';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { Button } from 'antd'; 

const CampaignDetails = () => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
    const { data: doctorData, isLoading: DoctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

    const blogData = data?.blogs;
    const doctors = doctorData?.doctors;

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

    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && blogData?.length === 0) content = <Empty />
    if (!isLoading && !isError && blogData?.length > 0) content =
        <>
            {
                blogData && blogData?.map((item, id) => (
                    <div className="col-lg-3 col-md-6" key={id + item.id}>
                        <div className="card shadow border-0 mb-5 mb-lg-0">
                            <img src={item?.img} alt="blog Image" width={300} height={200} className="w-100  rounded-top image-hover" style={{ objectFit: 'contain' }} />

                            <div className='p-2'>
                                <Link to={`/blog/${item?.id}`}>
                                    <h6 className="text-start mb-1 text-capitalize" style={{ color: '#223a66' }}>{truncate(item?.title, 40)}</h6>
                                </Link>
                                <div className="px-2">
                                    <p className="form-text text-start text-capitalize">{truncate(item?.description, 80)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <>
            <Header />
            <SubHeader title="about us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-6">
                        
                        <div className="campaign-details">
      <div className="campaign-header">
      <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Title Campaign</h2>
                        </div>
        <p className="campaign-description">Description campaign</p>
      </div>
      <div className="campaign-info">
        <div className="info-item">
          <span className="info-label">Địa điểm:</span>
          <span className="info-value">quận Thủ Đức, thành phố Hồ Chí Minh</span>
        </div>
        <div className="info-item">
          <span className="info-label">Thời gian:</span>
          <span className="info-value">20/11/2023 - 22/11/2023</span>
        </div>
        <div className="info-item">
          <span className="info-label">Số lượng sinh viên cần:</span>
          <span className="info-value">20</span>
        </div>
        <div>
                            <Button type="primary" className="mr-10" >Duyệt</Button>
                            <Button type="danger" style={{ backgroundColor: 'lightgray' }}>Từ chối</Button>

                        </div>
        {/* Thêm các trường khác tùy theo yêu cầu */}
      </div>
    </div>  

                    </div>

                    <div className="col-lg-6">

                        <img 
                        style={{width: '100%', height: '100%'}}
                        src={'data:image/jpeg;base64,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'} alt="" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    {content}
                </div>
            </div>

         

        

     
            <Footer />
        </>
    )
}

export default CampaignDetails