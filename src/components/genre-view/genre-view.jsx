import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';



export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    console.log(this.props, 'props')

    return (
      <div className="genre-view">

        <div className="genre-name">
          <h1>
            <span className="value">{genre.Name}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>

        <Button variant="primary" onClick={() => { onBackClick(null) }}>Back</Button>

      </div>
    );
  }
}


GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired
  }).isRequired
};
