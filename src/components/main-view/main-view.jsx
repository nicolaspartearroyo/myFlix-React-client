import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './main-view.scss';


export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: true
    };
  }

  componentDidMount() {
    axios.get('https://myflixbypartearroyo.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register: register,
    });
  }


  render() {
    const { movies, selectedMovie, user, register } = this.state;
    if (!user && register) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!user && !register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view-class">
        <header>
          <Navbar bg="dark" collapseOnSelect fixed='top' expand="lg" variant="dark">
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
                </NavDropdown>

              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" />
                <Button variant="dark">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </header>

        <Container fluid className="container-main">
          <Row className="main-view justify-content-lg-center">
            {selectedMovie
              ? (
                <Col>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              ))
            }

          </Row>
        </Container></div>
    );
  }
}

export default MainView;
