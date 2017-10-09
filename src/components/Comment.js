import React, { Component } from 'react'
import { connect } from 'react-redux'

import Vote from './Vote'
import CommentEdit from './CommentEdit'
import { fetchDeleteComment } from '../actions'
import { prettyDate } from '../util/date'

class Comment extends Component {
  state = {
    editModalOpen: false
  }  

  toggleModal = () => {
    this.setState(state => ({
      editModalOpen: !state.editModalOpen
    }))
  }

  render () {
    const { comment } = this.props

    return (
      <div>
        <div>{comment.body}</div>
        <div>Author: {comment.author}</div>
        <div>Posted: {prettyDate(comment.timestamp)}</div>                  
        <div>Current Score: {comment.voteScore}</div>
        <Vote 
          postId={comment.parentId}
          commentId={comment.id}
        />
        <button onClick={() => this.toggleModal()}>Edit Comment</button>
        {this.state.editModalOpen &&
          <CommentEdit
            toggleModal={this.toggleModal}
            comment={comment}
          />
        }          
        <button onClick={() => this.props.deleteComment(comment.parentId, comment.id)}>
          Delete Comment
        </button>                    
        <br/>
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

