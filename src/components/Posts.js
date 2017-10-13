import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonToolbar, Grid } from 'react-bootstrap'
import { fetchPosts, fetchDeletePost, fetchCategories } from '../actions'
import Post from './Post'
import Categories from './Categories'
import Sorter from './Sorter'
import AddPost from './AddPost'
import NotFound from './NotFound'

class Posts extends Component {
  state = {
    addModalOpen: false
  }

  componentWillMount () {
    if(this.props.categories.length < 1){
      this.props.loadCategories()
    }  
    if(this.props.posts.length < 1) {
      //this.props.loadPosts(this.props.category ? this.props.category : '')
      this.props.loadPosts('')
    }
  }  

  toggleModal = () => {
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
        
        <Button bsStyle="success" bsSize="large" className="add-button" onClick={() => this.toggleModal()}>Add Post</Button>
        {this.state.addModalOpen &&
          <AddPost
            toggleModal={this.toggleModal}
            category={category}
          />
        }
      </div>
    )
  }
}

function mapStateToProps({ posts, postsRequested, postsReceived, categories, sort }, ownProps) {
  return {
    posts,
    postsRequested,
    postsReceived,
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

