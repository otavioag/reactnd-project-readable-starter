import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Menu mode="horizontal" >
          <Menu.Item key="home">
            <Icon type="home" /> Home
          </Menu.Item>
          {this.props.categories.length > 0 ? this.props.categories.map(category => (
            <Menu.Item key={category.name}>
              {category.name}
            </Menu.Item>
          )): ''}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

export default connect(mapStateToProps)(Navbar);
