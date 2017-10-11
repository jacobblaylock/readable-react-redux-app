import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, Grid } from 'react-bootstrap'
import { sortMethod, fetchPosts } from '../actions'
import Post from './Post'
import Categories from './Categories'
import AddPost from './AddPost'
import { sorter } from '../util/sort'

class Posts extends Component {

  componentDidMount () {
    if(this.props.posts.length < 1) {
      this.props.loadPosts(this.props.category ? this.props.category : '')
    }
  }  

  componentWillReceiveProps(nextProps) {
    // if(nextProps.category && this.props.posts.filter(p => p.category === nextProps.category) < 1) {
    //   this.props.loadPosts(nextProps.category ? nextProps.category : '')
    // }    
  }
  
  render () {
    const { posts, postsRequested, sort, category, setSortMethod } = this.props

    return (
      <div>
        {postsRequested ? <div>Loading...</div> :  
          <div>
            <Categories
              category={category}
            />             
            <h2>{category ? `Posts for ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Posts'}</h2>
            <div>Sort By:</div>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="sorter">
                <ToggleButton value={1} onClick={() => setSortMethod(sorter.voteAsc)}>Votes Asc</ToggleButton>
                <ToggleButton value={2} onClick={() => setSortMethod(sorter.voteDesc)}>Votes Desc</ToggleButton>
                <ToggleButton value={3} onClick={() => setSortMethod(sorter.dateAsc)}>Date Asc</ToggleButton>
                <ToggleButton value={4} onClick={() => setSortMethod(sorter.dateDesc)}>Date Desc</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
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
        <AddPost/>
      </div>
    )
  }
}

function mapStateToProps({ posts, postsRequested, sort }, ownProps) {
  return {
    posts,
    postsRequested,
    sort,
    category: ownProps.match ? ownProps.match.params.category : undefined
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSortMethod: (data) => dispatch(sortMethod(data)),
    loadPosts: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

