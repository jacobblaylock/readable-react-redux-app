import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label, Badge } from 'react-bootstrap'
import { prettyDate } from '../util/date'
import Vote from './Vote'
import { fetchDeletePost } from '../actions'

class Post extends Component {

  render () {
    const { post } = this.props

    return (
      <div>
        <h3>{post.title}</h3>
        <p><Label>{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</Label></p>
        <p className="post-body">{post.body}</p>
        <div className="details">
          <div>{post.author} - <small><i>{prettyDate(post.timestamp)}</i></small></div>
          <div>Votes: <Badge>{post.voteScore}</Badge><span> </span> 
            <Vote 
              postId={post.id}
            />
          </div>
          <div>{post.comments ? post.comments.length : 0} comments </div>   
        </div>
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (postId) => dispatch(fetchDeletePost(postId))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)