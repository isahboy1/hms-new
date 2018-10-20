import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { _fetchData } from '../helpers';

export default class PrintResult extends Component {
  constructor(){
      super();

      this.state = {
          patientId: "",
          results: []
      }
  }

  fetchData(){
    let self = this;
    let { id } = this.state;
    let route = `lab/fetchResult?q=${id}`;
    let cb = (data) => {
      self.setState({ results: data });
    }
    _fetchData({ route, callback: cb })
  }

  onInputChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
  }

  getTest = () => {
    const { patientId } = this.state;

  }
  render() {
      const { results, patientId } = this.state;
      const list = [];
      results.forEach(res => {
        list.push(
            <li></li>
        )
      })
    return (
      <div>
        <h1>Print Lab Investigation Result</h1>
        <hr />
        <div className="row">
          <label className="col-md-3">Enter Patient ID</label>
          <input 
            name="patientId"
            className="form-control col-md-8"
            onChange={this.onInputChange}
            value={patientId}
          />
        </div>
        <button className="btn btn-outline-primary" onClick={this.getTest}>Get Tests</button>
        <hr />

       { results !== [] && 
        <ul>
            {list}
        </ul>}

        {/* <button
          className="btn btn-outline-success col-md-3 offset-md-5"
          onClick={this.fetchResult}>
          Preview & Print
        </button> */}
      </div> 
    );
  }
}
