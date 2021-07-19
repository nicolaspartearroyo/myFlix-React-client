import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https:myflixbypartearroyo.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie } = this.props;

    return (
      <Container >

        <Card
          style={{ border: 0 }} bg='secondary' text='white'>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img className="image-container" variant="top" src={movie.ImageURL} />
          </Link>
          <Card.Body className="fav-btn" style={{ paddingLeft: 30, margin: 'auto' }}>
            <Button variant='dark' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
              Add to Favorites
            </Button>
            {/* <Card.Title><h4>{movie.Title}</h4></Card.Title>
             <Card.Text>
              {movie.Description}
            </Card.Text> */}
            {/* <Link to={`/movies/${movie._id}`}>
                <Button variant="dark">Open</Button>
              </Link> */}
          </Card.Body>
        </Card>
      </Container>

    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};
