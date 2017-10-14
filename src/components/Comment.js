// Node Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Badge } from 'react-bootstrap'
// Component Imports
import Vote from './Vote'
import CommentEdit from './CommentEdit'
// Action Imports
import { fetchDeleteComment } from '../actions'
// Local Imports
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
        <p className="comment-body">{comment.body}</p>
        <div className="details">
          <div>{comment.author} - <small>{prettyDate(comment.timestamp)}</small></div>
          <div>Votes: <Badge>{comment.voteScore}</Badge><span> </span>
            <Vote 
              postId={comment.parentId}
              commentId={comment.id}
            />
          </div>
        </div>
        <br/>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="small" onClick={() => this.toggleModal()}>Edit Comment</Button>
          <Button bsStyle="danger" bsSize="small" onClick={() => this.props.deleteComment(comment.parentId, comment.id)}>
            Delete Comment
          </Button>                    
        </ButtonToolbar>

        {this.state.editModalOpen &&
            <CommentEdit
              toggleModal={this.toggleModal}
              comment={comment}
            />
          }            
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

