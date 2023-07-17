import React from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import ContactUs from '../ContactUs';
import Overview from '../Overview';

const { header, selectedLanguage } = getMetaDetails();

const Home = () => {
    return (
        <Wrapper className='page-width'>
            <div className="home-first-page">
                <Overview />
                <ContactUs />
            </div>
        </Wrapper>
    );
}

export default Home;
