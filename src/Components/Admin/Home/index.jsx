import React, { useEffect } from 'react';
import Wrapper from './style';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from '../SignIn';

const AdminHome = () => {
    const isSingedInUser = localStorage.getItem('x-session-token');
    const navigate = useNavigate();

    useEffect(() => {
        if (isSingedInUser && window.location.pathname === '/sdf-admin') {
            navigate('/sdf-admin/visitors-contact')
        }
    }, []);

    const resetPwPage = window.location.pathname.includes('/sdf-admin/create-password');

    return (
        <Wrapper className="page-width">
            <div className="admin">
                <div>
                    {(isSingedInUser || resetPwPage) ? <Outlet /> : <SignIn />}
                </div>
            </div>
        </Wrapper>
    );
}

export default AdminHome;
