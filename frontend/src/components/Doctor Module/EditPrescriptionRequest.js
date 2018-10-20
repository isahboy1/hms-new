import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import DrugsTable from './DrugsTable';
import { _warningNotify } from '../helpers';
import Notifications from 'react-notify-toast';
import { Link } from 'react-router-dom';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';


export default class EditPrescriptionRequest extends Component {

    constructor(props) {
    super(props);

    let cached = JSON.parse(localStorage.getItem('prescription_request')) || [];

    this.state = {
      drug: '',
      dosage: '',
      duration: "",
      period: 0,
      frequency: "",
      drugsList: cached || [],
    };
  }

  onInputChange =(e)=> {
    this.setState({ [e.target.name]: e.target.value })
  }

  clearText=()=>{
    this.setState({
      drug: '',
      dosage: '',
      duration: '',
      period: 0,
      frequency: '',
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { drug, dosage, duration, period, frequency } = this.state;
    if(drug==="" || dosage==="" || duration==="" || period===0 || frequency===""){
      return _warningNotify("Please fill all the textboxes")
    }

    const formData = { drug, dosage, duration, period, frequency };

    let drugsList = this.state.drugsList;
    let newList = drugsList.concat(formData);   
    this.setState({ drugsList: newList });
    this.clearText();
  }

  removeDrug = (drug) => {
    const { drugsList } = this.state;
    let newList = drugsList.filter(d => d.drug !== drug);
    this.setState({ drugsList: newList });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const { drugsList } = this.state;
    this.props.updateTable(drugsList);
    this.toggle();
    this.setState({ drugsList: [] })
  }

  handleNext = e => {
    const { drugsList } = this.state;
    if(drugsList === [])return;
    return localStorage.setItem('prescription_request', JSON.stringify(drugsList));
  }

  onPeriodChange=(e)=>{
    this.setState({ period: e.target.value });
  }

  onDurationChange=(e)=> {
    this.setState({ duration: e.target.value });
  }
     
  render() {
    const dropdownItems = [];
    for(let i=0; i<=10; i++){
        dropdownItems.push(<option value={i}>{i}</option>)
    }
    return (
        <div>
          <h3 className="text-center"><strong>Prescription Request</strong></h3>
          <hr />
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <label className="col-md-2">Select Drugs:</label>
                <input type="text" name="drug" value={this.state.drug} className="form-control col-md-4" onChange={this.onInputChange} />
                <label className="col-md-2">Dosage:</label> 
                <input type="text" name="dosage" value={this.state.dosage} className="form-control col-md-4" onChange={this.onInputChange} />
              </FormGroup>
              <Notifications />
              <FormGroup row><br/>
                <div className="col-md-7 row">
                  <label className="col-md-3">Duration: </label>
                  <select className="col-md-2 form-control" onChange={this.onDurationChange}>{dropdownItems}</select>
                  <label className="col-md-2">Period: </label>
                  <div className="col-md-5">
                      <input type="radio" name="period" value="hour" onChange={this.onPeriodChange}/>Hour
                      <input type="radio" name="period" value="day" onChange={this.onPeriodChange}/>Day
                      <input type="radio" name="period" value="week" onChange={this.onPeriodChange}/>Week
                  </div>
                </div>
                <label className="col-md-2">Frequency:</label> 
                <input type="text" name="frequency" value={this.state.frequency} className="form-control col-md-3" onChange={this.onInputChange} />
              </FormGroup>
              <button type="submit" className="btn btn-outline-primary offset-md-5" title="add to list">Add Prescription</button> 
            </Form>
            <br />
          <div className="">
            <DrugsTable 
              drugsList={this.state.drugsList} 
              onRemove={this.removeDrug}
            />
          </div> 
          <div className="row">
            <Link to="/patient_clarking/dressing_request" className="btn btn-outline-success" style={{width:'9vw'}}><FaArrowLeft /> Prev</Link>
            <button onClick={this.handleNext} className="btn btn-outline-success offset-md-7">
                <Link to='/patient_clarking/radiological_investigation' style={{width:'9vw'}}>Next <FaArrowRight /></Link>
            </button>
          </div>     
        </div>
    );
  }
}
