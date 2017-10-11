import React, { Component } from 'react'
import { Label, Badge } from 'react-bootstrap'
import { prettyDate } from '../util/date'
import Vote from './Vote'

class Post extends Component {

  render () {
    const { post } = this.props

    return (
      <div>
        <h3>{post.title}</h3>
        <p className="post-body">{post.body}</p>
        <div className="details">
          <p>{post.author} - <small><i>{prettyDate(post.timestamp)}</i></small></p>
          <Label>{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</Label>
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

export default Post