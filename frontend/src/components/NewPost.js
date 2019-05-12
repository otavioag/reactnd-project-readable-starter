import React, { Component } from 'react';
import Navbar from "./Navbar";

class NewPost extends Component {
  render() {
    return (
      <div>
        <Navbar category='new'/>
        newpost
      </div>
    );
  }
}

export default NewPost;