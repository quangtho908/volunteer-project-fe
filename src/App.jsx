
import Home from './components/Home/Home/Home';
import SignInForm from './components/Login/SignInForm';
import DoctorBooking from './components/Booking/DoctorBooking/DoctorBooking';
import BookingSuccess from './components/Booking/BookingSuccess';
import BookingInvoice from './components/Booking/BookingInvoice/BookingInvoice';
import DoctorProfile from './components/Doctor/DoctorProfile/DoctorProfile';
import Appointments from './components/Doctor/Appointments/Appointments';
import MyPatients from './components/Doctor/MyPatients/MyPatients';
import Reviews from './components/Doctor/Reviews/Reviews';
import Schedule from './components/Doctor/Schedule/Schedule';
import ProfileSetting from './components/Doctor/ProfileSetting/ProfileSetting';
import ChangePassword from './components/Doctor/ChangePassword/ChangePassword';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminAppointments from './components/Admin/Appointments/Appointments';
import Doctors from './components/Admin/Doctors/Doctors';
import Patients from './components/Admin/Patients/Patients';
import Profile from './components/Admin/Profile/Profile';
import Transactions from './components/Admin/Transactions/Transactions';
import Specialites from './components/Admin/Specialites/Specialites';
import AdminReviews from './components/Admin/Reviews/Reviews'
import PatientFavouriteDoctor from './components/Doctor/PatientFavourite/PatientFavourite';
import DoctorInvoice from './components/Doctor/Invoice/DoctorInvoice';
import SearchDoctor from './components/Doctor/SearchDoctor/SearchDoctor';
import Blogs from './components/Doctor/Blogs/Blogs';
import BlogsEdit from './components/Doctor/Blogs/BlogsEdit';
import AddBlog from './components/Doctor/Blogs/AddBlog';
import Blog from './components/Blog/Blog';
import BlogDetails from './components/Blog/BlogDetails';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import CampaignDetails from "./components/CampaignDetailsUniver/CampaignDetails";
import AppointmentPage from './components/Appointment/AppointmentPage';
import TrackAppointment from './components/TrackAppointment/TrackAppointment';
import Treatment from './components/Doctor/Treatment/Treatment';
import Prescription from './components/Doctor/Prescription/Prescription';
import PrescriptionView from './components/Doctor/Prescription/PrescriptionView';
import TreatmentEdit from './components/Doctor/Treatment/TreatmentEdit';
import ViewAppointment from './components/Doctor/Appointments/ViewAppointment';
import ForgotPassword from './components/Login/ForgotPassword';
import Dashboard from './components/Doctor/Dashboard/Dashboard';
import PrivateOutlet from './components/Shared/PrivateOutlet';
import NotFound from './components/UI/NotFound';
import Choserole from './components/ChoseRole/ChoseRole';

import ListProject from './components/ListProject/ListProject';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ListCampaign from './components/ListCampain/ListCampaign';
import SearchSchool from './components/ListSchool/SearchSchool';
import CompaignDetail from './components/CompaignDetail/CompainDetail';
import CreateCampaigns from './components/Campaign/CreateCampaigns';
import StudentList from './components/StudentList/StudentList';

import ListProjectSV from './components/ListProject/ListProjectSV';
import ManageSchools from './components/ListSchool/ManagementSchool';
import ProtectedRoute from './ProtectedRoute';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateOutlet />}>
        </Route>
        <Route path='/login' element={<SignInForm />} />
        <Route path='/list-campaign' element={<ListCampaign />} />
        <Route path='/campaignDetail/:id' element={<CompaignDetail />} />
        <Route path='/createCampaigns' element={<CreateCampaigns />} />
        <Route path='/listProjectAdmin' element={<ListProject />} />
        <Route path='/manageSchools' element={<ManageSchools />} />
        <Route path='/choseRole' element={<Choserole />} />
        <Route path='/' element={<Choserole />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path='/detail/studentList/:id' element={<StudentList />} />
        <Route path='/school' element={<SearchSchool />} />
        <Route path='/listProjectSV/:id' element={<ListProjectSV />} />
        <Route path='/manageSchools' element={<ManageSchools />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router >
  );
}
export default App;
