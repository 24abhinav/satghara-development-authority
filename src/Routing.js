import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Components/Home'));
const Overview = React.lazy(() => import('./Components/Overview'));
const Donation = React.lazy(() => import('./Components/Donation'));
const Program = React.lazy(() => import('./Components/Program'));
const About = React.lazy(() => import('./Components/About'));

// Admin route
const Admin = React.lazy(() => import('./Components/Admin/Home'));
const AdminContact = React.lazy(() => import('./Components/Admin/VisitorsContact'));
const AdminDonation = React.lazy(() => import('./Components/Admin/Donation'));

const Routing = () => {
    return (
        <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='*' Component={Home} />
            <Route path='/overview' Component={Overview} />
            <Route path='/about-us' Component={About} />
            <Route path='/donation' Component={Donation} />
            <Route path='/program' Component={Program} />
            <Route path='/sdpAdmin' Component={Admin} >
                <Route path='' Component={AdminContact} ></Route>
                <Route path='donation' Component={AdminDonation} ></Route>
            </Route>
        </Routes>
    )
}

export default Routing;