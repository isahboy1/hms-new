import React, {Component} from 'react';
import { FormGroup, Col, Label, Collapse, Modal, ModalHeader, ModalBody} from 'reactstrap';
import ModalPage from './ModalPage';
import 'bootstrap/dist/css/bootstrap.css';
import DoctorsListModal from './DoctorsListModal';
import { RecordGuide } from '../Guides';
import image from './../../images/Record 1.png';
import PatientAssignedToday from './PatientAssignedToday';
import RenderPatientList from './RenderPatientList';
import { _fetchData, _deleteData, _updateData } from '../helpers';

export default class Patientlist extends Component {

    constructor(props) {
        super(props);
        /**
         * setting the initial state of the component
         */
        this.state = { 
            patientId:'',
            searchText: '',
            searchResult: [],
            modalIsOpen: false,
            doctorsModalIsOpen: false,
            collapse: true,
            firstname: '',
            surname: '',
            gender: '',
            id: '',
            age: '',
            maritalstatus: '',
            dob: '',
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
            newListByDoctor: [],
            unassignedPatients: [],
            allpatientrecords: []
         };
      }
      
      /**
       * method for opening the "edit modal"
       * the method passes the information about the patient
       * along from the parent component
       */
      openModal=(patientrecords)=>{
        this.setState({
            modalIsOpen: true,
            firstname: patientrecords.firstname,
            surname: patientrecords.surname,
            gender: patientrecords.gender,
            id: patientrecords.id,
            age: patientrecords.age,
            maritalstatus: patientrecords.maritalstatus,
            dob: patientrecords.dob,
            tribe: patientrecords.tribe,
            religion: patientrecords.religion,
            phoneNo: patientrecords.phoneNo,
            email: patientrecords.email,
            nationality: patientrecords.nationality,
            state: patientrecords.state,
            lga: patientrecords.lga,
            occupation: patientrecords.occupation,
            address: patientrecords.address,
            kinName: patientrecords.kinName,
            kinRelationship: patientrecords.kinRelationship,
            kinPhone: patientrecords.kinPhone,
            kinEmail: patientrecords.kinEmail,
            kinOccupation: patientrecords.kinOccupation,
            kinAddress: patientrecords.kinAddress,
            filterText: ''

        });
    }
     //   To Close The Edit Modal
    closeModal=()=> {
        this.setState({
            modalIsOpen: false
        });
    }
 //   to open the assignTo modal
    openDoctorsModal=(id)=>{
        this.setState({
            patientId: id,
            doctorsModalIsOpen: true 
        })
    }

    // closing the assignTo modal
    closeDoctorsModal=()=>{
        this.setState({
            doctorsModalIsOpen: false 
        });
        window.location.reload();

    }

    // onClick method for delete button
    deletepatientrecords=(patientrecords)=>{
        let data = {
            id: patientrecords.id
        }
        let route = 'patientrecords/delete';
        let cb =()=> this.setState({ msg: "User has been deleted." });

        _deleteData({ route, data, cb });
    }


    // fetching the data to display on componentDidMount using the 
    // helper function _fetchData()
    fetchData(){
        let self = this;
        
        let route = 'patientrecords/unassignedPatientlist';
        let cb = (data) => self.setState({patientrecords: data});
        _fetchData({ route, callback: cb })
    }

    fetchAll=()=> {
        let self = this;
        
        let route = 'patientrecords/patientlist';
        let cb = (data) => self.setState({allpatientrecords: data});
        _fetchData({ route, callback: cb })
    }

    //when component has been mounted
    componentDidMount(){
        this.fetchData();
        this.fetchAll();
    }
    
    //method for setting gender in the edit modal
    setGender=(e)=> {
        this.setState({ gender: e.target.value })
       }
    
    //onChange method for updating the state as soon as the value
    logChange=(e)=> {
        this.setState({[e.target.ref]: e.target.value}); 
    }


    //method for submitting data after editing it in the edit modal
    handleEdit = (e) => {
        e.preventDefault()
        let data = {
            firstname: this.state.firstname,
            surname: this.state.surname,
            id: this.state.id,
            gender: this.state.gender
        }
        let route = 'patientrecords/edit';
        let cb = () => this.setState({ msg: "User has been edited." });

        _updateData({ route, data, cb })
    }
    
    /**
     * to render the newly added patient in the patientList after
     * the modal has been closed
     */
    receiveState=(data)=>{
        this.setState((prevState) => { return { patientrecords: prevState.patientrecords.concat(data) } })
    }

    //this method sets the value of the filter text
    handleFilterTextChange = (filterText) => {
        this.setState({
          filterText: filterText
        });
      }
    
    getUnassignedPatients=(doctor)=>{
        const patientrecords = this.state.allpatientrecords;
        const unassignedPatients = patientrecords.filter(f=> f.assigned_to===`${doctor}` );
        this.setState({ unassignedPatients: unassignedPatients });
        // console.log(this.state.unassignedPatients)
    }

