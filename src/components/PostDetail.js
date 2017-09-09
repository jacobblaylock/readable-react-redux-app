import React, { Component } from 'react'
import Comment from './Comment'

class PostDetail extends Component {

  componentDidMount () {

  }

  render () {

    return (
      <div>
        <Comment 
          postId={p.id}
        />
      </div>
    )
  }

}

export default PostDetail