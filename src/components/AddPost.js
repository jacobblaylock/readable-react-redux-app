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

    loadSchema() {
      return {
        title: "Add Post",
        type: "object",
        required: ["categories", "title", "body", "author"],
        properties: {
          title: {title: "Title", type: "string", minLength: 1},
          body: {title: "Body", type: "string", minLength: 1},
          author: {title: "Author", type: "string", minLength: 1},
          categories: {title: "Category", type: "string"}
        }
      }
    }

    loadUiSchema() {
      return {
        "ui:order": ["categories", "title", "body", "author"],
        "ui:rootFieldId": "addPostForm",
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
  
  function mapStateToProps ({ categories }) {
    return {
      categories
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      submitPost: (post) => dispatch(fetchAddPost(post))      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
  
  