import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import ADMIN_STATIC from '../Admin/constant';
import Manifest from '../../manifest';

const Options = ({ options = [], selectedLanguage = '', isAdmin = false }) => { 

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <ul className='options'>
            {(isAdmin ? ADMIN_STATIC.navOption : options).map(({ name = '', url = '' }) => (
                <li key={name}><NavLink className={({ isActive }) => isActive ? 'link-active' : ''} to={url}>{name}</NavLink></li>
            ))}
            {isAdmin && <li><button className='primary-btn' onClick={logout}>Logout</button></li>}
            {!isAdmin && (
                <li>
                    <select defaultValue={selectedLanguage} onChange={e => {
                            sessionStorage.removeItem('pageMeta')
                            localStorage.setItem('selectedLanguage', e.target.value || 'english');
                            window.location.reload()
                        }}>
                        <option value="english">English</option>
                        <option value="hindi">हिंदी</option>
                    </select>
                </li>
            )}
        </ul>
    )
}

const Headers = ({ isAdmin = false }) => {
    const isSingedInUser = localStorage.getItem('x-session-token');
    const [mobileHeader, setMobileHeader] = useState(false);
    const mobileHeaderRef = useRef(null);
    const { header: { options = [], logo = '', alt = '', heading = '' } = {}, selectedLanguage } = getMetaDetails();

    const toggleMobileHeader = () => {
        const newState = !mobileHeader
        setMobileHeader(newState);
        if (newState) {
            window.document.body.style.height = '100vh';
            window.document.body.style.overflow = 'hidden';
        } else {
            window.document.body.style.height = 'auto';
            window.document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        if (mobileHeaderRef.current) {
            mobileHeaderRef.current.addEventListener('click', e => {
                console.log('click')
                e.stopPropagation();
            });
        }
    }, [mobileHeaderRef]);

    let view = true;

    if (isAdmin) {
        view = isSingedInUser;
    }

    return (
        <Wrapper $mobileHeader={mobileHeader}>
            <div className='page-width header'>
                <div className="heading">
                    <img src={`${Manifest.apiBashUrl}/${logo}`} alt={alt} />
                    <h3>
                        <span dangerouslySetInnerHTML={{__html: heading}} />
                        {isAdmin && (<span>{' Admin '}</span>)}
                    </h3>
                </div>
                <nav>
                    {view && <Options isAdmin={isAdmin} options={options} selectedLanguage={selectedLanguage} /> }
                </nav>
                <div className="mobile-icon">
                    <div className="hamburger" onClick={toggleMobileHeader}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="mobile-header" onClick={toggleMobileHeader}>
                <nav ref={mobileHeaderRef} className="mobile-options">
                    {view && <Options isAdmin={isAdmin} options={options} selectedLanguage={selectedLanguage} /> }
                </nav>
            </div>
        </Wrapper>
    );
}

export default Headers;
