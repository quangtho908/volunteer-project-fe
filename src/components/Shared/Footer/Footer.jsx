import React from 'react';
import './Footer.css';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer position-relative mt-4">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img src="https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-school-icon-for-your-project-png-image_1520454.jpg" alt="" className="w-100 h-100" style={{ maxWidth: '160px' }} />
									</Link>
								</div>
								<div className="footer-about-content">
									<p className='form-text' style={{maxWidth:200}}>Tham gia cùng chúng tôi để tạo ra sự khác biệt trong mùa hè này thông qua các hoạt động và dự án phục vụ cộng đồng.</p>
								</div>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">Dành Cho Tình Nguyện Viên</h2>
								<ul>
									<li><Link to={'/activities'}><FaAngleDoubleRight className='icon' /> Hoạt Động</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> Đăng Nhập</Link></li>
									<li><Link to={'/register'}><FaAngleDoubleRight className='icon' /> Đăng Ký</Link></li>
									<li><Link to={'/schedule'}><FaAngleDoubleRight className='icon' /> Lịch Trình</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">Dành Cho Người Tổ Chức</h2>
								<ul>
									<li><Link to={'/appointments'}><FaAngleDoubleRight className='icon' /> Cuộc Hẹn</Link></li>
									<li><Link to={'/login/admin'}><FaAngleDoubleRight className='icon' /> Đăng Nhập</Link></li>
									<li><Link to={'/register/organizer'}><FaAngleDoubleRight className='icon' /> Đăng Ký</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title mt-3 mt-md-0">Liên Hệ</h2>
								<div className="footer-contact-info">
									<div className="footer-contact-info">
										<span><i className="fas fa-map-marker-alt"></i></span>
										<p> Khu phố 6, Linh Trung<br /> Thành Phố Thủ Đức </p>
									</div>
									<div className="footer-contact-info mb-3">
										<i className="fas fa-phone-alt"></i>
										+0123 456 789
									</div>
									<div className="footer-contact-info">
										<i className="fas fa-envelope"></i>
										nonglam@muaxanh.com
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container-fluid">
					<div className="copyright">
						<div className="row">
							<div className="col-md-6 col-lg-6">
								<div className="copyright-text">
									<p className="mb-0">Bản quyền {(new Date()).getFullYear()} Tất cả các quyền được bảo lưu</p>
								</div>
							</div>
							<div className="col-md-6 col-lg-6">
								<div className="copyright-menu">
									<ul className="policy-menu d-flex gap-2 justify-content-center">
										<Link to={'/terms'} className='text-white'>Điều Khoản và Điều Kiện</Link>
										<Link to={'/policy'} className='text-white'>Chính Sách</Link>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
