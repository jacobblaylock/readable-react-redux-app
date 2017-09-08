import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../util/api'
import { getPosts } from '../actions'
// import Comment from './Comment'

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
                  <h3>{p.title}</h3>
                  <div><p>{p.body}</p></div>
                  <div>Author: {p.author}</div>
                  <div>Posted: {p.timestamp}</div>
                  <div>Votes: {p.voteScore}</div>
                  <div>Category: {p.category}</div>
                  {/* <Comment 
                    postId={p.id}
                  /> */}
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

