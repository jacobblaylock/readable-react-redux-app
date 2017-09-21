import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortMethod } from '../actions'
import Post from './Post'
import { sorter } from '../util/sort'

class Posts extends Component {
  
    render () {
      const { posts, sort, category, setSortMethod } = this.props
  
      return (
        <div>
          <h2>{this.props.cat ? `Posts for ${this.props.cat}` : 'Posts:'}</h2>
          <button onClick={() => setSortMethod(sorter.voteAsc)}>Votes Asc</button>
          <button onClick={() => setSortMethod(sorter.voteDesc)}>Votes Desc</button>
          <button onClick={() => setSortMethod(sorter.dateAsc)}>Date Asc</button>
          <button onClick={() => setSortMethod(sorter.dateDesc)}>Date Desc</button>
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
                    post={p}
                  />
                </div>
              ))}
           
        </div>
      )
    }
  }
  
  function mapStateToProps({ posts, sort }, ownProps) {
    return {
      posts,
      sort,
      category: ownProps.match ? ownProps.match.params.category : undefined
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      setSortMethod: (data) => dispatch(sortMethod(data))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Posts)

