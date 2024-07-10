import React, { useState, useEffect } from 'react';
import { Select, Pagination, Empty, Tabs } from 'antd';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import ProjectContent from './ProjectContent';
import { Navigate } from 'react-router-dom';
import "./index.css";

const { Option } = Select;
const { TabPane } = Tabs;

const ListProject = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [strategies, setStrategies] = useState([]);
  const [status, setStatus] = useState('0'); // Default to pending
  const itemsPerPage = 5;
  const token = JSON.parse(localStorage.getItem('token'));

  const handleGetUniversities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/universities`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': 'Bearer ' + token
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUniversities(data.data);
      } else {
        console.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUniversityChange = (value) => {
    setSelectedUniversityId(value);
    setCurrentPage(1); // Reset to the first page when the filter changes
    updateStrategiesList(value, status); // Pass the selected university ID to the update function
  };

  const handleGetStrategies = async (selectedFilter, statusFilter) => {
    try {
      const url = selectedFilter
        ? `${process.env.REACT_APP_PUBLIC_API}/strategies?university=${selectedFilter}&status=${statusFilter}`
        : `${process.env.REACT_APP_PUBLIC_API}/strategies?status=${statusFilter}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': 'Bearer ' + token
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStrategies(data.data);
      } else {
        console.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateStrategiesList = (universityId, status) => {
    handleGetStrategies(universityId, status);
    handleGetUniversities();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = strategies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    handleGetStrategies(selectedUniversityId, status);
    handleGetUniversities();
  }, [selectedUniversityId, status]);

  const role = JSON.parse(localStorage.getItem('role'));
  if ((role !== 0)) {
    return <Navigate to="/login/admin" />;
  }

  return (
    <div>
      <Header />
      <SubHeader title='Các chiến dịch' subtitle='Các chiến dịch mùa hè xanh' />
      <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3">
              <div className="p-3 rounded bg-gray-200">
                <div className="d-flex justify-content-between">
                  <button onClick={() => window.location.href = '/manageSchools'}
                    style={{height: '40px' }}
                    className="btn btn-primary mt-3"> Quản lý Trường</button>
                  <button onClick={() => window.location.href = '/createCampaigns'}
                    style={{height: '40px' }}
                    className="btn btn-primary mt-3"> Tạo chiến dịch</button>
                </div>
              </div>
              <div className="p-3 rounded bg-gray-200">
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
            </div>

            <div className="col-md-12 col-lg-8 col-xl-9">
              <div className="mb-3" style={{marginTop: 32}}>
                <Select
                  style={{ width: 200 }}
                  placeholder="Lọc danh sách chiến dịch"
                  onChange={handleUniversityChange}
                >
                  <Option value="">Tất cả các trường</Option>
                  {universities.map((university) => (
                    <Option key={university.id} value={university.id}>
                      {university.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <Tabs defaultActiveKey="0" onChange={(key) => setStatus(key)}>
                <TabPane tab="Chiến dịch chờ duyệt" key="0">
                  {currentItems.map((strategiesItem) => (
                    <ProjectContent
                      key={strategiesItem.id}
                      strategiesItem={strategiesItem}
                      updateStrategiesList={() => updateStrategiesList(selectedUniversityId, status)}
                    />
                  ))}
                  {currentItems.length === 0 && <Empty description="Chưa có chiến dịch nào!" />}
                </TabPane>
                <TabPane tab="Chiến dịch đã duyệt" key="1">
                  {currentItems.map((strategiesItem) => (
                    <ProjectContent
                      key={strategiesItem.id}
                      strategiesItem={strategiesItem}
                      updateStrategiesList={() => updateStrategiesList(selectedUniversityId, status)}
                    />
                  ))}
                  {currentItems.length === 0 && <Empty description="Chưa có chiến dịch nào!" />}
                </TabPane>
                <TabPane tab="Chiến dịch đã hủy" key="2">
                  {currentItems.map((strategiesItem) => (
                    <ProjectContent
                      key={strategiesItem.id}
                      strategiesItem={strategiesItem}
                      updateStrategiesList={() => updateStrategiesList(selectedUniversityId, status)}
                    />
                  ))}
                  {currentItems.length === 0 && <Empty description="Chưa có chiến dịch nào!" />}
                </TabPane>
              </Tabs>

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
  );
};

export default ListProject;
