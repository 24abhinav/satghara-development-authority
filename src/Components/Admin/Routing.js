import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VisitorsContact from './VisitorsContact';


const AdminRouting = () => {
    return (
        <Routes>
            <Route path='/sdpAdmin/visitors-contact' Component={VisitorsContact} ></Route>
        </Routes>
    )
}

export default AdminRouting;
