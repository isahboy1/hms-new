import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { PcomplaintsForm } from './PcomplaintsForm';
import HistoryForm from './HistoryForm';
import SystemExaminationForm from './SysExaminationEdit';
import CreateVitalSigns from './CreateVitalSigns';
import NewProblems from './NewProblems';
import { NewRadiologyInvestigations } from './NewRadiologyInvestigations';
import NewProvisionalDiagnosis from './NewProvisionalDiagnosis';
import CreateAthropometry from './CreateAthropometry';
import EditManagementplan from './EditManagementplan';
import EditPrescriptionRequest from './EditPrescriptionRequest';
import EditDressingRequest from './EditDressingRequest';
import EditObservationRequest from './EditObservationRequest';
import PreviousMedicalHistoryForm from './PreviousMedicalHistoryForm';

const Tabs =()=> {
    
    return (
        <div style={{width:'100%'}}>
            <NavLink to="/patient_clarking/vital_signs" className='btn btn-outline-primary' style={{width: '12vw'}}>Vital Signs</NavLink>
            <NavLink to="/patient_clarking/presenting_complaints" className='btn btn-outline-warning' style={{width: '12vw'}} title="Patient Complaints">Presenting Complaints</NavLink>
            <NavLink to="/patient_clarking/history" className='btn btn-outline-success' style={{width: '12vw'}}>History</NavLink>
            <NavLink to="/patient_clarking/previous_medical_history" className='btn btn-outline-info' style={{width: '12vw'}}>Previous Medical History</NavLink>
            <NavLink to="/patient_clarking/system_examination" className='btn btn-outline-danger' style={{width: '12vw'}}>System Examination</NavLink>
            <NavLink to="/patient_clarking/problems" className='btn btn-outline-secondary' style={{width: '12vw'}}>Problems</NavLink>
            <NavLink to="/patient_clarking/provisional_diagnosis" className='btn btn-outline-primary' style={{width: '12vw'}}>Provisional Diagnosis</NavLink>
            <NavLink to="/patient_clarking/athropometry" className='btn btn-outline-warning' style={{width: '12vw'}}>Athropometry</NavLink>
            <NavLink to="/patient_clarking/management_plan" className='btn btn-outline-success' style={{width: '12vw'}}>Management Plan</NavLink>
            <NavLink to="/patient_clarking/dressing_request" className='btn btn-outline-info' style={{width: '12vw'}}>Dressing Request</NavLink>
            <NavLink to="/patient_clarking/observation_request" className='btn btn-outline-danger' style={{width: '12vw'}}>Observation Request</NavLink>
            <NavLink to="/patient_clarking/prescription_request" className='btn btn-outline-info' style={{width: '12vw'}}>Prescription Request</NavLink>
            <NavLink to="/patient_clarking/radiological_investigation" className='btn btn-outline-danger' style={{width: '12vw'}}>Investigations</NavLink>
        </div>
    )
}

const TabForm = () => {
    return (
            <div style={{height: '60vh', width:'100%'}}>
                <Route path="/patient_clarking/presenting_complaints" component={PcomplaintsForm}/>
                <Route path="/patient_clarking/history" component={HistoryForm}/>
                <Route path="/patient_clarking/previous_medical_history" component={PreviousMedicalHistoryForm}/>
                <Route path="/patient_clarking/system_examination" component={SystemExaminationForm}/>
                <Route path="/patient_clarking/vital_signs" component={CreateVitalSigns}/>
                <Route path="/patient_clarking/problems" component={NewProblems}/>
                <Route path="/patient_clarking/radiological_investigation" component={NewRadiologyInvestigations}/>
                <Route path="/patient_clarking/provisional_diagnosis" component={NewProvisionalDiagnosis}/>
                <Route path="/patient_clarking/athropometry" component={CreateAthropometry}/>
                <Route path="/patient_clarking/management_plan" component={EditManagementplan}/>
                <Route path="/patient_clarking/prescription_request" component={EditPrescriptionRequest}/>
                <Route path="/patient_clarking/observation_request" component={EditObservationRequest}/>
                <Route path="/patient_clarking/dressing_request" component={EditDressingRequest}/>
            </div>
    )
}

const Diagnosis =()=> {
    return (
        <div>
            <Tabs />
            <TabForm />
        </div>
    )
}

export default Diagnosis;