import React from 'react';
import './guides.css';

/**
 * this component contains the users guide for
 * all the modules
 * 
 */

function DoctorGuide () {
    return(
        <div className="guide">
            <h6>Doctors Module Users Guide</h6>
                <b> 1.</b> Click on the patient number from the left hand side<br/>
                <b> 2.</b> This displays patient clerking forms<br/>
                <b> 3.</b> The list previous visit date by for the select patient are <br/>
                    displayed by the right handside of the form<br/>
                <b> 4.</b> Select any date of your choice to view the last clerking<br/>
        </div>
    )
}

function RecordGuide () {
    return(
        <div className="guide">
            <h6>Record Module Users Guide</h6>
                <b> 1.</b> Click on the patient number from the left hand side<br/>
                <b> 2.</b> This displays patient clerking forms<br/>
                <b> 3.</b> The list previous visit date by for the select patient are <br/>
                    displayed by the right handside of the form<br/>
                <b> 4.</b> Select any date of your choice to view the last clerking<br/>
        </div>
    )
}

function PharmacyGuide () {
    return(
        <div className="guide">
            <h6>Pharmacy Module Users Guide</h6>
                <b> 1.</b> Click on the patient number from the left hand side<br/>
                <b> 2.</b> This displays patient clerking forms<br/>
                <b> 3.</b> The list previous visit date by for the select patient are <br/>
                    displayed by the right handside of the form<br/>
                <b> 4.</b> Select any date of your choice to view the last clerking<br/>
        </div>
    )
}

function LabGuide () {
    return(
        <div className="guide">
            <h6>Pharmacy Module Users Guide</h6>
                <b> 1.</b> Click on the patient number from the left hand side<br/>
                <b> 2.</b> This displays patient clerking forms<br/>
                <b> 3.</b> The list previous visit date by for the select patient are <br/>
                    displayed by the right handside of the form<br/>
                <b> 4.</b> Select any date of your choice to view the last clerking<br/>
        </div>
    )
}

export {
    DoctorGuide,
    RecordGuide,
    PharmacyGuide,
    LabGuide,
};