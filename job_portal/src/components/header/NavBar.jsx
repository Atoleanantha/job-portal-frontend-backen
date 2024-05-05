import React ,{useState} from 'react'

import '../../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import AccountDropdown from './AccountDropdown';


const NavBar = () => {
  const linkStyle= {
    textDecoration:"none",
    color:"black",
    
  }
  const linkStyleHover= {
    textDecoration:"none",
    color:"red",
    
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{width:"100%", position:"relative"}}>
        <Container style={{ backgroundColor: "#e1e8f2", borderRadius: "15px" }}>
          <Navbar.Brand
            href="#home"
            style={{ color: "black", backgroundColor: "#e1e8f2" }}
          >
            <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
              <circle
                class="pl__ring pl__ring--a"
                cx="120"
                cy="120"
                r="105"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 660"
                stroke-dashoffset="-330"
                stroke-linecap="round"
              ></circle>
              <circle
                class="pl__ring pl__ring--b"
                cx="120"
                cy="120"
                r="35"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 220"
                stroke-dashoffset="-110"
                stroke-linecap="round"
              ></circle>
              <circle
                class="pl__ring pl__ring--c"
                cx="85"
                cy="120"
                r="70"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 440"
                stroke-linecap="round"
              ></circle>
              <circle
                class="pl__ring pl__ring--d"
                cx="155"
                cy="120"
                r="70"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 440"
                stroke-linecap="round"
              ></circle>
            </svg>{" "}
           JOB-PORTAL
          </Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Item style={{ padding: "10px", backgroundColor: "#e1e8f2" }}>
              <Link style={linkStyle} to={"/"}>HOME</Link>
            </Nav.Item>
            
           
            <Nav.Item style={{ padding: "10px", backgroundColor: "#e1e8f2" }}>
              <Link style={linkStyle}    to={"/postedJobs"}>POSTED JOBS</Link>
            </Nav.Item>
         
           <Nav.Item style={{ padding: "10px", backgroundColor: "#e1e8f2" }}>
              <Link style={linkStyle}  to={"/conatctUs"}>CONTACT</Link>
            </Nav.Item>
          </Nav>
          <AccountDropdown/>
        </Container>
      </Navbar>

  )
}

export default NavBar
