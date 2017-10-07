import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {

    render () {
      const { comments } = this.props
  
      return (
        <div>
          <h4>Comments:</h4>
            {comments.map(comment => (
              <div key={comment.id}>
                <Comment
                  comment={comment}
                />
              </div>
            ))}
        </div>
      )
    }
  }
  
  export default Comments

