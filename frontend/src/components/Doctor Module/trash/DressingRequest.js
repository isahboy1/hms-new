import React, {Component} from 'react';
import {Container,  Button, Collapse } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import EditDressingRequest from './EditDressingRequest';
import DressingRequestForm from './DressingRequestForm';


class DressingRequest extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        //getting the initially saved data
        let records = JSON.parse(localStorage.getItem('DressingRequest')) || '{}';

        // setting the initial state        
        this.state = { 
          collapse: false , 
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
          <Button block color="secondary" className="btn btn-glass"  onClick={this.toggle} style={{ marginBottom: '1rem' }}>Dressing Request</Button>
          <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>
            <div className="offset-md-5">
            {/* The Component that enables editing the current form in a modal */}
              <EditDressingRequest recieveData={this.recieveData.bind(this)} />
            </div>
            {/* The Component that displays the form */}
            <DressingRequestForm records={this.state.records} />
          </Collapse>  
        </Container>   
      )
    }
}

export default DressingRequest;