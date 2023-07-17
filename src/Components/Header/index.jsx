import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';

const { header, selectedLanguage } = getMetaDetails();

const Options = () => (
    <ul className='options'>
        {header.options.map(({ name = '', url = '' }) => (
            <li key={name}><NavLink className={({ isActive }) => isActive ? 'link-active' : ''} to={url}>{name}</NavLink></li>
        ))}
        <li>
            <select defaultValue={selectedLanguage} onChange={e => { 
                localStorage.setItem('selectedLanguage', e.target.value || 'english');
                window.location.reload()
                }}>
                <option value="english">English</option>
                <option value="hindi">हिंदी</option>
            </select>
        </li>
    </ul>
)

const Headers = () => {
    const [mobileHeader, setMobileHeader] = useState(false);
    const mobileHeaderRef = useRef(null);

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
        <Wrapper mobileHeader={mobileHeader}>
            <div className='page-width header'>
                <div className="heading">
                    <img src={header.logo} alt={header.alt} />
                    <h3 dangerouslySetInnerHTML={{__html: header.heading}} />
                </div>
                <nav>
                    <Options />
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
                    <Options />
                </nav>
            </div>
        </Wrapper>
    );
}

export default Headers;
