import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function AdminPrivateRoute() {
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  return isAdmin ? <Outlet /> : <Navigate to="/AdminLogin" />;
}

export default AdminPrivateRoute;
