import React, {Component} from 'react';
import {Container,Button,Collapse} from 'reactstrap';
import PcomplaintsEdit from './PcomplaintsEdit';
import PcomplaintsForm from './PcomplaintsForm';
import 'bootstrap/dist/css/bootstrap.css';

class Pcomplaints extends Component{
    constructor(props) {
        super(props);
       
        //getting the initially saved data
        let records = JSON.parse(localStorage.getItem('pComplaints')) || '{}';

        // setting the initial state
        this.state = { 
            collapse: false , 
            records: records        
        };      
      }
    
    // toggles the modal to edit the form to edit the details
    toggle = () => {
    this.setState({ collapse: !this.state.collapse });
    }

    /**
     * recieveData from the child component PcompalaintEdit and then pass 
     * it down to another child component PcomplaintsForm which display the 
     * updated data
     */
    recieveData = (data) => {
        this.setState({ records: data})
    }
     
    render(){   
        return(
            <Container className="container">
                <Button block color="secondary" className="btn btn-glass" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Presenting Complaints</Button>                   
                <div>
                    <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>
                        <div className="offset-md-4">
                            {/* The form for editing the patient data for this section */}
                            <PcomplaintsEdit recieveData={this.recieveData}/>
                        </div>
                        {/* The form that displays the data for this section */}
                        <PcomplaintsForm records={this.state.records} />                                  
                    </Collapse>
                </div>
            </Container>
        )
    }
}

export default Pcomplaints;