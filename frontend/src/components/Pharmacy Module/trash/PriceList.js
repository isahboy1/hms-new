import React, {Component} from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class PriceList extends Component {
    render() {
        return (
            <Card>
                <CardHeader>Stock Balance</CardHeader>
                <CardBody style={{height: "30em"}}></CardBody>
            </Card>
        );
    }
}

export default PriceList;