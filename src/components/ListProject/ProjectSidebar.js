import React from 'react'
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import Search from 'antd/es/input/Search';
import { doctorSpecialistOptions } from '../../constant/global';
import { Link } from 'react-router-dom/dist';

const ProjectSidebar = ({ }) => {
//   const handleDateChange = (_date, _dateString) => { }
//   const options = [
//     {
//       label: 'Male',
//       value: 'male',
//     },
//     {
//       label: 'Female',
//       value: 'female',
//     },
//     {
//       label: 'Shemale',
//       value: 'shemale',
//     },
//   ];
//   const onSelectGender = (e) => setSorByGender(e.target.value)

//   const onSelectSepcialist = (e) => setSpecialist(e.target.value)

//   const onRangeChange = (range) => {
//     const obj = {
//       min: range[0],
//       max: range[1]
//     }
//     setPriceRange(obj)
//   }
//   const onSearch = (value) => {
//     setSearchTerm(value);
//   }
  return (
    <div className="col-md-12 col-lg-4 col-xl-3">

      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
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
  )
}

export default ProjectSidebar