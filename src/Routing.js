import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Components/Home'));
const Overview = React.lazy(() => import('./Components/Overview'));
const Donation = React.lazy(() => import('./Components/Donation'));
const About = React.lazy(() => import('./Components/About'));

// Admin route
const Admin = React.lazy(() => import('./Components/Admin/Home'));
const AdminContact = React.lazy(() => import('./Components/Admin/VisitorsContact'));
const AdminDonation = React.lazy(() => import('./Components/Admin/Donation'));
const MetaDetails = React.lazy(() => import('./Components/Admin/MetaDetails'));
const OrgUser = React.lazy(() => import('./Components/Admin/OrgUser'));
const ResetPassword = React.lazy(() => import('./Components/Admin/ResetPassword'));
const AdminPrograms = React.lazy(() => import('./Components/Admin/Programs'));

const Routing = () => {
    return (
        <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='*' Component={Home} />
            <Route path='/overview' Component={Overview} />
            <Route path='/about-us' Component={About} />
            <Route path='/donation' Component={Donation} />
            <Route path='/sdf-admin' Component={Admin} >
                <Route path='visitors-contact' Component={AdminContact} ></Route>
                <Route path='donation' Component={AdminDonation} ></Route>
                <Route path='page-meta' Component={MetaDetails} ></Route>
                <Route path='org-user' Component={OrgUser} ></Route>
                <Route path='create-password/:token' Component={ResetPassword} ></Route>
                <Route path='programs' Component={AdminPrograms}></Route>
            </Route>
        </Routes>
    )
}

export default Routing;