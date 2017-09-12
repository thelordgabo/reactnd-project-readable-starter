import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPostsByCategory } from '../actions/index';

class CategoryPosts extends Component {
  componentWillMount() {
    this.props.dispatch(fetchPostsByCategory(this.props.category));
  }

  render() {
    return (
      <ul>
        {this.props && this.props.categoryPosts &&
          this.props.categoryPosts.map(item => (
            <li key={item.id}>
              {item.body}<br />
              {item.title}
            </li>
          ))}
        {this.props && this.props.categoryPosts && this.props.categoryPosts.length === 0 &&
          <p>There is no added posts </p>
        }
      </ul>
    );
  }
}

CategoryPosts.propTypes = {
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  categoryPosts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  categoryPosts: state.finalPosts,
});

const connectedCategoryPosts = connect(mapStateToProps)(CategoryPosts);
export default connectedCategoryPosts;