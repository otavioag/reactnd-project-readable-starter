import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Menu
          mode="horizontal"
          selectedKeys={[this.props.category === undefined ? 'home' : this.props.category]}
        >
            <Menu.Item key="home">
              <Link to='/'>
                <Icon type="home" /> Home
              </Link>
            </Menu.Item>
          {this.props.categories.length > 0 ? this.props.categories.map(category => (
            <Menu.Item key={category.name}>
              <Link to={`/${category.name}`}>
                {category.name}
              </Link>
            </Menu.Item>
          )): ''}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Navbar);
