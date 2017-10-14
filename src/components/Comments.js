// Node Module Imports
import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
// Component Imports
import Comment from './Comment'

class Comments extends Component {

    render () {
      const { comments } = this.props
  
      return (
        <div>
          <h4>Comments:</h4>
          <Grid fluid={true}>
              {comments.map(comment => (
                <div key={comment.id}>
                  <Comment
                    key={comment.id}
                    comment={comment}
                  />
                  <hr/>
                </div>
              ))}
          </Grid>
        </div>
      )
    }
  }
  
  export default Comments

