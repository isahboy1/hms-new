import React from 'react';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import { _fetchData, _postData, _customNotify } from '../helpers';
import Notifications from 'react-notify-toast';

export default class RequestProcessingForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userDetails: {},
            requests: [],

        }
    }

    fetchUserDetails(id){
        let self = this;
        
        let route = `patientrecords/fetchUserById?id=${id}`;
        let cb = (data) => {
          self.setState({ userDetails: Object.assign({}, data[0]) });
        }
        _fetchData({ route, callback: cb })
    }

    fetchRequests(id){
        let self = this;
        
        let route = `lab/getReqById?id=${id}`;
        let cb = (data) => {
          self.setState({ requests: data });
        }
        _fetchData({ route, callback: cb })
    }

    componentDidMount(){
        let id = this.props.req.id;
        this.fetchUserDetails(id);
        this.fetchRequests(id)
    }

    render() {
        const { req } = this.props;
        const { userDetails } = this.state;

        return (
            <div>
                <Card>
                    <CardHeader><h5>Patient's Information</h5></CardHeader>
                    <CardBody>
                        <form className="row">
                            <div className="form-group col-md-6">
                                <label className="control-label col-md-4">PatientID:</label>
                                <label className="control-label offset-md-1">{req.id}</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="control-label col-md-4">Seen By:</label>
                                <label className="control-label offset-md-1">{req.seen_by}</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="control-label col-md-4">Name:</label>
                                <label className="control-label offset-md-1">{`${userDetails.surname} ${userDetails.firstname}`}</label>
                                
                            </div>
                            <div className="form-group col-md-6">
                                <label className="control-label col-md-4">Gender:</label>
                                <label className="control-label offset-md-1">{userDetails.gender}</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="control-label col-md-4">Age:</label>
                                <label className="control-label offset-md-1">{userDetails.age}</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="control-label col-md-4">Email</label>
                                <label className="control-label offset-md-1">{userDetails.email}</label>
                            </div>
                        </form>
                    </CardBody>
                </Card>
                <br />
                <RequestsTable 
                    requests={this.state.requests}
                />
            </div>
        )
    }
}

const RequestsTable = ({ requests }) => {
    const rows = [];
    requests.forEach(req => {
        rows.push(
            <tr>
                <td>{req.date.slice(0,10)}</td>
                <td>{req.seen_by}</td>
                <td>{req.test}</td>
                <td>{req.sample}</td>
                
            </tr>
        )
    })
    return (
        <Card>
            <CardHeader>Pending Lab Requests</CardHeader>
            <CardBody>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Request Date</th>
                            <th>Dr.</th>
                            <th>Test</th>
                            <th>Sample</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rows }
                        </tbody>
                    </Table>
            </CardBody>
        </Card>
    )
}

const AddNewReq = () => 
    <Card>
        <CardHeader>Add Drugs</CardHeader>
        <CardBody>
            <form>
                <div className="row">
                    <label className="col-md-2">Drug</label>
                    <input className="form-control col-md-4" />
                    <label className="col-md-2">Quantity</label>
                    <input className="form-control col-md-4" />
                </div>
                <div className="row">
                    <label className="col-md-2">Price</label>
                    <input className="form-control col-md-4" />
                    <label className="col-md-2">Prescription</label>
                    <input className="form-control col-md-4" />
                </div>
            </form>
        </CardBody>
    </Card>