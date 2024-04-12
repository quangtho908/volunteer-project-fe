import React, { useEffect, useState } from 'react';
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
    const [univercity, setUniversity] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');

    // Đặt giá trị mặc định cho isLoading và isError
    const isLoading = false;
    const isError = false;
    const token = JSON.parse(localStorage.getItem('token'));


    // Mock meta data
    const mockMeta = { total: univercity.length };
    const handleGetListUniversities = async (email, password) => {
        try {
            const response = await fetch('https://project-software-z6dy.onrender.com/universities', {
                method: 'GET'
            });

            const data = await response.json();

            // Handle the response data here
            if (response) {
                console.log('ok')
                console.log(data)
                setUniversity(data.data)
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
        handleGetListUniversities();
    }, [])

    const handleDeleteSchool = async (schoolId) => {
        try {
            // Hiển thị modal xác nhận xóa trước khi gửi yêu cầu xóa trường đến API
            setDeleteConfirmationVisible(true);
            setSelectedSchoolId(schoolId);
            // Tiếp tục với phần xử lý xóa trường khi người dùng xác nhận
            // Gửi yêu cầu xóa trường đến API
            const response = await fetch(`https://project-software-z6dy.onrender.com/university/${selectedSchoolId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            const responseData = await response.json();

            if (response.ok) {
                // Xử lý khi xóa thành công
                console.log('Xóa trường thành công:', responseData);
                // Cập nhật danh sách trường sau khi xóa thành công
                const updatedUniversities = univercity.filter(university => university.id !== selectedSchoolId);
                setUniversity(updatedUniversities);
            } else {
                // Xử lý khi có lỗi từ phía server
                console.error('Lỗi khi xóa trường:', responseData.message);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error deleting school:', error);
            // Đặt giá trị của selectedSchoolId lại về giá trị mặc định
            setSelectedSchoolId(null);
        }
    };

    const handleAddSchool = async () => {
        try {
            const response = await fetch('https://project-software-z6dy.onrender.com/university', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    code: code,
                    image: image,
                })
            });


            const responseData = await response.json();

            if (response.ok) {
                // Xử lý khi thêm thành công
                console.log('Thêm trường mới thành công:', responseData);
                // Trích xuất dữ liệu từ phản hồi và cập nhật danh sách trường
                const newUniversity = {
                    id: responseData.data.id,
                    name: responseData.data.name,
                    image: responseData.data.image,
                };
                setUniversity([...univercity, newUniversity]);
                // Đóng modal sau khi thêm thành công
                setShowSignUpPopup(false);
            } else {
                // Xử lý khi có lỗi từ phía server
                console.error('Lỗi khi thêm trường mới:', responseData.message);
            }
            console.log(responseData.data.id)
            
            const response2 = await fetch('https://project-software-z6dy.onrender.com/users/university', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    fullName: name,
                    universityId: responseData.data.id,
                })
            });
            const responseData2 = await response2.json();

            if (response2.ok) {
                console.log('Thêm trường mới thành công:', responseData2);
            }
        } catch (error) {
            // Xử lý khi có lỗi trong quá trình thêm trường mới
            console.error('Lỗi khi thêm trường mới:', error);
        }
    };


    const handleConfirmDelete = () => {
        // Logic to delete school with the given id
        const updatedSchools = univercity.filter(school => school.id !== selectedSchoolId);
        setUniversity(updatedSchools);
        setSelectedSchoolId(null); // Clear selected school id
        setDeleteConfirmationVisible(false); // Close delete confirmation modal
    };

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    //what to render
    let content = null;
    if (isLoading) content = <>Loading ...</>;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
    if (!isLoading && !isError && univercity.length === 0) content = <div><Empty /></div>;
    if (!isLoading && !isError && univercity.length > 0) content =

        <>
            {univercity?.map((item, id) => (
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
            <SubHeader title='Universities' subtitle='Quản lý các trường .' />
            <div className="container" style={{ marginBottom: 80, marginTop: 50, marginLeft: 200, marginRight: 200 }}>
                <div className="container-fluid">
                    <div className='mb-4 section-title text-center' style={{ marginLeft: -250 }}>
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
                                        {/* <input required {...register("Tên trường")} className="form-control"/> */}
                                        <input className="form-control" onChange={(e) => setName(e.target.value)} placeholder='Tên trường' />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Mã trường</label>
                                        <input className="form-control" onChange={(e) => setCode(e.target.value)} placeholder='Mã trường' />
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="form-group mb-2 card-label">
                                        <label>Logo trường</label>
                                        <input style={{ alignItems: 'center', marginTop: 5 }} type="text" accept="image/*" onChange={(e) => setImage(e.target.value)} className="form-control" />
                                        {/* <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e)} className="form-control" />
                                            <button onClick={() => document.getElementById('fileInput').click()} className="btn btn-primary">Chọn tệp</button> */}

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-2 card-label">
                                        <label>Email</label>
                                        <input style={{ alignItems: 'center', marginTop: 5 }} type="text" accept="image/*" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                </div>

                            </form>
                            <div className="text-center mt-3 mb-5">
                                <button disabled={isLoading} className="appointment-btn" onClick={() => { handleAddSchool() }}>Thêm</button>
                            </div>
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