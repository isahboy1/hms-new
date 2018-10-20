import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import { _fetchData, _postData, _customNotify } from '../helpers';
import Notifications from 'react-notify-toast';

export default class RequestProcessingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {},
      requests: [],
      currentReq: {},
      resultModalOpen: false,
      previewModalOpen: false,
    };
  }

  fetchUserDetails(id) {
    let self = this;

    let route = `patientrecords/fetchUserById?id=${id}`;
    let cb = data => {
      self.setState({ userDetails: Object.assign({}, data[0]) });
    };
    _fetchData({ route, callback: cb });
  }

  fetchRequests(id) {
    let self = this;

    let route = `lab/getReqById?id=${id}`;
    let cb = data => {
      self.setState({ requests: data });
    };+
    _fetchData({ route, callback: cb });
  }

  componentDidMount() {
    let id = this.props.req.id;
    this.fetchUserDetails(id);
    this.fetchRequests(id);
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveLabResults = formData => {
    console.log(formData);
    _customNotify('Results Saved!');
    this.props.toggleRoute();
  };

  toggleResultModal = req => {
    this.setState(prevState => ({
      resultModalOpen: !prevState.resultModalOpen,
      currentReq: req,
    }));
  };

  togglePreviewModal = () => {
    this.setState(prevState => ({
      previewModalOpen: !prevState.previewModalOpen,
    }));
  };

  cancel = () => {
    this.props.toggleRoute();
  };

  render() {
    const { req } = this.props;
    const {
      userDetails,
      resultModalOpen,
      previewModalOpen,
      currentReq,
    } = this.state;

    return (
      <div>
        <Notifications options={{ zIndex: 200, top: '50px' }} />
        <PatientInfo req={req} userDetails={userDetails} />
        <br />
        <RequestsTable
          requests={this.state.requests}
          resultModalOpen={resultModalOpen}
          previewModalOpen={previewModalOpen}
          toggleResultModal={this.toggleResultModal}
          togglePreviewModal={this.togglePreviewModal}
          saveLabResults={this.saveLabResults}
          currentReq={currentReq}
          req={req}
          userDetails={userDetails}
        />
        <br />
        {/* <button
          className="btn btn-outline-secondary"
          onClick={this.saveLabResults}>
          Save Results
        </button> */}
        <button className="btn btn-outline-danger" onClick={this.cancel}>
          Close
        </button>
      </div>
    );
  }
}

