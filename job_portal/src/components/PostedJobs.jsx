import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Col from "react-bootstrap/Col";
import "../App.css";
import CustomCard from "./CustomCard";


const PostedJobs = () => {
  const [companies, setCompanies] = useState([]);
  const [allJobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/seeker/displayJobs")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      const allJobs = companies.reduce((acc, company) => {
        const companyJobs = company.jobPosts.map((job) => ({
          id: company._id,
          cName:company.CName,
          email: company.email,
          cdescription: company.cdescription,
          jobPosts: {
            jobid:job._id,
            title: job.title,
            description: job.description,
            requirements: job.requirements,
            experience:job.experience,
            responsibilities:job.responsibilities,
            location: job.location,
            salary: job.salary,
            startFrom:job.startFrom,
            duration:job.duration,
            postedAt: job.postedAt,
          },
        }));
        return [...acc, ...companyJobs];
      }, []);
      setJobs(allJobs);
      
      console.log(allJobs)
    }
  }, [companies]);

  return (
    <div>
      <div style={{textAlign:"center",color:"green"}}><h2>SEE JOB AND APPLY FOR SELECTION</h2></div>
      
      <Row>
        {allJobs.map((job) => (
          <Col key={job.id} md={3}>
            <CustomCard data={job} />
          </Col>
        ))}
      </Row>
    </div>
  );
};



// const CustomCard = ({ data }) => {
//   const navigate = useNavigate();

//   const logoStyle = {
//     height: "1em",
//     width: "1em",
//   };

//   return (
//     <div className="section_our_solution">
//       <div className="row">
//         <div className="col-lg-12 col-md-12 col-sm-12">
//           <div className="our_solution_category">
//             <div className="solution_cards_box">
//               <div className="solution_card">
//                 <div className="hover_color_bubble"></div>
//                 <div className="so_top_icon">
//                   <img src={micro} alt="Logo" />
//                 </div>
//                 <div class="solu_title" >{data.jobPosts.title}</div>
//                 <i style={{ fontSize: "0.8em" }}>{data.cName}</i>
//                 <div className="solu_description">
//                   <p>
//                     <table>
//                       <tbody>
//                         <tr>
//                           <td>
//                             <img src={loc} style={logoStyle} alt="Location" />
//                           </td>
//                           <td>{data.jobPosts.location}</td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <img src={money} style={logoStyle} alt="Salary" />
//                           </td>
//                           <td>{data.jobPosts.salary}</td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <img src={qua} style={logoStyle} alt="Experience" />
//                           </td>
//                           <td>Experience</td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <img src={house} style={logoStyle} alt="Starting Date" />
//                           </td>
//                           <td>{data.jobPosts.postedAt}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </p>
//                   <Button variant="primary" onClick={() => {  navigate('/viewJobDetails', { state: { jobDetails: data } }) }}>Apply Now</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


export default PostedJobs;
