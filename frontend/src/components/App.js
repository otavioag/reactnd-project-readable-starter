import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import { handleInitialData } from "../actions/shared";
import Navbar from "./Navbar";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
      </div>
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
