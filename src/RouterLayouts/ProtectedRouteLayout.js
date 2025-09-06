import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthLayout from 'components/layouts/AuthLayout/AuthLayout';

export const ProutectedRouterLayout = () => {
    const user = useSelector(store => store.users.user);

    if (!user) {
        return <Navigate to='/login' />
    }
    
    return (
            <AuthLayout />
    );
}