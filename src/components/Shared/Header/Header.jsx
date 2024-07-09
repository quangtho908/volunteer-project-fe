import { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../images/logo.png';
import avatar from '../../../images/avatar.jpg';
import { Button, message } from 'antd';

const Header = () => {
    const navigate = useNavigate();
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);


    // const lastScrollRef = useRef(0);
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // if (currentScroll > lastScrollRef.current) { // Undo scroll up effect
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
        // lastScrollRef.current = currentScroll;
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => window.removeEventListener('scroll', handleScroll));
    }, [])

    const hanldeSignOut = () => {
        message.success("Đăng xuất thành công")
        setIsLogged(false);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
            return
        }
        navigate('/');
    }, [isLoggedIn])
    
    return (
        <>
            <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
                <div className="container">
                    <Link to={'/'} className="logo me-auto">
                        <img src="https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-school-icon-for-your-project-png-image_1520454.jpg" alt="" className="img-fluid" />
                    </Link>
                    { isLoggedIn &&
                        <Link className="appointment-btn scrollto">
                            <span onClick={() => {
                                hanldeSignOut();
                            }} className="d-none d-md-inline">Đăng xuất</span></Link>

                    }

                </div>
            </header>
        </>
    )
}

export default Header