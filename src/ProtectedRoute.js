import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const [role, setRole] = useState(5);
//   const token = getFromLocalStorage('token');
useEffect(() => {
    const rolee = JSON.parse(localStorage.getItem('role'));
    if(rolee){
        setRole(rolee);
    }
    
}, [role]);
  if ((role !== 0)) {
    return <Navigate to="/login" />; // hoặc trang bạn muốn chuyển hướng khi không có token
  }
  return children;
};
export default ProtectedRoute;
// Sử dụng trong App.jsx
