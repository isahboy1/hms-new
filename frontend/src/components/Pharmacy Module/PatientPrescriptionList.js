import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  InputGroup,
  Table,
  InputGroupAddon,
} from 'reactstrap';
import PrescriptionProcessingForm from './PrescriptionProcessingForm';
import FreeScrollBar from 'react-free-scrollbar';
import Notifications from 'react-notify-toast';
import { _fetchData, _customNotify } from '../helpers';

class PendingPharmacyRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      pendingDrugsList: [],
      currentDrug: {},
      searchTerm: '',
    };
  }

  fetchData() {
    let self = this;

    let route = 'drugs/pendingDrugsList';
    let cb = data => {
      self.setState({ pendingDrugsList: data });
    };
    _fetchData({ route, callback: cb });
  }

  componentDidMount() {
    this.fetchData();
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  onProcessClick = drug => {
    this.toggle();
    this.setState({
      currentDrug: Object.assign({}, this.state.currentDrug, drug),
    });
  };

  dispenseDrugs = drugs => {
    _customNotify('Drug(s) dispensed successfully!');
    this.toggle();
    console.log(drugs);
  };

  onSearchTermChange = searchTerm => {
    this.setState({ searchTerm });
  };

  render() {
    const { pendingDrugsList } = this.state;

    const rows = [];

    pendingDrugsList.forEach((drug, i) => {
      if (drug.id.indexOf(this.state.searchTerm) === -1) return;

      rows.push(
        <tr
          key={i}
          onClick={() => this.onProcessClick(drug)}
          style={{ cursor: 'pointer' }}>
          <td>{i + 1}</td>
          <td>{drug.id}</td>
          <td>{drug.date.slice(0, 10)}</td>
          <td>{drug.seen_by}</td>
          <td>{drug.id}</td>
        </tr>
      );
    });
    return (
      <div className=" ">
        <Notifications options={{ zIndex: 200, top: '50px' }} />
        <Card className="border-secondary">
          <h6 className="text-center">Pending Pharmacy Request</h6>
          <CardBody>
            <div className="row">
              <Input
                placeholder="Search request by ID"
                value={this.state.searchTerm}
                onChange={e => this.onSearchTermChange(e.target.value)}
              />
            </div>
            <div className=" " style={{ width: '100%', height: '45vh' }}>
                <FreeScrollBar>
            {!pendingDrugsList.length ? (
              <p className="text-center">
                <em>No record found</em>
              </p>
            ) : (
              
                  <Table bordered striped hover responsive>
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Date</th>
                        <th>Requested By</th>
                        <th>Patient No</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </Table>
                
            )}
            </FreeScrollBar>
              </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default PendingPharmacyRequest;
