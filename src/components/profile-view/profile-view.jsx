import React from 'react';

export class ProfileView extends React.Component {
  render() {
    const { user, onBackClick } = this.props;
    return (
      <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Log Out</Button>
    );
  }
};
