import React, {Component} from 'react';
import {Container, Row, Col,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class PcomplaintsPreview extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    let records = JSON.parse(localStorage.getItem('pComplaints')) || '{}';
    this.state = {
      modal: false,
        data: [],
        records: records   
  }
  this.recieveData=this.recieveData.bind(this);
}

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onRadioChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

    handleSubmit(e) {
        e.preventDefault();

        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        var array = JSON.parse(localStorage.getItem('pComplaints') || '{}');
        array = formData;
        localStorage.setItem('pComplaints', JSON.stringify(array));
        this.props.recieveData(array);
        this.toggle();
      }

      recieveData(data) {
        this.setState({ records: data})
    }
    render(){
        // margin top for inputs
   
        return(
            <Container className="container">
                <Row>
                    {/* empty colum by left */}
                    <Col md="2"></Col>


                    {/* column containing the table */}
                    <Col md="8">
                    <Button color="primary"><a  onClick={this.toggle} >Add New</a></Button><br/>   
                        <div>
                                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Enter New Complaints</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.handleSubmit}>
                                      <FormGroup row>
                                        <Label for="" sm={4} size="sm">Presenting Complaints 1</Label>
                                        <Col sm={2}>
                                            <input ref="pComplaint1" value="fever" type="radio" name="pComplaint1" onChange={this.onRadioChange} />Fever <br/>
                                            <input ref="pComplaint1" value="none" type="radio" name="pComplaint1" onChange={this.onRadioChange} />None
                                        </Col>
                                        <Label for="" sm={4} size="sm">Presenting Complaints 2</Label>
                                        <Col sm={2}>
                                            <input ref="pComplaint2" value="cough" type="radio" name="pComplaint2" onChange={this.onRadioChange} />Cough <br/>
                                            <input ref="pComplaint2" value="none" type="radio" name="pComplaint2" onChange={this.onRadioChange} />None 
                                        </Col><br/>
                                     </FormGroup>

                                     <FormGroup row>
                                        <Label for="" sm={4} size="sm">Presenting Complaints 3</Label>
                                        <Col sm={2}>
                                            <input ref="pComplaint3" value="headache" type="radio" name="pComplaint3" onChange={this.onRadioChange} />Headache <br/>
                                            <input ref="pComplaint3" value="none" type="radio" name="pComplaint3" onChange={this.onRadioChange} />None
                                        </Col>
                                        <Label for="" sm={4} size="sm">Presenting Complaints 4</Label>
                                        <Col sm={2}>
                                            <input ref="pComplaint4" value="vomiting" type="radio" name="pComplaint4" onChange={this.onRadioChange} />Vomiting <br/>
                                            <input ref="pComplaint4" value="none" type="radio" name="pComplaint4" onChange={this.onRadioChange} />None
                                        </Col>
                                     </FormGroup>
                                     {/* <OtherPcompaintsEdit/> */}
                                     <h5>Other Problem Complaints</h5>
                                    <FormGroup row>
                                        <Label className="col-md-3">Others:                       
                                        </Label>
                                        
                                        <textarea ref="otherPcomplaints" className="form-control col-md-6" >
                                         {this.state.records.otherPcomplaints}
                                          </textarea>
                                        
                                    </FormGroup>

                                    <FormGroup row>      
                                    <Label className="col-md-3" >History of Presenting Complaints:                      
                                    </Label>
                                  
                                    <textarea ref="historyOfPresentingComplaints" className="form-control col-md-6"  >{this.state.records.historyOfPresentingComplaints}
                                    
                                    </textarea>

                                    </FormGroup>
                                    <FormGroup row>      
                                    <Label className="col-md-3">Social History:                       
                                    </Label>
                                    <textarea ref="socialHistory" className="form-control col-md-6">
                                    {this.state.records.socialHistory}
                                    </textarea>
                                    </FormGroup>
                                    <FormGroup row>      
                                    <Label className="col-md-3">Other Social History:                       
                                    </Label>
                                        <div>
                                        <label><input  ref="Married" name= "social" value="married" type="checkbox" />Married  </label>
                                            <label><input  ref="Somking" name= "social" value="smoking" type="checkbox"  />Smoking  </label>
                                            <label><input  ref="Alcohol" name= "social" value="alcohol" type="checkbox"  />Alcohol  </label>
                                            
                                        </div>
                                    </FormGroup>
                                
                                    <FormGroup row>      
                                    <Label  className="col-md-3">Obts & Gynea History:                       
                                    </Label>
                                    <textarea className="form-control col-md-6" ref="obtsGyneaHistory">
                                    {this.state.records.obtsGyneaHistory}
                                    </textarea>
                                    </FormGroup>
                                    <FormGroup row>      
                                    <Label className="col-md-3">Past Medical History:                       
                                    </Label>
                                    <textarea ref="pasttMedicalHistory" className="form-control col-md-6">
                                    {this.state.records.pasttMedicalHistory}
                                    </textarea>
                                    </FormGroup>
                                    
                                    <FormGroup row>      
                                    <Label className="col-md-3">Allergy:                       
                                    </Label>
                                        <div>
                                            {/* <label><input ref="FoodStuff" name= "allergy" value="foodstuff" type="checkbox" />Food Stuff  </label>
                                            <label><input ref="Flower" name= "allergy" value="flower" type="checkbox"  />Flower  </label>
                                            <label><input ref="DuskAndSmoke" name= "allergy" value="dust" type="checkbox"  />Dust/Smoke  </label>
                                            <label><input ref="Drugs" name= "allergy" value="drugs" type="checkbox"  />Drugs  </label> */}
                                            <textarea ref="allergy" className="form-control col-md-6" >
                                            {this.state.records.allergy}
                                            </textarea>
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>      
                                    <Label className="col-md-3">Other Allergies:                       
                                    </Label>
                                    <textarea ref="otherAllergies" className="form-control col-md-6">
                                    {this.state.records.otherAllergies}
                                    </textarea>
                                    </FormGroup> 
                                    
                                    <FormGroup row>      
                                    <Label className="col-md-3">Drug History:                       
                                    </Label>
                                    <textarea ref="drugHistory" className="form-control col-md-6">
                                    {this.state.records.drugHistory}
                                    </textarea>
                                    </FormGroup>

                                    </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.handleSubmit.bind(this)}>Add</Button> 
                                        <Button color="danger" onClick={this.toggle} >Back</Button>   
                                    </ModalFooter>
                                </Modal>
                        </div>
                                        
                    </Col>

                    
                    {/* empty column by the right */}
                    <Col md="2"></Col>
                </Row>
            </Container>
        )
    }
}

export default PcomplaintsPreview;