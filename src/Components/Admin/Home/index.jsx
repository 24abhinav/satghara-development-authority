import React from 'react';
import Wrapper from './style';
import { NavLink, Outlet } from 'react-router-dom';
import ADMIN_STATIC from '../constant';

const Program = () => {
    return (
        <Wrapper className="page-width">
            <h4>Satghara Development Foundation admin panel</h4>
            <div className="admin">
                <nav>
                    <ul>
                        {ADMIN_STATIC.homepageLinks.map(({ to, label }) => (
                            <li>
                                <NavLink
                                    className={({ isActive }) => isActive ? 'link-active' : ''}
                                    to={to}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <Outlet />
                </div>
            </div>
        </Wrapper>
    );
}

export default Program;
