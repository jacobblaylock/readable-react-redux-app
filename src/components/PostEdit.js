import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-jsonschema-form'

import { fetchPutPost } from '../actions'

class PostEdit extends Component {

  onSubmit = ({formData}) => {
    console.log(formData)
    this.props.updatePost({
      id: this.props.post.id,
      timestamp: Date.now(),
      title: formData.title,
      body: formData.body,
      author: formData.author,
      category: formData.categories   
    })
    this.props.toggleModal()
  }

  render () {
    
    const { post, schema = {} } = this.props
    let initialFormData = {
      title: post.title,
      body: post.body,
      author: post.author
    }

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <Form 
            schema={schema.post ? schema.post.schema : {}}
            uiSchema={schema.post ? schema.post.ui : {}}
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

function mapStateToProps ({ schema }, ownProps) {
  return {
    schema: {
      ...schema,
      post: {
        ...schema.post,
        schema: {
          ...schema.post.schema,
          properties: {
            ...schema.post.schema.properties,
            categories: {
              ...schema.post.schema.properties.categories,
              default: ownProps.post.category
            }
          }
        }
      }
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (post) => dispatch(fetchPutPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)


