import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header"; 


const DefaultTemplate = ({ children }) => {

  return (
    <> 
      <Header />
      <Container>
        {children}
      </Container>
    </>
  );
};
export default DefaultTemplate;
