import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import { changeVotePost, deletePost } from '../http-service';
import { fetchAllPosts } from '../actions';
import EditPost from '../components/EditPost';

const customStyles = {
  content: {
    height: '120px',
    width: '600px',
    margin: '0 auto',
  },
};

class Post extends Component {
  state = {
    deletePostModalIsOpen: false,
  };

  changeVote = (voteType) => {
    changeVotePost(this.props.data.id, voteType)
      .then(() => {
        this.props.dispatch(fetchAllPosts());
      });
  };

  closeDeletePostModal = (state) => {
    this.setState({
      deletePostModalIsOpen: false,
    });

    if (state) {
      deletePost(this.props.data.id)
        .then(() => {
          this.props.dispatch(fetchAllPosts());
        });
    }
  }

  deletePost = () => {
    this.setState({
      deletePostModalIsOpen: true,
    });
  }

  editPost = () => {
    this.setState({ deletePostModalIsOpen: true });
  }

  render() {
    return (
      <div
        className="card"
        style={{ width: '60%', margin: '0 auto', marginBottom: '15px', marginTop: '15px' }}
      >
        <Modal
          isOpen={this.state.deletePostModalIsOpen}
          onRequestClose={this.closeDeletePostModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Modal"
          style={customStyles}
        >
          <p>Are you sure you want to delete this Post?</p>
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeDeletePostModal(true)}
              >
                Yes
              </button>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeDeletePostModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <h4 className="card-title">{this.props.data.title}</h4>
            </div>
            <div className="col-2">
              {this.props.showControls &&
                <div>
                  <i
                    className="material-icons"
                    style={{ float: 'right', color: '#e25151', cursor: 'pointer' }}
                    onClick={this.deletePost}
                    role="button"
                    tabIndex="-1"
                  >
                    delete
                  </i>
                  <EditPost postData={this.props.data} />
                </div>
              }
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">
            Author: {this.props.data.author}
          </h6>
          <p className="card-text">
            {this.props.data.body}
          </p>
          <h5><b>score:</b> {this.props.data.voteScore}</h5>

          <Link to={`/${this.props.data.category}/${this.props.data.id}`}>
            view details
          </Link>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-info"
                style={{ marginRight: '15px' }}
                onClick={() => this.changeVote('upVote')}
              >
                Upvote
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => this.changeVote('downVote')}
              >
                Downvote
              </button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

Post.defaultProps = {
  data: {},
  dispatch: () => { },
};

Post.propTypes = {
  showControls: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    author: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func,
};

const connectedPostComponent = connect()(Post);
export default connectedPostComponent;
