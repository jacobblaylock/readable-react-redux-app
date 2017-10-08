import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-jsonschema-form'
import uuidv1 from 'uuid/v1'

import { fetchAddComment } from '../actions'

class AddComment extends Component {
    state = {
      formData: {}
    }

    componentDidMount() {
      this.loadFormData()
    }

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
    }
 
    render () {
      const { schema = {} } = this.props

      return (
        <div>
          <Form 
            schema={schema.comment ? schema.comment.schema : {}}
            uiSchema={schema.comment ? schema.comment.ui : {}}
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
  
  