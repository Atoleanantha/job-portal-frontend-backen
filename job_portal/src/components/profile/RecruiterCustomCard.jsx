
import React from "react";
import {Col, Row} from "react-bootstrap"
import "../../App.css";
import micro from "../../Images/microsoft_732221.png";
import qua from "../../Images/quality.png";
import house from "../../Images/house.png";
import loc from "../../Images/location.png";
import money from "../../Images/money.png";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import axios from "axios";
import ViewJobApplications from "./ViewJobApplications";

const RecruiterCustomCard = ({props}) => {
//   console.log("props:",props.job._id);
  const data=props.job
  const navigate=useNavigate()
  const handleDeleteJob =()=>{

    axios.delete(`http://localhost:8000/seeker/deletepost/${props.email}/${data._id}`)
    .then((res)=>{
        // console.log(res);
        alert("Job deleted",res)
        // navigate('/rprofile')
        window.location.reload()
        

    }).catch((err)=>{
        console.log(err);
        
    })
  }
  const [showApplications, setShowApplications] = useState(false);

  const handleShowPopup = () => {
    setShowApplications(true);
  };

  const handleHidePopup = () => {
    setShowApplications(false);
  };

  const logoStyle = {
    height: "1em",
    width: "1em",
  };
  return (
    <div class="section_our_solution" style={{textAlign:"start"}}>
      <div class="row">
          <div class="our_solution_category">
            <div class="solution_cards_box">
              <div class="solution_card">
                <div class="hover_color_bubble"></div>
                <div class="so_top_icon">
                  <img src={micro} />
                </div>
                <div class="solu_title">{data.title}</div>
                <i style={{ fontSize: "0.7em" }}>Microsoft</i>
                <div class="solu_description">
                  <p>
                    {}
                    <table>
                      <tr>
                        <td>
                          <img src={loc} style={logoStyle} />
                        </td>
                        <td>{data.location}</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={money} style={logoStyle} />
                        </td>
                        <td>{data.salary}</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={qua} style={logoStyle} />
                        </td>
                        <td>Experience</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={house} style={logoStyle} />
                        </td>
                        <td>Starting Date</td>
                      </tr>
                    </table>
                  </p>
                  <Row>
                    <Col md={6} sm={12}>
                    <Button variant="primary" onClick={handleDeleteJob} style={{fontSize:"15px"}}>Delete Job</Button>
                    </Col>
                    <Col md={6} sm={12}>
                    <Button variant="primary" style={{fontSize:"15px"}} onClick={handleShowPopup}>View Applications</Button>
                    </Col>
                  </Row>
                  {showApplications &&
                    <ViewJobApplications onHide={handleHidePopup} show={handleShowPopup} props={data}/>
}
                
                </div>
              </div>
            </div>
          </div>
       
      </div>
      
    </div>
  );
};

export default RecruiterCustomCard;
