import React from 'react';
import Wrapper from './style';
import ContactUs from '../ContactUs';
// import QuickOverview from '../QuickOverview';
import Programs from '../Programs';

const Home = () => {
    return (
        <Wrapper className='page-width'>
            <div className="home-first-page m-b-20">
                <div className="programs-page m-b-20">
                    <Programs />
                </div>
                <div className="contact-us-page m-b-20">
                    <ContactUs />
                </div>
            </div>
        </Wrapper>
    );
}

export default Home;
