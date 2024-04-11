import React, { useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import { useDebounced } from '../../utils/hooks/useDebounced';
import { Empty, Modal } from 'antd';
import { Pagination } from 'antd';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { useForm } from 'react-hook-form';

const ManageSchools = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByGender, setSorByGender] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [priceRange, setPriceRange] = useState({});
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);

    // Đặt giá trị mặc định cho isLoading và isError
    const isLoading = false;
    const isError = false;

    const [mockSchoolsData, setMockSchoolsData] = useState([
        { id: 1, name: "Universities 1", specialty: "Specialty 1", gender: "Male" },
        { id: 2, name: "Universities 2", specialty: "Specialty 2", gender: "Female" },
        { id: 3, name: "Universities 3", specialty: "Specialty 1", gender: "Male" },
        { id: 4, name: "Universities 4", specialty: "Specialty 2", gender: "Female" },
        { id: 5, name: "Universities 5", specialty: "Specialty 1", gender: "Male" },
        { id: 6, name: "Universities 6", specialty: "Specialty 2", gender: "Female" },
        { id: 7, name: "Universities 7", specialty: "Specialty 1", gender: "Male" },
        { id: 8, name: "Universities 8", specialty: "Specialty 2", gender: "Female" },
        { id: 9, name: "Universities 9", specialty: "Specialty 1", gender: "Male" },
        { id: 10, name: "Universities 10", specialty: "Specialty 2", gender: "Female" },
        { id: 11, name: "Universities 11", specialty: "Specialty 1", gender: "Male" },
        { id: 12, name: "Universities 12", specialty: "Specialty 2", gender: "Female" },
        { id: 13, name: "Universities 13", specialty: "Specialty 1", gender: "Male" },
        { id: 14, name: "Universities 14", specialty: "Specialty 2", gender: "Female" },
        { id: 15, name: "Universities 15", specialty: "Specialty 1", gender: "Male" },
        { id: 16, name: "Universities 16", specialty: "Specialty 2", gender: "Female" },
    ]);

    // Mock meta data
    const mockMeta = { total: mockSchoolsData.length };

    const handleDeleteSchool = (id) => {
        setSelectedSchoolId(id);
        setDeleteConfirmationVisible(true); // Thiết lập giá trị của deleteConfirmationVisible thành true
    };
    const handleAddSchool = (data) => {
        // Lấy dữ liệu từ form và thêm vào mockSchoolsData
        const newSchool = {
            id: mockSchoolsData.length + 1, // Tạo id mới cho trường mới
            name: data.name, // Tên trường
            specialty: data.specialty, // Chuyên ngành
            gender: data.gender // Giới tính
        };
    
        // Thêm trường mới vào mockSchoolsData
        setMockSchoolsData([...mockSchoolsData, newSchool]);
    
        // Đóng modal sau khi thêm thành công
        setShowSignUpPopup(false);
    };
    
    const handleConfirmDelete = () => {
        // Logic to delete school with the given id
        const updatedSchools = mockSchoolsData.filter(school => school.id !== selectedSchoolId);
        setMockSchoolsData(updatedSchools);
        setSelectedSchoolId(null); // Clear selected school id
        setDeleteConfirmationVisible(false); // Close delete confirmation modal
    };

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    //what to render
    let content = null;
    if (isLoading) content = <>Loading ...</>;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
    if (!isLoading && !isError && mockSchoolsData.length === 0) content = <div><Empty /></div>;
    if (!isLoading && !isError && mockSchoolsData.length > 0) content =
    
<>
{mockSchoolsData && mockSchoolsData?.map((item, id) => (
    <div key={item.id} className="mb-4 rounded" style={{ background: '#f3f3f3', alignContent: 'center' }}>
        <div className='d-flex p-3 justify-content-between'>
            <div className='d-flex gap-3'>
                <div className='doc-img-fluid d-flex align-items-center'>
                    <img src={item.avatar} alt={item.name} className="" style={{ width: 50, height: 50, marginRight: 10 }} />
                </div>
                <div className="doc-info">
                    <h5 className='mb-0'>{item.name}</h5>
                    <p className="doc-department m-0">University</p>
                </div>
            </div>
            <button onClick={() => handleDeleteSchool(item.id)} className="btn btn-danger">Xóa</button>
        </div>
    </div>
))}
</>

const handleSignUpButtonClick = () => {
    setShowSignUpPopup(true); 
};

const [showSignUpPopup, setShowSignUpPopup] = useState(false); 
const handleSignUpPopupClose = () => {
    setShowSignUpPopup(false); 
};
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
    };

    const onShowSizeChange = (current, pageSize) => {
        setPage(current);
        setSize(pageSize);
    };
 const { register, handleSubmit, reset } = useForm({});
    return (
        <div>
            <Header />
          <SubHeader title='Universities' subtitle='Chọn trường bạn đang theo học.'/>
            <div className="container" style={{ marginBottom: 80, marginTop: 50, marginLeft: 200, marginRight: 200}}>
                <div className="container-fluid">
                <div className='mb-4 section-title text-center'style={{marginLeft:-250}}>
                                <button onClick={handleSignUpButtonClick} className="btn btn-primary mt-3" >Thêm trường mới</button>
                            </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-8 col-xl-9 " >
                            {content}
                            <div className='text-center mt-5 mb-5'>
                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={mockMeta.total}
                                    pageSize={size}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Thêm trường mới"
                visible={showSignUpPopup}
                onCancel={handleSignUpPopupClose}
                footer={null}
            >
                <div className="container" style={{ marginTop: 30, marginBottom: 10 }}>
                    <div className="">
                        <div className="">
                                <form className="row form-row" onSubmit={handleSubmit(handleAddSchool)}>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Tên Trường</label>
                                            <input required {...register("firstName")} className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Mã trường</label>
                                            <input required {...register("firstName")} className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Phân hiệu khu vực</label>
                                            <input required {...register("firstName")}  className="form-control" />
                                        </div>
                                    </div>
                                    {/* Thêm trường tải hình ảnh */}
                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Logo trường</label>
                                            <input style={{alignItems:'center',marginTop:5}} type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="form-control" />
                                            {/* <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e)} className="form-control" />
                                            <button onClick={() => document.getElementById('fileInput').click()} className="btn btn-primary">Chọn tệp</button> */}
   
                                        </div>
                                    </div>
                                    <div className="text-center mt-3 mb-5">
                                        <button disabled={isLoading} type='submit' className="appointment-btn">Thêm</button>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="Xác nhận xóa"
                visible={deleteConfirmationVisible}
                onCancel={() => setDeleteConfirmationVisible(false)}
                onOk={handleConfirmDelete}
            >
                <p>Bạn có chắc muốn xóa trường này không?</p>
            </Modal>
            <Footer />
        </div>
    );
};
export default ManageSchools 