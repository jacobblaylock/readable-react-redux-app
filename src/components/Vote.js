import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVote } from '../actions'

class Vote extends Component {
  
  render () {

    return (
      <div>
        <button onClick={() => this.props.processVote(this.props.postId, 'upVote')}>+</button>
        <button onClick={() => this.props.processVote(this.props.postId, 'downVote')}>-</button>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    processVote: (postId, vote) => dispatch(fetchVote(postId, vote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)


