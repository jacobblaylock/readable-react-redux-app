// Node Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonToolbar, Grid } from 'react-bootstrap'
// Action Imports
import { fetchPosts, fetchDeletePost, fetchCategories } from '../actions'
// Component Imports
import Post from './Post'
import Categories from './Categories'
import Sorter from './Sorter'
import AddPost from './AddPost'
import NotFound from './NotFound'
import PostEdit from './PostEdit'

class Posts extends Component {
  state = {
    editModalOpen: false,
    addModalOpen: false,
    selectedPost: undefined
  }

  componentWillMount () {
    const { categories, loadCategories, category, requestedPostCategory, loadPosts } = this.props
    // Check if categories are already loaded and fetch if necessary.
    categories.length < 1 && loadCategories()    

    // Check if posts for the selected category have already been loaded and fetch if necessary.
    if(category === undefined && requestedPostCategory !== '') {
      loadPosts()
    }else if(category && requestedPostCategory !== '') {
      if(requestedPostCategory === null) {
        loadPosts(category) 
      }else if(category !== requestedPostCategory){
        loadPosts(category)
      }
    }
  }  

  componentWillReceiveProps (nextProps) {
    const { requestedPostCategory, category, loadPosts } = this.props

    // Check if posts for the selected category have already been loaded and fetch if necessary.    
    if(requestedPostCategory !== '' && category !== nextProps.category) {
      loadPosts(nextProps.category ? nextProps.category : '')
    }
  }

  toggleEditModal = (p) => {
    this.setState(state => ({
      editModalOpen: !state.editModalOpen,
      selectedPost: p
    }))

  }

  toggleAddModal = () => {
    this.setState(state => ({
      addModalOpen: !state.addModalOpen
    }))
  }  
  
  render () {
    const { posts, postsRequested, postsReceived, categories, sort, category } = this.props

    if(postsReceived && category && !categories.some(c => c.name === category)) return (<NotFound/>)

    return (
      <div>
        {postsRequested ? <div>Loading...</div> :  
          <div>
            <Categories
              category={category}
            />        
            <Grid fluid={true}>
              <h2>{category ? `Posts for ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Posts'}</h2>
              <Sorter/>
            </Grid>     
            <Grid fluid={true}>            
              {posts
                .filter(p => {
                  if(!category || p.category === category) {
                    return true
                  } else {
                    return false
                  }
                })
                .sort(sort)             
                .map((p) => (
                  <div key={p.id}>
                    <Post 
                      key={p.id}
                      post={p}
                    />
                    <br/>
                    <ButtonToolbar>
                      <Button bsStyle="primary" onClick={() => this.toggleEditModal(p)}>Edit Post</Button>    
                      <LinkContainer to={'/' + p.category + '/' + p.id}>
                        <Button bsStyle="info">View Details</Button>
                      </LinkContainer>
                      <Button bsStyle="danger" onClick={() => this.props.deletePost(p.id)}>
                        Delete Post
                      </Button>
                    </ButtonToolbar>
                    <hr/>
                  </div>
                ))}
            </Grid>
          </div>
        }

        {this.state.editModalOpen &&
          <PostEdit
            toggleModal={this.toggleEditModal}
            post={this.state.selectedPost}
          />
        }          

        <Button bsStyle="success" bsSize="large" className="add-button" onClick={() => this.toggleAddModal()}>Add Post</Button>
        {this.state.addModalOpen &&
          <AddPost
            toggleModal={this.toggleAddModal}
            category={category}
          />
        }
      </div>
    )
  }
}

function mapStateToProps({ posts, postsRequested, postsReceived, requestedPostCategory, categories, sort }, ownProps) {
  return {
    posts,
    postsRequested,
    postsReceived,
    requestedPostCategory, 
    categories,
    sort,
    category: ownProps.match ? ownProps.match.params.category : undefined
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (category) => dispatch(fetchPosts(category)),
    loadCategories: () => dispatch(fetchCategories()),
    deletePost: (postId) => dispatch(fetchDeletePost(postId)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

