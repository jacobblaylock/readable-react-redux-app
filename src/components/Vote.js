// Node Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
// Action Imports
import { fetchVote } from '../actions'

class Vote extends Component {

  render () {
    
    const { postId, commentId } = this.props

    return (
      <div style={{display: "inline"}}>
        <ButtonGroup bsSize="xsmall">
          <Button onClick={() => this.props.processVote(postId, commentId, 'upVote')} aria-label="Vote Up">
            <span className="glyphicon glyphicon-thumbs-up"></span>
          </Button>
          <Button onClick={() => this.props.processVote(postId, commentId, 'downVote')} aria-label="Vote Down">
            <span className="glyphicon glyphicon-thumbs-down"></span>
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

function mapStateToProps () {
  return {
    
  }
}

function mapDispatchToProps (dispatch) {
  return {
    processVote: (postId, commentId, vote) => dispatch(fetchVote(postId, commentId, vote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)


