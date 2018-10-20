import React, {Component} from 'react';
import {Container, Collapse, Button } from 'reactstrap';
import CreateNewHistory from './CreateNewHistory';
import 'bootstrap/dist/css/bootstrap.css';
import HistoryForm from './HistoryForm';
// import './Style/App.css';

class History extends Component {
    constructor(props) {
        super(props);
        //getting the initially saved data
        let records = JSON.parse(localStorage.getItem('history')) || '{}';

        // setting the initial state
          this.state = { 
            collapse: false, 
            records: records        
        };
    }
    
    // toggles the modal to edit the form to edit the details
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    //recieves data from the child
    recieveData(data) {
        this.setState({ records: data})
    }

    render(){
        return(
            <Container className="Container">
                <Button block color="secondary" className="btn btn-glass" onClick={this.toggle} style={{ marginBottom: '1rem' }}>History</Button>
                
                <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>
                    <div className="offset-md-5">
                        {/* The Component that enables editing the current form in a modal */}
                        <CreateNewHistory recieveData={this.recieveData.bind(this)} /> 
                    </div>
                                        
                    <br/> <br/>
                    {/* The Component that displays the form */}
                    <HistoryForm records={this.state.records}/>
                </Collapse>
            </Container>   
        )
    }



}

export default History;