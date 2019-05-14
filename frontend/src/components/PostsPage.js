import React, { Component } from 'react';
import Navbar from './Navbar';
import Posts from './Posts'

class PostsPage extends Component {
  render() {
    if (this.props.match.params.category === 'new') return null;
    return (
      <div>
        <Navbar category={this.props.match.params.category}/>
        <Posts category={this.props.match.params.category === undefined ? 'home' : this.props.match.params.category} />
      </div>
    );
  }
}

export default PostsPage;