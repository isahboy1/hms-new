import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import PendingPharmacyRequest from './PatientPrescriptionList';
import SalesReport from './SalesReport';
import UpToDateStockBalance from './UpToDateStockBalance';
import EditDrugs from './EditDrugs';
import image from '../../images/phamarcy.jpg';
import { PharmacyGuide } from '../Guides';
import PharmacyDashboard from './PharmacyDashboard';
import FreeScrollBar from 'react-free-scrollbar';
import './pharmacy.css';

export default class Pharmacy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      pendingRequest: [],
    };
  }
  render() {
    return (
      <div className="row" style={{ backgroundColor: '#ffffff' }}>
        <div className="col-md-3">
          <div className="pharmacy-guide-container">
            <PharmacyGuide />
            <PendingPharmacyRequest />
          </div>
        </div>
        <div
          className="col-md-6"
          style={{ height: '85vh', border: '1px solid #007bff' }}>
          <PharmacyDashboard />
        </div>
        <div className="col-md-2">
          <img src={image} alt="module-pic" className="pharm-img" />
        </div>
      </div>
    );
  }
}
