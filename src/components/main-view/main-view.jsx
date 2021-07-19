import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
// // React-Bootstrap Components

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';

// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() {
    super();

    // #3 movies state removed from here
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixbypartearroyo.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // Log In
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  render() {

    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/profile" render={() => {
            if (!user) return <Col>
              <ProfileView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />

        </Row>
      </Router>
    );
  }
}

// #7
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies })(MainView);// // Modules


// import React from 'react';
// import axios from 'axios';

// // React-Bootstrap Components
// import { LoginView } from '../login-view/login-view';
// import { RegistrationView } from '../registration-view/registration-view';
// import { MovieView } from '../movie-view/movie-view';
// import { MovieCard } from '../movie-card/movie-card';
// import { DirectorView } from '../director-view/director-view';
// import { GenreView } from '../genre-view/genre-view';
// import { ProfileView } from '../profile-view/profile-view';
// import { NavBar } from '../navbar-view/navbar-view';

// // React-Bootstrap Components
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

// // React-router-DOM components
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// // SCSS Styling import
// import './main-view.scss';


// export class MainView extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       movies: [],
//       user: null,
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem('token');
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem('user')
//       });
//       this.getMovies(accessToken);
//     }
//   }

//   // Log In
//   onLoggedIn(authData) {
//     console.log(authData);
//     this.setState({
//       user: authData.user.Username
//     });

//     localStorage.setItem('token', authData.token);
//     localStorage.setItem('user', authData.user.Username);
//     this.getMovies(authData.token);
//   }

//   //  Get user recent data from DB
//   getUsers(token) {
//     axios.post('https://myflixbypartearroyo.herokuapp.com/users', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(response => {
//         // Assign the result to the state
//         this.setState({
//           users: response.data
//         });
//         console.log(response)
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   //   Get all movies in DB
//   getMovies(token) {
//     axios.get('https://myflixbypartearroyo.herokuapp.com/movies', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(response => {
//         // Assign the result to the state
//         this.setState({
//           movies: response.data
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//   }

//   onRegister(register) {
//     this.setState({
//       register: register,
//     });
//   }


//   render() {
//     const { movies, user } = this.state;
//     console.log("render", user);

//     return (
//       <Router>
//         <NavBar user={user} />

//         <Row className="main-view justify-content-md-center">

//           <Route exact path="/" render={() => {
//             if (!user) return <Col>
//               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//             </Col>
//             if (movies.length === 0) return <div className="main-view" />;
//             return movies.map(m => (
//               <Col md={3} key={m._id}>
//                 <MovieCard movie={m} />
//               </Col>
//             ))
//           }} />

//           <Route path="/register" render={() => {
//             if (user) return <Redirect to="/" />
//             return <Col>
//               <RegistrationView />
//             </Col>
//           }} />

//           <Route path="/profile" render={() => {
//             if (!user) return <Col>
//               <ProfileView />
//             </Col>
//           }} />

//           <Route path="/movies/:movieId" render={({ match, history }) => {
//             if (!user) return <Col>
//               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//             </Col>
//             if (movies.length === 0) return <div className="main-view" />;
//             return <Col md={8}>
//               <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
//             </Col>
//           }} />

//           <Route path="/directors/:name" render={({ match, history }) => {
//             if (!user) return <Col>
//               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//             </Col>
//             if (movies.length === 0) return <div className="main-view" />;
//             return <Col md={8}>
//               <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
//             </Col>
//           }
//           } />

//           <Route path="/genres/:name" render={({ match, history }) => {
//             if (!user) return <Col>
//               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//             </Col>
//             if (movies.length === 0) return <div className="main-view" />;
//             return <Col md={8}>
//               <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
//             </Col>
//           }} />

//           <Route exact path='/users/:username' render={({ history }) => {
//             if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
//             if (movies.length === 0) return;
//             return <ProfileView history={history} movies={movies} />
//           }} />

//         </Row>
//       </Router>
//     );
//   }
// };

// export default MainView;