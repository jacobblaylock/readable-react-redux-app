import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-jsonschema-form'
import uuidv1 from 'uuid/v1'

import { fetchAddComment } from '../actions'

const schema = {
  title: "Add Comment",
  type: "object",
  required: ["body", "author"],
  properties: {
    body: {title: "Body", description: "Comment body", type: "string", minLength: 2},
    author: {title: "Author", description: "Comment author", type: "string", minLength: 2}
  }
}

class AddComment extends Component {
    state = {
      formData: {}
    }


    onSubmit = ({formData}) => {
      this.props.submitComment({
        id: uuidv1(),
        timestamp: Date.now(),
        body: formData.body,
        author: formData.author,
        parentId: this.props.postId     
      })
      this.setState({
        formData: {}
      })
    }
 
    render () {

      return (
        <div>
          <Form 
            schema={schema}
            formData={this.state.formData}
            onSubmit={this.onSubmit}
          />
        </div>
      )
    }
  }
  
  function mapStateToProps () {
    return {}
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      submitComment: (comment) => dispatch(fetchAddComment(comment))      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
  
  