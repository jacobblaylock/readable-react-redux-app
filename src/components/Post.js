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
        <Link to={'/' + post.category + '/' + post.id}>Edit Post</Link>
        <div><p>{post.body}</p></div>
        <div>Author: {post.author}</div>
        <div>Posted: {prettyDate(post.timestamp)}</div>
        <div>Current Score: {post.voteScore}</div>
        <Vote 
          postId={post.id}
        />
        <div>Category: {post.category}</div>
        <div>Comments: {post.comments ? post.comments.length : 0}</div>
      </div>
    )
  }
}

export default connect()(Post)