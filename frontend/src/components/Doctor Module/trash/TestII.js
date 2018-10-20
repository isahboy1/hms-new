import React from 'react';
import ScrollArea from 'react-scrollbar';
import FreeScrollBar from 'react-free-scrollbar';
import {Col,  } from 'reactstrap';
    class TestII extends React.Component {
        render() {
            return (
                

// must have a wrapper with a certain size

<div style={{width: '500px', height: '500px'}}>
    <FreeScrollBar>
        <h1>The title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                <div>Some long content.
                    
                <form>
            <fieldset>    	
				<legend>Presenting Complaints</legend>
                <div>
            <label for=""  >Presenting Complaints 1</label>
            <label></label>
            </div>
            <div>
            <label for=""  >Presenting Complaints 2</label>
            <label></label>
            </div>
            <div>
            <label for="" >Presenting Complaints 3</label>
            <label></label>
            </div>
            <div>
            <label for="" >Presenting Complaints 4</label>
            <label></label>
            </div>
            

            <h6>Other Problem Complaints</h6>
        
            
                <label>Others:</label>
                    <div></div>          
            
        
                <label>History of Presenting Complaints:</label> 
                <div></div>
                
            
        
                <label>Social History:</label>
                <div></div>
                    
            
        
                <label>Other Social History:</label> 
                <div></div>
                
            
        
                <label>Obst & Gynea History:</label> 
                <Col></Col>
                
            
        
                <label>Past Medical History:</label> 
                <Col></Col>
                
            
        
                <label>Allergy:</label> 
                <Col></Col>
                
            
        
                <label>Other Allergies:</label> 
                <Col></Col>
                
            
        
            <label>Drug History:</label> 
            <Col></Col>
            
					
				</fieldset>				
                <fieldset>    	
				<legend>Presenting Complaints</legend>
                
            <div>
            <label for=""  >Presenting Complaints 1</label>
            <label></label>
            </div>
            <div>
            <label for=""  >Presenting Complaints 2</label>
            <label></label>
            </div>
            <div>
            <label for="" >Presenting Complaints 3</label>
            <label></label>
            </div>
            <div>
            <label for="" >Presenting Complaints 4</label>
            <label></label>
            </div>
            

            <h6>Other Problem Complaints</h6>
        
            
                <label>Others:</label>
                    <div></div>          
            
        
                <label>History of Presenting Complaints:</label> 
                <div></div>
                
            
        
                <label>Social History:</label>
                <div></div>
                    
            
        
                <label>Other Social History:</label> 
                <div></div>
                
            
        
                <label>Obst & Gynea History:</label> 
                <Col></Col>
                
            
        
                <label>Past Medical History:</label> 
                <Col></Col>
                
            
        
                <label>Allergy:</label> 
                <Col></Col>
                
            
        
                <label>Other Allergies:</label> 
                <Col></Col>
                </fieldset>
                </form>
                </div>
                
            </FreeScrollBar>
</div>
            );
          }
    }

    export default TestII;