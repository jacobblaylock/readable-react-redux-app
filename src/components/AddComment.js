import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-jsonschema-form'
import uuidv1 from 'uuid/v1'

import { fetchAddComment } from '../actions'

class AddComment extends Component {
    state = {
      formData: {}
    }

    loadSchema() {
      return {
        title: "Add Comment",
        type: "object",
        required: ["body", "author"],
        properties: {
          body: {title: "Body", type: "string", minLength: 2},
          author: {title: "Author", type: "string", minLength: 2}
        }
      }
    }

    loadUiSchema() {
      return {
        "ui:order": ["body", "author"],
        "ui:rootFieldId": "addCommentForm",
        body: {
          "ui:widget": "textarea",
          "ui:placeholder": "Type Comment Here..."
        },
        author: {
          "ui:placeholder": "User"
        }
      }
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
            schema={this.loadSchema()}
            uiSchema={this.loadUiSchema()}
            formData={this.state.formData}
            onSubmit={this.onSubmit}
          >
            <div>
              <button type="submit">Submit Comment</button>
            </div>
          </Form>
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
  
  