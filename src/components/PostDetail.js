import React, { Component } from 'react'
import { connect } from 'react-redux'
import { prettyDate } from '../util/date'
import Comment from './Comment'

class PostDetail extends Component {

  render () {
    const { post } = this.props

    return (
      <div>
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

export default connect(mapStateToProps)(PostDetail)