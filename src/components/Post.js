import React, { Component } from 'react'
import { connect } from 'react-redux'
import { prettyDate } from '../util/date'


class Post extends Component {

  render () {
    const { post } = this.props

    return (
      <div>
        <h3>{post.title}</h3>
        <div><p>{post.body}</p></div>
        <div>Author: {post.author}</div>
        <div>Posted: {prettyDate(post.timestamp)}</div>
        <div>Current Score: {post.voteScore}</div>
        <div>Category: {post.category}</div>
        <div>Comments: {post.commentCount ? post.commentCount : 0}</div>
      </div>
    )
  }

}

export default connect()(Post)