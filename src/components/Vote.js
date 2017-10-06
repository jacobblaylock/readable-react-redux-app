import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVote } from '../actions'

class Vote extends Component {

  render () {
    
    const { postId, commentId } = this.props

    return (
      <div>
        <button onClick={() => this.props.processVote(postId, commentId, 'upVote')}>+</button>
        <button onClick={() => this.props.processVote(postId, commentId, 'downVote')}>-</button>
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


