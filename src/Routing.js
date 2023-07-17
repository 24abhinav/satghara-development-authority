import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Overview from './Components/Overview';
import Donation from './Components/Donation';
import Program from './Components/Program';

const Routing = () => {
    return (
        <Routes>
            <Route path='/' exact Component={Home} ></Route>
            <Route path='*' Component={Home} ></Route>
            <Route path='/overview' Component={Overview} ></Route>
            <Route path='/donation' Component={Donation} ></Route>
            <Route path='/program' Component={Program} ></Route>
        </Routes>
    )
}

export default Routing;