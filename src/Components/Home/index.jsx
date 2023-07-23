import React from 'react';
import Wrapper from './style';
import ContactUs from '../ContactUs';
import QuickOverview from '../QuickOverview';

const Home = () => {
    return (
        <Wrapper className='page-width'>
            <div className="home-first-page m-b-20">
                <QuickOverview />
                <ContactUs />
            </div>
        </Wrapper>
    );
}

export default Home;
