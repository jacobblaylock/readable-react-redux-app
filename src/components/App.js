import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Posts from './Posts'
import PostDetail from './PostDetail'

class App extends Component {

  render () {
    return (
      <div>
        <h1>Jacob's Readable App</h1>
          <Route exact path={'/'} component={Posts}/>
          <Route exact path={'/:category'} component={Posts}/>
          <Route path={'/:category/:postid'} component={PostDetail}/>          
      </div>
    )
  }
}

export default withRouter(App)