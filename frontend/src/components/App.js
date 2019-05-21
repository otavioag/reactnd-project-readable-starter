import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { handleInitialData } from '../actions/shared';
import NewPost from './NewPost';
import PostsPage from './PostsPage';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <Router>
        <Fragment>
            <Route path='/:category?/:id?' component={PostsPage} />
            <Route path='/new/:id?' exact component={NewPost} />
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
    categories: categories
});

const mapDispatchToProps = (dispatch) => ({
  handleInitialData: () => dispatch(handleInitialData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
