import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostDetail } from '../actions'
import { prettyDate } from '../util/date'
import Comments from './Comments'
import Vote from './Vote'
import PostEdit from './PostEdit'
import AddComment from './AddComment'

class PostDetail extends Component {
  state = {
    editModalOpen: false
  }

  componentDidMount () {
    !this.props.post && this.props.loadPostDetail(this.props.match.params.postid)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  toggleModal = () => {
    this.setState(state => ({
      editModalOpen: !state.editModalOpen
    }))
  }

  render () {
    const { post } = this.props

    return (
      <div>
        <button onClick={this.goBack}>Back</button>
        {post &&
          <div> 
            <h3>{post.title}</h3>
            <div><p>{post.body}</p></div>
            <div>Category: {post.category}</div>
            <div>Author: {post.author}</div>
            <div>Posted: {prettyDate(post.timestamp)}</div>
            <div>Comments: {post.comments ? post.comments.length : 0}</div>        
            <div>Current Score: {post.voteScore}</div>
            <Vote 
              postId={post.id}
            />          
            <button onClick={() => this.toggleModal()}>Edit Post</button>
            {this.state.editModalOpen &&
              <PostEdit
                toggleModal={this.toggleModal}
                post={post}
              />
            }
            {(post.comments && post.comments.length > 0) &&
              <Comments 
                comments={post.comments}
              />
            } 
            <AddComment 
              postId={post.id}
            />          
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts.find(p => p.id === ownProps.match.params.postid)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPostDetail: (postId) => dispatch(fetchPostDetail(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)