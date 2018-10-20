import React, {Component} from 'react';
import {CardHeader, CardBody, Card} from 'reactstrap';

class LaboratorySetupForms extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            categoryName: '',
            subCategoryName: '',
            
        }
    }

  

    render() {
        return(
            <div>
                <Card>
                    <CardHeader>Service Form</CardHeader>
                    <CardBody>
                        <div className="Row">                    
                            <form className="Col-md-8 ">
                               
                                <div className="form-group Row">
                                    <label className="Col-md-6">Category Name</label>
                                    <input type="text" className="form-control col-md-6" onChange={e =>this.setState({categoryName:e.target.value})} value={this.state.categoryName} />
                                </div>
                                <div className="form-group Row">
                                    <label className="Col-md-6">Sub Category Name</label>
                                    <input type="text" className="form-control Col-md-6" onChange={e =>this.setState({subCategoryName:e.target.value})} value={this.state.subCategoryName} />
                                </div>
                               
                            </form>
                            
                            <div className="Row">
                                <button className="btn btn-default btn-secondary Col-md-4">Create</button>  
                                <br /> <br/>
                                <button className="btn btn-default btn-secondary Col-md-4">Cancel</button>  
                                <button className="btn btn-default btn-secondary Col-md-4">Save to List</button> 
                                <div></div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
          
                <Card>
                    <CardHeader>List of Supplied Drugs</CardHeader>
                    <CardBody>
                        <div><i>No item found</i></div>
                    </CardBody>
                </Card>

            </div>

        );
    }
}

export default LaboratorySetupForms;