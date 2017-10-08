import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-jsonschema-form'
import uuidv1 from 'uuid/v1'

import { fetchAddPost } from '../actions'

class AddPost extends Component {
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
      this.props.submitPost({
        id: uuidv1(),
        timestamp: Date.now(),
        title: formData.title,
        body: formData.body,
        author: formData.author,
        category: formData.categories   
      })
      this.loadFormData()
    }
 
    render () {
      const { schema = {} } = this.props

      return (
        <div>
          <Form 
            schema={schema.post ? schema.post.schema : {}}
            uiSchema={schema.post ? schema.post.ui : {}}
            formData={this.state.formData}
            onSubmit={this.onSubmit}
          >
            <div>
              <button type="submit">Submit Post</button>
            </div>
          </Form>
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
  
  