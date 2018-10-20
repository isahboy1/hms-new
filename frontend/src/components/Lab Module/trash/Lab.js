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

  toggleRoute=()=>{
      this.setState(prevState => ({ isRoute: !prevState.isRoute}))
  }

  onPatientClick = currentReq => {
    this.setState({ currentReq });
    this.toggleRoute();
  };

  render() {
    const { pendingRequest, isRoute } = this.state;
    return (
      <div className="labModule" style={{ backgroundColor: '#ffffff' }}>
        <div className="moduleItems">
          <div className="side-bar">
            <div class="Lab-guid-container">
              <LabGuide />
              <PendingLabRequest
                pendingRequest={pendingRequest}
                onPatientClick={this.onPatientClick}
              />
            </div>
          </div>
        </div>
        <div className="moduleItemsContainer">
          <LabDashboard
            pendingRequest={pendingRequest}
            req={this.state.currentReq}
            isRoute={isRoute}
          />
        </div>
        <img src={image} alt="lab-pic" className="lab-pic" />
      </div>
    );
  }
}
