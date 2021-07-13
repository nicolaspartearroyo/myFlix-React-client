import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

function NavBar() {

  return (

    <Navbar bg="dark" collapseOnSelect fixed='top' expand="lg" variant="dark" >
      <Navbar.Brand href="#" >myFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Movies</Nav.Link>
          <Nav.Link href="#">Directors</Nav.Link>
          <Nav.Link href="#">Genres</Nav.Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">User</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#">Favorite Movies</NavDropdown.Item>
            <button onClick={() => { this.onLoggedOut() }}>Logout</button>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" />
          <Button variant="dark">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;