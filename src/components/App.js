// Node Module Imports
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
// Component Imports
import Posts from './Posts'
import PostDetail from './PostDetail'

class App extends Component {

  render () {
    return (
      <div>
          {/* <Route exact path={'/'} component={Posts}/> */}
          <Route exact path={'/'} component={Posts}/>
          <Route exact path={'/:category'} component={Posts}/>
          <Route path={'/:category/:postid'} component={PostDetail}/>          
      </div>
    )
  }
}

export default withRouter(App)