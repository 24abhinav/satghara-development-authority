import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrgUser from './Components/Admin/OrgUser';
import ResetPassword from './Components/Admin/ResetPassword';

const Home = React.lazy(() => import('./Components/Home'));
const Overview = React.lazy(() => import('./Components/Overview'));
const Donation = React.lazy(() => import('./Components/Donation'));
const Program = React.lazy(() => import('./Components/Program'));
const About = React.lazy(() => import('./Components/About'));

// Admin route
const Admin = React.lazy(() => import('./Components/Admin/Home'));
const AdminContact = React.lazy(() => import('./Components/Admin/VisitorsContact'));
const AdminDonation = React.lazy(() => import('./Components/Admin/Donation'));
const MetaDetails = React.lazy(() => import('./Components/Admin/MetaDetails'));

const Routing = () => {
    return (
        <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='*' Component={Home} />
            <Route path='/overview' Component={Overview} />
            <Route path='/about-us' Component={About} />
            <Route path='/donation' Component={Donation} />
            <Route path='/program' Component={Program} />
            <Route path='/sdf-admin' Component={Admin} >
                <Route path='visitors-contact' Component={AdminContact} ></Route>
                <Route path='donation' Component={AdminDonation} ></Route>
                <Route path='page-meta' Component={MetaDetails} ></Route>
                <Route path='org-user' Component={OrgUser} ></Route>
                <Route path='create-password/:token' Component={ResetPassword} ></Route>
            </Route>
        </Routes>
    )
}

export default Routing;