import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, username, password, email, birthdate);
  };


  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Create Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Birthdate:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>
      </label>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        <Button onClick={() => { handleSubmit(null); }}>Back</Button>
        Submit
      </Button> * /
    </form >
  );
}

RegistrationView.propTypes = {
  registration: PropTypes.func.isRequired
};