import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Table } from 'reactstrap';

export default class SampleTracking extends Component {
  render() {
    return (
      <div>
           <Card style={{ width:'850px' }}>
                    <CardHeader>
                        Sample Tracking
                    </CardHeader>
                    <CardBody>
                   
                    <div style={{ marginTop:"10px", width:'100%' }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th >No</th>
                                    <th >Lab Id</th>
                                    <th >CollectedBy</th>
                                    <th >Date Collected</th>
                                    <th >RecievedBy</th>
                                    <th >Date Recieved</th>
                                    <th >Status</th>
                                    <th >Patient Id</th>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td ><a href="#">1</a></td>
                                        <td >lab5657</td>
                                        <td >Lawan</td>
                                        <td >29/09/2019</td>
                                        <td >Bello</td>
                                        <td >29/09/2019</td>
                                        <td >mdd</td>
                                        <td >84943</td>
                                       
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        </CardBody>
                    </Card>
        
      </div>
    )
  }
}
