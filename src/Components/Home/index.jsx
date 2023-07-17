import React from 'react';
import Wrapper from './style';
import ContactUs from '../ContactUs';
import Overview from '../Overview';

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
