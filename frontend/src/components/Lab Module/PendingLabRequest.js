import React, { Component } from 'react';
import {
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
import RequestProcessingForm from './RequestProcessingForm';
import FreeScrollBar from 'react-free-scrollbar';

class PendingLabRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      searchTerm: '',
      currentReq: {},
    };
  }

  onSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  onPatientClick = currentReq => {
    // this.toggle();
    this.props.onPatientClick(currentReq);
  };

  render() {
    const { pendingRequest, onPatientClick } = this.props;

    const rows = [];

    pendingRequest.forEach((req, i) => {
      if (req.id.indexOf(this.state.searchTerm) === -1) return;

      rows.push(
        <tr
          key={i}
          onClick={() => onPatientClick(req)}
          style={{ cursor: 'pointer' }}>
          <td>{i + 1}</td>
          <td>{req.date.slice(0, 10)}</td>
          <td>{req.id}</td>
          <td>{req.seen_by}</td>
        </tr>
      );
    });
    return (
      <div className=" ">
        <Card className="border-secondary">
          <h6 className="text-center">Pending Lab Request</h6>

          <div className="row">
            <Input
              className="offset-md-1 col-md-10"
              value={this.state.searchTerm}
              onChange={this.onSearchTermChange}
              placeholder="Search requests by ID"
            />
          </div>
          <div style={{ width: '100%', height: '50vh' }}>
            <FreeScrollBar>
              {!pendingRequest.length ? (
                <p className="text-center">
                  <em>No item found</em>
                </p>
              ) : (
                <Table bordered striped hover>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Date</th>
                      <th>Patient No</th>
                      <th>Requested By</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              )}
            </FreeScrollBar>
          </div>
        </Card>
      </div>
    );
  }
}

export default PendingLabRequest;
