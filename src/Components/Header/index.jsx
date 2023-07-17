import React from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';

const { header, selectedLanguage } = getMetaDetails();

const Headers = () => {
    return (
        <Wrapper>
            <div className='page-width header'>
                <div className="heading">
                    <img src={header.logo} alt={header.alt} />
                    <h3 dangerouslySetInnerHTML={{__html: header.heading}} />
                </div>
                <ul className='options'>
                    {header.options.map(({ name = '', url = '' }) => (
                        <li key={name}><a href={url}>{name}</a></li>
                    ))}
                    <li>
                        <select defaultValue={selectedLanguage} onChange={e => { 
                            localStorage.setItem('selectedLanguage', e.target.value || 'english');
                            window.location.reload()
                         }}>
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                        </select>
                    </li>
                </ul>
                <div className="mobile-icon">
                    <div className="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Headers;
