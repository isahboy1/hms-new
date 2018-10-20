import React, {Component} from 'react';
import {Container, Collapse, Button, FormGroup} from 'reactstrap';
 import NewRadiologyInvestigations from './NewRadiologyInvestigations';
 import 'bootstrap/dist/css/bootstrap.css';
//  import './Style/App.css';
import LabForm from './LabForm';


class RadiologyInvestigations extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        //getting the initially saved data
        let records = JSON.parse(localStorage.getItem('radiological')) || '[]';

        // setting the initial state        
        this.state = { 
            collapse: false , 
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
            <Container className="Container">
                <Button block color="secondary" className="btn btn-glass"  onClick={this.toggle} style={{ marginBottom: '1rem' }}>Clinical / Lab /Radiology Investigations</Button>
                <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>
                    <FormGroup row>
                        
                        <div className="offset-md-4">
                        {/* The Component that enables editing the current form in a modal */}
                            <NewRadiologyInvestigations recieveData={this.recieveData.bind(this)} /> 
                        </div>
                        
                    </FormGroup>
                    
                    <br/> <br/>
                    {/* The Component that displays the form */}
                    <LabForm records={this.state.records} />
                </Collapse>            
            </Container>   
        )
    }
}

export default RadiologyInvestigations;