import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Overview from './Components/Overview';
import Donation from './Components/Donation';
import Program from './Components/Program';
import About from './Components/About';
import Admin from './Components/Admin/Home';
import AdminRouting from './Components/Admin/Routing';
import VisitorsContact from './Components/Admin/VisitorsContact';

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
                <Route path='visitors-contact' Component={VisitorsContact} ></Route>
            </Route>
        </Routes>
    )
}

export default Routing;