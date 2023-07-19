import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import ADMIN_STATIC from '../Admin/constant';

const Options = ({ options = [], selectedLanguage = '', isAdmin = false }) => (
    <ul className='options'>
        {(isAdmin ? ADMIN_STATIC.navOption : options).map(({ name = '', url = '' }) => (
            <li key={name}><NavLink className={({ isActive }) => isActive ? 'link-active' : ''} to={url}>{name}</NavLink></li>
        ))}
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

const Headers = ({ isAdmin = false }) => {
    const [mobileHeader, setMobileHeader] = useState(false);
    const mobileHeaderRef = useRef(null);
    const { header: { options = [], logo = '', alt = '', heading = '' } = {}, selectedLanguage, apiBaseUrl = '' } = getMetaDetails();

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

    return (
        <Wrapper $mobileHeader={mobileHeader}>
            <div className='page-width header'>
                <div className="heading">
                    <img src={`${apiBaseUrl}/${logo}`} alt={alt} />
                    <h3>
                        <span dangerouslySetInnerHTML={{__html: heading}} />
                        {isAdmin && (<span>{' Admin '}</span>)}
                    </h3>
                </div>
                <nav>
                    <Options isAdmin={isAdmin} options={options} selectedLanguage={selectedLanguage} />
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
                    <Options isAdmin={isAdmin} options={options} selectedLanguage={selectedLanguage} />
                </nav>
            </div>
        </Wrapper>
    );
}

export default Headers;
