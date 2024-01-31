// Install React Bootstrap by running: npm install react-bootstrap bootstrap
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import landingpage from "../assets/image/REACTJS.png";
const Home =()=> {
  return (
    <div className="Home">
      <header className="Home-header">
        <Container>
          <Row>
            <Col md={6}>
              <h1>Welcome to our Landing Page</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet lacus vel odio dapibus volutpat.
              </p>
              <Button variant="primary">Get Started</Button>
            </Col>
            <Col md={6}>
              {/* Add an image or any other content for the other half of the page */}
              <img src={landingpage} alt="Sample" />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Home;
