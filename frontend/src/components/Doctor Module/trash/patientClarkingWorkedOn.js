import React from 'react';
import { Button, Figure, Form, FormGroup,Container, Table, Row, Col,
   Label, Input,  FormText, Collapse, Card, CardBody,
   InputGroupAddon, InputGroup,} from 'reactstrap';
import PatientForm from './PatientForm';
import Athropometry from './Athropometry';
import PComplaints from './Pcomplaints';
import SysExamination from './SysExamination';
import Problems from './Problems';
import ProvisionalDiagnosis from './ProvisionalDiagnosis';
import VitalSigns from './VitalSigns';
import RadiologyInvestigations from './RadiologyInvestigations';
import Managementplan from './Managementplan';
import History from './History';
import Prequest from './Prequest';
import DressingRequest from './DressingRequest';
import ObservationRequestion from './ObservationRequest';
import 'bootstrap/dist/css/bootstrap.css';
import PreviousVisits from './PreviousVisits';
import { DoctorGuide } from './Guides';
import Image from './Image';
import AssignedList from './AssignedList';
import LastDiagnosis from './LastDiagnosis';
import FreeScrollBar from 'react-free-scrollbar';
import './doctor.css';

class PatienClarking extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    
    this.state = { 
      collapse: true,
      patientrecords: [],
      fullDiagnosis: JSON.stringify(localStorage.getItem('fullDiagnosis')),
      status: 'admission'
  };
  }


fetchDiagnosis(){

    let self = this;
    
    fetch('http://localhost:4000/diagnosis/fullDiagnosis', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        localStorage.setItem('fullDiagnosis', JSON.stringify(data))
    }).catch(err => {
        return err;
    })
  }


  toggle(patientrecord) {
    this.setState({ 
        collapse: false,
        id: patientrecord.id,
        firstname: patientrecord.firstname,
        surname: patientrecord.surname,
        age: patientrecord.age,
        gender: patientrecord.Gender,
        maritalStatus: patientrecord.maritalstatus,
        DOB: patientrecord.DOB,
        religion: patientrecord.religion,
        phoneNo: patientrecord.phoneNo,
        tribe: patientrecord.tribe,
        email: patientrecord.email,
        seen_by: 'Dr. Saada',
        status: patientrecord.status
    });
    this.fetchDiagnosis();
  }

  handleCancel(e){
      e.preventDefault();
      this.setState({collapse: true});
  }

  handleSubmit(event) { 
    event.preventDefault()
     
    this.setState({collapse: true});

    const pComplaints = JSON.parse(localStorage.getItem('pComplaints'));
    const history = JSON.parse(localStorage.getItem('history'));
    const sysExamination = JSON.parse(localStorage.getItem('sysExamination'));
    const vitalSigns = JSON.parse(localStorage.getItem('vitalSigns'));
    const problems = JSON.parse(localStorage.getItem('Problems'));
    const radiological = JSON.parse(localStorage.getItem('radiological'));
    const provisionalDiagnosis = JSON.parse(localStorage.getItem('provisionalDiagnosis'));
    const athropometry = JSON.parse(localStorage.getItem('Athropometry'));
    const managementPlan = JSON.parse(localStorage.getItem('Managementplan'));
    const pRequest = JSON.parse(localStorage.getItem('Prequest'));   
    const dressingRequest = JSON.parse(localStorage.getItem('DressingRequest'));
    const observationRequest = JSON.parse(localStorage.getItem('ObservationRequest'));
    const id = {id: this.state.id, seen_by: this.state.seen_by, status: this.state.status}
    
    const data = Object.assign({}, pComplaints, history, sysExamination, vitalSigns, problems, provisionalDiagnosis, athropometry, managementPlan, dressingRequest, observationRequest, id);
    
    this.postData('drugs/drugPrescription', pRequest);
    this.postData('lab/getLab', radiological);
    this.postData('diagnosis/clarking', data);
        
    }

    postData(route, data){
        fetch(`http://localhost:4000/${route}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data === "success"){
               this.setState({msg: "Thanks for registering"}); 
                
            }
        }).catch(function(err) {
            return err;
        });
    }

  fetchData(route){

    let self = this;
    
    fetch(`http://localhost:4000/${route}`, {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        self.setState({patientrecords: data});
    }).catch(err => {
        return err;
    })
  }

 componentWillMount() {
     localStorage.getItem('patientrecords') && this.setState({
         patientrecords: JSON.parse(localStorage.getItem('patientrecords'))
     })
 } 

componentDidMount() {
    this.fetchData('patientrecords/doctor');   
}
componentWillUpdate(nextProps, nextState){
    localStorage.setItem('patientrecords', JSON.stringify(nextState.patientrecords));
}

 render(){
 return(

<div className="patient-clarking">
    <div className="left-side" >
        <div className="doctor-guide-container">
            <DoctorGuide /> 
        </div>
        <div className="assigned-list-collapse">
            <div className="assigned-list-container" >
                <Collapse isOpen={this.state.collapse}>   
                    <AssignedList toggle={this.toggle} patientrecords={this.state.patientrecords} />
                </Collapse>
            </div>
            <br/>
            <div  className="previous-visits-container">
                <Collapse isOpen={!this.state.collapse}>
                    <PreviousVisits />
                </Collapse>
            </div>
        </div>
    </div> 

        
    <div className="patient-info">
        <Card>
            <CardBody>
                <div id="stethoscope">
                    <div style={{width: '100%', height: '80vh'}}>
                    
                        <FreeScrollBar>
                            <div className="doctor-image-container">
                                <Collapse isOpen={this.state.collapse}>  <Image /> </Collapse>
                            </div>
                            <Collapse isOpen={!this.state.collapse}>
                                <PatientForm 
                                    id={this.state.id}
                                    firstname={this.state.firstname}
                                    surname={this.state.surname}
                                    age={this.state.age}
                                    gender={this.state.gender}
                                    maritalStatus={this.state.maritalStatus}
                                    DOB={this.state.DOB}
                                    religion={this.state.religion}
                                    phoneNo={this.state.phoneNo}
                                    tribe={this.state.tribe}
                                    email={this.state.email}
                                    seen_by={this.state.seen_by}
                                />
                                <br/>
                                <PComplaints/>
                                <History/>
                                <SysExamination/>
                                <VitalSigns/>
                                <Problems/>
                                <RadiologyInvestigations/>
                                <ProvisionalDiagnosis/>
                                <Athropometry/>
                                <Managementplan/>
                                <Prequest />
                                <DressingRequest />
                                <ObservationRequestion />
                                
                                <div className="offset-md-7">
                                    <input type="radio" name="status" onChange={(e) => this.setState({status: 'followUp'})} />Follow up
                                    <input type="radio" name="status"  onChange={(e) => this.setState({status: 'discharged'})} />Discharged
                                    <input type="radio" name="status" onChange={(e) => this.setState({status: 'admission'})} />Admission
                                    <input type="radio" name="status" onChange={(e) => this.setState({status: 'referral'})} />Referral
                                </div>

                                <button type="submit" className="btn btn-primary" onClick={(this.handleSubmit.bind(this))} >Submit</button> 
                                <button type="submit" className="btn btn-danger offset-md-1" onClick={this.handleCancel.bind(this)} >Cancel</button> 
                                
                            </Collapse>
                        </FreeScrollBar>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>


    <div className="last-diagnosis-container">
        <LastDiagnosis records={this.state.fullDiagnosis} />
    </div>

</div>



 );

 }


}
export default PatienClarking;