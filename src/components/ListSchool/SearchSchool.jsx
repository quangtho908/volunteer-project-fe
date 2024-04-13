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

    const [university, setUniversity] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = university.slice(indexOfFirstItem, indexOfLastItem);

    // Mock meta data
    const mockMeta = { total: university.length };
    const imageUrl = "https://upload.wikimedia.org/wikipedia/vi/e/e1/Logo_HCMUAF.svg";
    const handleGetListUniversities = async () => {
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
    if (!isLoading && !isError && university.length === 0) content = <div><Empty /></div>;
    if (!isLoading && !isError && university.length > 0) content =
        
    <>
    {currentItems.map((item, id) => (
        <div key={id + item.id} className="mb-4 rounded" style={{ background: '#f3f3f3', alignContent: 'center' }}>
            <div onClick={() => {
               handleDetail(item.id);
            }} className='d-flex p-3 justify-content-between'>
                <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        <img src={imageUrl} alt={item.name} className="" style={{ width: 80, height: 80, marginRight: 10}} />
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
                            <div className="pagination-container">
                                <Pagination
                                current={currentPage}
                                total={university.length}
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
export default SearchSchool