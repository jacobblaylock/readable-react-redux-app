import React, { Component } from 'react'
import { connect } from 'react-redux'

import Vote from './Vote'
import { fetchDeleteComment } from '../actions'
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
                 <button onClick={() => this.props.deleteComment(c.parentId, c.id)}>Delete Comment</button>                    
                  <br/>
              </div>
            ))}
        </div>
      )
    }
  }
  
 
  function mapStateToProps () {
    return {}
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      deleteComment: (postId, commentId) => dispatch(fetchDeleteComment(postId, commentId))      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comment)

