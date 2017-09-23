import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostDetail } from '../actions'
import { prettyDate } from '../util/date'
import Comment from './Comment'

class PostDetail extends Component {

  componentDidMount () {
    !this.props.post && this.props.loadPostDetail(this.props.match.params.postid)
  }

  goBack = () => {
    this.props.history.goBack()
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
            <div>Author: {post.author}</div>
            <div>Posted: {prettyDate(post.timestamp)}</div>
            <div>Current Score: {post.voteScore}</div>
            <div>Category: {post.category}</div>
            <div>Comments: {post.comments ? post.comments.length : 0}</div>
          {post.comments &&
            <Comment 
              comments={post.comments}
            />
          } 
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