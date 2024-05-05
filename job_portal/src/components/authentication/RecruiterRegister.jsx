import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import AddressForm from './AddressForm';
import axios from 'axios';

const RecruiterRegisterForm = () => {
  
  const [isValid,setValid]=useState(false)
  const [formErrors,setErrors]=useState({})
  const navigate=useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [confirmPass, setCompanyConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyDescription, setCompanyDescription] = useState('');
  const [address, setAddress] = useState({
    addressLine: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    country: '',
  });

  
  const handleCompanyLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [signUpCrediential, setCredientials] = useState({
    // image: '',
    // resume:'',
    CName: '',
    CTName: '',
    email: '',
    password:'',
    Contactno: '',
    cdescription: '',
    password: '',
    address:{}
  });

  const validateForm=()=>{

    const error={}
    if(!companyName.trim()){
      error.companyName="Company name is required"
    }
    if(!companyDescription.trim()){
      error.companyDescription="Company name is required"
    }

    if(!companyEmail.trim()){
      error.companyEmail="Company name is required"
    }

    if (!contactNumber.trim() || (contactNumber.length<10 || contactNumber.length>10)) {
      error.contactNumber = 'Enter valid phone number';
    }

    if (!companyEmail.trim()) {
      error.companyEmail = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(companyEmail)) {
      error.companyEmail = 'Invalid email address.';
    }

    if (!companyPassword.trim()) {
      error.companyPassword = 'Password is required.';
    }

    if (companyPassword !== confirmPass) {
      error.confirmPass = 'Passwords do not match.';
    }

    if(error.length ===0){
      return true;

    }else{
      setErrors(error)
      return false
    }
  }

  const handleFormSubmit=()=>{
  
    const isValid=validateForm;
    if(isValid){
      setCredientials({
        
        CName: companyName,
    CTName: industryType,
    email: companyEmail,
    password:companyPassword,
    Contactno: contactNumber,
    cdescription: companyDescription,
    address:address
      })

      axios.post("http://localhost:8000/seeker/registercompany",signUpCrediential)
          .then((res)=>{
            console.log(res.data);
            if(res.status==200){
              localStorage.setItem('email',signUpCrediential.email);
              localStorage.setItem('isLogin',true);
              localStorage.setItem('isAdmin',true);
              localStorage.setItem('userType','company')
              alert("Registration succesful !");
              navigate('/')
              window.location.reload();
    
            }
          })
          .catch((error)=>{
            console.log(error)
        alert(error.response.data.msg)
          })

      // axios.get(`http://localhost:8000/seeker/findcompany/${companyEmail}`)
      // .then((res)=>{
      //   // console.log(res.data);
      //   // if(res.data != null){
      //   //   setErrors({isPresent : true})
      //   // }else{
          
      //     // axios.post("http://localhost:8000/seeker/registercompany",signUpCrediential)
      //     // .then((res)=>{
      //     //   console.log(res.data);
      //     // })
      //     // .catch((error)=>{
      //     //   console.log(error)
      //     // })
          
      //   // }

      // }).catch((error)=>{

      // })

    }else{
      console.log("Fill all black");

    }


  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleCancel=()=>{
    navigate('/')
  }

  return (
    <div style={{ display: 'inline', justifyContent: 'center', alignItems: 'center', position: 'initial', backgroundColor: 'transparent', filter: 'blur', width: '100%' }}>
      <h1 style={{ textAlign: "center" }}>Registration for Company</h1>
      <div className="modal"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'initial',
          backgroundColor: 'transparent',
          filter: 'blur',
          width: '90%',
          alignContent: 'center',
          border: '2px solid',
          marginTop: "2em",
          marginLeft: "5em",
          marginRight: "5em",
          padding: "3em",
          marginBottom:"5em"
        }}
      >
        <div className="modal" style={{ display: 'block', position: 'initial', backgroundColor: "transparent", filter: "blur", width: "100%", alignContent: "center" }}>
          <Form>
          <Row>
                    <Col md={6}>
                      <label htmlFor="imageInput">
                        Select a profile photo / Logo:
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {formErrors.image && (
                        <div className="text-danger">{formErrors.image}</div>
                      )}
                    </Col>
                    <Col md={6}>
                      {companyLogo && (
                        <img
                          src={companyLogo}
                          alt="Selected"
                          style={{
                            maxWidth: '100%',
                            height: '6em',
                            width: '6em',
                            borderRadius: '3em',
                            border: '1px solid grey',
                          }}
                        />
                      )}
                    </Col>
                  </Row>
       
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
              value={companyName}
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIndustryType">
              <Form.Label>Industry Type</Form.Label>
              <Form.Control
                type="text"
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}
                placeholder="Enter industry type"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="Enter company email"
              />
            </Form.Group>

        

            <Form.Group className="mb-3" controlId="formCompanyPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={companyPassword}
                onChange={(e) => setCompanyPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCompanyPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPass}
                onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter contact number"
              />
            </Form.Group>
                           
            <Form.Group className="mb-3" controlId="formCompanyDescription">
              <Form.Label>Company Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Enter company description"
              />
            </Form.Group>

            <AddressForm handleAddressChange={handleAddressChange} />

            <p>Already have an account? <Link
                      to="/registration"
                      style={{ color: 'blue', textDecoration: 'none' }}
                    >
                      Sign In
                    </Link></p>

            <div style={{ alignContent: "center" }}>
              <Button variant="secondary" onClick={handleCancel} style={{ marginRight: "2em", marginLeft: "2em" }}>Cancel</Button>
              <Button variant="success" onClick={handleFormSubmit}>
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterRegisterForm;
