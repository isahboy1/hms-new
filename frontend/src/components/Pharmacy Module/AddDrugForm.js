import React from 'react';

const AddDrugForm = (props) => {
    const { 
        drug,
        quantity,
        price,
        prescription,
        onDrugChange,
        onQuantityChange, 
        onPriceChange, 
        onPrescriptionChange, 
        addDrug, 
        validationText
    } = props;
  
    return (
        <form>
            <div className="row">
                <label className="col-md-2">Drug</label>
                <input className="form-control col-md-4" value={drug} onChange={onDrugChange} />
                <label className="col-md-2">Quantity</label>
                <input className="form-control col-md-4" value={quantity} onChange={onQuantityChange} />
            </div>
            <br />
            <div className="row">
                <label className="col-md-2">Price</label>
                <input className="form-control col-md-4" value={price} onChange={onPriceChange} />
                <label className="col-md-2">Prescription</label>
                <input className="form-control col-md-4" value={prescription} onChange={onPrescriptionChange} />
            </div>
            <p style={{color:'red'}}>{validationText}</p>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    addDrug();
                }} 
                className="btn btn-outline-secondary"
                >Add
            </button>
        </form>
    )
}

export default AddDrugForm;