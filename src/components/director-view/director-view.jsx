import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="director-view">

        <div className="director-name">
          <h1>
            <span className="value">{movie.Director.Name}</span>
          </h1>
        </div>
        <div className="director-bio">
          <span className="value">{movie.Director.Bio}</span>
        </div>

        <div className="director-birthdate">
          <span className="value">{movie.Director.Birthdate}</span>
        </div>

        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birthdate: propTypes.instanceOf(Date),
  }).isRequired
};

export default DirectorView;