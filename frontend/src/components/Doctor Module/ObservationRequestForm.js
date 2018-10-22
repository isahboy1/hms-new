import React from 'react';

const ObservationRequestForm = ({ observation_request }) => {
  return (
    <div>
      <h5>Observation Request</h5>
      <div className="row">
        <br />
        <label className="col-xs-12 col-sm-12 col-md-3 col-lg-3">Observation Required: </label>
        <label className="col-xs-12 col-sm-12 col-md-5 col-lg-3" style={{ paddingLeft: '1em' }}>
          {observation_request}
        </label>
      </div>
      <hr />
    </div>
  );
};

export default ObservationRequestForm;
