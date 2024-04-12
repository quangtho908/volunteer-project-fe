import React, { useEffect, useState } from 'react';
import Footer from '../Shared/Footer/Footer';
// import SearchSidebar from './SearchSidebar';
// import SearchContent from './SearchContent';
import { useDebounced } from '../../utils/hooks/useDebounced';
// import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty, message } from 'antd';
import { Pagination } from 'antd';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { useNavigate } from 'react-router-dom';

const SearchSchool = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByGender, setSorByGender] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [priceRange, setPriceRange] = useState({});
    const [infoError, setInfoError] = useState('');
    // Đặt giá trị mặc định cho isLoading và isError
    const isLoading = false;
    const isError = false;

    const navigate = useNavigate();

    const handleDetail = (id) => {
        navigate('/listProjectSV/' + id);
    }

    const mockSchoolsData = [
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
    ];
    const [univercity, setUniversity] = useState([]);
    // Mock meta data
    const mockMeta = { total: univercity.length };
    //  // Render danh sách trường đại học
    //  const startIndex = (page - 1) * size;
    //  const endIndex = startIndex + size;
    //  const displayedSchools = mockSchoolsData.slice(startIndex, endIndex);
    
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
    //what to render
    let content = null;
    if (isLoading) content = <>Loading ...</>;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
    if (!isLoading && !isError && univercity.length === 0) content = <div><Empty /></div>;
    if (!isLoading && !isError && univercity.length > 0) content =
        
    <>
    {univercity?.map((item, id) => (
        <div key={id + item.id} className="mb-4 rounded" style={{ background: '#f3f3f3', alignContent: 'center' }}>
            <div onClick={() => {
               handleDetail(item.id);
            }} className='d-flex p-3 justify-content-between'>
                <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        <img src={item.avatar} alt={item.name} className="" style={{ width: 50, height: 50, marginRight: 10 }} />
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'>{item.name}</h5>
                        <p className="doc-department m-0">University</p>
                    </div>
                </div>
            </div>
        </div>
    ))}
</>

    const onShowSizeChange = (current, pageSize) => {
        setPage(current);
        setSize(pageSize);
    };

    useEffect(() => {
        handleGetListUniversities();
    }, [])

   
    return (
        <div>
            <Header />
            <SubHeader title='Universities' subtitle='Chọn trường bạn đang theo học.' />
            <div className="container" style={{ marginBottom: 80, marginTop: 80, marginLeft: 200, marginRight: 200}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-8 col-xl-9 " >
                            {content}
                            <div className='text-center mt-5 mb-5'>
                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={univercity.length}
                                    pageSize={size}
                                    // current={page}
                                    // pageSize={10}
                                    // total={mockMeta.total}
                                    // showSizeChanger
                                    // onShowSizeChange={onShowSizeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default SearchSchool