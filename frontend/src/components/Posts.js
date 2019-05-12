import React, { Component } from 'react';
import Navbar from "./Navbar";

class Posts extends Component {
  render() {
    if (this.props.match.params.category === 'new') return null;
    return (
      <div>
        <Navbar category={this.props.match.params.category}/>
        posts  {this.props.match.params.id}
      </div>
    );
  }
}

export default Posts;