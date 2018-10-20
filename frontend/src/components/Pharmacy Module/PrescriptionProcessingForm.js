import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import { _fetchData, _postData, _customNotify } from '../helpers';
import Notifications from 'react-notify-toast';
import AddDrugForm from './AddDrugForm';

export default class PrescriptionProcessingForm extends Component {
  constructor(props) {
    super(props);

    // the inital state is being set here
    this.state = {
      userDetails: {},
      prescriptions: [],
      quantityDispensed: [],
      price: [],
      total: 0,
      addDrugMmodal: false,
      changeDrugModal: false,
      drugList: [],
      searchTerm: '',
      validationText: '',
      drugToChange: '',
      drugDetails: {
        drug: '',
        quantity: '',
        price: '',
        prescription: '',
      },
    };
  }

  fetchUserDetails(id) {
    let self = this;

    let route = `patientrecords/fetchUserById?id=${id}`;
    let cb = data => {
      self.setState({ userDetails: Object.assign({}, data[0]) });
    };
    _fetchData({ route, callback: cb });
  }

  fetchPrescription(id) {
    let self = this;

    let route = `drugs/getPrescriptionById?id=${id}`;
    let cb = data => {
      self.setState({ prescriptions: data });
    };
    _fetchData({ route, callback: cb });
  }

  fetchDrugList = () => {
    let self = this;

    let route = `drugs/allDrugs`;
    let cb = data => {
      self.setState({ drugList: data });
    };
    _fetchData({ route, callback: cb });
  };

  componentDidMount() {
    let id = this.props.details.id;
    this.fetchUserDetails(id);
    this.fetchPrescription(id);
    this.fetchDrugList();
  }

  /**
   * onQuantityDispensedInputChange()
   * Does major calculations when the quantity of the drugs
   * to be dispensed changes and updates the state of the neccessary
   * changes.
   */
  onQuantityDispensedInputChange = (e, price, i) => {
    let value = e.target.value;
    let initialPrice = this.state.price;
    initialPrice[i] = price * value;
    let quantityDispensed = this.state.quantityDispensed;
    quantityDispensed[i] = value;
    let total = initialPrice.reduce((a, b) => a + b);
    // console.log(total);
    this.setState({
      quantityDispensed,
      price: initialPrice,
      total,
    });
  };

  toggle = () => {
    this.setState(prevState => ({ addDrugMmodal: !prevState.addDrugMmodal }));
  };

  /**
   * The following four methods onDrugChange(), onQuantityChange(), onPrescriptionChange()
   * onPriceChange() takes care of the onChange event of the Add Drug Form
   */
  onDrugChange = e => {
    let value = e.target.value;
    this.setState({
      drugDetails: Object.assign({}, this.state.drugDetails, { drug: value }),
    });
  };

  onQuantityChange = e => {
    let value = e.target.value;
    this.setState({
      drugDetails: Object.assign({}, this.state.drugDetails, {
        quantity: value,
      }),
    });
  };

  onPrescriptionChange = e => {
    let value = e.target.value;
    this.setState({
      drugDetails: Object.assign({}, this.state.drugDetails, {
        prescription: value,
      }),
    });
  };

  onPriceChange = e => {
    let value = e.target.value;
    this.setState({
      drugDetails: Object.assign({}, this.state.drugDetails, { price: value }),
    });
  };

  /**
   * updatePrescriptionList()
   * Updates the prescription list accordingly with the newly
   * passed in drug.
   */
  updatePrescriptionList = data => {
    let prescriptionList = this.state.prescriptions;
    let newPrescriptionList = prescriptionList.concat(data);
    this.setState({ prescriptions: newPrescriptionList });
  };

  /**
   * addDrug()
   * Takes care of adding drug to the drugs list, it submits
   * the newly added drug to the database, does validation before
   * taking any action, also updates the state so that the changes
   * can reflect without having to reload the browser.
   */
  addDrug = () => {
    //gets the values of the new form from the state
    let { prescription, price, drug, quantity } = this.state.drugDetails;
    // gets basic details about the patient which would be appended to the request
    const { details } = this.props;
    // performs the validation
    if (prescription === '' || price === '' || drug === '' || quantity === '') {
      return this.setState({ validationText: 'Please fill all the fields' });
    }

    // all the data about the new drug to be added, id = patient's id
    let data = {
      id: details.id,
      dosage: prescription,
      drug_status: 'pending',
      date: new Date(),
      price,
      drug,
      seen_by: details.seen_by,
      quantity,
    };
    // the submission to the database is done here
    let route = 'drugs/addDrugWithQuantity';
    let cb = () => console.log(data);
    _postData({ route, data, cb });
    this.updatePrescriptionList(data);
    _customNotify('Drug added Successfully');
    this.toggle();
  };

  /**
   * toggleDrugModal()
   * Toggles the modal containing the list of all drugs
   */
  toggleDrugModal = () => {
    this.setState(prevState => ({
      changeDrugModal: !prevState.changeDrugModal,
    }));
  };

  /**
   * handleDispense()
   * event handler for dispense button click
   * Submits the data and dispenses drugs to the customers
   */
  handleDispense = () => {
    let prescriptions = this.state.prescriptions;
    let quantity = this.state.quantityDispensed;
    prescriptions.forEach((p, i) => (p.quantity = quantity[i]));
    this.props.dispenseDrugs(prescriptions);
    console.log(
      this.state.price,
      this.state.total,
      this.state.quantityDispensed
    );
  };