const PatientInfo = ({ req, userDetails }) => {
  const flexStyle = { display: 'flex', flexDirection: 'horizontal' };

  return (
    <Card className="border-secondary">
      <h5 className="text-center">Patient's Information</h5>
      <CardBody>
        <div style={flexStyle}>
          <div className="label" style={{ margin: '.7em', width: '100%' }}>
            <label>Names: </label>
            <span>
              {userDetails.surname} {userDetails.firstname}
            </span>
          </div>
          <div className="label" style={{ margin: '.7em', width: '25%' }}>
            <label>Gender: </label>
            <span>{userDetails.gender}</span>
          </div>
        </div>
        <div style={flexStyle}>
          <div className="label" style={{ margin: '.7em', width: '41.66%' }}>
            <label>Phone: </label>
            <span>{userDetails.phoneNo}</span>
          </div>
          <div className="label" style={{ margin: '.7em', width: '25%' }}>
            <label>ID: </label>
            <span>{req.id}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const RequestsTable = ({
  requests,
  resultModalOpen,
  previewModalOpen,
  toggleResultModal,
  togglePreviewModal,
  saveLabResults,
  userDetails,
  currentReq,
  req,
}) => {
  const rows = [];
  requests.forEach((req, i) => {
    rows.push(
      <tr key={i}>
        <td>{req.date.slice(0, 10)}</td>
        <td>{req.seen_by}</td>
        <td>{req.test}</td>
        <td>{req.sample}</td>
        <td>
          <button
            className="btn btn-outline-primary col-md-12"
            onClick={() => toggleResultModal(req)}>
            Add Result
          </button>
        </td>
        <td>
          <button
            className="btn btn-outline-warning col-md-12"
            onClick={() => togglePreviewModal(req)}>
            Print
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Card>
      <h5 style={{ textAlign: 'center' }}>Pending Lab Requests</h5>
      <CardBody>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Dr.</th>
              <th>Test</th>
              <th>Sample</th>
              <th className="text-center">Add Results</th>
              <th className="text-center">Print</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          <ResultModal
            resultModalOpen={resultModalOpen}
            toggleResultModal={toggleResultModal}
            saveLabResults={saveLabResults}
            currentReq={currentReq}
            userDetails={userDetails}
          />
          <PrintPreview
            req={req}
            userDetails={userDetails}
            previewModalOpen={previewModalOpen}
            togglePreviewModal={togglePreviewModal}
          />
        </Table>
      </CardBody>
    </Card>
  );
};

class ResultModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      appearance: '',
      microscopy: '',
      culture: '',
      antibiotic: '',
      warning: '',
    };
  }
  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      warning: '',
    });
  };

  saveLabResults = e => {
    e.preventDefault();
    const { result, appearance, microscopy, culture, antibiotic } = this.state;
    if (
      result === '' &&
      appearance === '' &&
      microscopy === '' &&
      culture === '' &&
      antibiotic === ''
    )
      return this.setState({ warning: 'All fields cannot be left blank' });

    const formData = { result, appearance, microscopy, culture, antibiotic };
    this.props.saveLabResults(formData);
  };
  render() {
    const {
      resultModalOpen,
      toggleResultModal,
      currentReq,
      userDetails,
    } = this.props;
    const {
      result,
      appearance,
      microscopy,
      culture,
      antibiotic,
      warning,
    } = this.state;
    return (
      <Modal size="lg" isOpen={resultModalOpen} toggle={toggleResultModal}>
        <ModalHeader toggle={toggleResultModal}>Add Result</ModalHeader>
        <ModalBody>
          <form onSubmit={this.saveLabResults}>
            <div className="row" >
            <div className="col-md-6">
              <label className="col-md-6" style={{textAlign:'left'}}>Patient: </label>
              <label className="col-md-6" style={{textAlign:'left'}}>{userDetails.surname}</label>
              <label className="col-md-6" style={{textAlign:'left'}}>Test: </label>
              <label className="col-md-6" style={{textAlign:'left'}}>{currentReq.test}</label>
              <label className="col-md-6" style={{textAlign:'left'}}>Sample: </label>
              <label className="col-md-6" style={{textAlign:'left'}}>{currentReq.sample}</label>
              </div>
            </div>
            <div className="row form-group">
              <label className="col-md-2 control-label">Result:</label>
              <input
                name="result"
                className="form-control col-md-8"
                value={result}
                onChange={this.onInputChange}
              />
            </div>
            <div className="row form-group">
              <label className="col-md-2 control-label">Appearance:</label>
              <input
                name="appearance"
                className="form-control col-md-8"
                value={appearance}
                onChange={this.onInputChange}
              />
            </div>
            <div className="row form-group">
              <label className="col-md-2 control-label">Microscopy:</label>
              <input
                name="microscopy"
                className="form-control col-md-8"
                value={microscopy}
                onChange={this.onInputChange}
              />
            </div>
            <div className="row form-group">
              <label className="col-md-2 control-label">Culture:</label>
              <input
                name="culture"
                className="form-control col-md-8"
                value={culture}
                onChange={this.onInputChange}
              />
            </div>
            <div className="row form-group">
              <label className="col-md-2 control-label">Antibiotic:</label>
              <input
                name="antibiotic"
                className="form-control col-md-8"
                value={antibiotic}
                onChange={this.onInputChange}
              />
            </div>
            {warning && (
              <span className="alert alert-danger text-center offset-md-4">
                {warning}
              </span>
            )}
            <hr />
            <input
              type="submit"
              className="btn btn-outline-success offset-md-5"
              value="Save Result"
            />
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

const Result = ({ result, appearance, microscopy, culture, antibiotic }) => {
  const divideStyle = {
    margin: '.7em',
    width: '50%',
  };
  const labelStyle = {
    textAlign: 'left',
    width: '30%',
  };
  const valStyle = {
    textAlign: 'left',
    width: '70%',
  };
  return (
    <div>
      <h2>Lab Test Result</h2>
      <div style={divideStyle}>
        <label style={labelStyle}>Result: </label>
        <label style={valStyle}>{result}</label>
      </div>
      <div style={divideStyle}>
        <label style={labelStyle}>Appearance: </label>
        <label style={valStyle}>{appearance}</label>
      </div>
      <div style={divideStyle}>
        <label style={labelStyle}>Microscopy: </label>
        <label style={valStyle}>{microscopy}</label>
      </div>
      <div style={divideStyle}>
        <label style={labelStyle}>Culture: </label>
        <label style={valStyle}>{culture}</label>
      </div>
      <div style={divideStyle}>
        <label style={labelStyle}>Antibiotic: </label>
        <label style={valStyle}>{antibiotic}</label>
      </div>
    </div>
  );
};

const PrintPreview = ({
  req,
  userDetails,
  previewModalOpen,
  togglePreviewModal,
}) => {
  const onPrintClick = () => {
    window.frames[
      'print_frame'
    ].document.body.innerHTML = document.getElementById('labResult').innerHTML;
    window.frames['print_frame'].window.focus();
    window.frames['print_frame'].window.print();
  };
  return (
    <Modal size="lg" isOpen={previewModalOpen} toggle={togglePreviewModal}>
      <ModalHeader toggle={togglePreviewModal}>Add Result</ModalHeader>
      <ModalBody>
        <div id="labResult">
          <PatientInfo req={req} userDetails={userDetails} />
          <Result
            result="cleared"
            appearance="cleared"
            microscopy="cleared"
            culture="cleared"
            antibiotic="cleared"
          />
        </div>
        <iframe name="print_frame" width="0" height="0" src="about:blank" />
        <button className="btn btn-outline-success" onClick={onPrintClick}>
          Print
        </button>
      </ModalBody>
    </Modal>
  );
};