    getNewListByDoctor = (doctor) => {
        this.getUnassignedPatients(doctor);
        this.setState({ collapse: false });
    }
	
	      
    render(){
       
        return(
       
            <div className="row" style={{backgroundColor:'#ffffff'}}>
                {/* first empty column */}
                <Col md="3">
                    {/* component to render user's guide */}
                    <RecordGuide />
                    {/* component to render the table show patients assigned to doctors
                    on a current day */}
                    <PatientAssignedToday 
                        getNewListByDoctor={this.getNewListByDoctor} 
                    />
                </Col>
                <Col md="5">
                    <div className="col-md-1">
                        {/* modal component to add a new patient  */}
                        <ModalPage receiveState={this.receiveState.bind(this)} /> 
                    </div>

                    <br />

                    <Collapse isOpen={this.state.collapse}>
                        <div className="render-patient-list">
                            {/* this component renders the table of patients displaying some details */}
                            <RenderPatientList 
                                patientlist={this.state.patientrecords} 
                                openDoctorsModal={this.openDoctorsModal}
                                openModal={this.openModal}
                                filterText={this.state.filterText}
                                renderEditButton={true}
                                /*
                                    this part is used to enable in-records delete operations
                                    to activate this action, uncomment the code below
                                */
                                // deletepatientrecords={this.deletepatientrecords}
                            />
                        </div>
                    </Collapse>

                    <Collapse isOpen={!this.state.collapse}>
                        {/* this component renders the table consisting patietns assigned
                        to a particular patient */}
                        <RenderPatientList 
                            patientlist={this.state.unassignedPatients} 
                            openDoctorsModal={this.openDoctorsModal}
                            openModal={this.openModal}
                            renderEditButton={false}
                            /*
                                this part is used to enable in-records delete operations
                                to activate this action, uncomment the code below
                            */
                            // deletepatientrecords={this.deletepatientrecords}
                        
                        />
                    </Collapse>
                    
                    {/* this component opens when the "Assign Doctor" button clicked
                    it allows user to assign doctor to a patient */}
                    <DoctorsListModal 
                        patientId= {this.state.patientId}
                        doctorsModalIsOpen={this.state.doctorsModalIsOpen} 
                        closeDoctorsModal={this.closeDoctorsModal} 
                    />

                    <br />
                  
                </Col>

                {/* empty column by right  */}
                <Col md="4">
                    {/* image displayed by the side of the Records Module */}
                    <img src={image} alt="module-pic" style={{width:'30vw',height:'60vh'}} />
                </Col>

                {/* <MyForm /> */}
                {/* this modal renders the edit modal when you click on "edit" button on a user
                this modal allows you to edit information about a particular patient */}
                <Modal size="lg"   isOpen={this.state.modalIsOpen} >
                    <ModalHeader >Edit Patient <button id="btn" onClick={this.closeModal} className="btn btnRight">x</button></ModalHeader>
                    <ModalBody>
                        <form  onSubmit={this.handleEdit} method="POST">
                            <FormGroup row>
                                <Col md={5}>
                                    <div>
                                        <figure className="Figimage"> Upload Passport Here...
                                            <input type="file" ref="passport" className="ImgFile" />
                                        </figure>
                                    </div> 

                                </Col>
                                
                                <Col md={6}>
                                    <Label>patient id</Label>
                                    <input   onChange={e =>this.setState({id:e.target.value})}     className="form-control" value={this.state.id} placeholder="id" />
                                </Col> 
                        
                            </FormGroup>

                            <FormGroup row>
                                <Col md={6}>
                                    <Label>Surname</Label>
                                    <input onChange={e =>this.setState({surname:e.target.value})} className="form-control" value={this.state.surname} placeholder="SurName"/>
                                </Col><br/>

                                <Col md={6}>
                                    <Label>First Name</Label>
                                    <input  onChange={e =>this.setState({firstname:e.target.value})} className="form-control" value={this.state.firstname} placeholder="FirstName" />
                                </Col><br/>

                                <Col md={5}>
                                    <label className="form-label" >Gender</label>
                                    <div className="">
                                        <input type="radio" onClick={this.setGender} checked={this.state.gender === 'male'} name="gender" value="male" />Male
                                        <input type="radio" onClick={this.setGender} checked={this.state.gender === "female"} name="gender" value="female" />Female
                                    </div>
                                </Col>

                                <Col md={3}>
                                    <Label>Age</Label>
                                    <input type="number" ref="age" id="Age" onChange={e =>this.setState({age:e.target.value})} className="form-control" value={this.state.age} placeholder="Age"/>
                                </Col>

                                <Col md={4}>
                                    <Label>Marital Status</Label>
                                    <input  type="text" ref="maritalstatus" id="MaritalStatus"  onChange={e =>this.setState({maritalstatus:e.target.value})} className="form-control" value={this.state.maritalstatus}  placeholder="Marital Status" />
                                </Col>

                                <Col md={5}>
                                    <Label>Date Of Birth</Label>
                                    <input  type="date" ref="DOB" id="DOB" onChange={e =>this.setState({DOB:e.target.value})} className="form-control" value={this.state.DOB}  placeholder="Date Of Birth" />
                                </Col>

                                <Col md={3}>
                                    <Label>Tribe</Label>
                                    <input type="text" ref="tribe" id="Tribe" onChange={e =>this.setState({tribe:e.target.value})} className="form-control" value={this.state.tribe}  placeholder="Tribe"  />
                                </Col>

                                <Col md={4}>
                                    <Label>Religion</Label>
                                    <select className="form-control" onChange={this.logChange} ref="religion">
                                        <option value="islam ">Islam</option>
                                        <option value="christianity">Christianity</option>
                                        <option value="traditional">Traditional</option>
                                    </select>
                                    {/* <input  type="text" ref="religion" id="Religion" onChange={e =>this.setState({religion:e.target.value})} className="form-control" value={this.state.religion}  placeholder="Religion"  /> */}
                                </Col>

                                <Col md={6}>
                                    <Label>Phone Number</Label>
                                    <input  type="text" ref="phoneNo" id="PhoneNo" onChange={e =>this.setState({phoneNo:e.target.value})} className="form-control" value={this.state.phoneNo}  placeholder="Phone Number"  />
                                </Col>
                                
                                <Col md={6}>
                                    <Label>Email Address</Label>
                                    <input  type="text" ref="email" id="Email" onChange={e =>this.setState({email:e.target.value})} className="form-control" value={this.state.email}  placeholder="Email Address" />
                                </Col>

                                <Col md={5}>
                                    <Label>Nationality</Label>
                                    <input  onChange={e =>this.setState({nationality:e.target.value})} className="form-control" type="text"  ref="nationality" value={this.state.nationality}  placeholder="Nationality" />
                                </Col>

                                <Col md={3}>
                                    <Label>State</Label>
                                    <input type="text" ref="state" id="State" onChange={e =>this.setState({state:e.target.value})} className="form-control State" value={this.state.state}  placeholder="State" />
                                </Col> 
                                
                                <Col md={4}>
                                    <Label>LGA</Label>
                                    <input type="text" ref="lga" id="LGA" onChange={e =>this.setState({lga:e.target.value})} className="form-control lga" value={this.state.lga}  placeholder="LGA"/>
                                </Col> 

                                < Col md={5}>
                                    <Label>Occupation</Label>
                                    <input type="text" ref="occupation" id="Occupation" onChange={e =>this.setState({occupation:e.target.value})} className="form-control Occupation" value={this.state.occupation}  placeholder="Occupation" />
                                </Col> 
                                < Col md={1}></Col> 

                                <Col md={6}>
                                    <Label>Address</Label>
                                    <input type="textarea" ref="address" onChange={e =>this.setState({address:e.target.value})} className="form-control" value={this.state.address}  id="Address" />
                                </Col>

                                <Col md={12}>
                                    <legend>Next Of Kin Information</legend>             
                                </Col>
                                <Col md={6}>
                                    <Label>Name</Label>
                                    <input type="text" ref="kinName" onChange={e =>this.setState({kinName:e.target.value})} className="form-control" value={this.state.kinName}  placeholder="Kin Name" />
                                </Col>

                                <Col md={6}>
                                    <Label>RelationShip</Label>
                                    <input  type="text" ref="kinRelationship" onChange={e =>this.setState({kinRelationship:e.target.value})} className="form-control" value={this.state.kinRelationship}  placeholder="RelationShip" />
                                </Col>
                                
                                <Col md={5}>
                                    <Label>Phone Number</Label>
                                    <input type="text" ref="kinPhone" id="PhoneNo" onChange={e =>this.setState({kinPhone:e.target.value})} className="form-control" value={this.state.kinPhone}  placeholder="Kin Phone Number"  />
                                </Col>

                                <Col md={5}>
                                    <Label>Email Address</Label>
                                    <input type="text" ref="kinEmail" id="KinEmail" onChange={e =>this.setState({kinEmail:e.target.value})} className="form-control" value={this.state.kinEmail}  placeholder="Kin Email Address" />
                                </Col>

                                < Col md={5}>
                                    <Label>Occupation</Label>
                                    <input  type="text" ref="kinOccupation" id="KOccupation" onChange={e =>this.setState({kinOccupation:e.target.value})} className="form-control" value={this.state.kinOccupation}  placeholder="Occupation"  />
                                </Col> 

                                <Col md={6}>
                                    <Label>Address</Label>
                                    <input  type="textarea" ref="kinAddress" id="KAddress" onChange={e =>this.setState({kinAddress:e.target.value})} className="form-control" value={this.state.kinAddress}  />
                                </Col>
                            </FormGroup>
                            
                            <div className="" >
                                <button type="submit"  className="btn"  onClick={this.closeModal} color="danger" >Submit</button>
                                <button className="btn offset-md-9"  onClick={this.closeModal}>Cancel</button>
                            </div>                        
                        </form>
                    </ModalBody>
            </Modal>              
        </div>
    )
    }
}