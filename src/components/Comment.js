import React, { Component } from 'react'

import Vote from './Vote'
import { prettyDate } from '../util/date'

class Comment extends Component {
  
    render () {
      const { comments } = this.props
  
      return (
        <div>
          <h4>Comments:</h4>
            {comments.map(c => (
              <div key={c.id}>
                  <div>{c.body}</div>
                  <div>Author: {c.author}</div>
                  <div>Posted: {prettyDate(c.timestamp)}</div>                  
                  <div>{c.voteScore}</div>
                  <Vote 
                    postId={c.parentId}
                    commentId={c.id}
                  />                    
                  <br/>
              </div>
            ))}
        </div>
      )
    }
  }
  
 
  export default Comment

