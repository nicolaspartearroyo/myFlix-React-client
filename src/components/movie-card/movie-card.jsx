import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from "react-router-dom";


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card bg='secondary' text='white'>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="image-container" variant="top" src={movie.ImageURL} />
        </Link>
        <Card.Body>
          <Card.Title><h4>{movie.Title}</h4></Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
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
