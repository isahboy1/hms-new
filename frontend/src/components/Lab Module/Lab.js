import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import LaboratorySetupForms from './LaboratorySetupForms';
import PendingLabRequest from './PendingLabRequest';
import './Lab.css';
import SampleCollection from './SampleCollection';
import SampleReceptionProcessing from './SampleReceptionProcessing';
import SampleAnalysis from './SampleAnalysis';
import PrintResult from './PrintResult';
import PathologistComment from './PathologistComment';
import SampleTracking from './SampleTracking';
import LabDashboard from './LabDashboard';
import { LabGuide } from '../Guides';
import { _fetchData } from '../helpers';
import image from '../../images/Scanning.png';

export default class Lab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      isRoute: true,
      pendingRequest: [],
      currentReq: {},
    };
  }

  fetchData() {
    let self = this;

    let route = 'lab/pendingRequests';
    let cb = data => {
      self.setState({ pendingRequest: data });
    };
    _fetchData({ route, callback: cb });
  }

  componentDidMount() {
    this.fetchData();
  }

  toggleRoute = () => {
    this.setState(prevState => ({ isRoute: !prevState.isRoute }));
  };

  onPatientClick = currentReq => {
    this.setState({ currentReq });
    this.toggleRoute();
  };

  render() {
    const { pendingRequest, isRoute } = this.state;
    return (
      <div className=" row" style={{ backgroundColor: '#ffffff' }}>
        <div className="col-md-3">
          <div className="side-bar">
            <div className="Lab-guid-container">
              <LabGuide />
              <PendingLabRequest
                pendingRequest={pendingRequest}
                onPatientClick={this.onPatientClick}
              />
            </div>
          </div>
        </div>
        <div
          style={{ height: '85vh', border: '1px solid #007bff' }}
          className="col-md-6">
          <LabDashboard
            pendingRequest={pendingRequest}
            req={this.state.currentReq}
            isRoute={isRoute}
            toggleRoute={this.toggleRoute}
          />
        </div>
        <div className="col-md-2">
          <img src={image} alt="lab-pic" className="lab-pic" />
        </div>
      </div>
    );
  }
}
