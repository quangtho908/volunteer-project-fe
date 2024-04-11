// import React from 'react'
// import Header from '../../Shared/Header/Header'
// import Footer from '../../Shared/Footer/Footer'
// import SubHeader from '../../Shared/SubHeader'
// import SearchSidebar from './SearchSidebar'
import ProjectContent from './ProjectContent'
import React, { useState } from 'react';
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


const ListProject = () => {
 
  return (
    <div>
            <Header />
            <SubHeader title='Doctors' subtitle='Lorem ipsum dolor sit amet.' />
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">
                      
                        <ProjectSidebar/>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {/* {content} */}
                            <div className='text-center mt-5 mb-5'>
                                {/* <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={meta?.total}
                                    pageSize={size}
                                /> */}
                                <ProjectContent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
  )
}

export default ListProject