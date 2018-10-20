import React from 'react';
import {Col, Form, FormGroup, Label, } from 'reactstrap';

const DrugsForm = (props) => {
    return (
       <div> 
       <Form>
            
       <FormGroup row><br/>
       <Label>Select Drugs</Label> 
       <Col>{props.records.drug}</Col>
       </FormGroup>

       <FormGroup row><br/>
       <Label>Price</Label> 
       <Col>{props.records.price}</Col>
       </FormGroup>       

       <FormGroup row><br />
        <Label>Dosage</Label>
        <Col>{props.records.dosage}</Col>
      </FormGroup>
           
                    
       </Form>
       </div>
    );
}

export default DrugsForm;

