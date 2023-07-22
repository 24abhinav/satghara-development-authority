import React, { useEffect } from 'react';
import Wrapper from './style';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from '../SignIn';

const AdminHome = () => {
    const isSingedInUser = localStorage.getItem('sid');
    const navigate = useNavigate();

    useEffect(() => {
        if (isSingedInUser && window.location.pathname === '/sdaAdmin') {
            navigate('/sdaAdmin/visitors-contact')
        }
    }, []);

    return (
        <Wrapper className="page-width">
            <div className="admin">
                <div>
                    {isSingedInUser ? <Outlet /> : <SignIn />}
                </div>
            </div>
        </Wrapper>
    );
}

export default AdminHome;
