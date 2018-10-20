import React, {Component} from 'react';
import { Col, Collapse, InputGroupAddon, InputGroup } from 'reactstrap';
import ModalPage from './ModalPage';
import 'bootstrap/dist/css/bootstrap.css';
import DoctorsListModal from './DoctorsListModal';
import RecordGuide from './../Doctor Module/Guides';
import image from './../../images/Record 1.png';
import PatientAssignedToday from './PatientAssignedToday';
import RenderPatientList from './RenderPatientList';
import EditModal from './EditModal';

class Patientlist extends Component {
    
    constructor(props) {
        super(props);
     
        this.state = { 
            patientrecords: [],
            patientToBeEdited: {},
            patientId:'',
            searchText: '',
            searchResult: [],
            toggleMe: true,
            modalIsOpen: false,
            doctorsModalIsOpen: false,
            collapse: true,
            firstname: '',
            surname: '',
            gender: '',
            id: '',
            age: '',
            maritalstatus: '',
            DOB: '',
            tribe: '',
            religion: '',
            phoneNo: '',
            email: '',
            nationality: '',
            state: '',
            lga: '',
            occupation: '',
            address: '',
            kinName: '',
            kinRelationship: '',
            kinPhone: '',
            kinEmail: '',
            kinOccupation: '',
            kinAddress: '',
            intervalId: null
         };
        this.openModal = this.openModal.bind(this);
        this.openDoctorsModal = this.openDoctorsModal.bind(this);
        this.closeDoctorsModal = this.closeDoctorsModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.toggle = this.toggle.bind(this);
      }
    
      openModal(patientrecords) {
          console.log(patientrecords)
        this.setState({
            modalIsOpen: true,
            patientToBeEdited: patientrecords,
        });
        
        console.log(this.state.patientToBeEdited)
    }
        
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    openDoctorsModal(id){
        this.setState({
            patientId: id,
            doctorsModalIsOpen: true 
        })
    }

    closeDoctorsModal(){
        this.setState({
            doctorsModalIsOpen: false 
        });
        window.location.reload();

    }

      deletepatientrecords(patientrecords){
      
        var data = {
            id: patientrecords.id
        }
        
        fetch('http://localhost:4000/patientrecords/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data === "success"){
               this.setState({msg: "User has been deleted."});  
            }
        }).catch(function(err) {
            return err;
        });
    }

    fetchData() {
        let self = this;
        
        fetch('http://localhost:4000/patientrecords/patientlist', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({patientrecords: data});
            console.log(data)
        }).catch(err => {
            return err;
        })
    }

    
    componentDidMount(){
        this.fetchData()
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    
    


    // recieveData(data) {
    //     this.setState({ patientrecords: data})
    // }

    
    
    receiveState(data){
        this.setState((prevState) => { return { patientrecords: prevState.patientrecords.concat(data) } })
    }

    toggle(){
        // this.setState({ collapse: false })

    }

    //sets the value of the filter text
    handleFilterTextChange = (filterText) => {
        this.setState({
          filterText: filterText
        });
      }
	
	      
    render(){
       
        return(
       
    
            <div className="row" style={{backgroundColor:'#ffffff'}}>
                {/* first empty column */}
                <Col md="3">
                    <RecordGuide />
                    <PatientAssignedToday toggle={this.toggle} />
                </Col>

                {/* patient list Table column */}
                <Col md="5">
                
                {/* List of patient table */}
                 <InputGroup>
                <InputGroupAddon addonType="prepend"> 
                {/* Add Patient Modal Side */}
                 {/* <UploadFile /> */}
                 <div className="row">
                    <div className="col-md-1">
                    <ModalPage receiveState={this.receiveState.bind(this)} /> 
                    </div>
                    <div className="col-md-1 offset-md-10">
        {/*<AssignPatient />*/}
                    </div>
                </div>
                     </InputGroupAddon>
                   </InputGroup> 
                  
                    <br />
                    {/* <SearchBar
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                        placeholder="Search for a patient..."
                        width='685px'
                        size={45}
                    /> */}
                    <Collapse isOpen={this.state.collapse}>
                    <RenderPatientList 
                        patientlist={this.state.patientrecords} 
                        openDoctorsModal={this.openDoctorsModal}
                        openModal={this.openModal}
                        filterText={this.state.filterText}
                        /*
                            this part is used to enable in-records delete operations
                            to activate this action, uncomment the code below
                        */
                        // deletepatientrecords={this.deletepatientrecords}
                        
                    />
                    </Collapse>
                    <Collapse isOpen={!this.state.collapse}>
                        <div>
                        <RenderPatientList 
                            patientlist={this.state.patientrecords} 
                            openDoctorsModal={this.openDoctorsModal}
                            openModal={this.openModal}
                            /*
                                this part is used to enable in-records delete operations
                                to activate this action, uncomment the code below
                            */
                            // deletepatientrecords={this.deletepatientrecords}
                        
                        />
                        </div>
                    </Collapse>
                   
                    <DoctorsListModal 
                        patientId= {this.state.patientId}
                        doctorsModalIsOpen={this.state.doctorsModalIsOpen} 
                        closeDoctorsModal={this.closeDoctorsModal} 
                    />

                 <div>
                 
                     </div> 
                
                    <br />
                  
                   </Col>

                {/* empty column by right  */}
                <Col md="4">
                    <img src={image} alt="bg-image" style={{width:'600px',height:'500px',marginTop:'100px'}} />
                </Col>

                {/* <MyForm /> */}
                
                <EditModal 
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    handleEdit={this.handleEdit}
                    patientToBeEdited={Object.entries(this.state.patientToBeEdited)}
                    // patients={{'isah': 'doc', 'mustapha': 'nurse'}}
                />
                <Col md="2"></Col>
                
            </div>
             
        
         



        )
    }



}

export default Patientlist;