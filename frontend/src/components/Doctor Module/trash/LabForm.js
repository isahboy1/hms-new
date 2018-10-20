import React from 'react';
import {Col, Form, FormGroup, Label } from 'reactstrap';

const LabForm = (props) => {
    return (
       <div> 
       <Form>
        <FormGroup row>
             <Label>Required Investigation (and Others):</Label>
             <Col>{props.records.test}</Col>
         </FormGroup>
         <FormGroup row>      
             <Label>Required Sample:</Label> 
             <Col>{props.records.sample}</Col>
         </FormGroup>
         <FormGroup row>      
             <Label>Lab Name:</Label> 
             <Col>{props.records.labName}</Col>
         </FormGroup>
       </Form>
       </div>
    );
}

export default LabForm;