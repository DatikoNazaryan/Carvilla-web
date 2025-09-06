import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux";

import styles from 'components/App/App.module.scss'


export const PublicRouterLayout = () => {
    const user = useSelector(store => store.users.user);
    
    return user ? <Navigate to="/feed" /> :  
        (
            <div className={styles.authBlock}>
              <Outlet />
            </div>
        );
}