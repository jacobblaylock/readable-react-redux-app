import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './Posts'
import { fetchComments } from '../util/api'
import { getCategories, getPosts, getComments, fetchCategories, fetchPosts } from '../actions'

class App extends Component {

  componentDidMount () {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render () {
    const { categories } = this.props

    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <h1>Jacob's Readable App</h1>
            <h2>Categories:</h2>
              {categories.map((c) => (
                <div key={c.name}>
                  < Link to={'/' + c.path}>{c.name}</Link>
                </div>
              ))}
            <Posts/>
          </div>
        )}/>
        {categories.map((c) => (
          <Route key={c.name} path={'/' + c.path} render={() => (
            <Posts 
              cat={c.name}
            />
          )}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: (data) => dispatch(fetchPosts(data)),
    loadComments: (data) => dispatch(getComments(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))