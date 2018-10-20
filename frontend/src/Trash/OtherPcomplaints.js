import React, {Component} from 'react';
import {Container, Row, Col, Table, Button,input, Collapse, Form, FormGroup, Label, } from 'reactstrap';
import PcomplaintsEdit from './PcomplaintsEdit';
import 'bootstrap/dist/css/bootstrap.css';
// import './Style/App.css';

class OtherPcomplaints extends Component{
    constructor(props) {
        super(props);
       
       
        var comments = JSON.parse(localStorage.getItem("data"));
        this.state = {
            comments: comments
        }; 
         
      }


// fetch_data(comments) {

//     this.setState({
//         Others: this.comments.Others,
//     })
// }
       
      

    
      

    
   
      
    render(){
        // margin top for inputs
   
        return(
            <div className="">
        
                <h5>Other Problem Complaints</h5>
                <FormGroup row>
                
                    <Label>
                        Others:
                        <span>{this.state.comments[0].Others}</span>
                        
                    </Label>
                </FormGroup>
                <FormGroup row>      
                    <Label>History of Presenting Complaints:
                    <span>{this.state.comments[0].HistoryOfPresentingComplaints}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                    <Label>Social History:
                    <span>{this.state.comments[0].SocialHistory}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                    <Label>Other Social History:
                    <span>{this.state.comments[0].Others}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                    <Label>Obst & Gynea History:
                    <span>{this.state.comments[0].Others}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                    <Label>Past Medical History:
                    <span>{this.state.comments[0].PasttMedicalHistory}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                    <Label>Allergy:
                    <span>{this.state.comments[0].Others}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                    <Label>Other Allergies:
                    <span>{this.state.comments[0].otherAllergies}</span>
                    </Label> 
                </FormGroup>
                <FormGroup row>      
                <Label>Drug History:
                <span>{this.state.comments[0].drugHistory}</span>
                </Label> 
            </FormGroup>
            </div>
        )
    }
}

export default OtherPcomplaints;