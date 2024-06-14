import React from 'react';
import Wrapper from './style';
import ContactUs from '../ContactUs';
import Programs from '../Programs';
import { getMetaDetails } from '../../handlers';

const Home = () => {
    const { overviewPage = {} } = getMetaDetails() || {};
    return (
        <Wrapper className='page-width'>
            <h3>{overviewPage.QuickHeading}</h3>
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
