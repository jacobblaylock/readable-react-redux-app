import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Posts from './Posts'
import PostDetail from './PostDetail'
import uuidv1 from 'uuid/v1'

class App extends Component {

  render () {
    return (
      <div>
          {/* <Route exact path={'/'} component={Posts}/> */}
          <Route exact path={'/'} render={() => 
            <Posts
              timestamp={uuidv1()}
            />
          }/>
          <Route exact path={'/:category'} component={Posts}/>
          <Route path={'/:category/:postid'} component={PostDetail}/>          
      </div>
    )
  }
}

export default withRouter(App)