import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const ContactUs = () => {
    const [info1,setInfo]=useState({
        'fname':"",
        'lname':"",
        'email':"",
        'message':"",
    });

    const [fname,setFName]=useState("")
    const [lname,setLName]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    
    
  return (
    <div style={{ display: 'inline', justifyContent: 'center', alignItems: 'center', position: 'initial', backgroundColor: 'transparent', filter: 'blur', width: '100%' }}>
      
        <div className="modal" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'initial',
        //   backgroundColor: 'white',
          filter: 'blur',
          width: '90%',
          alignContent: 'center',
          marginTop: "2em",
          marginLeft: "5em",
          marginRight: "5em",
          padding: "3em",
          marginBottom:"5em"
        }}>
            <Form style={{ width: "50em"  }}>
                <b style={{fontSize:"3em",marginTop:"2em"}}>Get in Touch</b>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label >First Name</Form.Label>
                    <Form.Control id='firstName' type="text"   onChange={(e)=>{setFName(e.target.value)}} placeholder="Enter first name" />
                   
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id='lastName' type="text" onChange={(e)=>{setLName(e.target.value)}} placeholder="Enter last name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label >Your email </Form.Label>
                    <Form.Control id='email' type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Your email address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMessage">
                    <Form.Label >Message </Form.Label>
                    <FloatingLabel controlId="comment" label="Enter your Message">
                        <Form.Control
                        as="textarea"
                        onChange={(e)=>{setMessage(e.target.value)}}
                        placeholder="Enter your Message"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </Form.Group>
                
                <Button style={{marginTop:"1em"}}  
                onClick={
                    
                    ()=>setInfo({'fname':fname , 'lname':lname,'email':email,'message':message})
                    }
                
                variant="success">Submit</Button>{' '}
                {/* <p>{info1.fname}</p>
                <p>{info1.lname}</p>
                <p>{info1.email}</p>
                <p>{info1.message}</p> */}

            </Form>
        </div>

    
    </div>
    
  )
}

export default ContactUs
