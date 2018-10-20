import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Label, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FormErrors } from './FormErrors';
import { _fetchData, _postData } from '../helpers';


/**
 * The modal page for registering new patients
 * It consists of the input fields for filling the 
 * details of the patient
 */
class ModalPage extends React.Component {
  constructor(props) {
    super(props);

    //initiating the state
    this.state = {
      id:'',
      surname: '',
      firstname: '',
      gender: '',
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
      kinrelationship: '',
      kinphone: '',
      kinemail: '',
      kinoccupation: '',
      kinAddress: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      modal: false
    }; 

  }

  /**
   * Handles the gender text field change
   */
 setGender = (e) => {
  this.setState({ gender: e.target.value })
 }

 /**
  * Handles change in the text field
  */
 logChange = (e) => {
  this.setState({[e.target.ref]: e.target.value});  
}


/**
 * This toggles the modal page
 */
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

/**
 * This handles the change when user input some 
 * data in the text fields
 */
handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value}, () => { this.validateField(name, value) });
}

/**
 * The method that validates the text fields and enable 
 *  the submit button only if all data in the fields are valid
 */
validateField = (fieldName, value) => {
  let fieldValidationErrors = this.state.formErrors;
  let emailValid = this.state.emailValid;
  let firstnameValid = this.state.firstnameValid;
  let surnameValid = this.state.surnameValid;

  /**
   * this sets the condition for each field using the fieldName
   *  and also the corresponding error if the condition 
   *  is not met
   */
  switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
    case 'firstname':
      firstnameValid = value.length > 0;
      fieldValidationErrors.firstname = firstnameValid ? '': ' is too short';
      break;
    case 'surname':
      surnameValid = value.length > 0;
      fieldValidationErrors.surname = surnameValid ? '': ' is too short';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  firstnameValid: firstnameValid,
                  surnameValid: surnameValid
                }, this.validateForm);
}

/**
 * The method that eventually validate the form
 */
validateForm() {
  this.setState({formValid: this.state.emailValid && this.state.firstnameValid && this.state.surnameValid});
}

//if there is error
errorClass(error) {
  return(error.length === 0 ? '' : 'has-error');
}

  /**
   * Handles the submit button click
   */
handleSubmit = (event) => { 
  event.preventDefault()
  const data = {}
  data.gender = this.state.gender;
  for (const field in this.refs){
    data[field]=this.refs[field].value;
  }

  this.props.receiveState(data);

  let route = 'patientrecords/new';
  let callback = () => this.setState({msg: "Thanks for registering"}); 
  _postData({ route, data, callback })      
}


get = () => {
  let self = this;
  let route = 'patientrecords/getId';
  let callback = (data) => self.setState({id: JSON.stringify(data)});   
  _fetchData({ route, callback }) ;
}
  
