import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../util/api'
import { getComments } from '../actions'

class Comment extends Component {
  
    componentDidMount () {
      fetchComments(this.props.postId)
        .then(res => this.props.loadComments(res))
    }
  
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
  
  function mapStateToProps({ comments }) {
    return {
      comments
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      loadComments: (data) => dispatch(getComments(data))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comment)

