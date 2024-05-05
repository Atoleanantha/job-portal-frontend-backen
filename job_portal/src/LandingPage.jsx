import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import "./App.css";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Carousel1 from "./Images/businessman-using-laptop-analysis-data-investment.jpg";
import Carousel2 from "./Images/design-space-decorated-with-leaves-website-banner-template.jpg";
import Carousel3 from "./Images/education-modern-lifestyle-college-concept-attractive-carefree-redhead-female-student-sitting-wi.jpg";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import CustomCard from "./components/CustomCard";
import CompanyLogoPanel from "./components/CompanyLogoPanel";
import BottomBar from './components/footer/BottomBar'
import { Container } from "react-bootstrap";
import axios from "axios";

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const images = [Carousel1, Carousel2, Carousel3];
  // const jobPostData = [];
  const [jobPostData, setPostJob]=useState([])
  // const [companies,setCompany]=useState([])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // useEffect(()=>{
  //   axios.get("http://localhost:8000/seeker/getalljobs/test@gmail.com")
  //   .then((res)=>{
  //     setPostJob(res.data)
  //     console.log("data",res.data);

  //   })
  //   .catch((error)=>{
  //     console.log('====================================');
  //     console.log(error);
  //     console.log('====================================');
  //   })
  // },[])

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
   <Container style={{width:"100%"}}>
   <div  style={{ position: "relative", width: "100%" }}>
        <Carousel activeIndex={index} onSelect={handleSelect} slide={true}>
          {images.map((image) => (
            <Carousel.Item key={image}>
              <img
                className="d-block w-100"
                src={image}
                alt="First slide"
                style={{ height: "28em" }}
              />
              <Carousel.Caption>{/* Empty Caption */}</Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        {/* Fixed position search bar */}
        <Form
          className="d-flex"
          style={{
            width: "50%",
            height: "2.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>

      <br></br>
      <Row>
        <Col md={2}>
          <div class="filter-box">
            <div class="filter-title">Job Filters</div>

            {/* <!-- Job Category Filter --> */}
            <div class="filter-category">
              <label for="job-category">Job Category:</label>
              <select id="job-category">
                <option value="all">All Categories</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
                {/* <!-- Add more options as needed --> */}
              </select>
            </div>

            {/* <!-- Location Filter --> */}
            <div class="filter-category">
              <label for="job-location">Job Location:</label>
              <select id="job-location">
                <option value="all">All Locations</option>
                <option value="city1">Pune</option>
                <option value="city2">Hydrabad</option>
                <option value="city3">Mumbai</option>
                <option value="city4">Delhi</option>
                {/* <!-- Add more options as needed --> */}
              </select>
            </div>

            {/* <!-- Experience Level Filter --> */}
            <div class="filter-category">
              <label for="experience-level">Experience Level:</label>
              <select id="experience-level">
                <option value="all">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>

            {/* <!-- Apply Filter Button --> */}
            <button class="filter-button">Apply Filters</button>
          </div>
        </Col>


        <Col>
        <Row>
        {allJobs.map((job) => (
          <Col key={job.id} md={3}>
            <CustomCard data={job} />
          </Col>
        ))}
      </Row>
        </Col>
      </Row>

      <CompanyLogoPanel />
   </Container>
  );
};

export default LandingPage;
