import React from 'react';
import Wrapper from './style';
import { Outlet } from 'react-router-dom';
import SignIn from '../SignIn';

const AdminHome = () => {
    const isSingedInUser = localStorage.getItem('sid');

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
