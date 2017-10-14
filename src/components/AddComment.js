// Node Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-jsonschema-form'
import { Modal, Button, ButtonToolbar } from 'react-bootstrap'
import uuidv1 from 'uuid/v1'
// Action Imports
import { fetchAddComment } from '../actions'

class AddComment extends Component {
    state = {
      formData: {}
    }

    componentDidMount() {
      this.loadFormData()
    }

    // Reset Form
    loadFormData = () => {
      this.setState({
        formData: {}
      })
    }    

    onSubmit = ({formData}) => {
      this.props.submitComment({
        id: uuidv1(),
        timestamp: Date.now(),
        body: formData.body,
        author: formData.author,
        parentId: this.props.postId     
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
                schema={schema.comment ? schema.comment.schema : {}}
                uiSchema={schema.comment ? schema.comment.ui : {}}
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
  
  function mapStateToProps ({ schema }) {
    return {
      schema
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      submitComment: (comment) => dispatch(fetchAddComment(comment))      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
  
  