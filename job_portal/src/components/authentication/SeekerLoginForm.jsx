import React, { useState } from 'react';
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeekerLoginForm = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('applicant');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleFormValidate = () => {
        const errors = {};

        if (!userEmail.trim()) {
            errors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
            errors.email = 'Invalid email address.';
        }

        if (!password.trim()) {
            errors.password = 'Password is required.';
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            let credentials ;
            let url;
            if(userType==='applicant'){
                    credentials = { email: userEmail, password,isApplicant:"true" };
                    url='http://localhost:8000/seeker/login';
            }
            else{
                    credentials = { email: userEmail, password,isApplicant:"false" };
                    url='http://localhost:8000/seeker/login';
            }
        
                 axios.post(url, credentials).then((res)=>{

                    if(res.status===200){
                        const userData = res.data.data;
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('email', userEmail);
                    navigate('/');
                    window.location.reload();
                    }
                    
                }) .catch((error) => {
                            console.log(error);
                            alert('An error occurred. Please try again.');
                        });

            // const url = userType === 'applicant' ? `http://localhost:8000/seeker/finduser/${userEmail}` : `http://localhost:8000/seeker/findcompany/${userEmail}`;

            // axios.get(url)
            //     .then((res) => {
            //         const userData = res.data.data;
            //         if (userData && userData.password === password) {
            //             localStorage.setItem('isLogin', true);
            //             localStorage.setItem('userType', userType);
            //             localStorage.setItem('email', userEmail);
            //             navigate('/');
            //             window.location.reload();
            //         } else {
            //             alert('Invalid email or password.');
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         alert('An error occurred. Please try again.');
            //     });
        }
    };

    return (
        <Row>
            <Col md={12}>
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <b>Login as</b>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Check
                                            type="radio"
                                            value="applicant"
                                            checked={userType === 'applicant'}
                                            onChange={handleUserTypeChange}
                                            label="Applicant"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Check
                                            type="radio"
                                            value="company"
                                            checked={userType === 'company'}
                                            onChange={handleUserTypeChange}
                                            label="Company"
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                    {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                </Form.Group>
                            </Form>
                            <Row>
                                <Col md={4}>
                                    <Link to="" style={{ color: 'blue', textDecoration: 'none', fontSize: '15px' }}>Forgot password</Link>
                                </Col>
                                <Col md={4}>
                                    <p style={{ fontSize: '15px' }}>Don't have an account?</p>
                                </Col>
                                <Col md={4}>
                                    <Link to="/registration" style={{ color: 'black', textDecoration: 'none', fontSize: '15px' }}><b style={{ color: 'blue' }}>Sign Up</b></Link>
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="success" onClick={handleFormValidate}>Log In</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </Col>
        </Row>
    );
};

export default SeekerLoginForm;
