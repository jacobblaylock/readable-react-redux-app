import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../util/api'
import { getPosts } from '../actions'
import Post from './Post'

class Posts extends Component {
  
    componentDidMount () {
      fetchPosts()
        .then(res => this.props.loadPosts(res))
    }
  
    render () {
      const { posts, selectedCategory } = this.props
  
      return (
        <div>
          <h2>Posts:</h2>
            {posts
              .filter(p => {
                if(!selectedCategory || p.category === selectedCategory) {
                  return true
                } else {
                  return false
                }
              })
              .map((p) => (
                <div key={p.id}>
                  <Post 
                    post={p}
                  />
                </div>
              ))}            
        </div>
      )
    }
  }
  
  function mapStateToProps({ selectedCategory, posts }) {
    return {
      posts,
      selectedCategory
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(getPosts(data))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Posts)

