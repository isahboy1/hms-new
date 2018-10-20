import React, {Component} from 'react';
import { Card, CardBody, CardHeader,Modal, ModalBody, ModalHeader, Input, InputGroup, Table, InputGroupAddon } from 'reactstrap';
import RequestProcessingForm from './RequestProcessingForm';
import FreeScrollBar from 'react-free-scrollbar';

                                 
const TableRow = ({ req, onPatientClick }) =>    
  <tr onClick={() => onPatientClick(req)} style={{cursor:'pointer'}}>
    <td>{req.date.slice(0,10)}</td>
    <td>{req.id}</td>
    <td>{req.seen_by}</td>
  </tr>

class PendingLabRequest extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modal: false,
            searchTerm: "",
            currentReq: {},
        };
    }

    onSearchTermChange = (e) => {
        this.setState({ searchTerm: e.target.value})
    }

    // toggle = () => {
    //     this.setState(prevState => ({ modal: !prevState.modal }))
    // }

    onPatientClick=(currentReq)=>{
        // this.toggle();
        this.props.onPatientClick({ currentReq })
    }
   
    render() {
        const { pendingRequest } = this.props;

        const rows = [];

        pendingRequest.forEach((req, i) => {  
            if(req.id.indexOf(this.state.searchTerm) === -1) return;

            rows.push(
                <TableRow
                    key={i}
                    req={req}
                    onPatientClick={this.onPatientClick}
                />
            );
        });
        return(
            
            <div className=" ">              
                <Card>
                    <CardHeader>Pending Lab Request</CardHeader>
                    
                    <CardBody>
                        <div className="row">
                            <Input 
                                value={this.state.searchTerm} 
                                onChange={this.onSearchTermChange}
                                placeholder="Search requests by ID"
                            />
                        </div>
                    
                        <div style={{ width: '100%', height: '50vh' }}>
                        <FreeScrollBar>
                            <Table bordered striped hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Patient No</th>
                                        <th>Requested By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { rows }
                                    </tbody>
                                </Table>
                                </FreeScrollBar>
                            </div>
                        </CardBody>
                    </Card>
                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle} >Request Processing Form</ModalHeader>
                        <ModalBody>
                            <RequestProcessingForm 
                                req={this.state.currentReq}
                            />
                        </ModalBody>
                    </Modal>
            </div>

        );
    }
}

export default PendingLabRequest;