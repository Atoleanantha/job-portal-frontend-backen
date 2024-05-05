import React from 'react'
import "../../App.css";
import micro from "../../Images/microsoft_732221.png";
import qua from "../../Images/quality.png";
import house from "../../Images/house.png";
import loc from "../../Images/location.png";
import money from "../../Images/money.png";
import Button from "react-bootstrap/Button";

const ApplicationCard = ({props}) => {
    
    const handleAccept = (id) => {
       
        // Add logic for accepting the item
        console.log(`Accepted item with id ${props}`);
      };
    
      const handleReject = (id) => {
        // Add logic for rejecting the item
        console.log(`Rejected item with id ${props.id}`);
      };

    const logoStyle = {
      height: "1em",
      width: "1em",
    };
  
    return (
      <div className="section_our_solution">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="our_solution_category">
              <div className="solution_cards_box">
                <div className="solution_card">
                  <div className="hover_color_bubble"></div>
                  <div className="so_top_icon">
                    <img src={micro} alt="Logo" />
                  </div>
                  {/* <div class="solu_title" >{props.applicantSkills}</div>
                  <i style={{ fontSize: "0.8em" }}>{props.applicantSkills}</i> */}
                  <div className="solu_description">
                    <p>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <img src={loc} style={logoStyle} alt="Location" />
                            </td>
                            <td>{props.applicantSkills}</td>
                          </tr>
                          <tr>
                            <td>
                              <img src={money} style={logoStyle} alt="Salary" />
                            </td>
                            <td>{"data.jobPosts.salary"}</td>
                          </tr>
                          <tr>
                            <td>
                              <img src={qua} style={logoStyle} alt="Experience" />
                            </td>
                            <td>Experience</td>
                          </tr>
                          <tr>
                            <td>
                              <img src={house} style={logoStyle} alt="Starting Date" />
                            </td>
                            <td>{"data.jobPosts.postedAt"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </p>
                    <Button style={{background:"green"}} variant="success" onClick={() => handleAccept(props.id)}>
                Accept
              </Button>
              <Button style={{background:"red"}} variant="danger" onClick={() => handleReject(props.id)}>
                Reject
              </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default ApplicationCard
