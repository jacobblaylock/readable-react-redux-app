import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './Posts'
import { fetchCategories, fetchPosts } from '../util/api'
import { getCategories, getPosts } from '../actions'

class App extends Component {

  componentDidMount () {
    fetchCategories()
      .then(res => this.props.loadCategories(res))

    fetchPosts()
      .then(res => this.props.loadPosts(res))
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
    loadCategories: (data) => dispatch(getCategories(data)),
    loadPosts: (data) => dispatch(getPosts(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))