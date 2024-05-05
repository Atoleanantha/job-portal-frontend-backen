import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AddressForm = () => {
  const [address, setAddress] = useState({
    addressLine: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    country: '',
  });

  const countries = [
    { code: 'In', name: 'India', states: ['Maharashra', 'Tamilnadu', 'Rajsthan'], cities: ['Pune', 'Hydrabad', 'Mumbai'], districts: ['Nashik', 'Buldhana','Jalana'] },
    { code: 'us', name: 'United States', states: ['New York', 'California', 'Texas'], cities: ['New York City', 'Los Angeles', 'Houston'], districts: ['Manhattan', 'Brooklyn'] },
    { code: 'ca', name: 'Canada', states: ['Ontario', 'Quebec', 'British Columbia'], cities: ['Toronto', 'Montreal', 'Vancouver'], districts: ['Downtown', 'West End'] },
  
  ];

  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.value)
  };

  const handleCountryChange = (selectedCountry) => {
    const selectedCountryObj = countries.find((country) => country.code === selectedCountry);

    setAddress({
      ...address,
      country: selectedCountry,
      state: '',
      city: '',
      district: '',
      pincode:''
    });
  };

  const handleStateChange = (selectedState) => {
    setAddress({
      ...address,
      state: selectedState,
      city: '',
      district: '',
      pincode:''
    });
  };

  const handleCityChange = (selectedCity) => {
    setAddress({
      ...address,
      city: selectedCity,
      pincode:'',
      district: '',
    });
  };

  const handleDistrictChange = (selectedDistrict) => {
    setAddress({
      ...address,
      district: selectedDistrict,
    });
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="addressLine">
            <Form.Label>Address Line</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="addressLine"
              value={address.addressLine}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="picode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Pincode"
              name="picode"
            //   value={address.pincode}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
      <Col md={3}>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={address.country}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={address.state}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <option value="">Select State</option>
              {address.country &&
                countries
                  .find((country) => country.code === address.country)
                  .states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={address.city}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">Select City</option>
              {address.state &&
                countries
                  .find((country) => country.code === address.country)
                  .cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control
              as="select"
              name="district"
              value={address.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
            >
              <option value="">Select District</option>
              {address.city &&
                countries
                  .find((country) => country.code === address.country)
                  .districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

    </Form>
  );
};

export default AddressForm;