  changeDrug = (drugDetails) => {
    let { drugToChange, prescriptions } = this.state;
    // console.log(`Please change ${drugToChange} to ${drug.drug} on ${prescriptions}`);
    // let newPrescription = prescriptions.map(p => {
    //     p.drug === drugToChange ? p = Object.assign({}, p, {drug: drug.drug}) : p
    // })
    let newState = prescriptions.map(list => list.drug === drugToChange ? list = Object.assign({}, list, {drug: drugDetails.drug}) : list)
    console.log(prescriptions);
    // this.setState({ prescription: newPrescription})
    // change the drugToChange to the newly selected drug
    // _customNotify("Drug replaced successfully!")
    this.toggleDrugModal();
  };

  onSearchTermChange = e => {
    let searchTerm = e.target.value;
    this.setState({ searchTerm: searchTerm });
    // this.search(searchTerm);
  };

  search = searchTerm => {
    let drugList = this.state.drugList;
    let newList = drugList.filter(drug => drug.drug === searchTerm);
    this.setState({ drugList: newList });
  };

  openChangeDrugTable = drug => {
    this.setState({ drugToChange: drug });
    this.toggleDrugModal();
  };

  render() {
    const { details } = this.props;
    const { userDetails, drugList, validationText } = this.state;
    const {
      onDrugChange,
      onQuantityChange,
      onPriceChange,
      onPrescriptionChange,
      addDrug,
    } = this;
    const { drug, quantity, price, prescription } = this.state.drugDetails;

    const rows = [];
    this.state.prescriptions.forEach((prescription, i) => {
      rows.push(
        <tr key={i}>
          <td>{prescription.seen_by}</td>
          <td>{prescription.dosage}</td>
          <td>
            <span
              onClick={() => this.openChangeDrugTable(prescription.drug)}
              className="anchor"
              title="change this drug">
              {prescription.drug}
            </span>
          </td>
          <td>{prescription.price}</td>
          <td>
            <input
              type="text"
              name="quantityDispensed"
              value={this.state.quantityDispensed[i]}
              onChange={e =>
                this.onQuantityDispensedInputChange(e, prescription.price, i)
              }
            />
          </td>
          <td>{this.state.price[i]}</td>
        </tr>
      );
    });

    return (
      <div>
        <Card>
          <CardHeader>Bio Data</CardHeader>
          <CardBody>
            <form className="row">
              <div className="form-group col-md-6">
                <label className="control-label col-md-4">PatientID:</label>
                <label className="control-label offset-md-1">
                  {details.id}
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label col-md-4">Seen By:</label>
                <label className="control-label offset-md-1">
                  {details.seen_by}
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label col-md-4">Name:</label>
                <label className="control-label offset-md-1">{`${
                  userDetails.surname
                } ${userDetails.firstname}`}</label>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label col-md-4">Gender:</label>
                <label className="control-label offset-md-1">
                  {userDetails.gender}
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label col-md-4">Age:</label>
                <label className="control-label offset-md-1">
                  {userDetails.age}
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label col-md-4">Email</label>
                <label className="control-label offset-md-1">
                  {userDetails.email}
                </label>
              </div>
            </form>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardHeader>Drugs</CardHeader>
          <CardBody>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Dr.</th>
                  <th>Prescription</th>
                  <th>Drugs</th>
                  <th>Unit Price</th>
                  <th>Qty Dispensed</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {rows}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <th>Total</th>
                  <th>{this.state.total}</th>
                </tr>
              </tbody>
            </Table>

            <button
              className="btn btn-outline-primary btnS"
              onClick={this.handleDispense}>
              Dispense
            </button>

            <button
              className="btn btn-outline-success"
              title="Add a drug to the list"
              onClick={this.toggle}>
              Add Drug
            </button>
          </CardBody>
        </Card>
        <Modal size="lg" isOpen={this.state.addDrugMmodal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Card>
              <CardHeader>Add Drugs</CardHeader>
              <CardBody>
                <AddDrugForm
                  drug={drug}
                  quantity={quantity}
                  price={price}
                  prescription={prescription}
                  onDrugChange={onDrugChange}
                  onQuantityChange={onQuantityChange}
                  onPriceChange={onPriceChange}
                  onPrescriptionChange={onPrescriptionChange}
                  addDrug={addDrug}
                  validationText={validationText}
                />
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
        <Modal
          size="md"
          isOpen={this.state.changeDrugModal}
          toggle={this.toggleDrugModal}>
          <ModalHeader toggle={this.toggleDrugModal}>
            Change this drug
          </ModalHeader>
          <ModalBody>
            <SearchBar
              searchTerm={this.state.searchTerm}
              onSearchTermChange={this.onSearchTermChange}
            />
            <DrugsTable
              searchTerm={this.state.searchTerm}
              changeDrug={this.changeDrug}
              drugList={drugList}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const SearchBar = ({ searchTerm, onSearchTermChange }) => (
  <div>
    <input
      type="text"
      className="form-control"
      placeholder="search for a drug by name"
      value={searchTerm}
      onChange={onSearchTermChange}
    />
  </div>
);

const DrugsTable = ({ drugList, changeDrug, searchTerm }) => {
  let rows = [];
  drugList.forEach((drug, i) => {
    if (drug.drug.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
      return;
    }

    rows.push(
      <tr
        key={i}
        onClick={() => changeDrug(drug)}
        style={{ cursor: 'pointer' }}>
        <td>{drug.drug}</td>
        <td>{drug.quantity}</td>
        <td>{drug.price}</td>
      </tr>
    );
  });
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <FreeScrollBar>
        <Notifications options={{ zIndex: 200, top: '50px' }} />
        <Table hover bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity in Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </FreeScrollBar>
    </div>
  );
};
