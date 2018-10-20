import React from 'react';
import { Card, Table } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';

function AssignedList(props) {
  const click = () => {
    console.log(props.patientrecord);
  };
  return (
    <div>
      {/* <p className="text-center">Doctor: <strong>{props.patientrecords[0].assigned_to}</strong></p> */}
      <Card className="border-secondary">
        <h6 className="text-center">List of Patients Assigned to you</h6>
        <div style={{ width: '100%', height: '50vh' }}>
          <FreeScrollBar>
            {/* <button onClick={click}>click</button> */}
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Number</th>
                  <th>Name </th>
                </tr>
              </thead>
              <tbody>
                {props.patientrecords.map(record => (
                  <tr
                    style={{ cursor: 'pointer' }}
                    key={record.id}
                    onClick={() => props.toggle(record)}>
                    <td>{record.date_assigned}</td>
                    <td>{record.id}</td>
                    <td>
                      {record.firstname} {record.surname}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </FreeScrollBar>
        </div>
      </Card>
    </div>
  );
}

export default AssignedList;
