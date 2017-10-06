import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortMethod, fetchPosts } from '../actions'
import Post from './Post'
import Categories from './Categories'
import { sorter } from '../util/sort'

class Posts extends Component {

  componentDidMount () {
    this.props.loadPosts(this.props.category ? this.props.category : '')
  }  
  
    render () {
      const { posts, postsRequested, sort, category, setSortMethod } = this.props
  
      return (
        <div>
          {postsRequested ? <div>Loading...</div> :  
            <div>
              <Link to="/">Home</Link>
              <Categories/>             
              <h2>{this.props.cat ? `Posts for ${this.props.cat}` : 'Posts:'}</h2>
              <div>
                <button onClick={() => setSortMethod(sorter.voteAsc)}>Votes Asc</button>
                <button onClick={() => setSortMethod(sorter.voteDesc)}>Votes Desc</button>
                <button onClick={() => setSortMethod(sorter.dateAsc)}>Date Asc</button>
                <button onClick={() => setSortMethod(sorter.dateDesc)}>Date Desc</button>
              </div>
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
          }
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

