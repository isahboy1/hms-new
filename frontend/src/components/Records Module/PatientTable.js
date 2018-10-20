import React from 'react';
import { Table } from 'reactstrap';


class TableRow extends React.Component {
  
    render() {
      const patient = this.props.patient;
      
  
      return (
        <tr>
          
          <td>{patient.id}</td>
          <td>{patient.firstname} {patient.surname}</td>
          <td>{patient.Gender}</td>
          <td className="moveToCenter">
          <button className="btn btn-secondary" onClick={() => this.props.openDoctorsModal(patient.id)} style={{ marginBottom: '1rem' }}>Assign Doctor </button >
          </td>
          
          { this.props.renderEditButton &&
              <td className="moveToCenter">
                <button className="btn btn-primary" onClick={() => this.props.openModal(patient)} style={{ marginBottom: '1rem' }}>Edit </button >
              </td> }
          {/*
                this part is used to enable in-records delete operations
                to activate this action, uncomment the code below
              */}
          {/*<td className="moveToCenter">
            <button className="btn btn-danger" style={{ marginBottom: '1rem' }} >
            <a onClick={() => this.props.deletepatientrecords(patient)} >Delete</a></button>
          </td>*/}
          
        </tr>
      );
    }
  }

class PatientTable extends React.Component {
  
    render() {
      const filterText = this.props.filterText;
  
      const rows = [];
  
      this.props.patientlist.forEach((patient) => {
        if (patient.id.toString().indexOf(filterText) === -1 ) {
          return;
        }  
         
        
        rows.push(
          <TableRow
            patient={patient}
            key={patient.id}
            openDoctorsModal={this.props.openDoctorsModal}
            /*
                this part is used to enable in-records delete operations
                to activate this action, uncomment the code below
              */
            // deletepatientrecords={this.props.deletepatientrecords}
            openModal={this.props.openModal}
            renderEditButton={this.props.renderEditButton}

          />
        );
      });
  
      return (
        <div style={{height: '500px'}}>
          {
            this.props.patientlist.length === 0 ? <p style={{textAlign:'center'}}><em>No record found</em></p>
            :
            <Table size="sm" bordered striped hover>
              <thead>
                <tr>
                  <th>Patient No</th>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th className="moveToCenter">Assign Doctor</th>
                  {/* {
                    this.props.renderEditButton ? <th className="moveToCenter">Edit Record</th>: null 
                  } */}

                  { this.props.renderEditButton && <th className="moveToCenter">Edit Record</th> }
                  
                  {/*
                    this part is used to enable in-records delete operations
                    to activate this action, uncomment the code below
                  */}
                  {/*<th className="moveToCenter">Delete Record</th>*/}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          }
        </div>
      );
    }
  }

  

export default PatientTable;