render() {

  return (
    <div>      
      <Button onClick={this.toggle}>Add New patient</Button>
      {/* the modal starts here */}
      <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
        <ModalHeader toggle={this.toggle}>Add New patient</ModalHeader>
        <ModalBody>
          
        {/* the form */}
        <form onSubmit={this.handleSubmit} method="POST">
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
          <input type="button" onClick={this.get} value='get' />
          <input  onChange={this.logChange}  type="text" ref="id" className="form-control id" placeholder="patient id" value={this.state.id} />
        </Col> 
    
      </FormGroup>

      <FormGroup row>
        
        <Col md={6}>
        <Label>SurName</Label>
          <input  onChange={this.handleUserInput}  name="surname" type="text" ref="surname" className="form-control Surname" placeholder="SurName" />
        </Col>

        <Col md={6}>
        <Label>FirstName</Label>
        <input  onChange={this.handleUserInput}  name="firstname"  type="text" ref="firstname" className="form-control Firstname" placeholder="Name" />
        </Col>
        

          <Col md={2}>
      <legend className="col-form-label md-2">Gender</legend>
      <FormGroup >
            <Label >
              <input onClick={this.setGender} checked={this.state.gender === "female"} type="radio" value="female"  name="gender" />{' '}
              Female
              </Label>
          </FormGroup>
          <FormGroup >
            <Label >
              <input onClick={this.setGender} checked={this.state.gender === "male"} type="radio" value="male" name="gender" />{' '}
              Male
            </Label>
          </FormGroup>
        </Col>
        <Col md={5}>
        <Label>Age</Label>
        <input  onChange={this.logChange} className="form-control" type="number"  ref="age" placeholder="Age" />
        </Col>

        <Col md={5}>
        <Label>Marital Status</Label>
        <select onChange={this.logChange} ref="maritalstatus" className="form-control">
        <option value=""></option>
        <option value="single">Single</option>
        <option value="married">Married</option>
        <option value="divorced">Divorced</option>
      </select>
        </Col>

        <Col md={5}>
        <Label>Date Of Birth</Label>
        <input  onChange={this.logChange} className="form-control" type="date" ref="DOB" placeholder="Date Of Birth" />
        </Col>

        <Col md={3}>
        <Label>Tribe</Label>
        <input  onChange={this.logChange} className="form-control" type="text" ref="tribe" placeholder="Tribe" />
        </Col>

        <Col md={4}>
        <Label>Religion</Label>
        <select onChange={this.logChange} ref="religion" className="form-control">
          <option value=""></option>
          <option value="islam">Islam</option>
          <option value="christianity">Christianity</option>
          <option value="traditional">Traditional</option>
          <option value="others">Others </option>
        </select>
        </Col>

        <Col md={5}>
        <Label>Phone Number</Label>
        <input  onChange={this.logChange} className="form-control" type="number"  ref="phoneNo" placeholder="Phone Number" />
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
        <Label>Email Address</Label>
        <input  onChange={this.handleUserInput} name="email" className="form-control" type="text"  ref="email" placeholder="Email Address" />
        </Col>

        <Col md={4}>
        <Label>Nationality</Label>
        <input  onChange={this.logChange} className="form-control" type="text"  ref="nationality" placeholder="Nationality" />
        </Col>

        <Col md={4}>
        <Label>State</Label>
        <input  onChange={this.logChange} className="form-control" type="text"   ref="state" placeholder="State" />
        </Col> 
        
        <Col md={4}>
        <Label>LGA</Label>
        <input  onChange={this.logChange} className="form-control" type="text"   ref="lga" placeholder="LGA" />
        </Col> 

        < Col md={5}>
        <Label>Occupation</Label>
        <input onChange={this.logChange} className="form-control" type="text"  ref="occupation" placeholder="Occupation" />
        </Col> 
        < Col md={1}></Col> 

        <Col md={6}>
        <Label>Address</Label>
        <input onChange={this.logChange} className="form-control" type="textarea" ref="address"  placeholder="Address" />
        </Col>
        <Col md={12}>
        <legend>Next Of Kin Information</legend>             
            </Col>
        <Col md={6}>
        <Label>Name</Label>
          <input onChange={this.logChange} className="form-control"  ref="kinName" placeholder="Kin Name" />
        </Col>

        <Col md={6}>
        <Label>RelationShip</Label>
          <input onChange={this.logChange} className="form-control" type="text"  ref="kinRelationship" placeholder="RelationShip" />
        </Col>
        
        <Col md={5}>
        <Label>Phone Number</Label>
        <input onChange={this.logChange} className="form-control" type="text" ref="kinPhone" placeholder=" Kin Phone Number" />
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
        <Label>Email Address</Label>
        <input onChange={this.logChange} className="form-control" type="text" ref="kinEmail" placeholder=" Kin Email Address" />
        </Col>

        < Col md={5}>
        <Label>Occupation</Label>
        <input onChange={this.logChange} className="form-control" ref="kinoccupation" id="Occupation" placeholder=" Kin Occupation" />
        </Col> 
        < Col md={1}></Col> 

        <Col md={6}>
        <Label>Address</Label>
        <input onChange={this.logChange} className="form-control" type="textarea" ref="kinAddress" placeholder=" Kin Address" />
        </Col>
      </FormGroup>
      
      <div className="row">
      <Col md={4}>   
      <div className="panel panel-default">
        <FormErrors formErrors={this.state.formErrors} />
      </div>
      <button type="submit" onClick={this.toggle} className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>          
    
          </Col>
      </div>

      <div className="row">
      <Col md={4}>  </Col>
      
          <Col md={4}>  </Col>
        </div>
      
      </form>
          </ModalBody>

          <ModalFooter>
          
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalPage;