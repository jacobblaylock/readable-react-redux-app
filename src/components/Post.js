import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { prettyDate } from '../util/date'
import Vote from './Vote'
import { fetchDeletePost } from '../actions'

class Post extends Component {

  render () {
    const { post } = this.props

    return (
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
        <Link to={'/' + post.category + '/' + post.id}>More Details</Link>
        <br/>
        <button onClick={() => this.props.deletePost(post.id)}>
          Delete Post
        </button>                   
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