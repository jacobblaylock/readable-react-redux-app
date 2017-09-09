import React, { Component } from 'react'
// import { connect } from 'react-redux'


class Post extends Component {

  render () {
    const { post } = this.props

    return (
      <div>
        <h3>{post.title}</h3>
        <div><p>{post.body}</p></div>
        <div>Author: {post.author}</div>
        <div>Posted: {post.timestamp}</div>
        <div>Votes: {post.voteScore}</div>
        <div>Category: {post.category}</div>
      </div>
    )
  }



}

export default Post