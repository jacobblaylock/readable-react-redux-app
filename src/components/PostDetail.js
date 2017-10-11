import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostDetail } from '../actions'
import { Grid, Button } from 'react-bootstrap'
import Post from './Post'
import Comments from './Comments'
import PostEdit from './PostEdit'
import AddComment from './AddComment'

class PostDetail extends Component {
  state = {
    editModalOpen: false
  }

  componentDidMount () {
    !this.props.post && this.props.loadPostDetail(this.props.match.params.postid)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  toggleModal = () => {
    this.setState(state => ({
      editModalOpen: !state.editModalOpen
    }))
  }

  render () {
    const { post } = this.props

    return (
      <div>
        <button onClick={this.goBack}>Back</button>
        {post &&
          <div> 
            <Grid fluid={true}>
              <Button bsStyle="primary" onClick={() => this.toggleModal()}>Edit Post</Button>
              <Post
                post={post}
                isDetail={true}
              />
              {(post.comments && post.comments.length > 0) &&
                <Comments 
                  comments={post.comments}
                />
              } 
              <AddComment 
                postId={post.id}
              />
            </Grid>          
          </div>
        }

        {this.state.editModalOpen &&
          <PostEdit
            toggleModal={this.toggleModal}
            post={post}
          />
        }        
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts.find(p => p.id === ownProps.match.params.postid)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPostDetail: (postId) => dispatch(fetchPostDetail(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)