import React from 'react';
import axios from 'axios';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setUser, updateUser } from '../../actions/actions';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://myflixbypartearroyo.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  removeFavouriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios.delete(`https://myflixbypartearroyo.herokuapp.com/users/${username}/favourites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthdate) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://myflixbypartearroyo.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Name: newName ? newName : this.state.Name,
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setName(input) {
    this.Name = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthdate(input) {
    this.Birthdate = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://myflixbypartearroyo.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card border-0">
          <h1>Your Favorites Movies</h1>
          {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

          <div className="favorites-movies">
            {FavoriteMovies.length > 0 &&
              movies.map((movie) => {
                if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <CardDeck key={movie._id} className="movie-card-deck">
                      <Card className="favorites-item card-content border-0" style={{ width: '16rem' }} key={movie._id}>
                        <Card.Img style={{ width: '18rem', 'padding-top': '10px' }} className="movieCard" variant="top" src={movie.ImageURL} />
                        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                        <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={() => this.removeFavouriteMovie(movie)}>
                          Remove
                        </Button>
                      </Card>
                    </CardDeck>
                  );
                }
              })}
          </div>

          <h1 className="Profile">Update Profile</h1>
          <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

            <Form.Group controlId="formName">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="form-label">
                Password<span className="required">*</span>
              </Form.Label>
              <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBirthdate">
              <Form.Label className="form-label">Birthdate</Form.Label>
              <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
            </Form.Group>

            <Button variant='danger' type="submit">
              Update
            </Button>

            <h3>Delete your Account</h3>
            <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
              Delete Account
            </Button>
          </Form>

        </Card>
      </Row >
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);