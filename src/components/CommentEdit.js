// Node Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-jsonschema-form'
// Action Imports
import { fetchPutComment } from '../actions'

class CommentEdit extends Component {

  onSubmit = ({formData}) => {
    this.props.updateComment({
      id: this.props.comment.id,
      parentId: this.props.comment.parentId,
      timestamp: Date.now(),
      body: formData.body,
      author: formData.author
    })
    this.props.toggleModal()
  }

  render () {
    
    const { comment, schema = {} } = this.props
    let initialFormData = {
      body: comment.body,
      author: comment.author
    }

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <Form 
            schema={schema.comment ? schema.comment.schema : {}}
            uiSchema={schema.comment ? schema.comment.ui : {}}
            formData={initialFormData || {}}
            onSubmit={this.onSubmit}
          >
            <div>
              <Button onClick={() => this.props.toggleModal()}>Cancel</Button>
              <Button type="submit" bsStyle="primary">Save changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    )
  }
}

function mapStateToProps ({ schema }) {
  return {
    schema
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateComment: (comment) => dispatch(fetchPutComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit)