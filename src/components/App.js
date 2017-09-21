import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './Posts'
import PostDetail from './PostDetail'
import { getComments, fetchCategories, fetchPosts } from '../actions'

class App extends Component {

  componentDidMount () {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render () {
    const { categories, postsRequested } = this.props

    return (
      <div>
        <h1>Jacob's Readable App</h1>
        <Route exact path="/" render={() => (
          <div>
            <h2>Categories:</h2>
              {categories.map((c) => (
                <div key={c.name}>
                  <Link to={'/' + c.path}>{c.name}</Link>
                </div>
              ))}
            {postsRequested ? <div>Loading...</div> : <Posts/>}
            
          </div>
        )}/>
        {categories.map((c) => (
          <Route exact path={'/' + c.path} key={c.name} render={() => (
            <Posts 
              cat={c.name}
            />
          )}/>
        ))}
        <Route path={'/:category/:postid'} component={PostDetail}/>          
      </div>
    )
  }
}

function mapStateToProps({ categories, postsRequested, posts }) {
  return {
    categories,
    postsRequested,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: (url) => dispatch(fetchPosts(url)),
    loadComments: (data) => dispatch(getComments(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))