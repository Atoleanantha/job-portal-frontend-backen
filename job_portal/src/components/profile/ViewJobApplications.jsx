import React, { useState } from 'react';
import { Modal, Button ,Row,Col} from 'react-bootstrap';
import ApplicationCard from './ApplicationCard';

const ViewJobApplications = ({ show, onHide ,props}) => {
    
    const [applications,setShowApplications]=useState(props.applications)
    console.log("props in view job:",props.applications)
    const [isEmpty,setIsEmpty]=useState(false)
  if(!applications){
    setIsEmpty(true)
  }

  return (
    <div style={{ width: '80%' }} >
    <Modal show={show} onHide={onHide}  size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Applications </Modal.Title>
        
      </Modal.Header>
      <h6>Position: {props.title}</h6>
      <Modal.Body>
        {
            !isEmpty && <p>No Applications</p>
        }
        <Row>
            {
                applications.map((item)=>{
                    return(
                        <Col md={4}>
                            <ApplicationCard id={item.id} name={item.name} props={item}/>
                        </Col>
                    )
                })
            }

        </Row>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ViewJobApplications
