import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import logo from './logo.jpg';
import './postjob.css'
import { useNavigate } from 'react-router-dom';

function PostJobs() { 
  const [validated, setValidated] = useState(false);
  const[title,settitle]=useState("");
  const[email,setemail]=useState("");
  const[location,setlocation]=useState("");
  const[type,settype]=useState("");
  const[pay,setpay]=useState("");
  const[benefits,setbenefits]=useState("");
  const[desc,setdesc]=useState("");
  const[key,setkey]=useState("");
  const[lengths,setlength]=useState("");
  const[links,setlink]=useState("");
  const[experience,setexperience]=useState("");
  const handleSubmit = (event) => {
            
    const setdata={
       title:title,
       location:location,
       experience:experience,
       startFrom:"Immediate",
       duration:type,
       salary:pay,
       benefits:benefits,
       description:desc,
       responsibilities:key,
       links:links
    }


    axios.put(`http://localhost:8000/seeker/postjob/${localStorage.getItem('email')}`,setdata)
    .then(res=>{
        console.log(res)
        if(res.status(200)){
          // navigate('/')

        }
        alert(res.msg)
        
        
    })
    .catch(err=>{
        console.log(err);
    })

    setValidated(true);
    
  };

  return (
    <div className='container'>
    <div className='boundaryc'>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
      <Row className="mb-3">
      <div className='heading1'>
      {/* <img src={logo} /> */}
      <h1>Post Your Job</h1>
      </div>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Job Title"
            value={title}
            onChange={(e)=>settitle(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Job Location</Form.Label>
          <Form.Control
            required
            type="address"
            placeholder="Enter Job Location"
            value={location}
            onChange={(e)=>setlocation(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
        <Form.Label>Job Type</Form.Label>
        <Form.Control
          as="select"
          required
          value={type}
          onChange={(e) => settype(e.target.value)}
        >
          <option value="">Select Job Type</option>
          <option value="internship">Internship</option>
          <option value="full-time">Full Time</option>
          <option value="fresher">Fresher</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
        </Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Pay</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">₹</InputGroup.Text>
            <Form.Control
              type="pay"
              placeholder="Enter Pay Amount"
              
              required
              value={pay}
              onChange={(e)=>setpay(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Benefits and Perks</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Benefits and Perks"

            value={benefits}
            onChange={(e)=>setbenefits(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

     
        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Description of Job</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Description of Job"

            value={desc}
            onChange={(e)=>setdesc(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Work Experience </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Work Experience Required"

            value={experience}
            onChange={(e)=>setexperience(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Key Responsibilities</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Key Responsibilities"
            value={key}
            onChange={(e)=>setkey(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Contract Length</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Contract Length in weeks"
            value={lengths}
            onChange={(e)=>setlength(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom07">
          <Form.Label >Link to Company Website</Form.Label>
          <Form.Control 
            required
            type="text"
            placeholder="Enter Company Website URL"
            value={links}
            onChange={(e)=>setlink(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row>
      <Form.Group as={Col} md="4" controlId="validationCustom07">
          {/* blank to put link in center */}
        </Form.Group>
        <div className='button-Container'>
      <Button className='button ' onClick={handleSubmit}  type="submit">Submit</Button>
      </div>
      </Row>
      
      
    </Form>
    </div>
    
    </div>
  );
}

export default PostJobs;