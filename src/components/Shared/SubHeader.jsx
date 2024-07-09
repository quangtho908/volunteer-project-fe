import React from 'react';
import bgImage from '../../images/banner2.jpg'

const SubHeader = ({title, subtitle}) => {
    const sectionStyle = {
        background: `url(${bgImage}) no-repeat 50% 50%`,
        backgroundSize: 'cover',
        padding: '120px 0px 70px 0px',
    };

    const overlayStyle = {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
        opacity: '0.1',
    };

    return (
        <section style={sectionStyle} className="about-us">
            <div style={overlayStyle} className="overlay"></div>
            <div className="container position-relative">
                <div className="row">
                    <div className="col-md-12">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-white text-uppercase'>{title}</h2>
                            <p className='text-white m-0'>{subtitle && subtitle}</p>
                            {/* {onAddSchoolClick && 
                                <button onClick={onAddSchoolClick} className="btn btn-primary mt-3">{buttonName}</button>
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SubHeader;
