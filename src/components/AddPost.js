// Node Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, ButtonToolbar } from 'react-bootstrap'
import Form from 'react-jsonschema-form'
import uuidv1 from 'uuid/v1'
// Action Imports
import { fetchAddPost } from '../actions'

class AddPost extends Component {
    state = {
      formData: {
        categories: this.props.category
      }
    }

    loadFormData = () => {
      this.setState({
        formData: {}
      })
    }

    onSubmit = ({formData}) => {
      this.props.submitPost({
        id: uuidv1(),
        timestamp: Date.now(),
        title: formData.title,
        body: formData.body,
        author: formData.author,
        category: formData.categories   
      })
      this.loadFormData()
      this.props.toggleModal()
    }
 
    render () {
      const { schema = {} } = this.props

      return (
        <div>
          <Modal.Dialog>
            <Modal.Body>
              <Form 
                schema={schema.post ? schema.post.schema : {}}
                uiSchema={schema.post ? schema.post.ui : {}}
                formData={this.state.formData}
                onSubmit={this.onSubmit}
              >
                <div>
                  <ButtonToolbar>
                    <Button onClick={() => this.props.toggleModal()}>Cancel</Button>
                    <Button type="submit" bsStyle="primary">Save changes</Button>
                  </ButtonToolbar>
                </div>
              </Form>
            </Modal.Body>

          </Modal.Dialog>
        </div>
      )
    }
  }
  
  function mapStateToProps({ categories, schema }) {
    return {
      categories,
      schema: {
        ...schema,
        post: {
          ...schema.post,
          schema: {
            ...schema.post.schema,
            title: 'Add Post'
          }
        }
      }
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      submitPost: (post) => dispatch(fetchAddPost(post))      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
  
  