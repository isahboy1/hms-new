import React, { Component } from 'react'
import { Button,  FormGroup, Container, Row, Table, Col, Label, Collapse, Input,  InputGroupAddon, InputGroup, Modal, ModalHeader, ModalBody} from 'reactstrap'

export default class EditModal extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        patientInfo: this.props.patients,
        id: '',
        surname: '',
        firstname: '',
        age: '',
        gender: '',
        maritalstatus: '',
        DOB: '',
        tribe: '',
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
      }
    }

    componentDidMount = () => {
        console.log('Component was just mounted!')
      console.log(this.props.patientToBeEdited)
    }
    
    onClick = () => {
        console.log(this.props.patientToBeEdited)
    }
    
    handleEdit = (e) => {
        //Edit functionality
        e.preventDefault()
       
        var data = {
            firstname: this.state.firstname,
            surname: this.state.surname,
            id: this.state.id,
            gender: this.state.gender
        }
      
        fetch('http://localhost:4000/patientrecords/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json()
        }).then(function(data) {
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been edited."
                });
            }
        }).catch(function(err) {
            return err;
        });
    }

    setGender = (e) => {
        this.setState({ gender: e.target.value })
    }

    logChange = (e) => {
        this.setState({[e.target.ref]: e.target.value}); 
    }

  render() {
    return (
      <div>
        <Modal size="lg"   isOpen={this.props.modalIsOpen} >
                <ModalHeader >Edit Patient <button id="btn" onClick={this.props.closeModal} className="btn btnRight">x</button></ModalHeader>
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
           <div>{this.state.surname}</div>
          <Col md={6}>
          <Label>patient id</Label>
            <input   onChange={e =>this.setState({id:e.target.value})}     className="form-control" value={this.state.id} placeholder="id" />
          </Col> 
      
        </FormGroup>

        <FormGroup row>
        <div>
            {/* {
                this.state.patientInfo.join(', ')
            } */}
            <button onClick={this.onClick}>Click</button>
        </div>
          {/* <input type='text' value={Object.entries(this.state.patientInfo)} /> */}
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
          <input type="text" className="State" ref="state" id="State" onChange={e =>this.setState({state:e.target.value})} className="form-control" value={this.state.state}  placeholder="State" />
          </Col> 
         
          <Col md={4}>
          <Label>LGA</Label>
          <input type="text" className="lga" ref="lga" id="LGA" onChange={e =>this.setState({lga:e.target.value})} className="form-control" value={this.state.lga}  placeholder="LGA"/>
          </Col> 

         < Col md={5}>
          <Label>Occupation</Label>
          <input type="text" className="Occupation" ref="occupation" id="Occupation" onChange={e =>this.setState({occupation:e.target.value})} className="form-control" value={this.state.occupation}  placeholder="Occupation" />
          </Col> 
          < Col md={1}></Col> 

          <Col md={6}>
          <Label>Address</Label>
          <input type="textarea" className="address" ref="address" onChange={e =>this.setState({address:e.target.value})} className="form-control" value={this.state.address}  id="Address" />
          </Col>
          <Col md={12}>
          <br/>
          <legend>Next Of Kin Information</legend>             
              </Col>
          <Col md={6}>
          <Label>Name</Label>
            <input type="text" ref="kinName" className="form-control" onChange={e =>this.setState({kinName:e.target.value})} className="form-control" value={this.state.kinName}  placeholder="Kin Name" />
          </Col>

          <Col md={6}>
          <Label>RelationShip</Label>
            <input  type="text" ref="kinRelationship" className="form-control" onChange={e =>this.setState({kinRelationship:e.target.value})} className="form-control" value={this.state.kinRelationship}  placeholder="RelationShip" />
          </Col>
          
          <Col md={5}>
         <Label>Phone Number</Label>
          <input type="text" ref="kinPhone" id="PhoneNo" onChange={e =>this.setState({kinPhone:e.target.value})} className="form-control" value={this.state.kinPhone}  placeholder="Kin Phone Number"  />
          </Col>
          <Col md={2}></Col>
          <Col md={5}>
         <Label>Email Address</Label>
          <input type="text" ref="kinEmail" id="KinEmail" onChange={e =>this.setState({kinEmail:e.target.value})} className="form-control" value={this.state.kinEmail}  placeholder="Kin Email Address" />
          </Col>

          < Col md={5}>
          <Label>Occupation</Label>
          <input  type="text" className="Occupation" ref="kinOccupation" id="KOccupation" onChange={e =>this.setState({kinOccupation:e.target.value})} className="form-control" value={this.state.kinOccupation}  placeholder="Occupation"  />
          </Col> 
          < Col md={1}></Col> 

          <Col md={6}>
          <Label>Address</Label>
          <input  type="textarea" className="Kinaddress" ref="kinAddress" id="KAddress" onChange={e =>this.setState({kinAddress:e.target.value})} className="form-control" value={this.state.kinAddress}  />
          </Col>
        </FormGroup>
        
        <div className="" >
            <button type="submit"  className="btn"  onClick={this.closeModal} color="danger" >Submit</button>
            <button className="btn offset-md-9"  onClick={this.closeModal}>Cancel</button>
        </div>

        <div className="row">
        <Col md={4}>  </Col>
       
            <Col md={4}>  </Col>
          </div>
      
      </form>
          


                        
                        </ModalBody>
                </Modal>
      </div>
    )
  }
}
