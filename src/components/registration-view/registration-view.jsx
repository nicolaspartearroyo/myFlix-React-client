import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, username, password, email, birthdate);
  };

  axios.post('https://myflixbypartearroyo.herokuapp.com/login', {
    Name: name,
    Username: username,
    Password: password,
    Email: email,
    Birthdate: birthdate
  })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });

  return (
    <Form className="register justify-content-md-center">
      <Row>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control required type="text" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
      </Row>

      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control required type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Row>
        <Form.Group controlId="formPassword">
          <Form.Label>Create Password:</Form.Label>
          <Form.Control required type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control required type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
      </Row>

      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate:</Form.Label>
        <Form.Control required type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
      </Form.Group>

      <span>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        {' '}
        <Link to="/">
          <Button variant="secondary" type="button">Back</Button>
        </Link>
      </span>
    </Form >
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};