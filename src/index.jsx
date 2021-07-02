import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';


// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class myFlixApplication extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <MainView />
    );
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);
