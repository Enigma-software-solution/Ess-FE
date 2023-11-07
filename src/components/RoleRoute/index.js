import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLogedInUser } from 'src/store/slices/authSlice/selectors';

const RoleRoute = ({ allowedRoles, fallbackPath = '/login', ...props }) => {
    const navigate = useNavigate();
    const authUser = useSelector(getLogedInUser)

    const userRole = authUser?.role

    if (userRole && allowedRoles.includes(userRole)) {
        return <Outlet />;
    } else {
        navigate(fallbackPath);
        return null;
    }
};

export default RoleRoute