import React, {Component} from 'react';
import {Container, Button, Collapse,} from 'reactstrap';
import EditPrescriptionRequest from './EditPrescriptionRequest';
import 'bootstrap/dist/css/bootstrap.css';
import DrugsTable from './DrugsTable';


class Prequest extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        //getting the initially saved data        
        // let records = JSON.parse(localStorage.getItem('Prequest')) || '{}';

        // setting the initial state        
        this.state = { 
          collapse: false,   
          // records: records, 
          drugsList: [],     
        };      
      }
      // toggles the modal to edit the form to edit the details                        
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }

    updateLocalStorage(data){
      const { drugsList } = this.state;
      localStorage.setItem('prescriptionRequest', JSON.stringify(drugsList));
    }

    updateTable = (data) => {
      const { drugsList } = this.state;
      let newList = drugsList.concat(data);   
      this.setState({ drugsList: newList });
      // this.updateLocalStorage();
    }

    removeDrug = (drug) => {
      const { drugsList } = this.state;
      let newList = drugsList.filter(d => d.drug !== drug);
      this.setState({ drugsList: newList });
    }

    render(){
      return(
        <Container className="Container">
          <Button block color="secondary" className="btn btn-glass"  onClick={this.toggle} style={{ marginBottom: '1rem' }}>Prescription Request</Button>
          <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>
            <div className="offset-md-5">
              {/* The Component that enables editing the current form in a modal */}
              <EditPrescriptionRequest 
                drugsList={this.state.drugsList}
                updateTable={this.updateTable}
              />
            </div>
            <br />
            {/* The Component that displays the form */}
            <DrugsTable 
              drugsList={this.state.drugsList} 
              onRemove={this.removeDrug}
              savePrescriptions={this.props.getPrescriptions}
            />
            <Button onClick={() => this.props.savePrescriptions(this.state.drugsList)}>Save</Button>
            <br />
          </Collapse>
        </Container>   
      )
    }
}

export default Prequest;