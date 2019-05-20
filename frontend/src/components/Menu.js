import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortPosts } from '../actions/posts';

class Menu extends Component {

  state = {
    sortBy: 'date',
    sortOrder: 'asc'
  };

  changeSort = (e, sort) => {
    this.setState({
      ...this.state,
      [sort]: e.target.value
    }, () => {
      this.props.sortPosts(this.state.sortBy, this.state.sortOrder)
        .then(() => {
          this.props.updateSort();
        });
    });
  };

  render() {
    if (this.props.hide) return null;
    return(
      <div style={{width: "80%", marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "baseline"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems:"baseline"}}>
          <h5 style={{marginRight: "20px"}}>Sort by:</h5>
          <Radio.Group style={{marginRight: "20px"}} defaultValue='date' onChange={(e) => this.changeSort(e, 'sortBy')}>
            <Radio.Button value='date'>Date</Radio.Button>
            <Radio.Button value='vote'>Votes</Radio.Button>
          </Radio.Group>
          <Radio.Group defaultValue='asc' onChange={(e) => this.changeSort(e, 'sortOrder')}>
            <Radio.Button value='asc'>Ascending</Radio.Button>
            <Radio.Button value='desc'>Descending</Radio.Button>
          </Radio.Group>
        </div>
        <Link to='/new'>
          <Button type='primary'>
            New Post
          </Button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sortPosts: (sortBy, sortOrder) => dispatch(sortPosts(sortBy, sortOrder))
});

export default connect(null, mapDispatchToProps)(Menu);