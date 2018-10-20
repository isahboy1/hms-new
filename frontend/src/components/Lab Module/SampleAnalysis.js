import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Table } from 'reactstrap';

export default class SampleAnalysis extends Component {
  render() {
    return (
      <div>
         <Card>
                    <CardHeader>
                        Sample Analysis
                    </CardHeader>
                    <CardBody>
                   
                    <div style={{ marginTop:"20px" }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th ></th>
                                    <th ></th>
                                    <th ></th>
                                    <th ></th>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td ><a href="#"></a></td>
                                        <td ></td>
                                        <td ></td>
                                        <td ></td>
                                       
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
