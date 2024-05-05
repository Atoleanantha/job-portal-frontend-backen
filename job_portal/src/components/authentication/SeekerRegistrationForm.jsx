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

const SeekerRegistrationForm = () => {
   const navigate=useNavigate()

  const [selectedImage, setSelectedImage] = useState(null);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [mName, setMName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(null);
  const [phone, setPhone] = useState('');
  const [userEmail, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [qualification,setQualification]=useState('')
  const [address, setAddress] = useState({
    addressLine: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    country: '',
  });


  const [signUpCrediential, setCredientials] = useState({
    // image: '',
  
    fName: '',
    mName: '',
    lName: '',
    qualification:'',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    address:{}
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    // Retrieve email and password from cookies on component mount
    const storedEmail = Cookies.get('rememberedEmail');
    const storedPassword = Cookies.get('rememberedPassword');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPass(storedPassword);
    }
  }, []);


  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender.target.value);
  };

  const handleDateChange = (date) => {
    setDOB(date);
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedImage) {
      errors.image = 'Please select a profile photo.';
    }
  

    if (!fName.trim()) {
      errors.fName = 'Name is required.';
    }
    if (!qualification.trim()) {
        errors.qualification = 'Qualification is required.';
      }

    if (!gender) {
      errors.gender = 'Please select a gender.';
    }

    if (!dob) {
      errors.dob = 'Please select a date of birth.';
    }

    if (!phone.trim() || (phone.length<10 || phone.length>10)) {
      errors.phone = 'Enter valid phone number';
    }

    if (!userEmail.trim()) {
      errors.userEmail = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.userEmail = 'Invalid email address.';
    }

    if (!pass.trim()) {
      errors.pass = 'Password is required.';
    }

    if (pass !== confirmPass) {
      errors.confirmPass = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleFormSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      setCredientials({
        // image: selectedImage,
        fName: fName,
        lName: lName,
        mName: mName,
        qualification:qualification,
        gender: gender,
        dob: dob,
        phone: phone,
        email: userEmail,
        password: pass,
        address:address
      });

      axios.post("http://localhost:8000/seeker/register",signUpCrediential)
      .then((res)=>{
        console.log(res);
        if(res.status===200){
          localStorage.setItem('email',signUpCrediential.email);
          localStorage.setItem('isLogin',true);
          localStorage.setItem('userType','applicant')
          alert("Registration succesful !");
          navigate('/')
          window.location.reload();

        }
      })
      .catch((error)=>{
        console.log(error);
        alert(error.response.data.msg)
      })
      console.log('Form submitted:', signUpCrediential);
    } else {
      // Form has errors, do not submit
      console.log('error');
      alert('Something went wrong!')
    }



      // if (rememberMe) {
      //   // Save email and password in cookies
      //   Cookies.set('rememberedEmail', userEmail, { expires: 30 }); // Expires in 7 days
      //   Cookies.set('rememberedPassword', pass, { expires: 30 }); // Expires in 7 days
      // } else {
      //   // Clear cookies if "Remember Me" is unchecked
      //   Cookies.remove('rememberedEmail');
      //   Cookies.remove('rememberedPassword');
      // }
      // // Submit the form or perform other actions

     
  };
  // axios.get("http://localhost:8000/seeker/finduser/atoleanantha03@gmail.com")
  // .then((res)=>{
  //   setCredientials(res.data.data)
  //   const data1=res.data.data
  //   setFName(data1.fName)
  //   setLName(data1.lName)
  //   // console.log(res.data);
  //   console.log(signUpCrediential);
  // }).catch((error)=>{

  // },[])
  

  const handleUpdate=()=>{
  
    
    // axios.put("http://localhost:8000/seeker/atoleanantha03@gmail.com",signUpCrediential)
    // .then((res)=>{
    //   console.log("updated");
    //   console.log(res.data);

    // }).catch((error)=>{
    //   console.log("Error");
    // })

  }
  

  return (
    <div  style={{
      display: 'inline',
      justifyContent: 'center',
      alignItems: 'center',
      position:'initial',
      backgroundColor: 'transparent',
      filter: 'blur',
      width: '100%',
    }}>
      <h1 style={{textAlign:"center"}}>Register</h1>
    <div className="modal"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position:'initial',
      backgroundColor: 'transparent',
      filter: 'blur',
      width: '90%',
      alignContent: 'center',
      border: '2px solid', 
      marginTop:"2em",
      marginLeft:"5em",
      marginRight:"5em",
      padding:"3em",
      marginBottom:"2em"
    }}
  
    >
     
      <div
            className="modal"
            style={{ display: 'block', position: 'relative', backgroundColor:"transparent",filter:"blur", width:"100%", alignContent:"center"}}
          >
            <Form>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="imageInput">
                        Select a profile photo:
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
                      {selectedImage && (
                        <img
                          src={selectedImage}
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
                  
                  <br></br>

                  <Row>
                    <Col md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="fromBasicFirstName"
                      >
                        <Form.Label>First Name </Form.Label>
                        <Form.Control
                          type="text"
                          value={fName}
                          onChange={(e) => {
                            setFName(e.target.value);
                          }}
                          placeholder="Enter first name"
                        />
                        {formErrors.fName && (
                          <div className="text-danger">{formErrors.fName}</div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="fromBasicMiddleName"
                      >
                        <Form.Label>Middle Name </Form.Label>
                        <Form.Control
                          type="text"
                          value={signUpCrediential.mName}
                          onChange={(e) => {
                            setMName(e.target.value);
                          }}
                          placeholder="Enter middle name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="fromBasicSurname">
                        <Form.Label>Surname Name </Form.Label>
                        <Form.Control
                          type="text"
                          value={lName}
                          onChange={(e) => {
                            setLName(e.target.value);
                          }}
                          placeholder="Enter Surname"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <label>Gender :</label>
                    </Col>
                    <Col md={3}>
                      <Form.Check
                        type="radio"
                        onChange={handleGenderChange}
                        checked={gender === 'male'}
                        label="MALE"
                        value="male"
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Check
                        type="radio"
                        onChange={handleGenderChange}
                        checked={gender === 'female'}
                        label="FEMALE"
                        value="female"
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Check
                        type="radio"
                        onChange={handleGenderChange}
                        checked={gender === 'trans'}
                        label="TRANS"
                        value="trans"
                      />
                      {formErrors.gender && (
                        <div className="text-danger">{formErrors.gender}</div>
                      )}
                    </Col>
                  </Row>

                  <Row style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <Col md={6}>
                      <label>Date of birth :</label>
                    </Col>
                    <Col md={6}>
                      <DatePicker
                        selected={dob}
                      
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholder="Select Date of birth"
                   
                      />
                      {formErrors.dob && (
                        <div className="text-danger">{formErrors.dob}</div>
                      )}
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="formHighestQualification">
                    <Form.Label>Heighest Qualification</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setQualification(e.target.value);
                      }}
                      placeholder="Heighest Qualification"
                    />
                    {formErrors.qualification && (
                      <div className="text-danger">{formErrors.qualification}</div>
                    )}
                  </Form.Group>
                  <br></br>


                  <AddressForm handleAddressChange={handleAddressChange}/>


                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      placeholder="Enter phone number"
                    />
                    {formErrors.phone && (
                      <div className="text-danger">{formErrors.phone}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter email"
                    />
                    {formErrors.userEmail && (
                      <div className="text-danger">{formErrors.userEmail}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      placeholder="Password"
                    />
                    {formErrors.pass && (
                      <div className="text-danger">{formErrors.pass}</div>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                      }}
                      placeholder="Confirm Password"
                    />
                    {formErrors.confirmPass && (
                      <div className="text-danger">{formErrors.confirmPass}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    />
                </Form.Group>
                <p>Already have an account? <Link
                      to="/logIn"
                      style={{ color: 'blue', textDecoration: 'none' }}
                    >
                      Sign In
                    </Link></p>
               
               
               <div style={{alignContent:"center"}}>
                  <Button variant="secondary" style={{marginRight:"2em",marginLeft:"2em"}}>Cancel</Button>
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

export default SeekerRegistrationForm;
