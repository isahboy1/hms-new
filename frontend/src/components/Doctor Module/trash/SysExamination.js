import React, {Component} from 'react';
import {Container, Button, Collapse} from 'reactstrap';
import SysExaminationEdit from './SysExaminationEdit';
import 'bootstrap/dist/css/bootstrap.css';
import SystemExaminationForm from './SystemExaminationForm';

class SysExamination extends Component {
    constructor(props) {
        super(props);
        //getting the initially saved data
        this.toggle = this.toggle.bind(this);

        let records = JSON.parse(localStorage.getItem('sysExamination')) || '[]';

        // setting the initial state
        this.state = { 
            collapse: false, 
            records: records  
        };
      } 

    // toggles the modal to edit the form to edit the details
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    //recieves data from the child
    recieveData(data) {
        this.setState({ records: data})
    }

    render(){
        return(
            <Container className="container">
                <Button block color="secondary" className="btn btn-glass"  onClick={this.toggle} style={{ marginBottom: '1rem' }}>System Examination</Button>
                <Collapse id="sysExam-collapse" isOpen={this.state.collapse}>
                    <div className="offset-md-4">
                        {/* The Component that enables editing the current form in a modal */}
                        <SysExaminationEdit recieveData={this.recieveData.bind(this)}/>
                    </div>
                    {/* The Component that displays the form */}
                    <SystemExaminationForm records={this.state.records}/>
                </Collapse>               
            </Container>                
        )
    }
}

export default SysExamination;
