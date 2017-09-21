import React, { Component } from 'react'

class Comment extends Component {
  
    render () {
      const { comments } = this.props
  
      return (
        <div>
          <h4>Comments:</h4>
            {comments.map(c => (
              <div key={c.id}>
                <h5>{c.id}</h5>
                <p>{c.body}</p>
              </div>
            ))}
        </div>
      )
    }
  }
  
 
  export default Comment

