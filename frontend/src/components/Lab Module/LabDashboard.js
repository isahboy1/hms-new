import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import PendingLabRequest from './PendingLabRequest';
import LaboratorySetupForms from './LaboratorySetupForms';
import SampleCollection from './SampleCollection';
import SampleReceptionProcessing from './SampleReceptionProcessing';
import SampleAnalysis from './SampleAnalysis';
import PrintResult from './PrintResult';
import PathologistComment from './PathologistComment';
import SampleTracking from './SampleTracking';
import RequestProcessingForm from './RequestProcessingForm';

const Tabs =({ hideCarousel })=> {
    return (
        <div style={{width:'100%'}}>
            <NavLink to="/lab/laboratorySetupForms" className='btn btn-outline-success' onClick={hideCarousel} style={{width: '11vw'}}>Laboratory Setup Forms</NavLink>
            <NavLink to="/lab/completedLabTests" className='btn btn-outline-primary' onClick={hideCarousel} style={{width: '12.5vw'}}>Completed Lab Tests</NavLink>
            <NavLink to="/lab/sampleColection" className='btn btn-outline-danger' onClick={hideCarousel} style={{width: '11vw'}}>Sample Collection</NavLink>
            <NavLink to="/lab/sampleReceptionProcessing" className='btn btn-outline-warning' onClick={hideCarousel} style={{width: '13.8vw'}}>Sample reception/processing</NavLink>
            <NavLink to="/lab/sampleAnalysis" className='btn btn-outline-warning' onClick={hideCarousel} style={{width: '11vw'}}>Sample Analysis</NavLink>
            <NavLink to="/lab/pathologistComment" className='btn btn-outline-success' onClick={hideCarousel} style={{width: '12.5vw'}}>Pathologist Comment</NavLink>
            <NavLink to="/lab/sampleTracking" className='btn btn-outline-primary' onClick={hideCarousel} style={{width: '11vw'}}>Sample Tracking</NavLink>
            <NavLink to="/lab/printResult" className='btn btn-outline-danger' onClick={hideCarousel} style={{width: '13.8vw'}}>Print Result</NavLink>
        </div>
    )
}

const TabForm = ({ pendingRequest, req, isRoute, toggleRoute, showCarousel }) => {
    const routes = [
        {
            path: '/lab/completedLabTests',
            exact: true,
            main: () => <SampleTracking />,
        },
        {
            path: '/lab/LaboratorySetupForms',
            exact: true,
            main: () => <LaboratorySetupForms />,
        },
    
        {
            path: '/lab/SampleCollection',
            exact: true,
            main: () => <SampleCollection />,
        },
    
        {
            path: '/lab/SampleReceptionProcessing',
            exact: true,
            main: () => <SampleReceptionProcessing />,
        },
    
        {
            path: '/lab/SampleAnalysis',
            exact: true,
            main: () => <SampleAnalysis />,
        },
    
        {
            path: '/lab/printResult',
            exact: true,
            main: () => <PrintResult />,
        },
    
        {
            path: '/lab/PathologistComment',
            exact: true,
            main: () => <PathologistComment />,
        },
        
        {
            path: '/lab/SampleTracking',
            exact: true,
            main: () => <SampleTracking />,
        },
    ]
    return (
        <div>
            {isRoute &&
            <div style={{height: '60vh', width:'100%'}}>
                {routes.map((route) => (
                    <Route 
                        key={route.path}
                        path={route.path}
                        component={route.main}
                    />
                ))}
                { showCarousel && 
                    <div>
                        <h1>Carousel goes here</h1>
                    </div>
                }
                
            </div>}
            {!isRoute && 
            <div>
                <RequestProcessingForm 
                    req={req}
                    toggleRoute={toggleRoute}
                />
            </div>}
        </div>
    )
}

class LabDashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showCarousel: true
        }
    }
    hideCarousel=()=>{
        this.setState({ showCarousel: false })
    }
    render(){
        const { pendingRequest, req, isRoute, toggleRoute } = this.props;
        return (
            <div>
                <Tabs hideCarousel={this.hideCarousel}/>
                <br />
                <TabForm 
                    pendingRequest={pendingRequest} 
                    req={req} 
                    isRoute={isRoute} 
                    toggleRoute={toggleRoute}
                    showCarousel={this.state.showCarousel}
                />
            </div>
        )
    }
}

export default LabDashboard;