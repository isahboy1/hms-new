import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Table } from 'reactstrap';

export default class SampleReceptionProcessing extends Component {
  render() {
    return (
      <div>
         <Card>
                    <CardHeader>
                        Processing Speciment
                    </CardHeader>
                    <CardBody>
                   
                    <div style={{ marginTop:"20px" }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th >Lab Id</th>
                                    <th >Lab No</th>
                                    <th >CollectedBy</th>
                                    <th >Patient Id</th>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td ><a href="#">"lab28374"</a></td>
                                        <td >5657</td>
                                        <td >Musa</td>
                                        <td >5768795</td>
                                       
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






