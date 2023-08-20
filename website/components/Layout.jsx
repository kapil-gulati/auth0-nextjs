import React from 'react';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import Footer from './Footer';
import {Spacer} from "@nextui-org/react";

const Layout = ({ children }) => (
  <>
      <NavBar />
      <Container className="flex-grow-1 mt-5">{children}</Container>
      <Spacer y={5}></Spacer>
      <Footer />
  </>
);

export default Layout;
