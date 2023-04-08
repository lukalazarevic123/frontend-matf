import { Outlet, Navigate } from 'react-router-dom';

export const CheckAuth = () => {

    const token = true;

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    );
}