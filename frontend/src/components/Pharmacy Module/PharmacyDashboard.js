import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import PendingPharmacyRequest from './PatientPrescriptionList';
import SalesReport from './SalesReport';
import UpToDateStockBalance from './UpToDateStockBalance';
import EditDrugs from './EditDrugs';

const Tabs =()=> {
    return (
        <div style={{width:'100%'}}>
            <NavLink to="/pharmacy/pendingPrescriptionRequest" className='btn btn-outline-success' style={{width: '16vw'}}>Pending Prescription Requests</NavLink>
            <NavLink to="/pharmacy/addDrugs" className='btn btn-outline-warning' style={{width: '16vw'}}>Add Drugs</NavLink>
            <NavLink to="/pharmacy/editDrugs" className='btn btn-outline-primary' style={{width: '16vw'}}>Edit Drugs</NavLink>
            <NavLink to="/pharmacy/dailyInventoryReport" className='btn btn-outline-danger' style={{width: '16vw'}}> Daily Inventory Report</NavLink>
            <NavLink to="/pharmacy/salesReport" className='btn btn-outline-secondary' style={{width: '16vw'}}>Sales Report</NavLink>
            <NavLink to="/pharmacy/upToDateStockBalance" className='btn btn-outline-success' style={{width: '16vw'}}>Up To Date Stock Balance</NavLink>
        </div>
    )
}

const TabForm = ({ pendingRequest }) => {
    const routes = [
        {
          path: '/pharmacy/pendingPrescriptionRequest',
          main: () => <PendingPharmacyRequest />,
        },
        {
          path: '/pharmacy/salesReport',
          main: () => <SalesReport />,
        },
        {
          path: '/pharmacy/upToDateStockBalance',
          main: () => <UpToDateStockBalance />,
        },
        {
          path: '/pharmacy/editDrugs',
          main: () => <EditDrugs />,
        },
        {
          path: '/pharmacy/dailyInventoryReport',
          main: () => <EditDrugs />,
        },
    ];
    return (
        <div style={{height: '60vh', width:'100%'}}>
            {routes.map((route) => (
                <Route 
                    key={route.path}
                    path={route.path}
                    component={route.main}
                />
            ))}
        </div>
    )
}

const PharmacyDashboard =({ pendingRequest })=> {
    return (
        <div>
            <Tabs />
            <TabForm pendingRequest={pendingRequest} />
        </div>
    )
}

export default PharmacyDashboard;