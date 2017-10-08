import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {

    render () {
      const { comments } = this.props
  
      return (
        <div>
          <h4>Comments:</h4>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
              />
            ))}
        </div>
      )
    }
  }
  
  export default Comments

