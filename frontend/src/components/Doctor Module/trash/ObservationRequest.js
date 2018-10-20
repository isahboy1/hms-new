import React, {Component} from 'react';
import {Container, Collapse,  Button } from 'reactstrap';
import EditObservationRequest from './EditObservationRequest';
import 'bootstrap/dist/css/bootstrap.css';
import ObservationRequestForm from './ObservationRequestForm';


class ObservationRequest extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        //getting the initially saved data
        let records = JSON.parse(localStorage.getItem('ObservationRequest')) || '{}';

        // setting the initial state        
          this.state = { 
            collapse: false,
            records: records,  
        
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
            <Button block color="secondary" className="btn btn-glass"  onClick={this.toggle} style={{ marginBottom: '1rem' }}>Observation Request</Button>
            <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>
              <div className="offset-md-5">
              {/* The Component that enables editing the current form in a modal */}
                <EditObservationRequest recieveData={this.recieveData.bind(this)}/>
              </div>
              {/* The Component that displays the form */}
              <ObservationRequestForm records={this.state.records}/>     
            </Collapse>   
          </Container>   
        )
    }
}

export default ObservationRequest;