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
import { Navigate } from 'react-router-dom';
import "./index.css";

const ListProject = ({ }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [strategies, setStrategies] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const handleGetStrategies = async () => {
    try {
      const response = await fetch('https://project-software-z6dy.onrender.com/strategies', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': 'Bearer ' + token
        },
      });

      const data = await response.json();

      // Handle the response data here
      if (response.ok) {
        setStrategies(data.data);
        console.log(data.data); // Check the fetched data
      } else {
        // Handle the error response here
        console.error(data?.message);
      }
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  }

  const updateStrategiesList = () => {
    // Cập nhật danh sách chiến dịch sau khi xóa thành công
    handleGetStrategies();
};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = strategies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    handleGetStrategies();
  }, [])
  const role = JSON.parse(localStorage.getItem('role'));
  if ((role !== 0)) {
    return <Navigate to="/login" />; // hoặc trang bạn muốn chuyển hướng khi không có token
  }
  return (
    <div>
      <Header />
      <SubHeader title='Các chiến dịch' subtitle='Lorem ipsum dolor sit amet.' />
      <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-12 col-lg-4 col-xl-3">

              <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
                <div className="mb-3">
                  <button onClick={() => {
                    window.location.href = '/manageSchools'
                  }}
                    style={{ marginLeft: '50px' }}
                    className="btn btn-primary mt-3"> Quản lý Trường</button>
                  <button onClick={() => {
                    window.location.href = '/createCampaigns'
                  }}
                    style={{ marginLeft: '50px' }}
                    className="btn btn-primary mt-3"> Tạo chiến dịch</button>
                </div>

                {/* <div className='mb-3'>
    <h6 style={{ color: '#05335c' }}>Date Range</h6>
    <DatePicker
      style={{ width: "100%" }}
      format="YYYY-MM-DD HH:mm:ss"
      // onChange={handleDateChange}
    />
  </div> */}

                <div className="md-3" >
                  <h6 style={{ color: '#05335c' }}>Mùa hè xanh</h6>
                  <div className="card shadow border-0 mb-5">
                    <img src="https://dainam.edu.vn/uploads/images/ckeqouwcp4qi5juiulff20230802101300_thump.jpg" alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                    <div className="p-2">
                      {/* <h4 className="mt-4 mb-2">Child care</h4> */}
                      <p className="mb-4">Mùa hè xanh 2023: Chiến dịch tình nguyện đầy nhiệt huyết của tuổi trẻ DNU tại mảnh đất Cao Bằng</p>

                      <a href='https://dainam.edu.vn/vi/tin-tuc/mua-he-xanh-2023-chien-dich-tinh-nguyen-day-nhiet-huyet-cua-tuoi-tre-dnu-tai-manh-dat-cao-bang' className="apt-btn" target="_blank">Truy cập</a>


                    </div>
                  </div>

                  <div className="card shadow border-0 mb-5">
                    <img src="https://doanthanhnien.vn/Content/uploads/images/133382190131936031_356622827_670872445078522_7208570064784879038_n.jpg" alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                    <div className="p-2">
                      {/* <h4 className="mt-4 mb-2">Child care</h4> */}
                      <p className="mb-4">Mùa hè xanh - Nơi cống hiến tri thức trẻ, góp phần dựng xây quê hương, đất nước.</p>
                      <a href='https://doanthanhnien.vn/tin-tuc/mua-he-xanh/mua-he-xanh---noi-cong-hien-tri-thuc-tre-gop-phan-dung-xay-que-huong-dat-nuoc' className="apt-btn" target="_blank">Truy cập</a>
                    </div>
                  </div>
                </div>


              </div>

            </div>
            <div className="col-md-12 col-lg-8 col-xl-9">
              {/* {content} */}
              <div className='text-center mt-5 mb-5'>
                {/* {strategies.map((strategiesItem) => (
                  <ProjectContent
                    key={strategiesItem.id}
                    strategiesItem={strategiesItem}
                  />
                ))} */}
                {currentItems.map((strategiesItem) => (
                  <ProjectContent
                    key={strategiesItem.id}
                    strategiesItem={strategiesItem}
                    updateStrategiesList={updateStrategiesList}
                  />
                ))}


              </div>
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={strategies.length}
                  pageSize={itemsPerPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  )
}

export default ListProject;