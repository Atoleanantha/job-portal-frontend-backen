import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Col, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AccountDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLogin, setLoginStatus] = useState(localStorage.getItem("isLogin") === 'true');
  const [isCompany, setIsCompany] = useState(false);
  const [isApplicant, setIsApplicant] = useState(false);

  const navigate=useNavigate();
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setLoginStatus(localStorage.getItem('isLogin') === 'true');

    if (isLogin) {
      if (userType === 'applicant') {
        setIsApplicant(true);
      } else if (userType === 'company') {
        setIsCompany(true);
      }
    } else {
      setIsApplicant(false);
      setIsCompany(false);
    }
  }, [isLogin]);

  const handleImageClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("userType");
    localStorage.setItem('email','');
    localStorage.removeItem('isAdmin')
    
    navigate('/')
    window.location.reload();
    alert("Logout successfully!");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black"
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <DropdownButton title="Account" onClick={handleImageClick}>
            {!isLogin && <Dropdown.Item><Link style={linkStyle} to={"/logIn"}>LOGIN</Link></Dropdown.Item>}
            {!isLogin && <Dropdown.Item><Link style={linkStyle} to={"/registration"}>RECRUITER REGISTRATION</Link></Dropdown.Item>}
            {!isLogin && <Dropdown.Item><Link style={linkStyle} to={"/applicantRegister"}>APPLICANT REGISTER</Link></Dropdown.Item>}
            {isCompany && <Dropdown.Item><Link style={linkStyle} to={"/rprofile"}>Recruiter Profile</Link></Dropdown.Item>}
            {isApplicant && <Dropdown.Item><Link style={linkStyle} to={"/aprofile"}>Applicant Profile</Link></Dropdown.Item>}
          </DropdownButton>
        </Col>
        {isLogin && 
          <Col md={6}>
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        }
      </Row>
    </>
  );
};

export default AccountDropdown;
