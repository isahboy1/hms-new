import React from 'react';
import { Button, Form, FormGroup, Col, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class PatientDetails extends React.Component {
  constructor(){
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      
      collapse: false,
     
     

    }
    this.handleDelete=this.handleDelete.bind(this)
    
      }

     
     

      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }

      handleDelete(event) {
        event.preventDefault()
         const data = {}
         for (const field in this.refs){
            data[field]=this.refs[field].value;
            data[field]=this.refs[field].value;
        }
        console.log(data)
        fetch('http://localhost:4000/patientrecords/delete', {
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
        logChange(e) {
            this.setState({[e.target.ref]: e.target.value});  
        }


  render() {

    return (
      
      <div>
      <Form onSubmit={this.handleDelete.bind(this)} method="POST">
         <FormGroup row>
         <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
       
         <div>
           <figure className="Figimage"> Upload Passport Here dangana
           <Input type="file" ref="Imagefile" className="ImgFile" />
           </figure>
           </div> 

           </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
           
            {/* <FormText divor="muted">
            Upload Passport Here...
            </FormText> */}
          </div>
        </FormGroup>

        <FormGroup row><br/>
          
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>SurName</Label>
            <Input type="text" ref="surname" className="Form-control" value={this.state.surnamee} placeholder="SurName" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>FirstName</Label>
            <Input type="text" ref="firstname" className="Form-control" value={this.state.firstname} placeholder="FirstName" />
          </div><br />

           <div sm={2}><br/>
        <legend className="div-form-label col-xs-12 col-sm-12 col-md-3 col-lg-3">Gender</legend>
          <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1"  />{' '}
                Male
               </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Female
              </Label>
            </FormGroup>
         </div>
         <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Age</Label>
          <Input type="number" name="Age" id="exampleNumber" placeholder="Age" />
         </div>

         <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Marital Status</Label>
         <Input type="text" name="Fname" id="MaritalStatus" placeholder="Marital Status" />
         </div>

         <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Date Of Birth</Label>
          <Input type="date" name="date" id="DOB" placeholder="Date Of Birth" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Tribe</Label>
          <Input type="text" name="date" id="Tribe" placeholder="Tribe" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Religion</Label>
          <Input type="text" name="Religion" id="Religion" placeholder="Religion" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Phone Number</Label>
          <Input type="text" name="PhoneNo" id="PhoneNo" placeholder="Phone Number" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/></div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Email Address</Label>
          <Input type="text" name="PhoneNo" id="Email" placeholder="Email Address" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Nationality</Label>
          <Input type="text" name="Nationality" id="Nationality" placeholder="Nationality" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>State</Label>
          <Input type="text" class="State" name="text" id="State" placeholder="State" />
          </div> 
         
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>LGA</Label>
          <Input type="text" class="lga" name="text" id="LGA" placeholder="LGA" />
          </div> 

         <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>Occupation</Label>
          <Input type="text" class="Occupation" name="text" id="Occupation" placeholder="Occupation" />
          </div> 
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/></div> 

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>Address</Label>
          <Input type="textarea" class="textarea" name="text" id="Address" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <legend>Next Of Kin Information</legend>             
              </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>Name</Label>
            <Input type="text" ref="Kname" className="Form-control" placeholder="Kin Name" />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>RelationShip</Label>
            <Input type="text" ref="RelationShip" className="Form-control" placeholder="RelationShip" />
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Phone Number</Label>
          <Input type="text" name="PhoneNo" id="PhoneNo" placeholder="Phone Number" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/></div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
         <Label>Email Address</Label>
          <Input type="text" name="PhoneNo" id="Email" placeholder="Email Address" />
          </div>

          < div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>Occupation</Label>
          <Input type="text" class="Occupation" name="text" id="Occupation" placeholder="Occupation" />
          </div> 
          < div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/></div> 

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"><br/>
          <Label>Address</Label>
          <Input type="textarea" class="textarea" name="text" id="Address" />
          </div>
        </FormGroup>
        
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Button color="danger" >submit</Button>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Button color="success">Edit</Button>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Button color="primary">Print</Button>
          </div>
        </div>

        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">  </div>
       
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">  </div>
          </div>
      
      </Form>
      
      </div>



    );
  }
}

