import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './Posts'
import PostDetail from './PostDetail'
import { getComments, fetchPosts } from '../actions'

class App extends Component {

  componentDidMount () {
    this.props.loadPosts()
  }

  render () {
    const { categories, postsRequested } = this.props

    return (
      <div>
        <h1>Jacob's Readable App</h1>
        <Route exact path="/" render={() => (
          <div>
             {postsRequested ? <div>Loading...</div> : <Posts/>}            
          </div>
        )}/>
        <Route exact path={'/:category'} component={Posts}/>
        <Route path={'/:category/:postid'} component={PostDetail}/>          
      </div>
    )
  }
}

function mapStateToProps({ postsRequested, posts }) {
  return {
    postsRequested,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadComments: (data) => dispatch(getComments(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))