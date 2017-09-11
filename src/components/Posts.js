import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class Posts extends Component {
  
    componentDidMount () {
      console.log(this.props.cat)
    }
  
    render () {
      const { posts, selectedCategory } = this.props
  
      return (
        <div>
          <h2>Posts:</h2>
            {posts
              .filter(p => {
                if(!this.props.cat || p.category === this.props.cat) {
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
  
  export default connect(mapStateToProps)(Posts)

