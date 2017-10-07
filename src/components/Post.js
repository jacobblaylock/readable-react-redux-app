import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { prettyDate } from '../util/date'
import Vote from './Vote'

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
      </div>
    )
  }
}

export default connect()(Post)