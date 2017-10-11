import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostDetail } from '../actions'
import { Grid, Button } from 'react-bootstrap'
import Post from './Post'
import Comments from './Comments'
import PostEdit from './PostEdit'
import AddComment from './AddComment'
import Categories from './Categories'

class PostDetail extends Component {
  state = {
    editModalOpen: false,
    addModalOpen: false,
  }

  componentDidMount () {
    !this.props.post && this.props.loadPostDetail(this.props.match.params.postid)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  toggleEditModal = () => {
    this.setState(state => ({
      editModalOpen: !state.editModalOpen
    }))
  }

  toggleAddModal = () => {
    this.setState(state => ({
      addModalOpen: !state.addModalOpen
    }))
  }  

  render () {
    const { post, category } = this.props

    return (
      <div>
        <Categories
          category={category}
        />              
        {post &&
          <div> 
            <Grid fluid={true}>
              <Button onClick={this.goBack}>Back</Button>
              <Post
                post={post}
                isDetail={true}
              />
 
              <Button bsStyle="primary" onClick={() => this.toggleEditModal()}>Edit Post</Button>              
              <br/><br/>
              {(post.comments && post.comments.length > 0) &&
                <Comments 
                  comments={post.comments}
                />
              } 
            </Grid>          
          </div>
        }

        {this.state.editModalOpen &&
          <PostEdit
            toggleModal={this.toggleEditModal}
            post={post}
          />
        }

        <Button bsStyle="success" bsSize="large" className="add-button" onClick={() => this.toggleAddModal()}>Add Comment</Button>                
        {this.state.addModalOpen &&
          <AddComment 
            toggleModal={this.toggleAddModal}
            postId={post.id}
          />        
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts.find(p => p.id === ownProps.match.params.postid),
    category: ownProps.match ? ownProps.match.params.category : undefined
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPostDetail: (postId) => dispatch(fetchPostDetail(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)